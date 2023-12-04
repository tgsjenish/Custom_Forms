import classNames from "classnames";

/*
 * Import components and utilities from our extension API. Warning: for demo experiments only.
 */
import {
  Errors,
  FormContext,
  Textfield,
  Description,
  Label,
} from "@bpmn-io/form-js";

import { html, useContext } from "diagram-js/lib/ui";

import "./styles.css";

import AutoCompleteIcon from "./AutoComplete.svg";

export const autoCompleteType = "autoComplete";

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
export function AutoCompleteRenderer(props) {
  const {
    disabled,
    errors = [],
    field,
    readonly,
    onFocus,
    onBlur,
    value: values = [],
  } = props;

  const { description, autoComplete = {}, id, label } = field;

  const { staticOptions } = autoComplete;

  const { formId } = useContext(FormContext);

  const errorMessageId =
    errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  const onChange = ({ target }) => {
    props.onChange({
      field,
      value: Text(target.value),
    });
  };

  return html`<div class=${formFieldClasses(autoCompleteType)}>
    <${Label} id=${prefixId(id, formId)} label=${label} />
    <div class="autocomplete" style="width:300px;">
      <input
        type="text"
        id=${prefixId(id, formId)}
        onInput=${onChange}
        disabled=${disabled}
        readonly=${readonly}
        value=${value}
      />
    </div>
    <${Description} description=${description} />
    <${Errors} errors=${errors} id=${errorMessageId} />
  </div>`;
}

/*
 * This is the configuration part of the custom field. It defines
 * the schema type, UI label and icon, palette group, properties panel entries
 * and much more.
 */
AutoCompleteRenderer.config = {
  /* we can extend the default configuration of existing fields */
  ...Textfield.config,
  type: autoCompleteType,
  label: "AutoComplete",
  iconUrl: `data:image/svg+xml,${encodeURIComponent(AutoCompleteIcon)}`,
  propertiesPanelEntries: [
    "key",
    "label",
    "description",
    "staticOptions",
    "disabled",
    "readonly",
  ],
};

// helper //////////////////////

function formFieldClasses(
  type,
  { errors = [], disabled = false, readonly = false } = {},
) {
  if (!type) {
    throw new Error("type required");
  }

  return classNames("fjs-form-field", `fjs-form-field-${type}`, {
    "fjs-has-errors": errors.length > 0,
    "fjs-disabled": disabled,
    "fjs-readonly": readonly,
  });
}

function prefixId(id, formId) {
  if (formId) {
    return `fjs-form-${formId}-${id}`;
  }

  return `fjs-form-${id}`;
}

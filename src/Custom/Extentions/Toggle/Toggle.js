import classNames from "classnames";

/*
 * Import components and utilities from our extension API. Warning: for demo experiments only.
 */
import {
  Errors,
  FormContext,
  Checkbox,
  Description,
  Label,
} from "@bpmn-io/form-js";

import { html, useContext } from "diagram-js/lib/ui";

import "./styles.css";
import ToggleIcon from "./toggle.svg";

export const toggleType = "toggle";

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
export function ToggleRendrer(props) {
  const { disabled, errors = [], field, readonly, value } = props;
  // const { description, toggle = {}, id, label } = field;
  const { description, id, label } = field;

  // const { predefined } = toggle;
  const { formId } = useContext(FormContext);

  const errorMessageId =
    errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  const onSwitchChange = ({ target }) => {
    props.onChange({
      field,
      value: target.checked,
    });
  };

  return html`
    <div class=${formFieldClasses(toggleType)}>
      <${Label} id=${prefixId(id, formId)} label=${label} />
      <div class="toggle-group">
        <label class="switch">
          <input
            type="checkbox"
            disabled=${disabled}
            readonly=${readonly}
            id=${prefixId(id, formId)}
            onChange=${onSwitchChange}
            checked=${value}
          />
          <span class="slider round"></span>
        </label>
        <div class="toggle-label">${value ? "ON" : "OFF"}</div>
      </div>
      <${Description} description=${description} />
      <${Errors} errors=${errors} id=${errorMessageId} />
    </div>
  `;
}

/*
 * This is the configuration part of the custom field. It defines
 * the schema type, UI label and icon, palette group, properties panel entries
 * and much more.
 */
ToggleRendrer.config = {
  /* we can extend the default configuration of existing fields */
  ...Checkbox.config,
  type: toggleType,
  label: "Toggle",
  iconUrl: "https://www.svgrepo.com/show/503596/toggle-off.svg",
  // iconUrl: `data:image/svg+xml,${encodeURIComponent(ToggleIcon)}`,
  propertiesPanelEntries: [
    "key",
    "label",
    "description",
    // "predefined",
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

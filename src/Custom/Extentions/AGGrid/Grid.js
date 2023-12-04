import classNames from "classnames";
import GridComp from "./GridComp";

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

export const gridType = "grid";

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
export function GridRendrer(props) {
  const { disabled, errors = [], field, readonly, value: values = [] } = props;
  const { description, id, label, validate = {} } = field;
  const { required } = validate;

  // const { predefined } = toggle;
  const { formId } = useContext(FormContext);

  const errorMessageId =
    errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  return html`
    <div
      class=${formFieldClasses(gridType, {
        errors,
        disabled,
        readonly,
      })}
    >
      <${Label}
        id=${prefixId(id, formId)}
        label=${label}
        required=${required}
      />
      <${GridComp} />
    </div>
  `;
}

// <input
//         class="fjs-input autocompleteInput"
//         type="text"
//         disabled=${disabled}
//         readonly=${readonly}
//         id=${prefixId(id, formId)}
//         aria-describedby=${errorMessageId}
//       />

{
  /* <GridComp/> */
}

/*
 * This is the configuration part of the custom field. It defines
 * the schema type, UI label and icon, palette group, properties panel entries
 * and much more.
 */
GridRendrer.config = {
  /* we can extend the default configuration of existing fields */
  ...Textfield.config,
  type: gridType,
  label: "AG Grid",
  group: "basic-input",
  emptyValue: "",
  //   iconUrl: "https://www.svgrepo.com/show/503596/toggle-off.svg",
  iconUrl: "https://cdn-icons-png.flaticon.com/512/4403/4403267.png",
  // iconUrl: `data:image/svg+xml,${encodeURIComponent(ToggleIcon)}`,
  sanitizeValue: ({ value }) => {
    // if (isArray(value) || isObject(value)) {
    //   return "";
    // }

    // sanitize newlines to spaces
    if (typeof value === "string") {
      return value.replace(/[\r\n\t]/g, " ");
    }

    return String(value);
  },
  create: (options = {}) => ({ ...options }),
  propertiesPanelEntries: [
    "key",
    "label",
    "description",
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

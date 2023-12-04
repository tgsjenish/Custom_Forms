import classNames from "classnames";
import TextfieldComp from "./TextfieldComp";
import TextField from "@mui/material/TextField";

import {
  Errors,
  FormContext,
  Textfield,
  Description,
  Label,
} from "@bpmn-io/form-js";

import { html, useContext } from "diagram-js/lib/ui";

export const mTextfieldType = "MaterialTextField";

export function MTextFieldRendrer(props) {
  const { disabled, errors = [], field, readonly } = props;
  const { description, id, label, validate = {} } = field;
  const { required } = validate;

  const { formId } = useContext(FormContext);

  const errorMessageId =
    errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  const onTextChange = ({ target }) => {
    props.onChange({
      field,
      value: target.value,
    });
  };

  return html`
    <div
      class=${formFieldClasses(mTextfieldType, {
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
      <div class="text-group">
        <${TextfieldComp} />
      </div>
      <${Description} description=${description} />
      <${Errors} errors=${errors} id=${errorMessageId} />
    </div>
  `;
}

MTextFieldRendrer.config = {
  ...Textfield.config,
  type: mTextfieldType,
  label: "Material text field",
  group: "basic-input",
  emptyValue: "",
  iconUrl: "https://cdn-icons-png.flaticon.com/512/5136/5136012.png",
  sanitizeValue: ({ value }) => {
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

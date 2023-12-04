import classNames from "classnames";
import { useState } from "react";

/*
 * Import components and utilities from our extension API. Warning: for demo experiments only.
 */
import { Errors, FormContext, Description, Label } from "@bpmn-io/form-js";

import { html, useContext } from "diagram-js/lib/ui";

import "./styles.css";

export const fileType = "FileInput";

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
export function FileRenderer(props) {
  const { disabled = false, field, value = "" } = props;

  const { description, id, label, validate = {} } = field;

  const { required } = validate;

  const [errors, setError] = useState([]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onChange = async ({ target }) => {
    const base64Value = await convertBase64(target.files[0]);
    props.onChange({
      field,
      value: base64Value,
    });
    setError(_validate(base64Value));
  };

  const _validate = (value) => {
    const { allowedMimeTypes } = field;
    if (!allowedMimeTypes || allowedMimeTypes.length === 0) {
      return [];
    }
    const _allowed = allowedMimeTypes.split(",");
    const fileMime = value.split("data:")[1].split(";")[0];
    if (allowedMimeTypes) {
      return _allowed.includes(fileMime)
        ? []
        : [`File type not allowed, must be one of: ${allowedMimeTypes}`];
    }
  };

  const onReset = () => {
    props.onChange({
      field,
      value: "",
    });
  };

  const onClick = () => {
    let newWindow = window.open("");
    newWindow.document.write(
      "<iframe width='100%' height='100%' src='" + value + "'></iframe>",
    );
  };

  // const { formId } = Form._getState();
  const { formId } = useContext(FormContext);

  if (disabled === true && value)
    return (
      <div class={formFieldClasses(fileType, errors)}>
        <Label id={prefixId(id, formId)} label={label} required={required} />
        <a onClick={onClick}>
          <button type="secondary" class="fjs-button">
            View/Download
          </button>
        </a>
        <Description description={description} />
      </div>
    );

  return (
    <div class={formFieldClasses(fileType, errors)}>
      <Label id={prefixId(id, formId)} label={label} required={required} />

      <input
        class="fjs-input"
        disabled={disabled}
        id={prefixId(id, formId)}
        onInput={onChange}
        onReset={onReset}
        type="file"
        value={value}
      />
      <Description description={description} />
      <Errors errors={errors} />
    </div>
  );
}

/*
 * This is the configuration part of the custom field. It defines
 * the schema type, UI label and icon, palette group, properties panel entries
 * and much more.
 */
FileRenderer.config = {
  /* we can extend the default configuration of existing fields */
  type: fileType,
  label: "File",
  iconUrl:
    "https://cdn.iconscout.com/icon/free/png-512/free-file-upload-4971164-4132181.png?f=webp&w=256",
  propertyPanelGroups: ["FileGeneral", "FileProperties", "validation"],
  keyed: true,
  emptyValue: "",
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

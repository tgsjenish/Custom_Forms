import classNames from "classnames";
import SignaturePad from "signature_pad";
import { useEffect, useRef } from "react";

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

export const signaturePadType = "signaturePad";

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
export function SignaturePadRendrer(props) {
  const { disabled, errors = [], field, readonly, value: values = [] } = props;
  // const { description, toggle = {}, id, label } = field;
  const { description, id, label, validate = {} } = field;
  const { required } = validate;

  // const { predefined } = toggle;
  const { formId } = useContext(FormContext);
  const canvasRef = useRef(null);

  const errorMessageId =
    errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const signaturePad = new SignaturePad(canvas, {
      minWidth: 2,
      maxWidth: 4,
    });

    function resizeCanvas() {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
      let storedData = signaturePad.toData();
      signaturePad.clear();
      signaturePad.fromData(storedData);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const clearButton = document.querySelector("#clear_button");
    const finishButton = document.querySelector("#finish_button");

    clearButton.addEventListener("click", () => {
      signaturePad.clear();
    });

    finishButton.addEventListener("click", () => {
      const svgDataUrl = signaturePad.toDataURL("image/svg+xml");
      console.log(svgDataUrl);
    });

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearButton.removeEventListener("click", () => {
        signaturePad.clear();
      });
      finishButton.removeEventListener("click", () => {
        const svgDataUrl = signaturePad.toDataURL("image/svg+xml");
        console.log(svgDataUrl);
      });
    };
  }, []); // Empty dependency array ensures this effect runs once after mount

  const onTextChange = ({ target }) => {
    props.onChange({
      field,
      value: target.value,
    });
  };

  return html`
    <div
      class=${formFieldClasses(signaturePadType, {
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
      <div class="signaturePad-group">
        <div class="signature-pad-container">
          <a class="button-text" id="clear_button">CLEAR</a>
          <canvas ref=${canvasRef} id="signature_pad"></canvas>
          <a class="button button-primary" id="finish_button">Finish</a>
        </div>
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
SignaturePadRendrer.config = {
  /* we can extend the default configuration of existing fields */
  ...Textfield.config,
  type: signaturePadType,
  label: "Signature Pad",
  group: "basic-input",
  emptyValue: "",
  iconUrl: "https://img.icons8.com/?size=256&id=3lejN90dOaRY&format=png",
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

// const sign = () => {
//   document.addEventListener("DOMContentLoaded", function () {
//     var canvas = document.querySelector("#signature_pad");
//     var signaturePad = new SignaturePad(canvas, {
//       minWidth: 2,
//       maxWidth: 4,
//     });

//     function resizeCanvas() {
//       var ratio = Math.max(window.devicePixelRatio || 1, 1);
//       canvas.width = canvas.offsetWidth * ratio;
//       canvas.height = canvas.offsetHeight * ratio;
//       canvas.getContext("2d").scale(ratio, ratio);
//       let storedData = signaturePad.toData();
//       signaturePad.clear(); // otherwise isEmpty() might return incorrect value
//       signaturePad.fromData(storedData);
//     }

//     window.addEventListener("resize", resizeCanvas);
//     resizeCanvas();

//     var clearButton = document.querySelector("#clear_button");
//     console.log("Clear clicked");

//     clearButton.addEventListener("click", function () {
//       signaturePad.clear();
//     });

//     var finishButton = document.querySelector("#finish_button");
//     finishButton.addEventListener("click", function () {
//       console.log("Finish clicked");

//       const svgDataUrl = signaturePad.toDataURL("image/svg+xml");
//       console.log(svgDataUrl);
//     });
//   });
// };

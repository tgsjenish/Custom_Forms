import {
  SignaturePadRendrer,
  signaturePadType,
} from "./SignaturePadWithComponent";

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormFields {
  constructor(formFields) {
    formFields.register(signaturePadType, SignaturePadRendrer);
  }
}

export default {
  __init__: ["signaturePadField"],
  signaturePadField: ["type", CustomFormFields],
};

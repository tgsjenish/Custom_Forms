import { MTextFieldRendrer, mTextfieldType } from "./TextField";

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormFields {
  constructor(formFields) {
    formFields.register(mTextfieldType, MTextFieldRendrer);
  }
}

export default {
  __init__: ["mTextField"],
  mTextField: ["type", CustomFormFields],
};

import { FileRenderer, fileType } from "./File";

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormFields {
  constructor(formFields) {
    formFields.register(fileType, FileRenderer);
  }
}

export default {
  __init__: ["fileField"],
  fileField: ["type", CustomFormFields],
};

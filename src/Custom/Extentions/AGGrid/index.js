import { GridRendrer, gridType } from "./Grid";

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormFields {
  constructor(formFields) {
    formFields.register(gridType, GridRendrer);
  }
}

export default {
  __init__: ["gridField"],
  gridField: ["type", CustomFormFields],
};

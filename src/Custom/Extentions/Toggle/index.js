import { ToggleRendrer, toggleType } from "./Toggle";

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormFields {
  constructor(formFields) {
    formFields.register(toggleType, ToggleRendrer);
  }
}

export default {
  __init__: ["toggleField"],
  toggleField: ["type", CustomFormFields],
};

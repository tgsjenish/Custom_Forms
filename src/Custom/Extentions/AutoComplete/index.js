import { AutocompleteRendrer, autocompleteType } from "./AutoComplete";

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormFields {
  constructor(formFields) {
    formFields.register(autocompleteType, AutocompleteRendrer);
  }
}

export default {
  __init__: ["autocompleteField"],
  autocompleteField: ["type", CustomFormFields],
};

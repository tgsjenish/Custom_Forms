import { CustomPropertiesProvider } from "./CustomPropertiesProvider";

export default {
  __init__: ["autoCompletePropertiesProvider"],
  autoCompletePropertiesProvider: ["type", CustomPropertiesProvider],
};

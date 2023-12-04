import { get, set } from "min-dash";

/*
 * Import components and utilities from our extension API. Warning: for demo experiments only.
 */
import { ListGroup } from "@bpmn-io/properties-panel";
// import CustomValueEntry from "packages/form-js-editor/src/features/properties-panel/entries/CustomValueEntry";

/*
 * This is a custom properties provider for the properties panel.
 * It adds a new group `Range` with range specific properties.
 */
export class CustomPropertiesProvider {
  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(this, 500);
  }

  /**
   * Return the groups provided for the given field.
   *
   * @param {any} field
   * @param {function} editField
   *
   * @return {(Object[]) => (Object[])} groups middleware
   */
  getGroups(field, editField) {
    /**
     * We return a middleware that modifies
     * the existing groups.
     *
     * @param {Object[]} groups
     *
     * @return {Object[]} modified groups
     */
    return (groups) => {
      if (field.type !== "autoComplete") {
        return groups;
      }

      const generalIdx = findGroupIdx(groups, "general");

      /* insert range group after general */
      groups.splice(generalIdx + 1, 0, {
        id: "autoComplete",
        label: "AutoComplete",
        entries: AutoCompleteEntries(field, editField),
      });

      return groups;
    };
  }
}

CustomPropertiesProvider.$inject = ["propertiesPanel"];

/*
 * collect range entries for our custom group
 */
function AutoCompleteEntries(field, editField) {
  const { properties = {}, type } = field;
  if (type === "default") {
    return null;
  }

  const addEntry = (event) => {
    event.stopPropagation();

    let index = Object.keys(properties).length + 1;

    while (`key${index}` in properties) {
      index++;
    }

    editField(field, ["properties"], {
      ...properties,
      [`key${index}`]: "value",
    });
  };

  const items = Object.keys(properties).map((key, index) => {
    const removeEntry = (event) => {
      event.stopPropagation();

      return editField(field, ["properties"], removeKey(properties, key));
    };

    const id = `${field.id}-property-${index}`;

    return {
      autoFocusEntry: id + "-key",
      // entries: CustomValueEntry({
      //   editField,
      //   field,
      //   idPrefix: id,
      //   index,
      //   validateFactory,
      // }),
      id,
      label: key || "",
      remove: removeEntry,
    };
  });

  const validateFactory = (key) => {
    return (value) => {
      if (value === key) {
        return;
      }

      // if (isUndefined(value) || !value.length) {
      //   return "Must not be empty.";
      // }

      // if (has(properties, value)) {
      //   return "Must be unique.";
      // }
    };
  };

  const onChange = (key) => {
    return (value) => {
      const range = get(field, ["autoComplete"], {});

      editField(field, ["autoComplete"], set(range, [key], value));
    };
  };

  const getValue = (key) => {
    return () => {
      return get(field, ["autoComplete", key]);
    };
  };

  return [
    {
      add: addEntry,
      id: "custom-countries",
      component: ListGroup,
      items,
      label: "Custom properties",
      tooltip:
        "Add properties directly to the form schema, useful to configure functionality in custom-built task applications and form renderers.",
      shouldSort: false,
    },
  ];
}

// helper //////////////////////

function findGroupIdx(groups, id) {
  return groups.findIndex((g) => g.id === id);
}

/**
 * Returns copy of object without key.
 *
 * @param {Object} properties
 * @param {string} oldKey
 *
 * @returns {Object}
 */
export function removeKey(properties, oldKey) {
  return Object.entries(properties).reduce((newProperties, entry) => {
    const [key, value] = entry;

    if (key === oldKey) {
      return newProperties;
    }

    return {
      ...newProperties,
      [key]: value,
    };
  }, {});
}

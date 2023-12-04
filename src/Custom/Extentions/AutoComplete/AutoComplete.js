import classNames from "classnames";
import $ from "jquery";
import "jquery-ui";
import "jquery/dist/jquery.min.js";
import "jquery-ui/dist/jquery-ui.js";

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
import AutocompleteIcon from "./Autocomplete.svg";

export const autocompleteType = "autocomplete";

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
export function AutocompleteRendrer(props) {
  const { disabled, errors = [], field, readonly, value: values = [] } = props;
  // const { description, toggle = {}, id, label } = field;
  const { description, id, label, validate = {} } = field;
  const { required } = validate;

  // const { predefined } = toggle;
  const { formId } = useContext(FormContext);

  const errorMessageId =
    errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  const onTextChange = ({ target }) => {
    Search();
    props.onChange({
      field,
      value: target.value,
    });
  };

  const onBlur = ({ target }) => {
    props.onChange({
      field,
      value: target.value,
    });
  };

  return html`
    <div
      class=${formFieldClasses(autocompleteType, {
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
      <div class="autoComplete-group">
        <label class="textbox completeIt">
          <input
            class="fjs-input autocompleteInput"
            type="text"
            disabled=${disabled}
            readonly=${readonly}
            id=${prefixId(id, formId)}
            onInput=${onTextChange}
            aria-describedby=${errorMessageId}
          />
          <div class="icon"></div>
          <div class="autoComplete"></div>
        </label>
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
AutocompleteRendrer.config = {
  /* we can extend the default configuration of existing fields */
  ...Textfield.config,
  type: autocompleteType,
  label: "Auto Complete",
  group: "basic-input",
  emptyValue: "",
  //   iconUrl: "https://www.svgrepo.com/show/503596/toggle-off.svg",
  iconUrl: "https://cdn-icons-png.flaticon.com/128/8301/8301517.png",
  // iconUrl: `data:image/svg+xml,${encodeURIComponent(ToggleIcon)}`,
  sanitizeValue: ({ value }) => {
    // if (isArray(value) || isObject(value)) {
    //   return "";
    // }

    // sanitize newlines to spaces
    if (typeof value === "string") {
      return value.replace(/[\r\n\t]/g, " ");
    }

    return String(value);
  },
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

/*An array containing all the country names in the world:*/
let countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central Arfrican Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauro",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre & Miquelon",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "St Kitts & Nevis",
  "St Lucia",
  "St Vincent",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function Search() {
  $(".autocompleteInput").autocomplete({
    source: countries,
  });
}

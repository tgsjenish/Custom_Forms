import React, { useEffect } from "react";
import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css";
import "@bpmn-io/form-js/dist/assets/form-js-playground.css";
import { Playground } from "@bpmn-io/form-js-playground";
import ToggleExtension from "./Custom/Extentions/Toggle";
import AutoCompleteExtension from "./Custom/Extentions/AutoComplete";
import SignaturePadExtension from "./Custom/Extentions/SignaturePad";
import AGGridExtension from "./Custom/Extentions/AGGrid";
import FileExtension from "./Custom/Extentions/FileUpload";
import PropertiesPanelExtension from "./Custom/Extentions/propertiesPanel";

import MTextFieldExtension from "./Custom/Extentions/MaterialUI/TextField";
import "./custom.css";

const FormPlayground = () => {
  //if we want to set default fields in form

  useEffect(() => {
    const playground = new Playground({
      container: document.querySelector("#container"),
      schema: {
        type: "default",
        components: [],
      },
      data: {},

      // load rendering extension
      additionalModules: [
        // ToggleExtension,
        MTextFieldExtension,
        // AGGridExtension,
        // AutoCompleteExtension,
        // SignaturePadExtension,
        //FileExtension,
      ],

      // load properties panel extension
      // editorAdditionalModules: [PropertiesPanelExtension],
    });

    // Optional: Subscribe to changes
    playground.on("changed", ({ schema, data }) => {
      console.log("Form data changed:", schema, data);
    });

    // Clean up when the component is unmounted
    return () => playground.destroy();
  }, []);

  return <div id="container"></div>;
};

export default FormPlayground;

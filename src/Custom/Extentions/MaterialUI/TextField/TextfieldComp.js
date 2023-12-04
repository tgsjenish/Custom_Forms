import * as React from "react";
import TextField from "@mui/material/TextField";
import { html, useContext } from "diagram-js/lib/ui";

export default function TextfieldComp() {
  return html`
    <div>
      <${TextField} id="outlined-basic" label="Outlined" variant="outlined" />
    </div>
  `;
}

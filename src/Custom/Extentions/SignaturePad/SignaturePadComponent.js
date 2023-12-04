// SignaturePadComponenet.js
// import React from "react";
import SignatureCanvas from "react-signature-canvas";

const SignaturePadComponent = ({ onChange }) => {
  // const signatureRef = React.useRef();

  return (
    <div>
      <SignatureCanvas
        // ref={signatureRef}
        onEnd={() => onChange("")}
        // onEnd={() => onChange(signatureRef.current.toDataURL())}
      />
    </div>
  );
};

export default SignaturePadComponent;

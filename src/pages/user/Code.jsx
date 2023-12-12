import React from "react";

function Code(props) {
  return (
    <>
      <div className="my-4 text-left ">
        <div className="mockup-code">
          <pre data-prefix="1">
            <code>Secrate Key: {props.generatedCredential.secrate_key}</code>
          </pre>
          <pre data-prefix="2">
            <code>ClientId:{props.generatedCredential.client_id}</code>
          </pre>
          <pre data-prefix="3" className="text-success">
            <code>API Key: {props.generatedCredential.key}</code>
          </pre>
        </div>
      </div>
    </>
  );
}
export default Code;

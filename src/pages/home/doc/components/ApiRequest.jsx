import React from "react";

function ApiRequest() {
  return (
    <div className="mockup-code text-success">
      <pre data-prefix="1">
        <code>
          <span className=" text-warning">const</span> sk =
          "ccf2313b-8d29-42fb-9fb6-d9cf65c3e4e4"
          <span className="text-warning">;</span>
        </code>
      </pre>
      <pre data-prefix="2">
        <code>
          <span className="text-warning">const</span> apikey =
          "11cf1af5-b33a-42e7-85e8-d39e6d4c9a8e"
          <span className="text-warning">;</span>
        </code>
      </pre>
      <pre data-prefix="3">
        <code>
          <span className="text-warning">const</span> mid =
          "2fec3ae8-b7d8-4c44-8a43-7e37617741a5"
          <span className="text-warning">;</span>
        </code>
      </pre>
      <pre data-prefix="4">
        <code>
          <span className="text-warning">const</span> amount = 59.99
          <span className="text-warning">;</span>
        </code>
      </pre>
      <pre data-prefix="5">
        <code>
          <span className="text-warning">const</span> currency = "USD"
          <span className="text-warning">;</span>
        </code>
      </pre>
      <pre data-prefix="6">
        <code>
          <span className="text-warning">const</span> orderId = "id123456"
          <span className="text-warning">;</span>
        </code>
      </pre>
      <pre data-prefix="7">
        <code>
          <span className="text-warning">const</span> callBackUrl =
          "http://192.168.231.76:3000/"
          <span className="text-warning">;</span>
        </code>
      </pre>
      <pre data-prefix="7">
        <code>
          <span className="text-warning">const</span> openPopUp ={" "}
          <span className="text-warning">(</span>
          <span className="text-warning">)</span> =&gt;{" "}
          <span className="text-error">&#123;</span>
        </code>
      </pre>
      <pre data-prefix="8">
        <code>
          <span className="text-warning">const</span> URL
          =`http://localhost:3000/gateway/&clientId=$
          <span className="text-error">
            <span className="text-error">&#123;</span>
          </span>
          mid
          <span className="text-error">
            <span className="text-error">&#125;</span>
          </span>
          &secretKey=$<span className="text-error">&#123;</span>sk
          <span className="text-error">
            <span className="text-error">&#125;</span>
          </span>
          &key=$<span className="text-error">&#123;</span>apikey
          <span className="text-error">
            <span className="text-error">&#125;</span>
          </span>
          &callBackUrl=
        </code>
      </pre>
      <pre data-prefix="9">
        <code>
          $<span className="text-error">&#123;</span>callBackUrl
          <span className="text-error">
            <span className="text-error">&#125;</span>
          </span>
          &currency=$<span className="text-error">&#123;</span>
          currency
          <span className="text-error">
            <span className="text-error">&#125;</span>
          </span>
          &orderId=$<span className="text-error">&#123;</span>orderId
          <span className="text-error">
            <span className="text-error">&#125;</span>
          </span>
          &amount=$<span className="text-error">&#123;</span>amount
          <span className="text-error">
            <span className="text-error">&#125;</span>
          </span>
          `<span className="text-warning">;</span>
        </code>
      </pre>
      <pre data-prefix="10">
        <code>
          <span className="text-warning">const</span> myWindow = window.open
          <span className="text-warning">(</span> URL, "",
          "width=500,height=700,left=500,location=0,resizable=yes,top=100 "{" "}
          <span className="text-warning">)</span>
          <span className="text-warning">;</span>
        </code>
      </pre>
      <pre data-prefix="11">
        <code>
          <span className="text-error">&#125;</span>
          <span className="text-warning">;</span>
        </code>
      </pre>
    </div>
  );
}

export default ApiRequest;

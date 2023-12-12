import React from "react";

function Card() {
  return (
    <>
      <div className="bg-white card w-96 text-primary-content">
        <div className="card-body">
          <p>Primary account : 100000057657</p>
          <div className="divider"></div>
          <p>Secret key : kjc48owdbui7390ur32i828b3u6</p>
        </div>
      </div>
      {/* <div className="card w-96 glass">
        <div className="card-body">
          <h2 className="card-title">Primary account</h2>
          <p>100000057657</p>
          <div className="divider"></div>
          <h2 className="card-title">Secret key</h2>
          <p>kjc48owdbui7390ur32i828b3u6</p>
        </div>
      </div> */}
    </>
  );
}

export default Card;

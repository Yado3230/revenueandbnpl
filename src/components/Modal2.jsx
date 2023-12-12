import React from "react";
import M2settingView from "./M2settingView";

function Modal2() {
  return (
    <>
      <input type="checkbox" id="" className="modal-toggle" />
      <div className="modal">
        <div className="relative w-11/12 max-w-5xl modal-box">
          <label
            htmlFor="my-modal-3"
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            ✕
          </label>

          {window.location.pathname === "/admin/activate" ? (
            <M2settingView title="View Unactivated Account" />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Modal2;

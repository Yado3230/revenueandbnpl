import React from "react";
// import { useState } from "react";
import Maccounts from "./Maccounts";
import Mapi from "./Mapi";
// import Mbank from "./Mbank";
// import Msite from "./Msite";

function Modal({ handleClose, show, children, page }) {
  const showHideClassName = show ? "my-modal-4" : "";
  return (
    <>
      <input type="checkbox" id={showHideClassName} className="modal-toggle" />
      <div className="modal">
        <div className="relative w-11/12 max-w-3xl modal-box">
          <button
            type="button"
            onClick={handleClose}
            className="absolute btn btn-sm btn-circle right-2 top-2"
            // onClick={() => handleIsOpen}
          >
            ✕
          </button>

          {/* {props.page === "a" ? <Msite title="Add Site" /> : ""} */}
          {page === "a" && (
            <Maccounts title="Add Account" handleClose={handleClose} />
          )}
          {page === "b" && <Mapi title="Generate API" />}
          {/* {window.location.pathname === "/admin/sites" ? (
            <Msite title="Add Site" />
          ) : window.location.pathname === "/admin/banks" ? (
            <Mbank title="Add Bank" />
          ) : window.location.pathname === "/users/uapi" ? (
            <Mapi title="Generate API" />
          ) : window.location.pathname === "/users/accounts" ? (
            <Maccounts title="Add Account" />
          ) : (
            ""
          )} */}
        </div>
      </div>
    </>
  );
}

export default Modal;

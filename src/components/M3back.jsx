import React from "react";

function M3back() {
  return (
    <>
      {/* this is the button */}
      
      {/* <label htmlFor="my-modal-4" className="btn">
        open modal
      </label> */}

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="cursor-pointer modal">
        <label className="relative modal-box" htmlFor="">
          <h3 className="text-lg font-bold">
            Congratulations You have registered Successfuly!
          </h3>
        </label>
      </label>
    </>
  );
}

export default M3back;

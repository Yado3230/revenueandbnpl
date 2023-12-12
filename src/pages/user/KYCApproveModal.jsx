import React from "react";
import UserService from "../../services/user.service";
import Swal from "sweetalert2";
function SalesKycApprove({ sales, dispatch, userID, setUpdated, updated }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-center">
          <img src={sales.valid_identification} alt="valid_identification" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* <span>{loanToApprove?.itemType}</span> */}
          <div className="flex flex-col items-start">
            <div className="flex">
              <svg
                class="h-6 w-6 text-teal-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span>Sales ID</span>
            </div>
            <div className="flex">
              <svg
                class="h-6 w-6 text-teal-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span>First Name</span>
            </div>
            <div className="flex">
              <svg
                class="h-6 w-6 text-teal-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span>Last Name</span>
            </div>
            <div className="flex">
              <svg
                class="h-6 w-6 text-teal-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span>TIN Number</span>
            </div>
            <div className="flex">
              <svg
                class="h-6 w-6 text-teal-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span>Requested At</span>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span>: {sales.sales_id}</span>
            <span>: {sales.first_name}</span>
            <span>: {sales.last_name}</span>
            <span>: {sales.tin_number}</span>
            <span>
              : {new Date(sales.createdAt)?.toISOString().split("T")[0]}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <button
          type="submit"
          className="bg-orange-500 mr-3 h-8 w-28 text-white rounded"
          onClick={() =>
            dispatch(
              UserService.rejectSales(sales.kyc_id, userID, setUpdated, updated)
                .then(
                  (response) =>
                    response &&
                    Swal.fire({
                      icon: "error",
                      title: "Rejected",
                      showConfirmButton: false,
                      timer: 3000,
                    })
                )
                .catch(
                  (error) =>
                    error &&
                    Swal.fire({
                      icon: "error",
                      title: `Something went wrong`,
                      showConfirmButton: false,
                      timer: 3000,
                    })
                )
            )
          }
        >
          REJECT
        </button>
        <button
          type="submit"
          onClick={() =>
            dispatch(
              UserService.approveSales(
                sales.kyc_id,
                userID,
                setUpdated,
                updated
              )
                .then(
                  (response) =>
                    response &&
                    Swal.fire({
                      icon: "success",
                      title: "Approved Successfully",
                      showConfirmButton: false,
                      timer: 3000,
                    })
                )
                .catch(
                  (error) =>
                    error &&
                    Swal.fire({
                      icon: "error",
                      title: `Something went wrong`,
                      showConfirmButton: false,
                      timer: 3000,
                    })
                )
            )
          }
          className="bg-cyan-500 h-8 w-28 text-white rounded"
        >
          APPROVE
        </button>
      </div>
    </div>
  );
}

export default SalesKycApprove;

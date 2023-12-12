import React, { useState } from "react";
import UserService from "../../services/user.service";
import Selectinput from "../../components/Selectinput";
import Swal from "sweetalert2";
// import { useDispatch } from "react-redux";
// import LoanService from "../../services/loan.service";

function MerchantKycApprove({ merchant, dispatch, userID }) {
  const [service, setService] = useState({
    service_id: "",
  });

  const service_option = [
    {
      value: "1",
      label: "BNPL",
    },
    {
      value: "2",
      label: "Payment Processor",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({
      ...service,
      service_id: value,
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
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
              <span>Merchant ID</span>
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
              <span>Business Name</span>
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
              <span>Business Type</span>
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
              <span>Website Url</span>
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
              <span>Business Address</span>
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
              <span>Compliance Aml</span>
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
              <span>Merchant Status</span>
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
            <span>: {merchant?.merchant_id}</span>
            <span>: {merchant?.first_name}</span>
            <span>: {merchant?.last_name}</span>
            <span>: {merchant?.tin_number}</span>
            <span>: {merchant?.business_name}</span>
            <span>: {merchant?.business_type}</span>
            <span>: {merchant?.website_url}</span>
            <span>: {merchant?.business_address}</span>
            <span>: {merchant?.compliance_aml}</span>
            <span>: {merchant?.merchant_status}</span>
            <span>: {merchant?.createdAt}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <img src={merchant?.business_licnense} alt="business_license" />
          <img src={merchant?.agreement_doc} alt="agreement_doc" />
          <img
            src={merchant?.valid_identification}
            alt="valid_identification"
          />
        </div>
        <div className="flex flex-col justify-end items-end">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            onChange={handleChange}
            required
            // onInput={props.selectName}
          >
            <option>Select</option>
            {service_option.map((arr) => (
              <option value={arr.value}>{arr.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <button
          type="submit"
          className="bg-orange-500 mr-3 h-8 w-28 text-white rounded"
          onClick={() =>
            dispatch(UserService.rejectMerchant(merchant?.merchant_id, userID))
          }
        >
          REJECT
        </button>
        <button
          type="submit"
          // onSubmit={onSubmit}
          onClick={() => {
            return dispatch(
              UserService.approveMerchant(
                merchant.merchant_id,
                "Accepted",
                service.service_id
              )
                .then(
                  (response) =>
                    response &&
                    Swal.fire({
                      icon: "success",
                      title: "Merchant Approved",
                      showConfirmButton: false,
                      timer: 1500,
                    })
                )
                .catch(
                  (error) =>
                    error?.response?.data?.message &&
                    Swal.fire({
                      icon: "error",
                      title: `${error?.response?.data?.message}`,
                      showConfirmButton: false,
                      timer: 1500,
                    })
                )
            );
          }}
          className="bg-cyan-500 h-8 w-28 text-white rounded"
        >
          APPROVE
        </button>
      </div>
    </div>
  );
}

export default MerchantKycApprove;

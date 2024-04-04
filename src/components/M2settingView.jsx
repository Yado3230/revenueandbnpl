import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

function M2settingView(props) {
  const m2SettingData = props.modal_data;
  if (m2SettingData) {
    // setdataId(m2SettingData.bussiness_id);
    // const onSubmit = () => {
    // UserService.approvePendingBussinessById(m2SettingData.bussiness_id).then(
    //   (resp) => {
    //   },
    //   (error) => {
    //   }
    // );
    // };

    return (
      <>
        <h3 className="font-sans text-lg">{props.title}</h3>
        <div className="">
          <section className="bg-white testdark:bg-gray-900">
            <div className="grid gap-4 pt-8 sm:grid-cols-4 sm:gap-6">
              <div className="sm:col-span-4">Business Information</div>
              <div className="sm:col-span-2">
                <b>Legal Name:</b> <br />
                {m2SettingData.legalName}
              </div>
              <div className="sm:col-span-2">
                <b>Type of Incorporation:</b> <br />
                {m2SettingData.incorporationType}
              </div>

              <div className="sm:col-span-2">
                <b>Industry:</b> <br />
                {m2SettingData.industry}
              </div>
              <div className="sm:col-span-2">
                <b>Category:</b> <br />
                {m2SettingData.category}
              </div>
              <div className="sm:col-span-2">
                <b>Staff size:</b> <br />
                {m2SettingData.staffSize}
              </div>
              <div className="sm:col-span-2">
                <b>Monthly Transaction Amount:</b> <br />
                {m2SettingData.monthlyTransacionAmount}
              </div>
              <div className="sm:col-span-2">
                <b>Tin Number:</b> <br />
                {m2SettingData.tinNumber}
              </div>
              <div className="sm:col-span-2">
                <b>Business Registration Number:</b> <br />
                {m2SettingData.bussinessRegistrationNumber}
              </div>
              <div className="sm:col-span-3">
                <b>Website Address:</b> <br />
                {m2SettingData.websiteAddress}
              </div>

              <div className="sm:col-span-4">
                <b>Business Registration:</b> <br />
                <img className="" src="../card.png" alt="ID" />
              </div>
              <div className="sm:col-span-4">
                <b>Description Of Company:</b> <br />
                {m2SettingData.companyDescription}
              </div>
              <div className="divider sm:col-span-4">
                <h1>Comapany Address</h1>
              </div>
              <div className="sm:col-span-2">
                <b>Region:</b> <br />
                {m2SettingData.bussinessAddresses[0].region}
              </div>
              <div className="sm:col-span-2">
                <b>City:</b> <br />
                {m2SettingData.bussinessAddresses[0].city}
              </div>
              <div className="sm:col-span-2">
                <b>Kifle Ketema:</b> <br />
                {m2SettingData.bussinessAddresses[0].kifleKetema}
              </div>
              <div className="sm:col-span-2">
                <b>Woreda:</b> <br />
                {m2SettingData.bussinessAddresses[0].woreda}
              </div>
              <div className="sm:col-span-2">
                <b>Kebele:</b> <br />
                {m2SettingData.bussinessAddresses[0].kebele}
              </div>
              <div className="sm:col-span-2">
                <b>House Number:</b> <br />
                {m2SettingData.bussinessAddresses[0].housNumber}
              </div>
              <div className="sm:col-span-2">
                <b>Friendly Location:</b> <br />
                {m2SettingData.bussinessAddresses[0].friendlyLocation}
              </div>
              <div className="sm:col-span-4">
                <b>Proof of Address:</b> <br />
                <img
                  className=""
                  src={m2SettingData.tradeLicense}
                  width={300}
                  height={400}
                  alt="ID"
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={() => props.onSubmit(m2SettingData.bussiness_id)}
              className="inline-flex items-center px-5 py-3.5 mt-4 text-sm font-medium text-center text-white rounded-lg sm:mt-6 bg-primary focus:ring-4 focus:ring-primary testdark:focus:ring-primary hover:bg-primary"
            >
              Activate
            </button>
            <button
              onClick={props.onCancel}
              className="swal2-cancel swal2-styled"
            >
              Cancel
            </button>
          </section>
        </div>
      </>
    );
  }
}

export default M2settingView;

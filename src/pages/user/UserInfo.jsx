import React from "react";
import Fileinput from "../../components/Fileinput";
import Input from "../../components/Input";
import Selectinput from "../../components/Selectinput";

const idtype = [
  { label: "Kebele ID", value: "kebeleid" },
  { label: "Passport", value: "kebeleid" },
  { label: "Driver Licence", value: "Driverlicence" },
];
const gender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];
const region = [
  { label: "Afar", value: "af" },
  { label: "Amhara", value: "am" },
  { label: "Benishangul", value: "bg" },
  { label: "Fedral", value: "fd" },
  { label: "Gambela", value: "gm" },
  { label: "Harar", value: "hr" },
  { label: "Oromia", value: "or" },
  { label: "Sidama", value: "sd" },
  { label: "Somalia", value: "sm" },
  { label: "SNNPR", value: "sn" },
  { label: "Tigray", value: "tg" },
];
// const date = [
//   { label: "01", value: "1" },
//   { label: "02", value: "2" },
// ];
// const month = [
//   { label: "01", value: "1" },
//   { label: "02", value: "2" },
// ];
// const year = [
//   { label: "2022", value: "2022" },
//   { label: "2023", value: "2023" },
// ];
function UserInfo() {
  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-gray-900 sm:col-span-2 testdark:text-white">
        Pesonal In Formation
      </h2>
      <div className="w-full">
        <Input
          label="fname"
          title="First Name"
          type="text"
          name="fname"
          id="fname"
          place="Lelisa"
          required=""
        />
      </div>
      <div className="w-full">
        <Input
          label="mname"
          title="Middle Name"
          type="text"
          name="mname"
          id="mname"
          place="Abdusemed"
          required=""
        />
      </div>
      <div className="w-full">
        <Input
          label="lname"
          title="Last Name"
          type="text"
          name="lname"
          id="lname"
          place="Chera"
          required=""
        />
      </div>
      <div>
        <Selectinput arr={gender} id="gender" title="Gender" />
      </div>
      <div className="sm:col-span-2">
        <Input
          label="paddress"
          title="Address"
          type="text"
          name="paddress"
          id="paddress"
          place="Some where ..."
          required=""
        />
      </div>
      <div>
        <Selectinput arr={region} id="region" title="Region" />
      </div>
      <div className="w-full">
        <label
          htmlFor="brand"
          className="block mb-2 text-sm font-medium text-gray-900 testdark:text-white"
        >
          Birth Date
        </label>
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          <select
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
          >
            <option value="TV">Date</option>
            <option value="TV">01</option>
          </select>
          <select
            id="month"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
          >
            <option value="TV">Month</option>
            <option value="TV">01</option>
          </select>
          <select
            id="year"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-primary testdark:focus:border-primary"
          >
            <option value="TV">Year</option>
            <option value="TV">2023</option>
          </select>
        </div>
      </div>
      <div className="w-full">
        <Input
          label="id"
          title="Identification Card Number"
          type="text"
          name="id"
          id="id"
          place="TG873/12"
          required=""
        />
      </div>
      <div>
        <Selectinput arr={idtype} id="kidt" title="Identification Card Type" />
      </div>
      <div className="sm:col-span-2">
        <Fileinput lable="licence" title="Identification Card" />
      </div>
    </>
  );
}

export default UserInfo;

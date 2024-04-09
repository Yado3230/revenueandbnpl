import React from "react";
import Input from "./Input";
import Selectinput from "./Selectinput";

const dropdown = [
  { label: "CBE-1000003656654", value: "1" },
  { label: "CBO-1022225648986", value: "2" },
];

function Mapi(props) {
  return (
    <>
      <div className="">
        <section className="bg-white testdark:bg-gray-900">
          <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 testdark:text-white">
              {props.title}
            </h2>
            <htmlForm action="#">
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <div className="w-full">
                  <Input
                    label="name"
                    title="Name"
                    type="text"
                    name="name"
                    id="name"
                    place="General api"
                    required=""
                  />
                </div>
                <div>
                  <Selectinput
                    arr={dropdown}
                    id="account"
                    title="Choose Account"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center testdark:bg-primary testdark:hover:bg-primary testdark:focus:ring-primary"
                >
                  Generate
                </button>
              </div>
            </htmlForm>
          </div>
        </section>
      </div>
    </>
  );
}

export default Mapi;

import React from "react";
import { useSearchParams } from "react-router-dom";
import BankAccountServices from "../../services/bank-account.services";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
function ActivatePrimaryAccount() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const acId = searchParams.get("acId");
  const ActivatePrimaryAccount = () => {
    BankAccountServices.activateAccount(id, acId)
      .then((res) => {
      })
      .catch((error) => {
        MySwal.fire({
          text: "Your Account is Already Activated",
          icon: "error",
          value: true,
          visible: true,
          className: "",
          closeModal: true,
        });
      });
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Activate your Primary Account?
            </h1>
            <p className="font-light text-gray-500 dark:text-gray-400">
              Don't fret! Just Click the Button to Activate your Primary
              Account!
            </p>
            <br />
            <button
              type="submit"
              onClick={ActivatePrimaryAccount}
              className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
            >
              Activate
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ActivatePrimaryAccount;

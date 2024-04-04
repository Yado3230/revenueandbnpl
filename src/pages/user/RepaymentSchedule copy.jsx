import React from "react";
import PaymentModal from "./PaymentModal";

const Payment = () => {
  const [amount, setAmount] = useState();

  const formatInputValue = (value) => {
    return value?.replace(/\D/g, "")?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Event handler for input change
  const handleInputChange = (e) => {
    const formattedValue = formatInputValue(e.target.value);
    setAmount(formattedValue?.replace(/,/g, ""));
  };
  return (
    <div>
      <form className="w-full md:w-auto flex items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex w-full space-x-0 md:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              id="fiat-currency-input"
              className="block p-2.5 w-full rounded-l z-20 text-sm text-gray-900 bg-gray-50 outline-none rounded-s-lg border-e-gray-50 border-e-2 border border-cyan-300 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:border-e-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder={`Enter amount in ${defaultCurrency}`}
              required
              value={formatInputValue(amount)}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex-shrink-0">
            <div className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-900 bg-gray-100 border border-cyan-300 rounded-r cursor-not-allowed">
              <span>{defaultCurrency}</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          disabled={!amount}
          onClick={() =>
            MySwal.fire({
              html: (
                <PaymentModal
                  amount={amount}
                  kyc={kyc}
                  setAmount={setAmount}
                  formatInputValue={formatInputValue}
                  handleInputChange={handleInputChange}
                />
              ),
              showCloseButton: true,
              showCancelButton: false,
              showConfirmButton: false,
            })
          }
          className="text-white bg-cyan-500 from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default Payment;

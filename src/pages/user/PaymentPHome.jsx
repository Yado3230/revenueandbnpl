import React, { useEffect, useState } from "react";
// import Card from "./Card";
import Banner from "./Banner";
// import AuthService from "../../services/auth.service";
// import DataTable from "react-data-table-component";
// import AgentStat from "./AgentStat";
import LineCahrts from "./LineCharts";
import Pies from "./PieCharts";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  getAllPaypalTransactionById,
  getChappaTransactionById,
  // getBankAndStripePaymentById,
  getCoopassPaymentById,
  getEbirrTransactionById,
  getStripePaymentById,
} from "../../store/actions/adminFetchAllTransactions";
import Stats from "./Stats";

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row) => row.year,
    sortable: true,
  },
];

function PaymentPHome() {
  const tokenInfo = useSelector((state) => state.userProfile);
  const [activeChartTab, setActiveChartTab] = useState("1Yr");
  const { token } = tokenInfo;
  const user_token = jwtDecode(token);
  const user_id = user_token?.user_id;
  const secrate_key = user_token?.secrate_key;
  const user_role = user_token?.role;
  const dispatch = useDispatch();
  useEffect(() => {
    user_id && dispatch(getAllPaypalTransactionById(user_id));
    user_id && dispatch(getCoopassPaymentById(user_id));
    user_id && dispatch(getStripePaymentById(user_id));
    user_id && dispatch(getEbirrTransactionById(user_id));
    user_id && dispatch(getChappaTransactionById(user_id));
  }, []);
  const transactionData = useSelector((state) => state.transactionDetailAll);
  const {
    paypalTransactions,
    coopassTransaction,
    stripeTransaction,
    ebirrTransactions,
    chappaTransactions,
  } = transactionData;
  return (
    <>
      {secrate_key === null && user_role === "user" ? <Banner /> : ""}

      <div className="">
        <Stats
          paypalTransactions={paypalTransactions}
          stripeTransaction={stripeTransaction}
          coopassTransaction={coopassTransaction}
          ebirrTransactions={ebirrTransactions}
          chappaTransactions={chappaTransactions}
        />
        <div className="lg:grid lg:grid-cols-3 lg:gap-4">
          <div className="lg:col-span-2 bg-white px-5 rounded shadow">
            <div className="flex items-center justify-start ">
              <span className="text-cyan-500 text-lg py-1">
                Transactions within last 6 months
              </span>
            </div>
            <div>
              <LineCahrts
                paypalTransactions={paypalTransactions}
                stripeTransaction={stripeTransaction}
                coopassTransaction={coopassTransaction}
                ebirrTransactions={ebirrTransactions}
                chappaTransactions={chappaTransactions}
                activeChartTab={activeChartTab}
              />
            </div>
          </div>
          <div className="flex items-center justify-center border rounded shadow">
            <Pies
              paypal={paypalTransactions?.length}
              coopass={coopassTransaction?.length}
              stripe={stripeTransaction?.length}
              ebirr={ebirrTransactions?.length}
              chappa={chappaTransactions?.length}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPHome;

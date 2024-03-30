import React from "react";
import { Route, Routes } from "react-router-dom";
import E404 from "./pages/error/E404";
import Nav from "./pages/user/Nav";
import Accounts from "./pages/user/Accounts";
import Transactions from "./pages/user/Transactions";
import Sidebar from "./pages/user/Sidebar";
import Profile from "./pages/user/Profile";
// import MultiStepForm from "./pages/user/MultiStepForm";
import Sales from "./pages/user/Sales";
import Inventory from "./pages/user/Inventory";
import Loan from "./pages/user/Loan";
import Configuration from "./pages/user/Configuration";
import Settings from "./pages/user/Settings";
import DomainList from "./pages/user/DomainList";
import Devices from "./pages/user/Devices";
import Uapi from "./pages/user/Uapi";
import PaymentPHome from "./pages/user/PaymentPHome";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import BNPLHome from "./pages/user/BNPLHome";
import TransactionList from "./pages/user/PPTransactions";
import Home from "./pages/user/Home";
import Expense from "./pages/user/Expense";
import RBFHome from "./pages/user/RBFHome";
import Product from "./pages/user/Product";
import Reports from "./pages/user/ReportsAnalysis";
import InventoryReport from "./pages/user/Reports";
import LoanRequestForm from "./pages/user/LoanRequestForm";
import MerchantLoanList from "./pages/user/MerchantLoanList";
import RepaymentSchedule from "./pages/user/RepaymentSchedule";
function Users() {
  const tokenInfo = useSelector((state) => state.userProfile);
  const { token, kyc } = tokenInfo;
  const user_token = jwtDecode(token);
  const service_name = user_token?.service_name;

  return (
    <>
      {/* <Modal /> */}
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-slate-100 dark:bg-gray-700">
          {/* <!-- Page content here --> */}
          <Nav />
          <div className="m-4">
            <Routes>
              {!service_name && <Route index element={<Home />}></Route>}
              {service_name?.includes("BNPL") ? (
                kyc?.rbf === true ? (
                  <Route index element={<RBFHome />}></Route>
                ) : (
                  <Route index element={<BNPLHome />}></Route>
                )
              ) : (
                service_name?.includes("Payment Processor") && (
                  <Route index element={<PaymentPHome />}></Route>
                )
              )}
              {service_name?.includes("BNPL") ? (
                <Route path="transactions" element={<Transactions />}></Route>
              ) : (
                service_name?.includes("Payment Processor") && (
                  <Route
                    path="transactions"
                    element={<TransactionList />}
                  ></Route>
                )
              )}
              <Route path="transactions" element={<Transactions />}></Route>
              <Route path="accounts" element={<Accounts />}></Route>
              <Route path="sales" element={<Sales />}></Route>
              <Route path="expense" element={<Expense />}></Route>
              <Route path="inventory" element={<Inventory />}></Route>
              <Route path="products" element={<Product />}></Route>
              <Route path="loan" element={<Loan />}></Route>
              <Route path="configuration" element={<Configuration />}></Route>
              <Route path="domains" element={<DomainList />}></Route>
              <Route path="uapi" element={<Uapi />}></Route>
              <Route path="devices" element={<Devices />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="setting" element={<Settings />}></Route>
              <Route path="loanrequest" element={<LoanRequestForm />}></Route>
              <Route path="merchantloanlist" element={<MerchantLoanList />}></Route>
              <Route path="repaymentschedule" element={<RepaymentSchedule />}></Route>
              <Route path="reports" element={<InventoryReport />}></Route>
              <Route path="*" element={<E404 />}></Route>
            </Routes>
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default Users;

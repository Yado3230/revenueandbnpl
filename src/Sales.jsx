import React from "react";
import E404 from "./pages/error/E404";
import Home from "./pages/sales/Home";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sales/Sidebar";
import Nav from "./pages/sales/Nav";
import Inventory from "./pages/sales/Inventory";
import LoanList from "./pages/sales/LoanList";
import LoanRequest from "./pages/sales/LoanRequest";
import LoanRequestForm from "./pages/sales/LoanRequestForm";
import SaleItem from "./pages/sales/SaleItem";
import SaleProduct from "./pages/sales/SaleProduct";
import Products from "./pages/sales/Products";
import SaleBulkItem from "./pages/sales/SaleBulkItem";

function Sales() {
  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-slate-100 dark:bg-gray-700">
          <Nav />
          <div className="m-4">
            <Routes>
              <Route index element={<Home />}></Route>
              <Route path="/inventory" element={<Inventory />}></Route>
              <Route path="/request-form" element={<LoanRequestForm />}></Route>
              <Route path="/request" element={<LoanRequest />}></Route>
              <Route path="/itemlists" element={<Inventory />}></Route>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/item-request/:id" element={<SaleItem />}></Route>
              <Route
                path="/item-requests/:id"
                element={<SaleBulkItem />}
              ></Route>
              <Route path="/item-request" element={<SaleItem />}></Route>
              <Route
                path="/product-request/:id"
                element={<SaleProduct />}
              ></Route>
              <Route path="/product-request" element={<SaleProduct />}></Route>
              <Route path="/payments" element={<LoanList />}></Route>
              <Route path="*" element={<E404 />}></Route>
            </Routes>
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default Sales;

import React from "react";
import { Route, Routes } from "react-router-dom";
import First from "./pages/auth/First";
import Login from "./pages/auth/Login";
import Recovery from "./pages/auth/Recovery";
import Activation from "./pages/auth/Activation";
import Registration from "./pages/auth/Registration";
import Resetpassword from "./pages/auth/Resetpassword";
import EpassRegistration from "./components/EpassRegistration";
import ActivatePrimaryAccount from "./pages/user/ActivatePrimaryAccount";
// import CheckOutPage from "./pages/auth/multi-step/CheckoutPage/CheckOutPage";
import E404 from "./pages/error/E404";
import TermsAndConditions from "./pages/auth/TermsAndConditions";

function Auth() {
  return (
    <>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="registration" element={<Registration />}></Route>
        <Route path="epass" element={<EpassRegistration />}></Route>
        <Route path="first" element={<First />}></Route>
        <Route path="resetpassword" element={<Resetpassword />}></Route>
        <Route path="recover" element={<Recovery />}></Route>
        <Route path="activate" element={<Activation />}></Route>
        <Route path="termsandconditions" element={<TermsAndConditions />}></Route>
        <Route
          path="activateAccount/"
          element={<ActivatePrimaryAccount />}
        ></Route>
        <Route path="*" element={<E404 />}></Route>
      </Routes>
    </>
  );
}

export default Auth;

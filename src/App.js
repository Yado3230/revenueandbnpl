import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Index";
import Auth from "./Auth";
import Error from "./Error";
import Users from "./Users";
import Sandbox from "./Sandbox";
import OTP from "./pages/auth/OTP";
// import PrivateRoiutes from "./pages/auth/PrivateRoutes";
import AuthService from "./services/auth.service";
import Sales from "./Sales";
import Gateway from "./components/Gateway";
import RequireAuth from "./pages/auth/RequireAuth";
import DataTable from "./components/DataTable";
import Reports from "./pages/user/ReportsAnalysis";
import Activated from "./pages/auth/Activated";
// import RequireAuth from "./pages/auth/RequireAuth";

function App() {
  const user = AuthService.getCurrentUser();
  const [refresh, setRefresh] = useState(false);
  const onIdle = () => {
    localStorage.clear();
    setRefresh(true);
  };
  if (refresh && user) {
    window.location.reload(true);
    setRefresh(false);
  }

  const idleTimer = useIdleTimer({
    onIdle,
    timeout: 1000 * 60 * 30,
  });

  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />}></Route>{" "}
        <Route path="/gateway/*" element={<Gateway />}></Route>
        <Route path="/auth/*" element={<Auth />}></Route>
        <Route path="/otp" element={<OTP />}></Route>
        <Route path="/try" element={<Reports />}></Route>
        <Route path="/activate/:token" element={<Activated />}></Route>
        <Route path="/sandbox/*" element={<Sandbox />}></Route>
        <Route path="/table/*" element={<DataTable />}></Route>
        <Route element={<RequireAuth allowedRoles={"merchant"} />}>
          <Route path="/users/*" element={<Users />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={"sales"} />}>
          <Route path="/sales/*" element={<Sales />}></Route>
        </Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  );
}

export default App;

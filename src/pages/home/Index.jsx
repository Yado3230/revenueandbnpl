import PropTypes from "prop-types";
import Landing from "./landing/Index";
import Documentation from "./doc/Index";
import Nav from "../../layout/home/Nav";
import Error from "../error/E404";
import Footer from "../../layout/home/Footer";
import { Route, Routes } from "react-router-dom";

function DefaultLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

function ErrorLayout({ children }) {
  return <>{children}</>;
}
function Index() {
  return (
    <Routes>
      <Route
        index
        element={
          <DefaultLayout>
            <Landing />
          </DefaultLayout>
        }
      />
      <Route
        path="documentation"
        element={
          <DefaultLayout>
            <Documentation />
          </DefaultLayout>
        }
      />
      <Route
        path="*"
        element={
          <ErrorLayout>
            <Error />
          </ErrorLayout>
        }
      />
    </Routes>
  );
}
ErrorLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Index;

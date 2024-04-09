import PropTypes from "prop-types";
import Landing from "./landing/Index";
import Documentation from "./doc/Index";
import Nav from "../../layout/home/Nav";
import Error from "../error/E404";
import Footer from "../../layout/home/Footer";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./doc/components/Sidebar";
import Aboutus from "./doc/Aboutus";
import Rbf from "./doc/Rbf";
import Bnpl from "./doc/Bnpl";
import Paymentintegration from "./doc/Paymentintegration";
import Getstarted from "./doc/Getstarted";

function DefaultLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

function DocLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      <Nav />
      <div className="mt-20 md:mt-20 md:flex md:px-24">
        <div className="md:hidden">
          <Sidebar />
        </div>
        <div className="md:flex-1 md:ml-[160px] md:relative">
          <div className="hidden md:block md:absolute md:top-0 md:left-0">
            <Sidebar />
          </div>
          <div className="flex items-center">{children}</div>
        </div>
        <div className="hidden md:block md:flex-shrink-0 md:ml-0 md:mr-6">
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
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
          <DocLayout>
            <Documentation />
          </DocLayout>
        }
      />
      <Route
        path="documentation/getstarted"
        element={
          <DocLayout>
            <Getstarted />
          </DocLayout>
        }
      />
      <Route
        path="documentation/paymentintegration"
        element={
          <DocLayout>
            <Paymentintegration />
          </DocLayout>
        }
      />
      <Route
        path="documentation/bnpl"
        element={
          <DocLayout>
            <Bnpl />
          </DocLayout>
        }
      />
      <Route
        path="documentation/rbf"
        element={
          <DocLayout>
            <Rbf />
          </DocLayout>
        }
      />
      <Route
        path="documentation/aboutus"
        element={
          <DocLayout>
            <Aboutus />
          </DocLayout>
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

import React from "react";
const thisyear = new Date().getFullYear();
function Footer() {
  return (
    <>
      <div className="divider"></div>
      <footer className="p-4 footer footer-center text-base-content dark:text-white">
        <div>
          <p>Copyright © {thisyear} - All right reserved by CoopBank</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;

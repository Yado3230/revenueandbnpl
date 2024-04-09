import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../MultiStepForm";
import Swal from "sweetalert2";
import UserService from "../../../services/user.service";
import { useSelector } from "react-redux";
function Success() {
  const { formData } = useContext(FormContext);
  const userData = useSelector((state) => state.userProfile);
  const { userDetail } = userData;
  let navigate = useNavigate();
  const sendDataToBackend = () => {
    let fd = new FormData();
    fd.append("lgname", formData.lgname);
    fd.append("incorporation", formData.incorporation);
    fd.append("industry", formData.industry);
    fd.append("category", formData.category);
    fd.append("regstaffsizeion", formData.regstaffsizeion);
    fd.append("transaction", formData.transaction);
    fd.append("tinno", formData.tinno);
    fd.append("bno", formData.bno);
    fd.append("waddress", formData.waddress);
    fd.append("tradeLicenseImage", formData.addressProof);
    fd.append("description", formData.description);
    fd.append("region", formData.region);
    fd.append("user", userDetail.email_address);
    fd.append("bcity", formData.bcity);
    fd.append("bkifleketema", formData.bkifleketema);
    fd.append("bworeda", formData.bworeda);
    fd.append("bkebele", formData.bkebele);
    fd.append("hno", formData.hno);
    fd.append("location", formData.location);
    fd.append("proofOfAddress", formData.file);
    UserService.BussinessInfoRequest(fd).then(
      (resp) => {
        if (resp[1] === "200") {
          Swal.fire({
            icon: "success",
            title: "Your Request Has been sent ",
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/users");
        }
      },
      (error) => {
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };
  return (
    <div className="font-medium">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* <div className="sm:col-span-2">Business Information</div> */}
        <div className="sm:col-span-2">
          <b>Legal Name:</b> <br />
          {formData.lgname}
        </div>
        <div className="sm:col-span-2">
          <b>Type of Incorporation:</b> <br />
          {formData.incorporation}
        </div>

        <div className="sm:col-span-2">
          <b>Industry:</b> <br />
          {formData.industry}
        </div>
        <div className="sm:col-span-2">
          <b>Category:</b> <br />
          {formData.category}
        </div>
        <div className="sm:col-span-2">
          <b>Staff size:</b> <br />
          {formData.regstaffsizeion}
        </div>
        <div className="sm:col-span-2">
          <b>Monthly Transaction Amount:</b> <br />
          {formData.transaction}
        </div>
        <div className="sm:col-span-2">
          <b>Tin Number:</b> <br />
          {formData.tinno}
        </div>
        <div className="sm:col-span-2">
          <b>Business Registration Number:</b> <br />
          {formData.bno}
        </div>
        <div className="sm:col-span-3">
          <b>Website Address:</b> <br />
          {formData.waddress}
        </div>

        <div className="sm:col-span-4">
          <b>Business Registration:</b> <br />
          <img className="" src="../card.png" alt="ID" />
        </div>
        <div className="sm:col-span-4">
          <b>Description Of Company:</b> <br />
          {formData.description}
        </div>
        <div className="divider sm:col-span-4">
          <h1>Comapany Address</h1>
        </div>
        <div className="sm:col-span-2">
          <b>Region:</b> <br />
          {formData.region}
        </div>
        <div className="sm:col-span-2">
          <b>City:</b> <br />
          {formData.bcity}
        </div>
        <div className="sm:col-span-2">
          <b>Kifle Ketema:</b> <br />
          {formData.bkifleketema}{" "}
        </div>
        <div className="sm:col-span-2">
          <b>Woreda:</b> <br />
          {formData.bworeda}{" "}
        </div>
        <div className="sm:col-span-2">
          <b>Kebele:</b> <br />
          {formData.bkebele}{" "}
        </div>
        <div className="sm:col-span-2">
          <b>House Number:</b> <br />
          {formData.hno}{" "}
        </div>
        <div className="sm:col-span-2">
          <b>Friendly Location:</b> <br />
          {formData.location}{" "}
        </div>
        <div className="sm:col-span-4">
          <b>Proof of Address:</b> <br />
          <img className="" src={formData.file} alt="ID" />
        </div>
        <button
          type="submit"
          onClick={sendDataToBackend}
          className="sm:col-span-4 text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center testdark:bg-primary testdark:hover:bg-primary testdark:focus:ring-primary"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Success;

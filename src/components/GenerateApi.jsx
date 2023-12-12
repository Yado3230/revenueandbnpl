import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector, useDispatch } from "react-redux";
import { ModalForm } from "./GenerateApiForm";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import BankAccountServices from "../services/bank-account.services";
import { generateApiKey } from "../store/actions/generateApiKeyAction";
import Otp from "./Otp";
import jwtDecode from "jwt-decode";

const MySwal = withReactContent(Swal);

function GenerateApiModal(props) {
  const tokenInfo = useSelector((state) => state.userProfile);
  const { token } = tokenInfo;
  const user_token = jwtDecode(token);
  const merchant_id = user_token?.merchant_id;

  const interpretResponse = (response) => {
    let actionResponse = JSON.stringify(response);
    if (response.response === "success" && response.responseCode == 200) {
      Swal.fire({
        icon: "success",
        title: "Your Key Is Generated",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (response.responseCode == 403 || response.respone === "error") {
      Swal.fire({
        icon: "error",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Bank Is Not Created",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  const showFormModal = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "GENERATE NEW API KEY",
        html: (
          <ModalForm
            values={values}
            onSubmit={(values) => {
              dispatch(
                generateApiKey({
                  merchant_id: merchant_id,
                  expiryDate: values.expiryDate,
                  interpretResponse,
                })
              );

              resolve(values);

              //   MySwal.close();
              //   Swal.close();
            }}
            onCancel={() => MySwal.close()}
          />
        ),
        onClose: () => reject(),
        onCancel: () => Swal.close(),
        showConfirmButton: false,
      });
    });
  };
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user.user);
      // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  const showModal = () => {
    showFormModal({
      accountNumber: props.accountNumber[0],
      expiryDate: "",
    })
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };
  return (
    <button
      type="button"
      className="mb-4 btn btn-outline btn-primary"
      onClick={showModal}
    >
      Generate New Api
    </button>
  );
}

export default GenerateApiModal;

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BankAccountServices from "../../services/bank-account.services";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccounts,
  setPrimaryAccount,
} from "../../store/actions/bank_accountAction";
import Selectinput from "../../components/Selectinput";
import ModalFire from "../../components/index";
import Otp from "../../components/Otp";
import withReactContent from "sweetalert2-react-content";
import DataTable from "react-data-table-component";
import jwtDecode from "jwt-decode";
import Spinner from "../../components/Spinner/Spinner";
import { useRef } from "react";
import OTP from "../auth/OTP";

const CustomLoader = () => (
  <div>
    <h1>Loading data...</h1>
    <Spinner />
  </div>
);

const customStyles = {
  headRow: {
    style: {
      border: "none",
    },
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "14px",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};

const columns = [
  {
    name: "Account Holder",
    selector: (row) => row?.merchant?.email_address,
    sortable: true,
  },
  {
    name: "Account Number",
    selector: (row) => row.account_number,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => row.phone_number,
    sortable: true,
  },
  {
    name: "Account Number",
    selector: (row) => row.account_number,
    sortable: true,
  },
  {
    name: "Account Level",
    selector: (row) => row.account_level,
    sortable: true,
  },

  // {
  //   name: "Status",
  //   selector: (row) => (row.status === "1" ? "activated" : "pending"),
  //   sortable: true,
  // },
];

// choose[0] = { label: "Set Primary", value: "1" };

const MySwal = withReactContent(Swal);
function Accounts() {
  const AccountListData = useSelector((state) => state.accountsList);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { loading, error, bankAccounts } = AccountListData;
  const dispatch = useDispatch();

  const otp2 = useRef("");
  const tokenInfo = useSelector((state) => state.userProfile);
  const { token } = tokenInfo;
  const user_token = jwtDecode(token);
  const merchant_id = user_token?.merchant_id;
  const userData = useSelector((state) => state.userProfile);
  const { phone_number } = userData?.userDetail;

  useEffect(() => {
    dispatch(getAccounts(merchant_id));
  }, [dispatch]);

  const interpretResponse = (response) => {
    let actionResponse = JSON.stringify(response);
    if (response.response === "success" || response.responseCode == 200) {
      Swal.fire({
        icon: "success",
        title: "Account Updated",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (response.responseCode === 403 && response.respone === "error") {
      Swal.fire({
        icon: "error",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Account Is Not Updated",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const handleOtpSubmit = (e) => {
    BankAccountServices.confirmOtp(
      e.target.options[e.target.selectedIndex].getAttribute(
        "data-phone-number"
      ),
      otp2.current
    ).then((res) => {
      dispatch(
        setPrimaryAccount({
          merchant_id,
          value: e.target.value,
          interpretResponse,
        })
      );
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Are you sure?",
        text: `You want to set ${e.target.value}Your Primary Account?`,
        icon: "warning",
        // dangerMode: true,
        showCancelButton: true,
        confirmButtonColor: "#01ADED",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed === true) {
          BankAccountServices.sendOtp(
            e.target.options[e.target.selectedIndex].getAttribute(
              "data-phone-number"
            )
          );
          const value = {
            first: "",
            second: "",
            third: "",
            fourth: "",
            fifth: "",
            sixth: "",
          };

          MySwal.fire({
            title: "",
            html: (
              <OTP
                values={value}
                dispatch={dispatch}
                otp2={otp2}
                onSubmit={(values) => {
                  values.preventDefault();
                  handleOtpSubmit(e);
                }}
                onCancel={() => MySwal.close()}
              ></OTP>
            ),

            // onClose: () => reject(),
            showConfirmButton: false,
          });
          <Otp></Otp>;
        }
      });
    });
  };

  const choose = bankAccounts?.map((element) => ({
    label: element.account_number,
    value: element.bank_account_id,
    phone: element.phone_number,
  }));

  return (
    <>
      <div className="grid gap-4 md:grid-cols-12 justify-self-auto">
        <div className="col-span-12">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-12">
            <div className="col-span-9 mt-6">
              <ModalFire></ModalFire>
            </div>
            <div className="col-span-3">
              <Selectinput
                arr={choose}
                id="choose"
                name="choose"
                handleChange={handleChange}
                title="Choose Primary"
              />
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <DataTable
              title="Account List"
              columns={columns}
              data={bankAccounts}
              className="my-custom-table"
              pagination
              // selectableRows
              progressPending={loading}
              progressComponent={<CustomLoader />}
              customStyles={customStyles}
              highlightOnHover
              pointerOnHover
              dense
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Accounts;

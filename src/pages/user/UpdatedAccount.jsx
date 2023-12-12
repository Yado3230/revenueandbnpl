import React, { useEffect } from "react";
import Swal from "sweetalert2";
import BankAccountServices from "../../services/bank-account.services";
// import AuthService from "../../services/auth.service";
// import Modal from "../../components/Modal";
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

const columns = [
  {
    name: "Account Holder",
    selector: (row) => row.accountHolderName,
    sortable: true,
  },
  {
    name: "Account Number",
    selector: (row) => row.accountNumber,
    sortable: true,
  },
  {
    name: "Bank Name",
    selector: (row) => row.bankName,
    sortable: true,
  },
  {
    name: "Primary",
    selector: (row) => (row.primaryAccount === 1 ? "primary" : "secondary"),
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => (row.status === 1 ? "activated" : "pending"),
    sortable: true,
  },
];

const choose = [];
choose[0] = { label: "Set Primary", value: "1" };
const MySwal = withReactContent(Swal);
function Accounts() {
  const AccountListData = useSelector((state) => state.accountsList);
  const { loading, error, bankAccounts } = AccountListData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);


  const interpretResponse = (response) => {
    let actionResponse = JSON.stringify(response);
    if (response.response === "success" || response.responseCode === 200) {
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

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value != "1") {
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
            BankAccountServices.sendOtp("+251927355418");
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
                <Otp
                  values={value}
                  onSubmit={(values) => {
                    const otp =
                      values.first +
                      values.second +
                      values.third +
                      values.fourth +
                      values.fifth +
                      values.sixth;
                    BankAccountServices.confirmOtp("+251927355418", otp).then(
                      (res) => {
                        dispatch(
                          setPrimaryAccount({
                            value: e.target.value,
                            interpretResponse,
                          })
                        );
                      }
                    );
                  }}
                  onCancel={() => MySwal.close()}
                ></Otp>
              ),

              // onClose: () => reject(),
              showConfirmButton: false,
            });
            <Otp></Otp>;
          }
        });
      });
    }
  };

  if (bankAccounts) {
    for (let index = 0; index < bankAccounts.length; index++) {
      const element = bankAccounts[index];
      if (choose.length < bankAccounts.length) {
        choose.push({
          label: element.bankName + "-" + element.accountNumber,
          value: element.bankaccount_id,
        });
      }
    }
    const renderList = bankAccounts.map((item, index) => (
      <tr>
        <th>{item.bankaccount_id}</th>
        <td>{item.accountHolderName}</td>
        <td>{item.accountNumber}</td>
        <td>{item.bankName}</td>
        <td>{item.primaryAccount === "1" ? "primary" : "secondary"}</td>
        <td>{item.status === "0" ? "pending" : "activated"}</td>
      </tr>
    ));
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
                pagination
                // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                // subHeaderComponent={subHeaderComponentMemo}
                // selectableRows
                persistTableHeadstriped
                highlightOnHover
                // actions={actionsMemo}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Accounts;

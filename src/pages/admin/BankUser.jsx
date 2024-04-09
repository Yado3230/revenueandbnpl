import React, { useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AgentComponent from "../../components/AgentComponent";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../../services/user.service";
import { getRolesDetail } from "../../store/actions/roleAction";
import { getUsersDetail } from "../../store/actions/userProfileAction";
const MySwal = withReactContent(Swal);

const data = [
  {
    no: 1,
    fname: "Beetle",
    lname: "Juice",
    email: "1988@souqpass.com",
    phone: "09887654",
    idcard: "t1988",
  },
  {
    no: 2,
    fname: "Ghost",
    lname: "Busters",
    email: "1984@souqpass.com",
    phone: "09849876",
    idcard: "1u984",
  },
];

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary focus:border-primary block p-2.5 testdark:bg-gray-700 testdark:border-gray-600 testdark:placeholder-gray-400 testdark:text-white testdark:focus:ring-blue-500 testdark:focus:border-blue-500"
    />

    <button
      type="button"
      onClick={onClear}
      className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium text-sm px-5 py-2.5 text-center testdark:bg-primary testdark:hover:bg-primary testdark:focus:ring-primary"
    >
      Clear
    </button>
  </>
);

function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

function downloadCSV(array) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

const Export = ({ onExport }) => (
  <button
    onClick={(e) => onExport(e.target.value)}
    className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium text-sm px-3.5 py-2.5 mr-2 text-center testdark:bg-primary testdark:hover:bg-primary testdark:focus:ring-primary"
  >
    Export
  </button>
);
function BankUser() {
  const [filterText, setFilterText] = React.useState("");
  const [dataUpdated, setDataUpdated] = React.useState(false);
  // const agentData = useSelector((state) => state.agentInfo);
  // const { loading, error, addedagent, agents } = agentData;
  const dispatch = useDispatch();

  const handleToggleEdit = async (row) => {
    UserService.blockUser(row.userId).then(() => setDataUpdated(!dataUpdated));
  };

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <input
          onChange={() => handleToggleEdit(row)}
          type="checkbox"
          className="toggle toggle-info"
          checked={
            row.userStatus === "ACTIVE"
              ? true
              : row.userStatus === "BLOCKED" && false
          }
        />
      ),
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <label
    //       htmlFor="my-modal-3"
    //       className="cursor-pointer"
    //       onClick={() => showModalAgent(row)}
    //     >
    //       <svg
    //         className="w-6 h-6 text-primary"
    //         viewBox="0 0 24 24"
    //         strokeWidth="2"
    //         stroke="currentColor"
    //         fill="none"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       >
    //         {" "}
    //         <path stroke="none" d="M0 0h24v24H0z" />{" "}
    //         <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
    //         <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
    //         <line x1="16" y1="5" x2="19" y2="8" />
    //       </svg>
    //     </label>
    //   ),
    // },
  ];

  useEffect(() => {
    // if (userID) {
    dispatch(getRolesDetail());
    dispatch(getUsersDetail());
    // }
  }, [dataUpdated, dispatch]);

  const roleData = useSelector((state) => state.rolesInfo);
  const { roles } = roleData;

  const userData = useSelector((state) => state.userProfile);
  const { users } = userData;

  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
    (item) =>
      item.fname && item.fname.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const showFormModalAgent = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Register User",
        html: (
          <AgentComponent
            values={values}
            roles={roles}
            onSubmit={(values) => {
              dispatch(
                UserService.CreateBankUser(
                  values.fullName,
                  values.email,
                  values.password,
                  values.roleName,
                  dataUpdated,
                  setDataUpdated
                  // interpretResponse
                )
                  .then(
                    (response) =>
                      response &&
                      Swal.fire({
                        icon: "success",
                        title: "User Created",
                        showConfirmButton: false,
                        timer: 1500,
                      })
                  )
                  .catch(
                    (error) =>
                      error?.response?.data?.message &&
                      Swal.fire({
                        icon: "error",
                        title: `${error?.response?.data?.message}`,
                        showConfirmButton: false,
                        timer: 1500,
                      })
                  )
              );
            }}
            onCancel={() => MySwal.close()}
          ></AgentComponent>
        ),
        onClose: () => reject(),
        onCancel: () => Swal.close(),
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonColor: "#01AFEF",
      });
    });
  };

  const showModalAgent = (row) => {
    showFormModalAgent({
      fullName: row ? row.fullName : "",
      email: row ? row.email : "",
      password: row ? row.password : "",
      roleName: row ? row.roleName : "",
    })
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  return (
    <>
      <button
        type="button"
        className="mb-4 btn btn-outline btn-primary"
        onClick={showModalAgent}
      >
        Add User
      </button>
      <DataTable
        title="User List"
        columns={columns}
        data={users}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        // selectableRows
        persistTableHeadstriped
        highlightOnHover
        actions={actionsMemo}
      />
    </>
  );
}

export default BankUser;

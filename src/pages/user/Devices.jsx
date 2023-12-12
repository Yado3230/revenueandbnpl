import React, { useMemo, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import RegisteredDeviceServices from "../../services/allowedDevices.services";
import AuthService from "../../services/auth.service";
import { getAllRegisterdDevices } from "../../store/actions/deviceManagementAction";
import jwtDecode from "jwt-decode";
const MySwal = withReactContent(Swal);
const columns = [
  {
    name: "Device Id",
    selector: (row) => row.deviceId,
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) => row.createdAt,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    title: "Mac123qaz",
    year: "2023",
  },
  {
    id: 2,
    title: "Mac123qaz",
    year: "2022",
  },
];

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search"
      type="text"
      placeholder="Filter By Title"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary focus:border-primary block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />

    <button
      type="button"
      onClick={onClear}
      className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
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
    className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium text-sm px-3.5 py-2.5 mr-2 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
  >
    Export
  </button>
);

function Devices() {
  const addedDevices = useSelector((state) => state.deviceDetail);
  const { loading, error, deviceDetail } = addedDevices;
  const dispatch = useDispatch();
  const tokenInfo = useSelector((state) => state.userProfile);
  const { token } = tokenInfo;
  const user_token = jwtDecode(token);
  const user_id = user_token?.user_id;

  useEffect(() => {
    if (user_id) {
      dispatch(getAllRegisterdDevices(user_id));
    }
  }, []);
  const [filterText, setFilterText] = React.useState("");
  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
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

  const showFormModal = (values) => {
    return new Promise((resolve, reject) => {
      MySwal.fire({
        title: "Register Your Domain",
        html: (
          <div className="p-8">
            <div>
              <label
                htmlFor="id"
                className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Device Id
              </label>
              <span className="text-sm link-error"></span>
              <input
                type="text"
                name="id"
                id="id"
                placeholder="COOP-00-000"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                //   value={props.values.text}
                //   onChange={props.handleChange}
              />
            </div>
          </div>
        ),
        onClose: () => reject(),
        onCancel: () => Swal.close(),
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: "#01AFEF",
      });
    });
  };
  const showModal = () => {
    showFormModal({})
      .then((values) => values)
      .catch(() => console.log("Modal closed"));
  };

  return (
    <div className="">
      <DataTable
        title="Devices List"
        columns={columns}
        data={deviceDetail}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        // selectableRows
        persistTableHeadstriped
        highlightOnHover
        actions={actionsMemo}
      />
    </div>
  );
}

export default Devices;

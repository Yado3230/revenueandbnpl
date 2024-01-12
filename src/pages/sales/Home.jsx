import React, { useEffect, useState } from "react";
import Stat from "./Stat";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryDetail } from "../../store/actions/getInventoryAction";
import { Link, useNavigate } from "react-router-dom";
import { getLoanRequestDetail } from "../../store/actions/getLoanConfigAction";
const columns = [
  {
    name: "Image",
    cell: (row) => {
      return (
        <div className="p-2">
          <img
            src={`${row.item_pic}`}
            style={{ width: "40px", height: "40px" }}
            alt=""
          />
        </div>
      );
    },
  },
  {
    name: "Name",
    selector: (row) => row.item_name,
    sortable: true,
  },
  {
    name: "On Stock",
    selector: (row) => row.onStock,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.itemStatus,
    sortable: true,
  },
  {
    name: "Price",
    selector: (row) => row.item_price,
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) => new Date(row.createdAt).toISOString().split("T")[0],
    sortable: true,
  },
];

// const data = [
//   {
//     national_id: "1002",
//     first_name: "Muhidin",
//     middle_name: "Jemal",
//     last_name: "Misbah",
//     customer_account: "100024822",
//     customer_phone_number: "0935252353",
//     item_id: 2,
//     loan_amount: 5000,
//     repayment_term: 3,
//     interest_rate: 5.0,
//     createdAt: "10/02/2023",
//   },
//   {
//     national_id: "1004",
//     first_name: "Abdi",
//     middle_name: "Jemal",
//     last_name: "Tiruneh",
//     customer_account: "1000251252",
//     customer_phone_number: "0912512352",
//     item_id: 1,
//     loan_amount: 5000,
//     repayment_term: 3,
//     interest_rate: 5.0,
//     createdAt: "10/02/2023",
//   },
//   {
//     national_id: "1005",
//     first_name: "Yared",
//     middle_name: "Jemal",
//     last_name: "Mesele",
//     customer_account: "1000254252",
//     customer_phone_number: "09852525225",
//     item_id: 6,
//     loan_amount: 5000,
//     repayment_term: 3,
//     interest_rate: 5.0,
//     createdAt: "10/02/2023",
//   },
// ];

function Home() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userProfile);
  const { userID } = userData;
  const navigate = useNavigate();

  useEffect(() => {
    if (userID) {
      dispatch(getLoanRequestDetail(userID));
      dispatch(getInventoryDetail(userID));
    }
  }, [userID, dispatch]);

  const invertoryData = useSelector((state) => state.inventoryInfo);
  const { inventoryDetail } = invertoryData;

  const filteredItem = inventoryDetail?.filter(
    (item) =>
      new Date(item.createdAt).toISOString().split("T")[0] ===
      new Date().toISOString().split("T")[0]
  );

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowClick = (rows) => {
    setSelectedRows(rows.selectedRows);
  };

  const handleNavigateButtonClick = () => {
    const selectedItemsIds = selectedRows.map((row) => row.item_id);
    navigate(`/sales/item-requests/${selectedItemsIds.join("-")}`);
  };

  return (
    <>
      <div className="">
        <Stat items={inventoryDetail} />
        <div className="grid gap-4 mt-4 md:grid-cols-12 justify-self-auto">
          <div className="col-span-12">
            <div className="">
              <div>
                {selectedRows.length ? (
                  <div className="float-right border px-3 py-1 rounded mb-2 bg-cyan-500 text-lg text-white">
                    <button onClick={handleNavigateButtonClick}>
                      Bulk Sell
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <DataTable
                  title="Item Lists"
                  columns={columns}
                  data={filteredItem}
                  pagination
                  onRowClicked={(row) =>
                    navigate(`/sales/item-request/${row.item_id}`)
                  }
                  onSelectedRowsChange={handleRowClick}
                  persistTableHeadstriped
                  highlightOnHover
                  dense
                  selectableRows
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

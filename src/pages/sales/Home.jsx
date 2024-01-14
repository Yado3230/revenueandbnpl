import React, { useEffect, useState } from "react";
import Stat from "./Stat";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryDetail } from "../../store/actions/getInventoryAction";
import { useNavigate } from "react-router-dom";
import { getLoanRequestDetail } from "../../store/actions/getLoanConfigAction";
import { getSalesReports } from "../../store/actions/getSalesAction";
const columns = [
  {
    name: "Image",
    cell: (row) => {
      return (
        <div className="p-2">
          <img
            crossorigin="anonymous"
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

function Home() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userProfile);
  const { userID } = userData;
  const navigate = useNavigate();

  useEffect(() => {
    if (userID) {
      dispatch(getSalesReports());
      dispatch(getInventoryDetail(userID));
    }
  }, [userID, dispatch]);

  const invertoryData = useSelector((state) => state.inventoryInfo);
  const { inventoryDetail } = invertoryData;
  const salesData = useSelector((state) => state.salesInfo);
  const { sales_reports } = salesData;

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
        <Stat sales_reports={sales_reports} items={inventoryDetail} />
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

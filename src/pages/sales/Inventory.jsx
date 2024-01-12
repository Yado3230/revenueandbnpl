import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { getInventoryDetail } from "../../store/actions/getInventoryAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Inventory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInventoryDetail());
  }, [dispatch]);

  const inventoryInfo = useSelector((state) => state.inventoryInfo);
  const { inventoryDetail } = inventoryInfo;
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

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowClick = (rows) => {
    setSelectedRows(rows.selectedRows);
  };

  const handleNavigateButtonClick = () => {
    const selectedItemsIds = selectedRows.map((row) => row.item_id);
    // Use the array of selected item_ids to navigate to the new page
    navigate(`/sales/item-requests/${selectedItemsIds.join("-")}`);
  };

  return (
    <div className="">
      <div>
        {selectedRows.length ? (
          <div className="float-right border px-3 py-1 rounded mb-2 bg-cyan-500 text-lg text-white">
            <button onClick={handleNavigateButtonClick}>Bulk Sell</button>
          </div>
        ) : (
          ""
        )}
        <DataTable
          title="Item Lists"
          columns={columns}
          data={inventoryDetail}
          pagination
          onRowClicked={(row) => navigate(`/sales/item-request/${row.item_id}`)}
          onSelectedRowsChange={handleRowClick}
          persistTableHeadstriped
          highlightOnHover
          dense
          selectableRows
        />
      </div>
    </div>
  );
}

export default Inventory;

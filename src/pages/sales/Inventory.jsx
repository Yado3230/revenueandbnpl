import React from "react";
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
    // {
    //   name: "Status",
    //   cell: (row) => (
    //     <input
    //       // onChange={() => handleToggleEdit(row)}
    //       type="checkbox"
    //       className="toggle toggle-info"
    //       // checked={row.status}
    //     />
    //   ),
    // },
    // {
    //   name: "Actions",
    //   // cell: (row) => (
    //   //   <CustomizedMenus
    //   //     data={row}
    //   //     kyc={kyc}
    //   //     showEditModal={showEditModal}
    //   //     showDetailModal={showDetailModal}
    //   //     showAssignLoan={showAssignLoan}
    //   //     showAddExpense={showAddExpense}
    //   //   />
    //   // ),
    //   sortable: true,
    // },
  ];
  return (
    <div className="">
      <div>
        <DataTable
          title="Item Lists"
          columns={columns}
          data={inventoryDetail}
          pagination
          onRowClicked={(row) => navigate(`/sales/item-request/${row.item_id}`)}
          persistTableHeadstriped
          highlightOnHover
          dense
        />
      </div>
    </div>
  );
}

export default Inventory;

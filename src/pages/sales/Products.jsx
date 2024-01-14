import React from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { getProductDetails } from "../../store/actions/getInventoryAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails());
  }, [dispatch]);

  const inventoryInfo = useSelector((state) => state.inventoryInfo);
  const { productsDetail } = inventoryInfo;
  const columns = [
    {
      name: "Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.product_category,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.product_price,
      sortable: true,
    },
    // {
    //   name: "Status",
    //   selector: (row) => (row.product_availablity ? "TRUE" : "FALSE"),
    //   sortable: true,
    // },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toISOString().split("T")[0],
      sortable: true,
    },
  ];
  return (
    <div className="">
      <span className="ml-2 py-1 text-3xl text-cyan-500 my2 font-semibold">
        Products
      </span>
      <div>
        <DataTable
          title="Product Lists"
          columns={columns}
          data={productsDetail}
          pagination
          onRowClicked={(row) =>
            navigate(`/sales/product-request/${row.product_id}`)
          }
          persistTableHeadstriped
          highlightOnHover
          dense
        />
      </div>
    </div>
  );
}

export default Products;

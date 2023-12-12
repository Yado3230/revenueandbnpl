import PropTypes from "prop-types";
import DataTable from "react-data-table-component";

function Table(props) {
  return (
    <div>
      <DataTable
        columns={props.columns}
        data={props.data}
        highlightOnHover
        responsive
        pagination={props.pagination}
        expandableRows={props.expandableRows}
        expandableRowDisabled={props.expandableRowDisabled}
        expandableRowsComponent={props.expandableRowsComponent}
      />
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      selector: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      cell: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pagination: PropTypes.bool,
  expandableRows: PropTypes.bool,
  expandableRowDisabled: PropTypes.func,
  expandableRowsComponent: PropTypes.elementType,
};

export default Table;

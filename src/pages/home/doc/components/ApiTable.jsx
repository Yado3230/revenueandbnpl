import Table from "../../../../components/Table";
import { columns, data } from "../../utils/apiTable";

function ApiTable() {
  return (
    <div className="mb-8">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default ApiTable;

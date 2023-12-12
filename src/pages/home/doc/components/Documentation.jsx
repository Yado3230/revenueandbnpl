import Itro from "./Itro";
import ApiDocs from "./ApiDocs";
import { useState } from "react";

function Documentation() {
  const [first, setfirst] = useState(true);
  return (
    <div className="flex">
      <div className="pt-60 w-44 border-r-2 border-gray-200">
        <ul className="p-4 menu w-full space-y-2 bg-base-100 text-base-content  dark:bg-gray-900  dark:text-white">
          {/* <!-- Sidebar content here --> */}
          <li>
            <button
              className={first ? "text-white bg-primary" : ""}
              onClick={() => setfirst(true)}
            >
              Introduction
            </button>
          </li>
          <li>
            <button
              className={!first ? "text-white bg-primary" : ""}
              onClick={() => setfirst(false)}
            >
              Documentation
            </button>
          </li>
        </ul>
      </div>
      <div className="w-full">{first ? <Itro /> : <ApiDocs />}</div>
    </div>
  );
}

export default Documentation;

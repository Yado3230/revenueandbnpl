import { useState } from "react";
import Itro from "./components/Itro";
import ApiDocs from "./components/ApiDocs";

function Index() {
  const [first, setfirst] = useState(true);
  return (
    <div className="md:flex dark:bg-gray-900 dark:text-white">
      <div className="pt-24 border-r-2 border-gray-200 md:mt-0 md:w-44 dark:border-gray-700">
        <ul className="w-full p-4 space-y-2 menu bg-base-100 text-base-content dark:bg-gray-900 dark:text-white md:sticky md:top-1/2 md:transform md:-translate-y-1/2">
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

export default Index;

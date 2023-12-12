import React, { useState } from "react";

const Table = () => {
  const [data, setData] = useState([
    {
      name: "Hart Hagerty",
      job: "Zemlak, Daniel and Leannon",
      color: "Purple",
    },
    { name: "Brice Swyre", job: "Carroll Group", color: "Red" },
    { name: "Marjy Ferencz", job: "Rowe-Schoen", color: "Crimson" },
    { name: "Yancy Tear", job: "Wyman-Ledner", color: "Indigo" },
  ]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedData = [...data].sort((a, b) => {
//     if (sortConfig.direction === "asc") {
//       return a[sortConfig.key].localeCompare(b[sortConfig.key]);
//     } else {
//       return b[sortConfig.key].localeCompare(a[sortConfig.key]);
//     }
//   });

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th className="sortable" >
              Name
              {sortConfig.key === "name" && (
                <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
              )}
            </th>
            <th className="sortable" >
              Job
              {sortConfig.key === "job" && (
                <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
              )}
            </th>
            <th className="sortable" >
              Favorite Color
              {sortConfig.key === "color" && (
                <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
              )}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>{item.name}</td>
              <td>{item.job}</td>
              <td>{item.color}</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;

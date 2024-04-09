import React from "react";

const SoldItem = ({ items }) => {
  items.sort(function (a, b) {
    return b.total_price - a.total_price; // Descending order
  });

  // Return only the top 5 items
  var top5Items = items.slice(0, 5);
  return (
    <div>
      {top5Items?.map((item) => (
        <div className="flex items-center justify-between p-1 rounded w-full border-y pt-2 my-1">
          <div className="flex items-center">
            <div className="avatar mr-2">
              <div className="w-7 h-7 rounded">
                <img
                  crossorigin="anonymous"
                  src={item?.item_pic}
                  alt="galaxy"
                />
              </div>
            </div>
            <div className="flex flex-col item-start justify-center">
              <h3 className="font-semibold text-sm whitespace-nowrap">
                {item?.item_name}
              </h3>
              <div className="text-xs text-gray-500">
                {item?.onstock} Items are on stock
              </div>
            </div>
          </div>
          <span className="font-semibold">{item?.total_price} Birr</span>
        </div>
      ))}
    </div>
  );
};

export default SoldItem;

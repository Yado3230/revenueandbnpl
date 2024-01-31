import React from "react";

function RBFStats({ items }) {
  return (
    <>
      <div className="mt-2 dark:bg-gray-900">
        <div className="w-full mb-4 shadow stats dark:bg-gray-900 dark:text-white">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="stat-title">Daily Revenue</div>
            <div className="stat-value text-primary">
              {(
                items?.daily_revenue?.find((item) => item.sales_id === 0)
                  .total || 0
              ).toLocaleString()}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                className="w-8 h-8 text-secondary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />{" "}
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value text-secondary">
              {items?.total_revenue?.total?.toLocaleString() || 0}
            </div>
            {/* <div className="stat-desc">11% less than yesterday</div> */}
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Expense</div>
            <div className="stat-value text-primary">
              {items?.expense?.total?.toLocaleString() || 0}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-accent">
              <svg
                className="w-6 h-6 text-accent"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />{" "}
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div className="stat-title">Cost of Goods & Services</div>
            <div className="stat-value text-accent">
              {items?.total_buy_price?.total?.toLocaleString() || 0}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RBFStats;

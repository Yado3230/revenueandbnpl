import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NODE_API } from "../../utils/API";

const Activated = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [activationStatus, setActivationStatus] = useState("");
  const [isActivationSuccessful, setIsActivationSuccessful] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await NODE_API.get(`/activate/${params.token}`);
        console.log(res);
        setActivationStatus("Your account is activated successfully");
        setIsActivationSuccessful(true);
      } catch (error) {
        console.error(error);
        setActivationStatus("Account activation failed");
        setIsActivationSuccessful(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.token]);

  if (loading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="card w-96 bg-base-100 border shadow-xl pt-5">
        <figure
          className={
            isActivationSuccessful ? "text-green-500" : "text-red-500 "
          }
        >
          <svg
            className="h-8 w-8"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isActivationSuccessful ? (
              <path d="M5 12l5 5l10 -10" />
            ) : (
              <path d="M12 5v14" />
            )}
          </svg>
        </figure>
        <div className="card-body -mt-5 flex items-center justify-center">
          <div className="mt-4 text-center">
            <span
              className={`text-xl font-bold ${
                isActivationSuccessful
                  ? "card-title text-green-700"
                  : "card-title text-red-700"
              }`}
            >
              {activationStatus}
            </span>
          </div>
          {isActivationSuccessful && (
            <div className="card-actions justify-end text-cyan-500 text-xl font-semibold">
              <Link to="/auth">Login Here</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activated;

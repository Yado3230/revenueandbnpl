import React, { useEffect } from "react";
import GenerateApiModal from "../../components/GenerateApi";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../../store/actions/bank_accountAction";
import { getGeneratedApiKey } from "../../store/actions/generateApiKeyAction";
import Code from "./Code";
import jwtDecode from "jwt-decode";
function Uapi() {
  const primaryAccount = [];
  const AccountListData = useSelector((state) => state.accountsList);
  const generatedKey = useSelector((state) => state.apiKey);
  const { loading, error, bankAccounts } = AccountListData;
  const { apiloading, apierror, generatedApiKey } = generatedKey;
  const tokenInfo = useSelector((state) => state.userProfile);
  const { token } = tokenInfo;
  const user_token = jwtDecode(token);
  const merchant_id = user_token?.merchant_id;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGeneratedApiKey(merchant_id));
    dispatch(getAccounts(merchant_id));
  }, []);
  

  // if (bankAccounts) {
  for (let index = 0; index < bankAccounts?.length; index++) {
    const element = bankAccounts[index];
    if (element.account_level === "Primary") {
      primaryAccount.push(element.account_number);
    }
  }
  return (
    <>
      <div className="grid gap-4 md:grid-cols-12 justify-self-auto">
        <div className="col-span-8">
          <GenerateApiModal accountNumber={primaryAccount}></GenerateApiModal>
          <div className="col-span-4 mt-16">
            {generatedApiKey ? (
              <Code generatedCredential={generatedApiKey} />
            ) : (
              ""
            )}
          </div>
          <div className="mt-4 overflow-x-auto"></div>
        </div>
      </div>
    </>
  );
  // }
  
}

export default Uapi;

import ApiHero from "./ApiHero";
import ApiTable from "./ApiTable";
import ApiRequest from "./ApiRequest";
import ApiResponse from "./ApiResponse";

function ApiDocs() {
  return (
    <>
      <div className="">
        <section>
          <div className="px-4 mx-auto mt-4 md:mt-24 max-w-7xl md:mx-28">
            <ApiHero />
            <div className="m-4 text-left">
              <ApiTable />
              <ApiRequest />
            </div>
            <div className="mt-12 text-xl text-center testdark:text-gray-300">
              <h1>You may receive a JSON sample in the following format.</h1>
            </div>
            <ApiResponse />
          </div>
        </section>
      </div>
    </>
  );
}

export default ApiDocs;

import Button from "../../../../components/Button";
import { Input, TextArea } from "../../../../components/input2";
// import landingContactUs from "../../../../assets/images/landingContactUs.png"
import Iframe from "react-iframe";

function Contact() {
  return (
    <>
      <div className="md:flex md:px-32 md:space-x-8 testdark:bg-gray-900">
        <div className="md:w-1/2 md:mt-20">
          {/* <img src={landingContactUs} alt="dummy600*600" /> */}
          <Iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1082.1021625879876!2d38.76497380509275!3d9.007700381710036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85ba60ea840d%3A0x21d4319d63f7cd2!2sCooperative%20Bank%20of%20Oromia!5e0!3m2!1sen!2set!4v1687441394262!5m2!1sen!2set"
            width="600"
            height="550"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></Iframe>
        </div>
        <section className="bg-white testdark:bg-gray-900">
          <div className="max-w-screen-md px-4 py-8 mx-auto lg:py-16">
            <h2 className="mt-4 mb-4 text-4xl font-extrabold tracking-tight text-center text-gray-900 testdark:text-white">
              Contact Us
            </h2>
            <p className="mb-8 font-light text-center text-gray-500 testdark:text-gray-400 sm:text-xl">
              Got a technical issue? Want to send feedback about a beta feature?
              Need details about our Business plan? Let us know.
            </p>
            <htmlForm action="#" className="space-y-4">
              <div>
                <Input
                  title={"Your email"}
                  place={"name@company.com"}
                  inputclassName={"w-full"}
                />
              </div>
              <div>
                <Input
                  title={"Subject"}
                  place={"Let us know how we can help you"}
                  inputclassName={"w-full"}
                />
              </div>
              <div className="sm:col-span-2">
                <TextArea title={"Your message"} place={"Leave a comment..."} />
              </div>
              <Button title={"Send message"} />
            </htmlForm>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;

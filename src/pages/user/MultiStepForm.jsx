import React, { createContext, useState } from "react";
import Stepper from "./Stepper";
import Step from "./Step";
export const FormContext = createContext();

function MultiStepForm() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  return (
    <FormContext.Provider
      value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
    >
      <section className="m-8 bg-white testdark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <Stepper />
          <Step></Step>
        </div>
      </section>
    </FormContext.Provider>
  );
}

export default MultiStepForm;

import React, { useContext } from "react";
import { FormContext } from "./MultiStepForm";
import Basic from "./Forms/Basic";
import Basic2 from "./Forms/Basic2";
import Workspace from "./Forms/Workspace";
import Success from "./Forms/Success";
function Step() {
  const { activeStepIndex } = useContext(FormContext);
  let stepContent;
  switch (activeStepIndex) {
    case 0:
      stepContent = <Basic />;
      break;
    case 1:
      stepContent = <Basic2 />;
      break;
    case 2:
      stepContent = <Workspace />;
      break;
    case 3:
      stepContent = <Success />;
      break;
    default:
      break;
  }

  return stepContent;
}

export default Step;

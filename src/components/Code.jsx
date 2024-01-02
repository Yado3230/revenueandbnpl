import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Button from "./Button";

const Code = ({ codeString, title, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeString);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000); // Change the button text back to "COPY" after 3 seconds
  };
  return (
    <div className="mx-4 my-4">
      <div className="md:min-w-[25rem] bg-[#3a404d] rounded-md overflow-hidden">
        <div className="flex items-center justify-between px-4 text-xs text-white">
          <p className="text-sm">{title}</p>
          <Button
            class={"mt-2 mb-2"}
            onClick={() => {
              navigator.clipboard.writeText(codeString);
              handleCopyClick();
            }}
            title={isCopied ? "COPIED" : "COPY"}
          />
        </div>
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          customStyle={{ padding: "25px" }}
          wrapLongLines={true}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export const PaymentCode = ({ codeData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeData[activeTab].code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000); // Change the button text back to "COPY" after 3 seconds
  };

  return (
    <div className="mx-4 my-4">
      <div className="md:min-w-[25rem] bg-[#3a404d] rounded-md overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 text-xs text-white">
          <div className="flex space-x-1">
            {codeData.map((tab, index) => (
              <p
                key={index}
                onClick={() => setActiveTab(index)}
                className={`cursor-pointer rounded-md px-4 py-3 ${
                  index === activeTab
                    ? "text-white bg-primary"
                    : "bg-gray-200 text-primary"
                }`}
              >
                {tab.title}
              </p>
            ))}
          </div>
          <Button
            class={"mt-2 mb-2"}
            onClick={handleCopyClick}
            title={isCopied ? "COPIED" : "COPY"}
          />
        </div>
        <SyntaxHighlighter
          language={codeData[activeTab].language}
          style={atomOneDark}
          customStyle={{ padding: "25px" }}
          wrapLongLines={true}
        >
          {codeData[activeTab].code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Code;

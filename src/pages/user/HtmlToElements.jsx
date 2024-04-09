import React from "react";

// Function to convert HTML string to React components
export const htmlToElements = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const elements = [];

  const traverse = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      elements.push(node.textContent);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      const props = {};
      // Convert HTML attributes to props
      for (const { name, value } of node.attributes) {
        props[name] = value;
      }
      // Recursively traverse child nodes
      const children = Array.from(node.childNodes).map(traverse);
      // Create React component
      elements.push(React.createElement(tagName, props, ...children));
    }
  };

  Array.from(doc.body.childNodes).forEach(traverse);

  return elements;
};

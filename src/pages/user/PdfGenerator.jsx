import React from "react";
import { Document, Page, View, StyleSheet, Text } from "@react-pdf/renderer";

// Function to convert HTML string to React components
export const htmlToElements = (htmlString) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const elements = [];

    const traverse = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        elements.push(<Text>{node.textContent}</Text>);
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
  } catch (error) {
    console.error("Error converting HTML:", error);
    // Handle the error gracefully, e.g., display an error message or return an empty array
    return [];
  }
};

// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  p: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 10,
  },
});

// PDF component
const MyPDFComponent = ({ agrement }) => {
  const elements = htmlToElements(agrement);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>{elements}</View>
      </Page>
    </Document>
  );
};

export default MyPDFComponent;

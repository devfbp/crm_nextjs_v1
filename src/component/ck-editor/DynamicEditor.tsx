"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

// Import CKEditor with dynamic import
const Editor = dynamic(
  () => import("../ck-editor/CkEditor"), // Path to your CKEditor component
  { ssr: false } // Ensure CKEditor is only loaded on the client side
);

const DynamicEditor = () => {
  const [editorVisible, setEditorVisible] = useState(true);
  const [editorData, setEditorData] = useState<string>("");

  const handleEditorDataChange = (data: string) => {
    setEditorData(data);
  };

  useEffect(() => {
    return () => {
      // Clean up resources when the component is unmounted
      setEditorVisible(true); // Ensure editor is visible when component is re-mounted
      setEditorData(""); // Reset editor data
    };
  }, []);

  return (
    <>
      {editorVisible && (
        <Editor
          initialData={editorData}
          onDataChanged={handleEditorDataChange}
        />
      )}
    </>
  );
};

export default DynamicEditor;

"use client";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface CkEditorProps {
  initialData: string;
  onDataChanged: (data: string) => void;
}

const CkEditor = ({ initialData, onDataChanged }: CkEditorProps) => {
  return (
    <div className="editor">
      <></>
    </div>
  );
};

export default CkEditor;

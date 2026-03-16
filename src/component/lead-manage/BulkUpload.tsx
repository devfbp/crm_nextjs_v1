"use client";
import { toast } from "react-toastify";

export default function UploadXlsx() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", (e.target as HTMLFormElement).file.files[0]);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/" + "lead-upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        toast.success("File uploaded successfully!");
        if (typeof window !== "undefined") {
          window.location.href = "/leads";
        }
      } else {
        toast.error("Failed to upload file.");
      }
    } catch (error) {
      toast.error("An error occurred while uploading the file.");
    }
  };
  return (

    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-4">
        <label htmlFor="file" className="form-label">Upload Excel File</label>
      </div>
      <div className="col-4">
        <a href="/example-lead-format.xlsx" className="btn btn-secondary btn-sm float-end" download>Download Template</a>
      </div>
      <div className="col-8">
        <input className="form-control" type="file" name="file" accept=".xlsx" required />
      </div>
      <div className="col-8">
        <button type="submit" className="btn btn-primary btn-sm float-end">Upload</button>
      </div>
    </form>
  );
}
import Link from "next/link";
import React from "react";
type Props = {
  link: string;
  title: string;
};
const AddNewBreadcrumb = ({ link, title }: Props) => {
  return (
    <div className="dashboard-breadcrumb mb-30">
      <div className="dashboard-panel-header">
        <h2>{title}</h2>
        <div className="btn-box">
          <Link href={link} className="btn btn-sm btn-primary">
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddNewBreadcrumb;

import React from "react";
type Props = {
  title: string;
};
const DashboardBreadcrumb2 = ({ title }: Props) => {
  return (
    <div className="dashboard-breadcrumb dashboard-panel-header mobile-page-header mb-30">
      <h2>{title}</h2>
    </div>
  );
};

export default DashboardBreadcrumb2;

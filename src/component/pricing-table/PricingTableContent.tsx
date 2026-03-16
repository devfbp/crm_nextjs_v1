"use client";
import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import PricingTableSection from "../tables/PricingTable";
import {
  monthlyDiscountPlans,
  monthlyPlans,
  yearlyDiscountPlans,
  yearlyPlans,
} from "@/data/data";

const PricingTableContent = () => {
  const [isDiscount, setIsDiscount] = useState(false);

  const handleToggleDiscount = () => {
    setIsDiscount(!isDiscount);
  };

  return (
    <div className="main-content p-0">
      <div className="panel pricing-panel">
        <div className="panel-body d-flex flex-column align-items-center justify-content-center">
          <div className="pricing">
            <div className="container">
              <Tab.Container defaultActiveKey={"monthly"}>
                <div className="row">
                  <div className="col-12">
                    <div className="plan-type d-flex justify-content-center gap-2 mb-20">
                      <Nav variant="pills" className="nav-pills">
                        <Nav.Item>
                          <div className="btn btn-primary">
                            <Nav.Link eventKey="monthly">Monthly</Nav.Link>
                          </div>
                        </Nav.Item>
                        <Nav.Item>
                          <div className="btn btn-primary">
                            <Nav.Link eventKey="yearly">Yearly</Nav.Link>
                          </div>
                        </Nav.Item>
                      </Nav>
                    </div>
                    <div className="discount mb-10">
                      <div className="form-switch">
                        <input
                          className="form-check-input border-primary"
                          type="checkbox"
                          role="switch"
                          id="table-check-input"
                          checked={isDiscount}
                          onChange={handleToggleDiscount}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="getDiscount"
                          id="getDiscount"
                        >
                          Save 10% with FBPcrm Payments
                        </label>
                      </div>
                    </div>
                    <Tab.Content defaultValue={"monthly"}>
                      <Tab.Pane
                        eventKey="monthly"
                        title="Monthly"
                        className="table-responsive"
                      >
                        <PricingTableSection
                          plans={
                            isDiscount ? monthlyDiscountPlans : monthlyPlans
                          }
                        />
                      </Tab.Pane>
                      <Tab.Pane
                        eventKey="yearly"
                        title="Yearly"
                        className="table-responsive"
                      >
                        <PricingTableSection
                          plans={isDiscount ? yearlyDiscountPlans : yearlyPlans}
                        />
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </div>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTableContent;

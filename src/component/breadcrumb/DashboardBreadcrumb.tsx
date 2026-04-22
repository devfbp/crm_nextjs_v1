"use client";
import { useDigiContext } from "@/context/DigiContext";
import React, { useState, useRef, useEffect } from "react";
import { DateRangePicker, DefinedRange } from "react-date-range";

type Props = {
  title: string;
};

const DashboardBreadcrumb = ({ title }: Props) => {
  const { smallDevice } = useDigiContext();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (ranges: any) => {
    setDateRange([ranges.selection]);
    if (inputRef.current) {
      const startDate = ranges.selection.startDate.toISOString().split("T")[0];
      const endDate = ranges.selection.endDate.toISOString().split("T")[0];
      inputRef.current.value = `${startDate} - ${endDate}`;
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <div className="dashboard-breadcrumb dashboard-panel-header mb-30">
      <h2>{title}</h2>
      {/* <div className="input-group dashboard-filter">
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          name="basic"
          id="dashboardFilter"
          placeholder="2024/02/15 - 2024/04/16"
          onClick={toggleDatePicker}
        />
        <label htmlFor="dashboardFilter" className="input-group-text">
          <i className="fa-light fa-calendar-days"></i>
        </label>
        {showDatePicker && smallDevice ? (
          <div className="date-picker-container dashboard-date-picker">
            <DefinedRange
              ranges={dateRange}
              onChange={handleSelect}
              className="date-range-picker"
            />
          </div>
        ) : showDatePicker && !smallDevice ? (
          <div className="date-picker-container dashboard-date-picker">
            <DateRangePicker
              className="date-range-picker"
              ranges={dateRange}
              onChange={handleSelect}
            />
          </div>
        ) : null}
      </div> */}
    </div>
  );
};

export default DashboardBreadcrumb;

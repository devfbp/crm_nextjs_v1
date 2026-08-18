"use client";

import { useDigiContext } from "@/context/DigiContext";
import React, { useState, useRef, useEffect } from "react";
import { DateRangePicker, DefinedRange } from "react-date-range";

type FormData = {
  created_date: string;
  [key: string]: any;
};

type Props = {
  title?: string;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
};

const DatePicker = ({ title, form, setForm }: Props) => {
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

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const handleSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;

    setDateRange([ranges.selection]);

    const formattedRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;

    // Update parent form
    setForm((prev) => ({
      ...prev,
      created_date: formattedRange,
    }));

    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  return (
    <div className="dashboard-breadcrumb dashboard-panel-header mb-30">
      {title && <h2>{title}</h2>}

      <div className="input-group dashboard-filter">
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          name="created_date"
          id="dashboardFilter"
          placeholder="2024/02/15 - 2024/04/16"
          value={form.created_date || ""}
          onClick={toggleDatePicker}
          readOnly
        />

        <label htmlFor="dashboardFilter" className="input-group-text">
          <i className="fa-light fa-calendar-days"></i>
        </label>

        {showDatePicker && smallDevice && (
          <div
            ref={datePickerRef}
            className="date-picker-container dashboard-date-picker"
          >
            <DefinedRange
              ranges={dateRange}
              onChange={handleSelect}
              className="date-range-picker"
            />
          </div>
        )}

        {showDatePicker && !smallDevice && (
          <div
            ref={datePickerRef}
            className="date-picker-container dashboard-date-picker"
          >
            <DateRangePicker
              className="date-range-picker"
              ranges={dateRange}
              onChange={handleSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;

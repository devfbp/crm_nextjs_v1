"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Leads.scss";
import Swal from "sweetalert2";
import { showDateTime } from "../utils/common-client";
import withReactContent from "sweetalert2-react-content";

const Reminder = ({ setReminderRecords }) => {
  const [records, setRecords] = useState(null);
  const [startReminderCheck, setStartReminderCheck] = useState(false);
  // Stores already-triggered reminder IDs
  const triggeredReminders = useRef(new Set()); 

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lead/lead-reminder`
      );

      const result = await response.json();
      setRecords(result);
      setReminderRecords(result.data || []);

    } catch (error) {
      console.error("Error fetching reminder data:", error);
    }
  }, []);

  // Fetch immediately and every 5 minutes
  useEffect(() => {
    fetchData();

    const fetchInterval = setInterval(() => {
      fetchData();
    }, 5 * 1000); // 5 seconds

    return () => clearInterval(fetchInterval);
  }, [fetchData]);

  // Check reminders every 30 seconds
  useEffect(() => {
    const checkReminders = () => {
      if (!records?.data?.length) return;

      const now = Date.now();

      records.data.forEach((record) => {
        const reminderTime = new Date(
          record.schedule_date_time
        ).getTime();

        // +/- 30 seconds window
        const diff = Math.abs(now - reminderTime);

        if (
          diff <= 5 * 1000 &&
          !triggeredReminders.current.has(record.id)
        ) {
          triggeredReminders.current.add(record.id);

          console.log("Reminder Triggered:", record);

          // Replace with your toast/modal/notification
          // alert(
          //   `Reminder for Lead #${record.id}\n${showDateTime(
          //     record.schedule_date_time
          //   )}`
          // );
          
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: "Reminder for Lead #" + record.customer_name,
            text: "" + showDateTime(record.schedule_date_time),
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "View Lead",
            buttonsStyling: !1,
            showCloseButton: !0,
            closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
            customClass: {
                closeButton: "btn btn-sm btn-icon btn-danger",
                confirmButton: "btn btn-sm btn-primary",
                cancelButton: "btn btn-sm btn-danger",
            },
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // Navigate to lead details page
                window.location.href = "/leads/" + record.lead_id+"/edit";
            }
        });
        }
      });
    };

    // Run immediately
    checkReminders();

    const reminderInterval = setInterval(
      checkReminders,
      30 * 1000
    );

    return () => clearInterval(reminderInterval);
  }, [records]);

  // return (
  //   <div className="reminder-time">
  //     <h3>Reminder Time</h3>

  //     {records?.data?.length > 0 ? (
  //       records.data.map((record) => (
  //         <div key={record.id} className="reminder-record">
  //           <p>
  //             <strong>Lead ID:</strong> {record.id}
  //           </p>
  //           <p>
  //             <strong>Schedule Date Time:</strong>{" "}
  //             {showDateTime(record.schedule_date_time)}
  //           </p>
  //         </div>
  //       ))
  //     ) : (
  //       <p>No reminder set for today.</p>
  //     )}
  //   </div>
  // );
};

export default Reminder;
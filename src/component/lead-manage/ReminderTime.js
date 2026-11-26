"use client";

import React, { useEffect, useRef, useCallback } from "react";
import "./Leads.scss";
import Swal from "sweetalert2";
import { showDateTime } from "../utils/common-client";
import withReactContent from "sweetalert2-react-content";

// How often today's reminders are re-fetched from the server. This component
// sits in the header of every page, so every open tab of every user calls the
// API at this rate. It used to be every 5 seconds, which kept the database busy
// for everyone.
const FETCH_INTERVAL_MS = 60 * 1000;

// How often the already-fetched reminders are checked against the clock.
// This is local only (no network), so it can stay frequent.
const CHECK_INTERVAL_MS = 5 * 1000;

// A reminder pops up when its time is within this window of "now". It reaches
// back a little over a minute because browsers slow timers in background tabs
// to about once a minute; a check that runs late still shows the reminder.
// (The API only returns reminders that are still ahead, so a reloaded page
// never shows an old one again.)
const EARLY_MS = 5 * 1000;
const LATE_MS = FETCH_INTERVAL_MS + 5 * 1000;

const Reminder = ({ setReminderRecords }) => {
  // Latest reminders from the server; a ref, because the clock check reads it
  // and nothing renders from it.
  const recordsRef = useRef([]);
  // Reminders that already popped up, so each one shows only once per page.
  const triggeredReminders = useRef(new Set());

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lead/lead-reminder`
      );

      const result = await response.json();
      recordsRef.current = result.data || [];
      setReminderRecords(result.data || []);

    } catch (error) {
      console.error("Error fetching reminder data:", error);
    }
  }, []);

  // Fetch immediately, then every FETCH_INTERVAL_MS
  useEffect(() => {
    fetchData();

    const fetchInterval = setInterval(fetchData, FETCH_INTERVAL_MS);

    return () => clearInterval(fetchInterval);
  }, [fetchData]);

  // Check the fetched reminders against the clock every CHECK_INTERVAL_MS
  useEffect(() => {
    const checkReminders = () => {
      const records = recordsRef.current;
      if (!records.length) return;

      const now = Date.now();

      records.forEach((record) => {
        const reminderTime = new Date(
          record.schedule_date_time
        ).getTime();
        // Lead + time, so rescheduling a lead gives it a new reminder.
        // (This used record.id, which leads don't have, so after the first
        // popup every later reminder was treated as already shown.)
        const reminderKey = `${record.lead_id}-${reminderTime}`;

        if (
          reminderTime - now <= EARLY_MS &&
          now - reminderTime <= LATE_MS &&
          !triggeredReminders.current.has(reminderKey)
        ) {
          triggeredReminders.current.add(reminderKey);

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
            if (result.isConfirmed) {
                // Navigate to lead details page
                window.location.href = "/leads/" + record.lead_id+"/edit";
            }
        });
        }
      });
    };

    const reminderInterval = setInterval(checkReminders, CHECK_INTERVAL_MS);

    return () => clearInterval(reminderInterval);
  }, []);

  return null;
};

export default Reminder;

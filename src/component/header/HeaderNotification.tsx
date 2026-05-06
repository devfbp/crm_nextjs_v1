"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

interface ReminderNotification {
  lead_reminder_id: number;
  lead_id: number;
  customer_name: string;
  message: string;
  remind_at: string;
  notification_count: number;
  limit: number;
}

const HeaderNotification = () => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [notificationShow, setNotificationShow] = useState(false);
  const [notifications, setNotifications] = useState<ReminderNotification[]>(
    [],
  );
  const eventSourceRef = useRef<EventSource | null>(null);

  const toggleNotification = () => setNotificationShow((prev) => !prev);

  // Format time for display
  const formatTime = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Acknowledge a notification
  const acknowledge = useCallback(async (lead_reminder_id: number) => {
    setNotifications((prev) =>
      prev.filter((n) => n.lead_reminder_id !== lead_reminder_id),
    );
    try {
      await fetch("/api/notifications/acknowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_reminder_id }),
      });
    } catch (err) {
      console.error("[Notification] Acknowledge failed:", err);
    }
  }, []);

  // Connect to SSE stream
  useEffect(() => {
    const es = new EventSource("/api/notifications/stream");
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const data: ReminderNotification = JSON.parse(event.data);
        setNotifications((prev) => {
          // Avoid duplicates
          const exists = prev.some(
            (n) => n.lead_reminder_id === data.lead_reminder_id,
          );
          if (exists) return prev;
          return [data, ...prev];
        });
        // Also show a toast popup
        toast.info(`🔔 Reminder: ${data.customer_name} — ${data.message}`, {
          position: "top-right",
          autoClose: 8000,
          onClick: () => acknowledge(data.lead_reminder_id),
        });
      } catch {
        // heartbeat comments — ignore
      }
    };

    es.onerror = () => {
      // Reconnect silently
      es.close();
      setTimeout(() => {
        eventSourceRef.current = new EventSource("/api/notifications/stream");
      }, 3000);
    };

    return () => {
      es.close();
    };
  }, [acknowledge]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationShow(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const unreadCount = notifications.length;

  return (
    <div
      className="header-btn"
      ref={notificationRef}
      style={{ position: "relative" }}
    >
      <button
        className={`header-btn ${notificationShow ? "show" : ""}`}
        id="notificationDropdown"
        onClick={toggleNotification}
        style={{ position: "relative" }}
        title="Reminders"
      >
        <i className="fa-light fa-bell"></i>
        {unreadCount > 0 && (
          <span
            className="badge bg-danger"
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              fontSize: "10px",
              minWidth: "18px",
              height: "18px",
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
              animation: "pulse 1.5s infinite",
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <div
        style={{
          display: notificationShow ? "block" : "none",
          position: "absolute",
          right: 0,
          top: "calc(100% + 10px)",
          width: "360px",
          maxHeight: "480px",
          overflowY: "auto",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          background: "var(--bs-body-bg)",
          color: "var(--bs-body-color)",
          border: "1px solid var(--bs-border-color)",
          zIndex: 1050,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid var(--bs-border-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--bs-body-color)" }}>
            <i
              className="fa-light fa-bell me-2"
              style={{ color: "#6c63ff" }}
            ></i>
            Lead Reminders
          </span>
          {unreadCount > 0 && (
            <span
              style={{
                background: "linear-gradient(135deg, #6c63ff, #a855f7)",
                borderRadius: "10px",
                padding: "2px 8px",
                fontSize: "11px",
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {unreadCount} new
            </span>
          )}
        </div>

        {/* Notification List */}
        {notifications.length === 0 ? (
          <div
            style={{
              padding: "32px 18px",
              textAlign: "center",
              color: "var(--bs-secondary-color, #6c757d)",
              fontSize: "13px",
            }}
          >
            <i
              className="fa-light fa-bell-slash"
              style={{
                fontSize: "28px",
                marginBottom: "8px",
                display: "block",
              }}
            ></i>
            No pending reminders
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.lead_reminder_id}
              style={{
                padding: "14px 18px",
                borderBottom: "1px solid var(--bs-border-color)",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
                transition: "background 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(108,99,255,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {/* Icon */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6c63ff22, #a855f722)",
                  border: "1px solid #6c63ff55",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <i
                  className="fa-light fa-clock"
                  style={{ color: "#6c63ff", fontSize: "15px" }}
                ></i>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "var(--bs-body-color)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {notif.customer_name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--bs-secondary-color, #6c757d)",
                    marginTop: "2px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {notif.message}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#6c63ff",
                    marginTop: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <i
                    className="fa-light fa-calendar-check"
                    style={{ fontSize: "10px" }}
                  ></i>
                  {formatTime(notif.remind_at)}
                  <span
                    style={{ color: "var(--bs-secondary-color, #6c757d)", margin: "0 4px" }}
                  >
                    ·
                  </span>
                  <span style={{ color: "var(--bs-secondary-color, #6c757d)" }}>
                    {notif.notification_count}/{notif.limit}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  flexShrink: 0,
                }}
              >
                <Link
                  href={`/leads/${notif.lead_id}/edit`}
                  style={{
                    fontSize: "11px",
                    background: "linear-gradient(135deg, #6c63ff, #a855f7)",
                    color: "#fff",
                    borderRadius: "6px",
                    padding: "3px 8px",
                    textDecoration: "none",
                    display: "block",
                    textAlign: "center",
                  }}
                  onClick={() => {
                    setNotificationShow(false);
                    acknowledge(notif.lead_reminder_id);
                  }}
                >
                  View
                </Link>
                <button
                  style={{
                    fontSize: "11px",
                    background: "var(--bs-tertiary-bg, rgba(0,0,0,0.06))",
                    color: "var(--bs-secondary-color, #6c757d)",
                    border: "none",
                    borderRadius: "6px",
                    padding: "3px 8px",
                    cursor: "pointer",
                  }}
                  onClick={() => acknowledge(notif.lead_reminder_id)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))
        )}

        {/* Footer */}
        {notifications.length > 0 && (
          <div
            style={{
              padding: "10px 18px",
              textAlign: "center",
              borderTop: "1px solid var(--bs-border-color)",
            }}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: "var(--bs-secondary-color, #6c757d)",
                fontSize: "12px",
                cursor: "pointer",
              }}
              onClick={() => {
                notifications.forEach((n) => acknowledge(n.lead_reminder_id));
              }}
            >
              Dismiss all
            </button>
          </div>
        )}
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default HeaderNotification;

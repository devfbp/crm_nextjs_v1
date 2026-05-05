"use client";
import { useEffect, useState } from "react";

const HeaderClock = () => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return null;

  const date = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        lineHeight: 1.2,
        marginRight: "4px",
        userSelect: "none",
      }}
    >
      <span
        style={{
          fontSize: "15px",
          fontWeight: 700,
          letterSpacing: "0.5px",
          fontVariantNumeric: "tabular-nums",
          // color: "var(--bs-body-color, #fff)",
        }}
      >
        {time}
      </span>
      <span
        style={{
          fontSize: "12px",
          opacity: 0.9,
          // color: "var(--bs-body-color, #fff)",
        }}
      >
        {date}
      </span>
    </div>
  );
};

export default HeaderClock;

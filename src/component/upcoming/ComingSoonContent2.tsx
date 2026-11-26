"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

type TimerState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// Countdown to one year from when the page opened. Kept local to this page so
// its once-a-second updates don't re-render the rest of the app.
const useCountdown = (): TimerState => {
  const [isTimerState, setIsTimerState] = useState<TimerState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownDate = Date.now() + 365 * 24 * 60 * 60 * 1000;
    const setNewTime = () => {
      const distanceToDate = countdownDate - Date.now();
      setIsTimerState({
        days: Math.floor(distanceToDate / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distanceToDate % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distanceToDate % (1000 * 60)) / 1000),
      });
    };
    const interval = setInterval(setNewTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return isTimerState;
};

const ComingSoonContent2 = () => {
  const isTimerState = useCountdown();
  return (
    <div className="main-content p-0">
      <div className="panel coming-soon-panel coming-soon-panel-2">
        <div className="panel-body h-100 d-flex flex-column align-items-center justify-content-center">
          <div className="part-img">
            <img src="assets/images/coming-soon-2.png" alt="coming-soon" />
          </div>
          <div className="part-txt">
            <ul className="countdown">
              <li>
                <span className="days">{isTimerState.days || 0}</span>
                <p className="days_text">Days</p>
              </li>
              <li className="seperator">:</li>
              <li>
                <span className="hours">{isTimerState.hours || "00"}</span>
                <p className="hours_text">Hours</p>
              </li>
              <li className="seperator">:</li>
              <li>
                <span className="minutes">{isTimerState.minutes || "00"}</span>
                <p className="minutes_text">Minutes</p>
              </li>
              <li className="seperator">:</li>
              <li>
                <span className="seconds">{isTimerState.seconds || "00"}</span>
                <p className="seconds_text">Seconds</p>
              </li>
            </ul>
            <Link href="/" className="btn btn-primary py-2 px-5 rounded-pill">
              Go To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonContent2;

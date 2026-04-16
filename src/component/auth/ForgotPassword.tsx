"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../footer/Footer";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { set } from "date-fns";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      toast.error("Please enter your email address.");
      setLoading(false);
      return;
    }
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
      }
    });
    if (res.ok) {      
      toast.success("New Password has been sent to your email.");
      setTimeout(() => {
        setLoading(false);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }, 3000);
    } else {
      toast.error("Invalid email address or not found.");
      setLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <div className="main-content login-panel login-panel-3 min-vh-100">
        <div className="container">
          <div className="d-flex justify-content-end">
            <div className="login-body mb-10">
              <div className="top d-flex justify-content-between align-items-center mb-10 mt-10">
                <div className="logo">
                  <img src={process.env.NEXT_PUBLIC_BLACK_LOGO} alt="Logo" />
                </div>
                <h1 className="panel-title text-white text-uppercase">Forgot Password</h1>
              </div>
              <div className="bottom pt-0">
                <form onSubmit={handleAction}>
                  <div className="input-group mb-25">
                    <span className="input-group-text">
                      <i className="fa-regular fa-user"></i>
                    </span>
                    <input className="form-control" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="d-flex justify-content-between mb-25">
                    <Link href="/login" className="text-white fs-14">
                      Login Here
                    </Link>
                  </div>
                  {loading ? (
                    <button className="btn btn-primary w-100 login-btn" disabled>
                      Loading...
                    </button>
                  ) : (
                    <button className="btn btn-primary w-100 login-btn">
                      Submit
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ForgotPassword;
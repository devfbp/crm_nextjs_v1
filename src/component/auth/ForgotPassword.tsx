"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../footer/Footer";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }    
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
      }
    });

    if (res.ok) {
      const token = await res.json();      
      router.replace('/');
      router.refresh();
    } else {
      toast.error("Invalid Username and Password.");
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
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
                <button className="btn btn-primary w-100 login-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
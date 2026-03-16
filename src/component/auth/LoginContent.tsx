"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../footer/Footer";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

const LoginContent3 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [remember, setRemember] = useState(false);

  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("remember_token") || sessionStorage.getItem("token");
  //   if (token) {
  //     router.replace('/');
  //   }
  // }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      // window.location.href = '/';
      //router.push('/');
      //console.log("response", await res.json());
      const token = await res.json();
      if (remember) {
        localStorage.setItem("remember_token", JSON.stringify(token.token));
      } else {
        const fakeToken = "";
        sessionStorage.setItem("remember_token", JSON.stringify(fakeToken));
      }
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
              <h1 className="panel-title text-white text-uppercase">Login</h1>
            </div>
            <div className="bottom pt-0">
              <form onSubmit={handleLogin}>
                <div className="input-group mb-25">
                  <span className="input-group-text">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Username or email address"
                  /> */}
                  <input className="form-control" placeholder="Username or email address" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-group mb-5">
                  <span className="input-group-text">
                    <i className="fa-regular fa-lock"></i>
                  </span>
                  {/* <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control rounded-end"
                    placeholder="Password"
                  /> */}
                  <input 
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password" 
                    className="form-control rounded-end" 
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                  <a
                    role="button"
                    className="password-show"
                    onClick={togglePasswordVisibility}
                  >
                    <i className={`fa-duotone ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </a>
                </div>
                <div className="d-flex justify-content-between mb-25">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <label
                      className="form-check-label text-white"
                      htmlFor="loginCheckbox"
                    >
                      Remember Me
                    </label>
                  </div>
                  <Link href="/resetPassword" className="text-white fs-14">
                    Forgot Password?
                  </Link>
                </div>

                <button className="btn btn-primary w-100 login-btn">
                  Sign in
                </button>
                <div className="mb-3 mt-3">
                  {/* <div class="msg-success alert alert-success py-2 px-3 rounded fs-14">
                    <i class="fa-regular fa-check me-2"></i> Login Successfully
                  </div> */}
                  {showError &&
                    <div id="loginError" className=" text-center msg-error alert alert-danger py-2 px-3 rounded fs-14 elementToFadeInAndOut">
                      <i className="fa-regular fa-circle-exclamation me-2"></i> Invalid Username/Password
                    </div>
                  }
                </div>
              </form>
              {/* <div className="other-option">
                <p>Or continue with</p>
                <div className="social-box d-flex justify-content-center gap-20">
                  <Link href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </Link>
                  <Link href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  <Link href="#">
                    <i className="fa-brands fa-google"></i>
                  </Link>
                  <Link href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginContent3;

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Create transporter once
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// GET: test email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email") || "nithy.snt@gmail.com";
    const message = searchParams.get("message") || "Hello from Next.js";

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "New Message",
      text: message,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

const html_header = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Template with Table</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
  }
  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
  }
  .header img {
    width: 100%;
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  .body-content {
    padding: 20px;
    text-align: center;
    color: #333333;
    font-size: 16px;
    line-height: 1.5;
  }
  .body-content h1 {
    color: #2c3e50;
  }
  .content-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  .content-table th, .content-table td {
    border: 1px solid #dddddd;
    padding: 12px;
    text-align: center;
  }
  .content-table th {
    background-color: #3498db;
    color: #ffffff;
  }
  .content-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  .footer {
    padding: 15px;
    text-align: center;
    font-size: 14px;
    color: #777777;
    background-color: #f4f4f4;
  }
  @media screen and (max-width: 620px) {
    .body-content {
      padding: 15px;
      font-size: 14px;
    }
    .footer {
      font-size: 12px;
    }
    .content-table th, .content-table td {
      padding: 8px;
    }
  }
</style>
</head>
<body>
  <div class="email-container">
    <!-- Header Image -->
    <div class="header">
      <img src="https://fbpliveadmin.fullbasketproperty.com/uploads/FBP_MAILLOG_bb4f4ee2aa.png" 
           style="width: 109px; height: auto;" align="center"
           alt="Header Image">
    </div>

    <!-- Body Content -->
    <div class="body-content">`;

const html_body = `
      <h1>Hello, Subscriber!</h1>
      <p>Here’s a summary of our latest updates and offers:</p>

      <!-- Table -->
      <table class="content-table">
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>Product A</td>
          <td>High-quality product for daily use</td>
          <td>$49.99</td>
        </tr>
        <tr>
          <td>Product B</td>
          <td>Premium features with excellent design</td>
          <td>$79.99</td>
        </tr>
        <tr>
          <td>Product C</td>
          <td>Affordable and reliable option</td>
          <td>$29.99</td>
        </tr>
      </table>

      <p>Thank you for being part of our community!</p>
    `;

const html_footer = `
    </div>
    <!-- Footer -->
    <div class="footer">
      <h2 style="text-align:left;color:#ff5a3c">Full Basket Property</h2>
      <p style="text-align:left;color:#ff5a3c">
        11/2/1, Sigma Trident, Hayes Road Entrance, Richmond Road,<br>
        Bangaluru,<br>
        Karnataka,560025.<br>
        <a href="tel:9019000400" style="text-decoration:none;color:#ff5a3c" target="_blank">9019000400</a><br>
        <a href="mailto:sales@fullbasketproperty.com" style="text-decoration:none;color:#ff5a3c" target="_blank">sales@fullbasketproperty.com</a><br>
      </p>
    </div>
  </div>
</body>
</html>`;

// POST: send email from body
export async function POST(req) {
  try {
    const { email, message, subject } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { success: false, message: "Email and message are required" },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject || "New Message",
      html: html_header + message + html_footer,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
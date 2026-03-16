import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Under Construction",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content p-0">
      <div className="panel under-construction-panel">
        <div className="panel-body h-100 d-flex flex-column align-items-center justify-content-center">
          <div className="part-img">
            <img src="assets/images/under-construction.png" alt="coming-soon" />
          </div>
          <div className="part-txt">
            <h2>Under Construction</h2>
            <p>To make things right we need some time to rebuild</p>
            <Link href="/" className="btn btn-primary py-2 px-5 rounded-pill">
              Go To Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

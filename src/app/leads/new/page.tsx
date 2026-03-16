import Client from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Add Lead",
  description: "",
};
export default function Page() {
  return <Client />;
}
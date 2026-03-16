import Client from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME + " - Lead Status History",
    description: "",
};
export default function Page(props: { params: { slug: string } }) {
    return <Client params={props.params} />;
}
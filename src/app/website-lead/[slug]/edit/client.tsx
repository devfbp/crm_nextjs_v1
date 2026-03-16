"use client";
import Footer from "@/component/footer/Footer";
import UserHeader from "@/component/users-com/Header";
import Form from "@/component/users-com/Form";
import { USER_MENU_ID } from "@/data/constants";
import { accessMenuCheck } from "@/component/utils/common";
import { useEffect, useState } from "react";
import NoAccess from "@/component/error/NoAccess";

type Props = {
    params: { slug: string }; // the dynamic value
};

export default function Home(props: Props) {
    const [hasAccess, setHasAccess] = useState(false);
    const [records, setRecords] = useState<any>();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user?id=' + props.params.slug);
            const result = await response.json();
            // console.log("Fetched Records:", result);
            setRecords(result);
        };
        fetchData();
        setHasAccess(accessMenuCheck(USER_MENU_ID, 3));
    }, [props]);
    return (
        <main className="main-content">
            {hasAccess ?
                <>
                    <div className="row">
                        <div className="col-12">
                            <div className="panel">
                                <UserHeader action={3} />
                                <div className="panel-body p-0">
                                    <Form records={records} setRecords={setRecords} editid={props.params.slug} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
                :
                <NoAccess />
            }
        </main>
    );
}

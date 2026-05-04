"use client";
import Form from "@/component/lead-manage/Form";
import { LEADS_MENU_ID } from "@/data/constants";
import { accessMenuCheck } from "@/component/utils/common";
import { useEffect, useState } from "react";
import NoAccess from "@/component/error/NoAccess";
import Footer from "@/component/footer/Footer";
import LeadsHeader from "@/component/lead-manage/LeadsHeader";

type Props = {
    params: { slug: string }; // the dynamic value
};
export default function Home(props: Props) {
    const [records, setRecords] = useState<any>(null);
    const [hasAccess, setHasAccess] = useState(false);
    useEffect(() => {
        setHasAccess(accessMenuCheck(LEADS_MENU_ID, 3));
    }, []);
    // console.log("Edit Lead Slug:", props.params.slug);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/lead?id=' + props.params.slug);
            const result = await response.json();
            console.log("Fetched Records:", result[0]);
            setRecords(result[0]);
        };
        fetchData();
    }, [props]);
    return (
        <main className="main-content">
            {hasAccess ?
                <>
                    <div className="row">
                        <div className="col-12">
                            <div className="panel">
                                <LeadsHeader action={3} type={2} />
                                <div className="panel-body p-0">
                                    <Form records={records} setRecords={setRecords} editid={0} />
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

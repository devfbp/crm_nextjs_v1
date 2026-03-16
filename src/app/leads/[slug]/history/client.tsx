"use client";
import History from "@/component/lead-manage/History";
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
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/lead-status-entry?lead_view=1&lead_id=' + props.params.slug);
            const result = await response.json();
            // console.log("Fetched Records:", result);
            setRecords(result);
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
                                <LeadsHeader action={"Lead History"} type={2} />
                                <div className="panel-body p-0">
                                    <History records={records} />
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

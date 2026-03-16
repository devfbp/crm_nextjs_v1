import Image from "next/image";
import Noaccess from "@/assets/images/error-403.png";

const NoAccess = () => {
  return (
    <div className="error-main main-content p-0">
      <div className="panel error-panel">
        <div className="panel-body h-100 d-flex flex-column align-items-center justify-content-center">
          <div className="part-img">
            <Image src={Noaccess} alt="403" className="img-fluid" width={200} height={200}/>
          </div>
          <div className="part-txt text-center">
            <h2 className="error-subtitle">Access Forbidden Please Contact Administrator</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoAccess;

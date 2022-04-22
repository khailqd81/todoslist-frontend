import { BsTelephone } from "react-icons/bs"
import { FiMail } from "react-icons/fi"
import { RiFacebookFill } from "react-icons/ri"
function Footer() {
    return (
        <div className="bg-blue-500">
            <div className="max-w-screen-xl flex flex-wrap mx-auto py-8 text-blue-600 md:justify-around">
                <div className="flex flex-wrap items-center ml-[15vw] md:ml-0 mt-4 md:mt-0">
                    <span className="footer-icon bg-white border rounded-full border-blue-700 p-4 shadow-lg"><BsTelephone size={40} /></span>
                    <span className="text-white ml-4"> Call us: 0984655524 </span>
                </div>
                <div className="flex flex-wrap items-center ml-[15vw] md:ml-0 mt-4 md:mt-0">
                    <span className="footer-icon bg-white border rounded-full border-blue-700 p-4 shadow-lg"><FiMail size={40} /></span>
                    <span className="text-white ml-4"> Mail: khailqd81@gmail.com </span>
                </div>
                <div className="flex flex-wrap items-center ml-[15vw] md:ml-0 mt-4 md:mt-0">
                    <span className="footer-icon bg-white border rounded-full border-blue-700 p-4 shadow-lg"><RiFacebookFill size={40} /></span>
                    <span className="text-white ml-4"> Facebook Page </span>
                </div>
            </div>
        </div>
    )
}

export default Footer;

import { BsTelephone } from "react-icons/bs"
import { FiMail } from "react-icons/fi"
import { RiFacebookFill } from "react-icons/ri"
function Footer() {
    return (
        <div className="bg-blue-500">
            <div className="max-w-screen-xl flex mx-auto py-8 text-blue-600 justify-around">
                <div className="flex items-center">
                    <span className="footer-icon bg-white border rounded-full border-blue-700 p-4 shadow-lg"><BsTelephone size={40} /></span>
                    <span className="text-white ml-4"> Call us: 0984655524 </span>
                </div>
                <div className="flex items-center">
                    <span className="footer-icon bg-white border rounded-full border-blue-700 p-4 shadow-lg"><FiMail size={40} /></span>
                    <span className="text-white ml-4"> Mail: khailqd81@gmail.com </span>
                </div>
                <div className="flex items-center">
                    <span className="footer-icon bg-white border rounded-full border-blue-700 p-4 shadow-lg"><RiFacebookFill size={40} /></span>
                    <span className="text-white ml-4"> Facebook Page </span>
                </div>
            </div>
        </div>
    )
}

export default Footer;

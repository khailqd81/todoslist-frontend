import { FaUserCircle } from "react-icons/fa"
import {BiCalendarHeart} from "react-icons/bi"
function Header() {
    return (
        <div className="bg-blue-500">
        <nav className="py-4 max-w-screen-xl h-full mx-auto flex justify-between items-center text-white ">
            <div className="flex items-center text-xl font-bold">
                <BiCalendarHeart size={40}/>
                <span className="ml-4">PaTyVy</span>
            </div>
            <div className="flex items-center">
                <p className="mr-4">Username</p>
                <FaUserCircle size={40}/>
            </div>
        </nav>
        </div>

    )
}

export default Header

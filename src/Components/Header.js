import axios from "axios";
import { FaUserCircle } from "react-icons/fa"
import { BiCalendarHeart } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useStore, actions } from "../store"
import isLogin from "../utils/isLogin"
function Header() {
    const [state, dispatch] = useStore();
    const navigate = useNavigate();
    useEffect(() => {
        async function getAccountInfo() {
            const checkLogin = await isLogin();
            console.log("header: ", checkLogin)
            if (checkLogin.login_state) {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/account/info`, {
                    headers: {
                        authorization: checkLogin.accessToken
                    }
                })
                console.log("response in header: ", response)

                if (response.status === 200) {
                    dispatch(actions.setUsername(response.data.fullname));
                }
            }
        }
        getAccountInfo();
    }, [dispatch])

    const handleLogout =  () => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            localStorage.removeItem("accessToken");
            dispatch(actions.setLogin(false));
            navigate("/")
        }
    }
    return (
        <div className="bg-blue-500">
            <nav className="py-4 max-w-screen-xl h-full mx-auto flex justify-between items-center text-white ">
                <div className="flex items-center text-xl font-bold">
                    <BiCalendarHeart size={40} />
                    <span className="ml-4">PaTyVy</span>
                </div>
                {state.isLogin
                    ?
                    <div className="flex items-center relative group">
                        <p className="mr-4">{state.username || "Username"}</p>
                        <FaUserCircle size={40} />
                        <ul className="hidden group-hover:block dropdown absolute top-[calc(100%+4px)] w-full text-center text-blue-500 bg-white hover:bg-gray-100 cursor-pointer shadow-lg rounded">
                            <li className="p-2" onClick={e => handleLogout()}>Logout</li>
                        </ul>
                    </div>
                    :
                    <div className="flex items-center">
                        <Link to="/login" className="mr-4">Login</Link>
                        <Link to="/signup" className="mr-4">Signup</Link>
                    </div>}

            </nav>
        </div>

    )
}

export default Header

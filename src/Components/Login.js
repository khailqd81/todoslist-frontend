// import { useState } from "react"
// function SignIn() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     return (
//         <form className="md:max-w-[30vw] flex flex-col mx-auto my-8 px-4 py-6 border border-blue-600 rounded shadow-lg">
//             <p className="text-xl text-blue-600 font-semibold mb-4 uppercase">Welcome to PaTyVy</p>
//             <div className="flex flex-col">
//                 <label htmlFor="username" className="self-start mb-2">Username</label>
//                 <input
//                     id="username"
//                     value={username}
//                     type="text"
//                     onChange={e => setUsername(e.target.value)}
//                     className="outline-none border p-2 rounded border-blue-600 mb-2"
//                 />
//             </div>
//             <div className="flex flex-col">
//                 <label htmlFor="password" className="self-start mb-2">Password</label>
//                 <input
//                     id="password"
//                     value={password}
//                     type="password"
//                     onChange={e => setPassword(e.target.value)}
//                     className="outline-none border p-2 rounded border-blue-600 mb-2"
//                 />
//             </div>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Login</button>
//         </form>
//     )
// }

// export default SignIn;

import { SiAzurefunctions } from "react-icons/si";
import { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useStore, actions } from "../store";
import { setLogin } from "../store/actions";
// import {useDispatch} from "react-redux"
// import {setLogin, setRole} from "../store/features/account/accountSlice"
// import {setCategory} from "../store/features/category/categorySlice"
function Login({ onClick }) {
    const [state, dispatch] = useStore();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState({
        username: "",
        password: ""
    });
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleInputsChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const handleBlur = (e) => {
        if (e.target.value?.length <= 0) {
            if (e.target.id === "username") {
                setMessages(prevState => ({
                    ...prevState,
                    username: "Username can not be empty."
                }))
            }
            if (e.target.id === "password") {
                setMessages(prevState => ({
                    ...prevState,
                    password: "Password can not be empty."
                }))
            }
        }
    }

    const handleFocus = (e) => {
        setMessages(prevState => ({
            ...prevState,
            [e.target.id]: ""
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let checkFormOk = true;
        if (inputs.username?.length <= 0) {
            checkFormOk = false;
            setMessages(prevState => ({
                ...prevState,
                username: "Username can not be empty."
            }))
        }
        if (inputs.password?.length <= 0) {
            checkFormOk = false;
            setMessages(prevState => ({
                ...prevState,
                password: "Password can not be empty."
            }))
        }
        if (checkFormOk) {
            axios.post(`${process.env.REACT_APP_BACKEND_API}/account/signin`, {
                username: inputs.username,
                password: inputs.password
            })
                .then(async (response) => {
                    console.log(response.data)
                    if (response.status === 200) {
                        const data = response.data;
                        localStorage.setItem("accessToken", data.accessToken);
                        dispatch(setLogin(true))
                        navigate("/");
                    }
                    else {
                        setMessage(response.data.message)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    let classNames = "block border border-blue-600 p-2 outline-none rounded"
    return (
        <form
            onSubmit={handleSubmit}
            className="md:max-w-[30vw] flex flex-col mx-auto my-8 px-8 py-6 border border-blue-600 rounded shadow-lg"
        >
            <div className="text-2xl text-blue-600 font-semibold mb-4 uppercase">
                Welcome to PaTyVy
            </div>
            <div className="flex flex-col mb-8">
                <label htmlFor="username" className="self-start mb-2">Username</label>
                <input
                    className={messages.username?.length > 0 ? classNames + " border-red-400" : classNames + " border-blue-600 hover:border-blue-500 "}
                    id="username"
                    value={inputs.username}
                    onChange={handleInputsChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
                {messages.username?.length > 0 && <p className="mt-1 text-red-400">{messages.username}</p>}
            </div>
            <div className="flex flex-col mb-8">
                <label htmlFor="password" className="self-start mb-2">Password</label>
                <input
                    className={messages.password?.length > 0 ? classNames + " border-red-400" : classNames + " border-blue-600 hover:border-blue-500 "}
                    id="password"
                    value={inputs.password}
                    onChange={handleInputsChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    type="password"
                />
                {messages.password?.length > 0 && <p className="mt-1 text-red-400">{messages.password}</p>}
            </div>
            {
                message.length !== 0 ? <p className="mt-8 w-full text-red-700 text-center py-3 bg-red-100 border-red-700 border rounded-md">{message}</p> : <p></p>
            }
            <p className="mt-8 w-full text-gray-400">Don't have an account? <span className="text-blue-500 hover:text-blue-400 cursor-pointer" onClick={() => navigate("/signup")}>Signup Now</span></p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Login</button>
        </form>
    )
}

export default Login;
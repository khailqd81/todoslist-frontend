import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BiCalendar } from "react-icons/bi"
import { BsCheck, BsCalendarCheck } from "react-icons/bs"
import { AiOutlinePlus } from "react-icons/ai"
import { FiStar } from "react-icons/fi"
import { FaRegStar, FaStar } from "react-icons/fa"

import MyDatePicker from "./MyDatePicker"
import isLogin from "../utils/isLogin"
var taskDb = [
    {
        task_id: 1,
        content: "Code todo list app",
        deadline: "2022-04-15",
        important: true,
    },
    {
        task_id: 2,
        content: "Go home",
        deadline: "2022-04-16",
        important: false
    },
    {
        task_id: 3,
        content: "Code todo list app Code todo list app Code todo list app Code todo list app Code todo list app",
        deadline: "2022-04-30",
        important: true
    },
    {
        task_id: 4,
        content: "Code todo list app Code todo list app Code todo list app Code todo list app Code todo list appCode todo list app Code todo list app Code todo list app Code todo list app Code todo list app ",
        deadline: "2022-05-31",
        important: false
    },
]
function Task() {
    const [tasks, setTasks] = useState([]);
    const [isBlock, setIsBlock] = useState(false);
    const [modifyContent, setModifyContent] = useState("");
    const [deadline, setDeadline] = useState(new Date());
    const handleDeadlineChange = (date) => {
        console.log(date)
        setDeadline(date)
    }
    const navigate = useNavigate();
    useEffect(() => {
        async function getAllTask() {
            const checkLogin = await isLogin();
            if (!checkLogin.login_state) {
                navigate("/login");
                return;
            }
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/task`, {
                headers: {
                    authorization: checkLogin.accessToken
                }
            })
            if (response.status === 200) {
                setTasks(response.data);
            } else {
                setTasks([]);
            }
        }
        getAllTask();
    }, [navigate])
    const handleSave = (e, task_id) => {
        e.target.parentNode.parentNode.previousElementSibling.style.display = "flex"
        e.target.parentNode.parentNode.style.display = "none"
        let newTasks = [...tasks];
        let taskChangeIndex = tasks.findIndex(task => task.task_id === task_id);
        newTasks[taskChangeIndex].content = modifyContent
        newTasks[taskChangeIndex].deadline = deadline
        setDeadline(new Date());
        setTasks(newTasks)
        setModifyContent("")
        setIsBlock(false);
    }

    const handleCancel = (e) => {
        e.target.parentNode.parentNode.previousElementSibling.style.display = "flex"
        e.target.parentNode.parentNode.style.display = "none"
        setIsBlock(false);
    }

    return (
        <div className="max-w-screen-xl flex mx-auto py-8 min-h-[400px]">
            <ul className="basis-1/4 pr-8">
                <li className='flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'>
                    <BsCalendarCheck size={20} className="text-blue-600 mr-4" />
                    Today
                </li>
                <li className='flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'>
                    <FiStar size={20} className="text-yellow-500 mr-4" />
                    Important
                </li>
                <li className='flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'>
                    <BiCalendar size={20} className="text-green-500 mr-4" />
                    Upcoming
                </li>
            </ul>
            <div className='basis-3/4'>
                <p className="text-blue-500 font-bold text-xl">Your tasks</p>
                {tasks.length !== 0
                    ?
                    <ul className='w-full'>
                        {tasks.map(task => {
                            return (
                                <li
                                    key={task.task_id}
                                >
                                    <div className="flex items-center text-left border-b px-4 py-4 outline-none w-full">
                                        <span className="border border-gray-600 rounded-full mr-2 text-white hover:text-gray-600">
                                            <BsCheck />
                                        </span>
                                        <div
                                            className="cursor-pointer mr-2 grow"
                                            onClick={e => {
                                                if (isBlock) {
                                                    return;
                                                }
                                                console.log("textarea height: ", e.target.offsetHeight)
                                                e.target.parentNode.nextElementSibling.firstChild.style.height = e.target.offsetHeight + 16 + "px"
                                                e.target.parentNode.style.display = "none"
                                                e.target.parentNode.nextElementSibling.style.display = "block"
                                                e.target.parentNode.nextElementSibling.firstChild.focus()
                                                setIsBlock(true);
                                                setModifyContent(task.content);
                                                setDeadline(task.deadline);
                                            }}
                                        >
                                            {task.content}
                                        </div>
                                        {task.important
                                            ?
                                            <span className="ml-auto text-amber-400 hover:text-amber-200 cursor-pointer">
                                                <FaStar size={20} />
                                            </span>
                                            :
                                            <span className="ml-auto text-gray-500 hover:text-gray-700 cursor-pointer">
                                                <FaRegStar size={20} />
                                            </span>}

                                    </div>
                                    <div className="hidden flex flex-col items-center text-left border-b px-4 py-4 cursor-pointer outline-none w-full">
                                        <textarea
                                            className="block resize-none overflow-hidden bg-blue-50 text-left outline-none w-full border border-blue-400 rounded px-4 py-2"
                                            value={modifyContent}
                                            onInput={e => {
                                                // set autoheight for textarea
                                                e.target.style.height = "auto"
                                                e.target.style.height = (e.target.scrollHeight) + "px";
                                            }}
                                            onChange={e => {
                                                setModifyContent(e.target.value)
                                            }}
                                        ></textarea>
                                        <div className='flex justify-between mt-2'>
                                            {/* <div className="flex">
                                                <button
                                                    className='rounded bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-2 py-1 mr-4'
                                                >
                                                    Set Date
                                                </button>
                                            </div> */}
                                            <MyDatePicker deadline={new Date(deadline)} onDeadlineChange={handleDeadlineChange} />
                                            <button
                                                className='min-w-[150px] rounded bg-white hover:bg-gray-100 text-red-500 border border-red-500 px-2 py-1'
                                            >
                                                Mark Important
                                            </button>
                                        </div>
                                        <div className='flex self-start mt-2'>
                                            <button
                                                className='rounded bg-blue-600 hover:bg-blue-500 text-white p-2 mr-4'
                                                onClick={(e) => {
                                                    handleSave(e, task.task_id);
                                                }}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className='rounded bg-gray-600 hover:bg-gray-500 text-white p-2'
                                                onClick={e => {
                                                    handleCancel(e)
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>


                                </li>
                            )
                        })}

                        {/* <li className="flex items-center text-left border-b rounded px-4 py-4 cursor-pointer outline-none">
                        <span className="border border-gray-600 rounded-full mr-2 text-white hover:text-gray-600">
                            <BsCheck />
                        </span>
                        <ContentEditable
                            html={text.current}
                            onBlur={handleBlur}
                            onChange={handleChange} />
                    </li> */}

                        {/* <li className="flex items-center text-left border-b rounded px-4 py-4 cursor-pointer outline-none">
                        <span className="border border-gray-600 rounded-full mr-2 text-white hover:text-gray-600">
                            <BsCheck />
                        </span>
                        Finish todolist
                    </li>
                    <li className="flex items-center text-left border-b rounded px-4 py-4 cursor-pointer outline-none">
                        <span className="border border-gray-600 rounded-full mr-2 text-white hover:text-gray-600">
                            <BsCheck />
                        </span>

                        Finish todolist
                    </li>
                    <li className="flex items-center text-left border-b rounded px-4 py-4 cursor-pointer outline-none">
                        <span className="border border-gray-600 rounded-full mr-2 text-white hover:text-gray-600">
                            <BsCheck />
                        </span>
                        Finish todolist
                    </li> */}
                    </ul>
                    : <div>Add task to your day</div>}

                <div className="group flex px-4 py-4 items-center cursor-pointer"
                    onClick={e => {
                        if (isBlock) {
                            return;
                        }
                        console.log("textarea height: ", e.target.offsetHeight)
                        e.target.parentNode.nextElementSibling.firstChild.style.height = e.target.offsetHeight + 16 + "px"
                        e.target.parentNode.style.display = "none"
                        e.target.parentNode.nextElementSibling.style.display = "block"
                        e.target.parentNode.nextElementSibling.firstChild.focus()
                        setIsBlock(true);
                        // setModifyContent(task.content);
                        // setDeadline(task.deadline);
                    }}
                >
                    <span className="group-hover:text-white group-hover:bg-red-500 rounded-full mr-2 text-blue-600">
                        <AiOutlinePlus size={25} />
                    </span>
                    <span className='group-hover:text-red-500 text-gray-600'>Add task</span>

                </div>
                <div className="hidden flex flex-col items-center text-left border-b px-4 py-4 cursor-pointer outline-none w-full">
                    <textarea
                        className="block resize-none overflow-hidden bg-blue-50 text-left outline-none w-full border border-blue-400 rounded px-4 py-2"
                        value={modifyContent}
                        onInput={e => {
                            // set autoheight for textarea
                            e.target.style.height = "auto"
                            e.target.style.height = (e.target.scrollHeight) + "px";
                        }}
                        onChange={e => {
                            setModifyContent(e.target.value)
                        }}
                    ></textarea>
                    <div className='flex justify-between mt-2 w-full'>

                        <MyDatePicker deadline={new Date(deadline)} onDeadlineChange={handleDeadlineChange} />
                        <button
                            className='min-w-[150px] rounded bg-white hover:bg-gray-100 text-red-500 border border-red-500 px-2 py-1'
                        >
                            Mark Important
                        </button>
                    </div>
                    <div className='flex self-start mt-2'>
                        <button
                            className='rounded bg-blue-600 hover:bg-blue-500 text-white p-2 mr-4'
                            onClick={(e) => {
                                // handleSave(e, task.task_id);
                            }}
                        >
                            Add task
                        </button>
                        <button
                            className='rounded bg-gray-600 hover:bg-gray-500 text-white p-2'
                            onClick={e => {
                                handleCancel(e)
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Task
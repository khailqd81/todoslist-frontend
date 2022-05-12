import { useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import axios from "axios"
// loading
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// icons
import { BiCalendar } from "react-icons/bi"
import { BsClipboardCheck, BsListCheck } from "react-icons/bs"
import { HiOutlineLightBulb } from "react-icons/hi"
import { AiOutlinePlus } from "react-icons/ai"
import { FiStar } from "react-icons/fi"
// custom
import MyDatePicker from "./MyDatePicker"
import isLogin from "../utils/isLogin"

function TaskContainer() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState(`Today ${new Date().toLocaleDateString('vi-vn')}`);
    // chỉ cho phép một ô nhập liệu tại 1 thời điểm
    const [isBlock, setIsBlock] = useState(false);
    // lưu nội dung của textarea
    const [modifyContent, setModifyContent] = useState("");
    const [markImportant, setMarkImportant] = useState(false);
    const [deadline, setDeadline] = useState(new Date());
    //
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function getAllTask() {
            setIsLoading(true);
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
            setIsLoading(false);
        }
        getAllTask();
    }, [navigate])

    // nhóm hàm cập nhật các state khi người dùng nhập
    const handleBlock = (block) => {
        setIsBlock(block)
    }
    const handleModifyContent = (content) => {
        setModifyContent(content)
    }
    const handleDeadlineChange = (date) => {
        setDeadline(new Date(date));
    }
    const handleMarkImportant = (important) => {
        setMarkImportant(important)
    }

    // nhóm hàm xử lý gọi API để thêm/xóa/sửa 
    const handleUpdateTask = async (e, task) => {
        if (task.content.length === 0 || task.content.trim().length === 0) {
            return;
        }
        e.target.disabled = true;
        try {
            const checkLogin = await isLogin();
            if (!checkLogin.login_state) {
                e.target.disabled = false;
                navigate("/")
                return
            }
            const response = await axios.patch(`${process.env.REACT_APP_BACKEND_API}/task/update`, {
                task: {
                    ...task
                }
            }, {
                headers: {
                    authorization: checkLogin.accessToken
                }
            })
            if (response.status === 200 && response.data) {
                const indexInTasks = tasks.findIndex(task => task.task_id === response.data.task_id);
                let modifyTasks = [...tasks];
                modifyTasks[indexInTasks] = response.data;
                setTasks(modifyTasks)
            }
            setIsBlock(false)
            setModifyContent("");
            setDeadline(new Date());
            setMarkImportant(false);
        } catch (error) {
            console.log(error);
        }
        e.target.disabled = false;
    }

    const handleUpdateFinish = async (e, task) => {
        const fiTask = {
            task_id: task.task_id,
            content: task.content,
            deadline: task.deadline,
            important: task.important,
            is_finish: true,
            is_deleted: task.is_deleted
        }
        await handleUpdateTask(e, fiTask);
    }

    const handleUpdateDeleted = async (e, task,) => {
        const delTask = {
            task_id: task.task_id,
            content: task.content,
            deadline: task.deadline,
            important: task.important,
            is_finish: task.is_finish,
            is_deleted: true
        }
        e.target.disabled = true;
        e.target.parentNode.parentNode.parentNode.style.display = "none"
        await handleUpdateTask(e, delTask);
        e.target.disabled = false;
        setIsBlock(false);
        setMarkImportant(false);
        setDeadline(new Date());
    }

    const handleSave = async (e, task) => {
        e.target.parentNode.parentNode.previousElementSibling.style.display = "flex"
        e.target.parentNode.parentNode.style.display = "none"
        const saveTask = {
            task_id: task.task_id,
            content: modifyContent,
            deadline: deadline,
            important: markImportant,
            is_finish: task.is_finish,
            is_deleted: task.is_deleted
        }
        setIsBlock(false);
        setMarkImportant(false);
        setDeadline(new Date());
        await handleUpdateTask(e, saveTask);
    }

    const handleCancel = (e) => {
        e.target.parentNode.parentNode.previousElementSibling.style.display = "flex"
        e.target.parentNode.parentNode.style.display = "none"
        setIsBlock(false);
        setMarkImportant(false);
        setDeadline(new Date());
    }

    const handleAddTask = async (e) => {
        if (modifyContent.length === 0 || modifyContent.trim().length === 0) {
            return;
        }
        e.target.disabled = true;
        try {
            const checkLogin = await isLogin();
            if (!checkLogin.login_state) {
                e.target.disabled = false;
                navigate("/")
                return
            }
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/task/add`, {
                task: {
                    content: modifyContent,
                    deadline: deadline,
                    important: markImportant
                }
            }, {
                headers: {
                    authorization: checkLogin.accessToken
                }
            })
            if (response.status === 200 && response.data) {
                setTasks(prev => {
                    return [...prev, response.data];
                })

            }
            setIsBlock(false)
            setModifyContent("");
            setDeadline(new Date());
            setMarkImportant(false);
            e.target.parentNode.parentNode.style.display = "none"
            e.target.parentNode.parentNode.previousElementSibling.style.display = "flex"
        } catch (error) {
            console.log(error);
        }
        e.target.disabled = false;
    }

    // Cật nhập important khi nhấn vào ngôi sao
    const handleUpdateImportant = async (e, task, index) => {
        const imTask = {
            task_id: task.task_id,
            content: task.content,
            // deadline: task.deadline,
            important: !task.important,
            is_finish: task.is_finish,
            is_deleted: task.is_deleted
        }
        console.log("im task: ", imTask)
        await handleUpdateTask(e, imTask, index);
    }

    const handleClickAddTask = (e) => {
        if (isBlock) {
            return;
        }
        console.log("textarea height: ", e.target.offsetHeight)
        e.target.parentNode.nextElementSibling.firstChild.style.height = e.target.offsetHeight + 16 + "px"
        e.target.parentNode.style.display = "none"
        e.target.parentNode.nextElementSibling.style.display = "block"
        e.target.parentNode.nextElementSibling.firstChild.focus()
        setIsBlock(true);
        setModifyContent("");
        setDeadline(new Date());
    }

    return (
        <div className="max-w-screen-xl flex flex-wrap mx-auto py-8 min-h-[calc(100vh-210px)]">
            <ul className="basis-full md:basis-1/4 px-4 md:pl-0 md:pr-8">
                <li
                //className='flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'

                >
                    <NavLink
                        className={({ isActive }) => isActive ? 'flex items-center py-1 px-2 bg-gray-200 cursor-pointer delay-75 rounded' : 'flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'}
                        onClick={() => {
                            setIsBlock(false);
                            setTitle(`All task ${new Date().toLocaleDateString('vi-vn')}`)
                            //navigate("/tasks")
                        }}
                        to="/tasks/all"
                    >
                        <BsListCheck size={20} className="text-slate-400 mr-4" />
                        All tasks
                    </NavLink>


                </li>
                <li
                //className='flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'

                >
                    <NavLink
                        to="/tasks/today"
                        className={({ isActive }) => isActive ? 'flex items-center py-1 px-2 bg-gray-200 cursor-pointer delay-75 rounded' : 'flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'}
                        onClick={() => {
                            setIsBlock(false);
                            setTitle(`Today ${new Date().toLocaleDateString('vi-vn')}`)
                            console.log("onclick run")
                            //navigate("/tasks/today")
                        }}
                    >
                        <HiOutlineLightBulb size={20} className="text-yellow-400 mr-4" />
                        Today
                    </NavLink>

                </li>
                <li>
                    <NavLink
                        to="/tasks/important"
                        className={({ isActive }) => isActive ? 'flex items-center py-1 px-2 bg-gray-200 cursor-pointer delay-75 rounded' : 'flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'}
                        onClick={() => {
                            // const importantTasks = tasks.filter(task => task.important)
                            setIsBlock(false);
                            setTitle("Important tasks");
                            //navigate("/tasks/important")
                        }}
                    >
                        <FiStar size={20} className="text-yellow-500 mr-4" />
                        Important
                    </NavLink>

                </li>
                <li>
                    <NavLink
                        to="/tasks/upcoming"
                        className={({ isActive }) => isActive ? 'flex items-center py-1 px-2 bg-gray-200 cursor-pointer delay-75 rounded' : 'flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'}
                        onClick={() => {
                            // const importantTasks = tasks.filter(task => task.important)
                            setIsBlock(false);
                            setTitle("Upcoming tasks");
                            //navigate("/tasks/upcoming")
                        }}
                    >
                        <BiCalendar size={20} className="text-green-500 mr-4" />
                        Upcoming
                    </NavLink>

                </li>
                <li>
                    <NavLink
                        to="/tasks/finished"
                        className={({ isActive }) => isActive ? 'flex items-center py-1 px-2 bg-gray-200 cursor-pointer delay-75 rounded' : 'flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'}
                        onClick={() => {
                            // const importantTasks = tasks.filter(task => task.important)
                            setIsBlock(false);
                            setTitle(`Finished tasks`)
                            //navigate("/tasks/finished")
                        }}
                    >
                        <BsClipboardCheck size={20} className="text-blue-600 mr-4" />
                        Finished
                    </NavLink>

                </li>
            </ul>
            {isLoading
                ?
                <div className='basis-full md:basis-3/4 px-2 md:px-0'>
                    <h1 className="font-bold text-xl mb-4"><Skeleton highlightColor="#CCCCCC" duration={1.5} /></h1>
                    <Skeleton count={4} highlightColor="#CCCCCC" duration={1.5} />
                </div>
                :
                <div className='basis-full md:basis-3/4 px-2 md:px-0'>
                    <p className="text-blue-500 font-bold text-xl">{title}</p>
                    <Outlet context={{
                        tasks,
                        isBlock,
                        modifyContent,
                        deadline,
                        markImportant,
                        handleBlock,
                        handleModifyContent,
                        handleDeadlineChange,
                        handleMarkImportant,
                        handleUpdateFinish,
                        handleUpdateDeleted,
                        handleUpdateImportant,
                        handleUpdateTask,
                        handleSave,
                        handleCancel
                    }} />
                    <div className="group flex px-4 py-4 items-center">
                        <span
                            className="group-hover:text-white group-hover:bg-red-500 rounded-full mr-2 text-blue-600 cursor-pointer"
                            onClick={e => {
                                handleClickAddTask(e)
                            }}
                        >
                            <AiOutlinePlus size={25} />
                        </span>
                        <span
                            className='group-hover:text-red-500 text-gray-600 cursor-pointer flex-1 text-left'
                            onClick={e => {
                                handleClickAddTask(e)
                            }}
                        >
                            Add task
                        </span>

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
                                className={
                                    markImportant
                                        ? 'min-w-[150px] rounded bg-red-500 text-white px-2 py-1'
                                        : 'min-w-[150px] rounded bg-white hover:bg-gray-100 text-red-500 border border-red-500 px-2 py-1'}
                                onClick={e => {

                                    setMarkImportant(!markImportant);
                                }}
                            >
                                Mark Important
                            </button>
                        </div>
                        <div className='flex self-start mt-2'>
                            <button
                                className='rounded bg-blue-600 hover:bg-blue-500 text-white p-2 mr-4 disabled:bg-blue-300'
                                onClick={(e) => {
                                    handleAddTask(e);
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
                </div>}
        </div >
    )
}

export default TaskContainer
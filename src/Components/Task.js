import axios from "axios"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { BiCalendar } from "react-icons/bi"
import { BsCalendarCheck, BsClipboardCheck } from "react-icons/bs"
import { HiOutlineLightBulb } from "react-icons/hi"
import { AiOutlinePlus } from "react-icons/ai"
import { FiStar } from "react-icons/fi"

import MyDatePicker from "./MyDatePicker"
import isLogin from "../utils/isLogin"

function Task() {
    const [tasks, setTasks] = useState([]);
    const [filterTasks, setFilterTasks] = useState([]);
    const [title, setTitle] = useState(`Today ${new Date().toLocaleDateString('vi-vn')}`);
    const [isBlock, setIsBlock] = useState(false);
    const [modifyContent, setModifyContent] = useState("");
    const [markImportant, setMarkImportant] = useState(false);
    // const [markFinish, setMarkFinish] = useState(false);
    const [deadline, setDeadline] = useState(new Date());

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
                // const todayTasks = response.data.filter(task => {
                //     const taskDeadline = new Date(task.deadline).setHours(0, 0, 0, 0);
                //     const today = new Date().setHours(0, 0, 0, 0);
                //     return taskDeadline.valueOf() === today.valueOf();
                // })
                // const overdueTasks = response.data.filter(task => {
                //     const taskDeadline = new Date(task.deadline).setHours(0, 0, 0, 0);
                //     const today = new Date().setHours(0, 0, 0, 0);
                //     return taskDeadline.valueOf() < today.valueOf();
                // })
                // setFilterTasks(todayTasks);
            } else {
                setTasks([]);
            }
        }
        getAllTask();
    }, [navigate])

    const handleBlock = (block) => {
        setIsBlock(block)
    }
    const handleModifyContent = (content) => {
        setModifyContent(content)
    }
    const handleDeadlineChange = (date) => {
        console.log("handle dl change: ", date)
        setDeadline(date)
    }
    const handleMarkImportant = (important) => {
        console.log("handle im change: ", important);
        setMarkImportant(important)
    }
    const handleUpdateFinish = async (e, task, index) => {
        const fiTask = {
            task_id: task.task_id,
            content: task.content,
            deadline: task.deadline,
            important: false,
            is_finish: true,
            is_deleted: task.is_deleted
        }
        await handleUpdateTask(e, fiTask, index);
    }

    const handleSave = async (e, task, index) => {
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
        console.log("save task: ", saveTask)
        await handleUpdateTask(e, saveTask, index);
        // const overdueTasks = tasks.filter(task => {
        //     const taskDeadline = new Date(task.deadline).setHours(0, 0, 0, 0);
        //     const today = new Date().setHours(0, 0, 0, 0);
        //     return taskDeadline.valueOf() < today.valueOf();
        // })
        // let newTasks = [...tasks];
        // let taskChangeIndex = tasks.findIndex(task => task.task_id === task_id);
        // newTasks[taskChangeIndex].content = modifyContent
        // newTasks[taskChangeIndex].deadline = deadline
        // setDeadline(new Date());
        // setTasks(newTasks)
        // setModifyContent("")
        // setIsBlock(false);
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
                console.log(response.data)
                const newTask = response.data;
                setTasks(prev => {
                    return [...prev, response.data];
                })
                if (new Date(newTask.deadline).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0))
                    setFilterTasks(prev => {
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
            deadline: task.deadline,
            important: !task.important,
            is_finish: task.is_finish,
            is_deleted: task.is_deleted
        }
        await handleUpdateTask(e, imTask, index);
    }

    const handleUpdateTask = async (e, task, index) => {
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
                    task_id: task.task_id,
                    content: task.content,
                    deadline: task.deadline,
                    important: task.important,
                    is_finish: task.is_finish,
                    is_deleted: task.is_deleted
                }
            }, {
                headers: {
                    authorization: checkLogin.accessToken
                }
            })
            if (response.status === 200 && response.data) {

                let modifyTasks = [...filterTasks];
                modifyTasks[index] = response.data;
                console.log("filter: ", modifyTasks)
                setFilterTasks(modifyTasks)

                const indexInTasks = tasks.findIndex(task => task.task_id === response.data.task_id);
                modifyTasks = [...tasks];
                modifyTasks[indexInTasks] = response.data;
                console.log("tasks: ", modifyTasks)
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
        <div className="max-w-screen-xl flex mx-auto py-8 min-h-[calc(100vh-210px)]">
            <ul className="basis-1/4 pr-8">
                <li
                    className='flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'
                    onClick={() => {
                        const todayTasks = tasks.filter(task => {
                            const taskDeadline = new Date(task.deadline).setHours(0, 0, 0, 0);
                            const today = new Date().setHours(0, 0, 0, 0);
                            return taskDeadline.valueOf() === today.valueOf();
                        })
                        setFilterTasks(todayTasks);
                        setTitle(`Today ${new Date().toLocaleDateString('vi-vn')}`)
                        navigate("/tasks/today")
                    }}
                >
                    <HiOutlineLightBulb size={20} className="text-yellow-400 mr-4" />
                    Today
                </li>
                <li
                    className='flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'
                    onClick={() => {
                        const importantTasks = tasks.filter(task => task.important)
                        setFilterTasks(importantTasks);
                        setTitle("Important tasks");
                        navigate("/tasks/important")
                    }}
                >
                    <FiStar size={20} className="text-yellow-500 mr-4" />
                    Important
                </li>
                <li
                    className='flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'
                    onClick={() => {
                        const upcomingTasks = tasks.filter(task => {
                            const taskDeadline = new Date(task.deadline).setHours(0, 0, 0, 0);
                            const today = new Date().setHours(0, 0, 0, 0);
                            return taskDeadline.valueOf() > today.valueOf();
                        })
                        setFilterTasks(upcomingTasks);
                        setTitle("Upcoming tasks");
                        navigate("/tasks/upcoming")
                    }}
                >
                    <BiCalendar size={20} className="text-green-500 mr-4" />
                    Upcoming
                </li>
                <li
                    className='flex items-center py-1 px-2 hover:bg-gray-200 cursor-pointer delay-75 rounded'
                    onClick={() => {
                        setTitle(`Finished tasks`)
                        navigate("/tasks/finished")
                    }}
                >
                    <BsClipboardCheck size={20} className="text-blue-600 mr-4" />
                    Finished
                </li>
            </ul>
            <div className='basis-3/4'>
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
                    handleUpdateImportant,
                    handleUpdateTask,
                    handleSave,
                    handleCancel
                }} />
                {/* <p className="text-gray-500 font-semibold text-lg text-left mt-4 mb-2">Overdue</p>
                <TaskView
                    tasks={overdueTasks}
                    isBlock={isBlock}
                    modifyContent={modifyContent}
                    deadline={deadline}
                    setIsBlock={handleBlock}
                    setModifyContent={handleModifyContent}
                    handleDeadlineChange={handleDeadlineChange}
                    setMarkImportant={handleMarkImportant}
                    handleUpdateImportant={handleUpdateImportant}
                    handleUpdateTask={handleUpdateTask}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                />
                <p className="text-gray-500 font-semibold text-lg text-left mt-4 mb-2">Today</p>
                <TaskView
                    tasks={filterTasks}
                    isBlock={isBlock}
                    modifyContent={modifyContent}
                    deadline={deadline}
                    setIsBlock={handleBlock}
                    setModifyContent={handleModifyContent}
                    handleDeadlineChange={handleDeadlineChange}
                    setMarkImportant={handleMarkImportant}
                    handleUpdateImportant={handleUpdateImportant}
                    handleUpdateTask={handleUpdateTask}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                /> */}
                {/* {tasks.length !== 0
                    ?
                    <ul className='w-full'>
                        {filterTasks.map((task, index) => {
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
                                            <span
                                                className="ml-auto text-amber-400 hover:text-amber-200 cursor-pointer"
                                                onClick={(e) => {
                                                    handleUpdateTask(e, task, index);
                                                }}>
                                                <FaStar size={20} />
                                            </span>
                                            :
                                            <span
                                                className="ml-auto text-gray-500 hover:text-gray-700 cursor-pointer"
                                                onClick={(e) => {
                                                    handleUpdateTask(e, task, index);
                                                }}>
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
                                            <MyDatePicker deadline={new Date(deadline)} onDeadlineChange={handleDeadlineChange} />
                                            <button
                                                className='min-w-[150px] rounded bg-white hover:bg-gray-100 text-red-500 border border-red-500 px-2 py-1'
                                                onClick={(e, index) => {
                                                    setModifyContent(task.content);
                                                    setDeadline(task.deadline);
                                                    setMarkImportant(!task.important);
                                                    handleUpdateTask(e, index);
                                                }}
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
                    </ul>
                    : <div className="py-4 hidden">Add task to your day</div>
                } */}

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
            </div>
        </div >
    )
}

export default Task
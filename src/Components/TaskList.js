import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa"
import { BsCheck } from "react-icons/bs"
import MyDatePicker from "./MyDatePicker";
function TaskList({ tasks, isBlock, modifyContent, deadline, markImportant, handleBlock, handleModifyContent, handleDeadlineChange, handleMarkImportant, handleUpdateFinish, handleUpdateImportant, handleUpdateTask, handleSave, handleCancel }) {
    return (
        <React.Fragment>
            {tasks.length !== 0
                ?
                <ul className='w-full'>
                    {tasks.map((task, index) => {
                        return (
                            <li
                                key={task.task_id}
                            >
                                <div className="flex items-center text-left border-b px-4 py-4 outline-none w-full">
                                    <span
                                        className="border border-gray-600 rounded-full mr-2 text-white hover:text-gray-600"
                                        onClick={(e) => {
                                            handleUpdateFinish(e, task, index);
                                        }}
                                    >
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
                                            handleBlock(true);
                                            handleModifyContent(task.content);
                                            handleDeadlineChange(task.deadline);
                                            handleMarkImportant(task.important);
                                        }}
                                    >
                                        {task.content}
                                    </div>
                                    {task.important
                                        ?
                                        <span
                                            className="ml-auto text-amber-400 hover:text-amber-200 cursor-pointer"
                                            onClick={(e) => {
                                                handleUpdateImportant(e, task, index);
                                            }}>
                                            <FaStar size={20} />
                                        </span>
                                        :
                                        <span
                                            className="ml-auto text-gray-500 hover:text-gray-700 cursor-pointer"
                                            onClick={(e) => {
                                                handleUpdateImportant(e, task, index);
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
                                            handleModifyContent(e.target.value)
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
                                            className={markImportant
                                                ? 'min-w-[150px] rounded bg-red-500 text-white px-2 py-1'
                                                : 'min-w-[150px] rounded bg-white hover:bg-gray-100 text-red-500 border border-red-500 px-2 py-1'}
                                            onClick={() => {
                                                handleMarkImportant(!task.important);
                                                // handleModifyContent(task.content);
                                                // handleDeadlineChange(task.deadline);
                                                // handleUpdateTask(e, task, index);
                                            }}
                                        >
                                            Mark Important
                                        </button>
                                    </div>
                                    <div className='flex self-start mt-2'>
                                        <button
                                            className='rounded bg-blue-600 hover:bg-blue-500 text-white p-2 mr-4'
                                            onClick={(e) => {
                                                handleSave(e, task, index);
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
                : <div className="py-4 hidden">Add task to your day</div>
            }
        </React.Fragment>
    )
}

export default TaskList;

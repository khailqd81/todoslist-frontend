import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa"
import { BsCheck } from "react-icons/bs"
import { FaRegTrashAlt } from "react-icons/fa"
import MyDatePicker from "./MyDatePicker";
function TaskList({ tasks, isBlock, modifyContent, deadline, markImportant, handleBlock, handleModifyContent, handleDeadlineChange, handleMarkImportant, handleUpdateFinish, handleUpdateDeleted, handleUpdateImportant, handleSave, handleCancel }) {
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
                                            handleUpdateFinish(e, task,);
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
                                        <button
                                            className="ml-auto text-amber-400 hover:text-amber-200 cursor-pointer"
                                            onClick={async (e) => {
                                                console.log(e.target.parentNode.disabled)
                                                console.log(e.detail)

                                                if (e.target.parentNode.disabled || e.detail > 1) {
                                                    return;
                                                }
                                                e.target.parentNode.disabled = true;
                                                await handleUpdateImportant(e, task);
                                                e.target.parentNode.disabled = false;
                                            }}
                                            disabled={false}
                                        >
                                            <FaStar size={20} />
                                        </button>
                                        :
                                        <button
                                            className="ml-auto text-gray-500 hover:text-gray-700 cursor-pointer"
                                            onClick={async (e) => {
                                                console.log(e.target.parentNode.disabled)
                                                console.log(e.detail)
                                            
                                                if (e.target.parentNode.disabled || e.detail > 1) {
                                                    return;
                                                }
                                                e.target.parentNode.disabled = true;
                                                await handleUpdateImportant(e, task);
                                                e.target.parentNode.disabled = false;
                                            }}
                                            disabled={false}
                                        >
                                            <FaRegStar size={20} />
                                        </button>}

                                </div>
                                <div className="hidden flex flex-col items-center text-left border-b px-4 py-4 outline-none w-full">
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
                                                ? 'min-w-[150px] rounded bg-red-500 text-white px-2 py-1 cursor-pointer'
                                                : 'min-w-[150px] rounded bg-white hover:bg-gray-100 text-red-500 border border-red-500 px-2 py-1 cursor-pointer'}
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
                                            className='rounded bg-blue-600 hover:bg-blue-500 text-white p-2 mr-4 cursor-pointer'
                                            onClick={(e) => {
                                                handleSave(e, task);
                                            }}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className='rounded bg-gray-600 hover:bg-gray-500 text-white p-2 cursor-pointer'
                                            onClick={e => {
                                                handleCancel(e)
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className='ml-auto text-zinc-400 hover:text-zinc-500 p-2 cursor-pointer'
                                            onClick={e => {
                                                handleUpdateDeleted(e, task)
                                            }}
                                        >
                                            <FaRegTrashAlt size={20} />
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

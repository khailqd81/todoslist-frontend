import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa"
import { BsCheck } from "react-icons/bs"
function FinishTask() {
    const {
        tasks,
        handleUpdateDeleted
    } = useOutletContext();
    const [finishTasks, setFinishTasks] = useState([]);
    useEffect(() => {
        const newFinishTasks = tasks.filter(task => task.is_finish === true && task.is_deleted === false)
        setFinishTasks(newFinishTasks);
    }, [tasks])
    return (
        <React.Fragment>
            {finishTasks.length !== 0
                ?
                <ul className='w-full'>
                    {finishTasks.map((task, index) => {
                        return (
                            <li
                                key={task.task_id}
                            >
                                <div className="flex items-center text-left border-b px-4 py-4 outline-none w-full">
                                    <span className="border border-green-600 rounded-full mr-2 text-green-600">
                                        <BsCheck />
                                    </span>
                                    <div className=" mr-2 grow line-through" >
                                        {task.content}
                                    </div>
                                    <button
                                        className='ml-auto text-zinc-400 hover:text-zinc-500 p-2 cursor-pointer'
                                        onClick={e => {
                                            handleUpdateDeleted(e, task, index)
                                        }}
                                    >
                                        <FaRegTrashAlt size={20} />
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                : <div className="py-4 hidden">There is nothing here.</div>
            }
        </React.Fragment>
    )
}

export default FinishTask;

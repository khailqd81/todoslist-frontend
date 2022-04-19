import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa"
import { BsCheck } from "react-icons/bs"
function FinishTask() {
    const {
        tasks
    } = useOutletContext();
    const [finishTasks, setFinishTasks] = useState([]);
    useEffect(() => {
        const newFinishTasks = tasks.filter(task => task.is_finish === true)
        console.log(newFinishTasks);
        setFinishTasks(newFinishTasks);
    }, [tasks])
    return (
        <React.Fragment>
            {finishTasks.length !== 0
                ?
                <ul className='w-full'>
                    {finishTasks.map((task) => {
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
                                    {task.important
                                        ?
                                        <span className="ml-auto text-amber-400">
                                            <FaStar size={20} />
                                        </span>
                                        :
                                        <span className="ml-auto text-gray-500">
                                            <FaRegStar size={20} />
                                        </span>}

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

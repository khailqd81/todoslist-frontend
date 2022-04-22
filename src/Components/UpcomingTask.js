import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { useOutletContext } from "react-router-dom"
import TaskList from "./TaskList";
function ImportantTask() {
    const {
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
        handleCancel } = useOutletContext();
    // const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [upcomingTasksByDays, setUpcomingTasksByDays] = useState([]);
    useEffect(() => {
        let newUpcomingTasks = tasks.filter(task => {
            const taskDeadline = new Date(task.deadline).setHours(0, 0, 0, 0);
            const today = new Date().setHours(0, 0, 0, 0);
            return taskDeadline.valueOf() > today.valueOf() && !task.is_finish;
        })
        // Xử lý gom nhóm task theo ngày
        let arrTasksByDays = [];
        let arrTasks = [...newUpcomingTasks];
        if (arrTasks.length > 0) {
            // Lọc ra ngày của các task
            let arrDays = [];
            for (let i = 0; i < arrTasks.length; i++) {
                let taskDeadline = new Date(arrTasks[i].deadline).setHours(0, 0, 0, 0);
                arrDays.push(arrTasks[i].deadline);
                for (let j = i + 1; j < arrTasks.length; j++) {
                    let compareTaskDeadline = new Date(arrTasks[j].deadline).setHours(0, 0, 0, 0);
                    if (taskDeadline.valueOf() === compareTaskDeadline.valueOf()) {
                        arrTasks.splice(j, 1);
                        j--;
                    }
                }
            }
            // Gom nhóm các task theo ngày
            arrTasks = [...newUpcomingTasks];
            for (let i = 0; i < arrDays.length; i++) {
                let tasksByDay = [];
                let taskDeadline = new Date(arrDays[i]).setHours(0, 0, 0, 0);
                for (let j = 0; j < arrTasks.length; j++) {
                    let compareTaskDeadline = new Date(arrTasks[j].deadline).setHours(0, 0, 0, 0);
                    if (taskDeadline.valueOf() === compareTaskDeadline.valueOf()) {
                        tasksByDay.push(...arrTasks.splice(j, 1));
                        j--;
                    }
                }
                arrTasksByDays.push(tasksByDay);
            }
            setUpcomingTasksByDays(arrTasksByDays);
        } else {
            setUpcomingTasksByDays([]);
        }
    }, [tasks])



    return (
        <React.Fragment>
            {
                upcomingTasksByDays.length > 0 && upcomingTasksByDays[0] &&
                (
                    upcomingTasksByDays.map(upcomingTasksByDay => {
                        return (
                            <div key={upcomingTasksByDay[0].deadline}>
                                <p className="text-gray-500 font-semibold text-lg text-left mt-6 mb-1">{new Date(upcomingTasksByDay[0].deadline).toLocaleDateString("vi-vn")}</p>
                                <TaskList
                                    tasks={upcomingTasksByDay}
                                    isBlock={isBlock}
                                    modifyContent={modifyContent}
                                    deadline={deadline}
                                    markImportant={markImportant}
                                    handleBlock={handleBlock}
                                    handleModifyContent={handleModifyContent}
                                    handleDeadlineChange={handleDeadlineChange}
                                    handleMarkImportant={handleMarkImportant}
                                    handleUpdateFinish={handleUpdateFinish}
                                    handleUpdateDeleted={handleUpdateDeleted}
                                    handleUpdateImportant={handleUpdateImportant}
                                    handleUpdateTask={handleUpdateTask}
                                    handleSave={handleSave}
                                    handleCancel={handleCancel}
                                />
                            </div>
                        )
                    })
                )
            }

        </React.Fragment>

    )
}

export default ImportantTask;

import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"
import TaskList from "./TaskList";
function TodayTask() {
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
        handleUpdateImportant,
        handleUpdateTask,
        handleSave,
        handleCancel } = useOutletContext();
    const [todayTasks, setTodayTasks] = useState([]);
    const [overdueTasks, setOverdueTasks] = useState([]);
    useEffect(() => {
        const overdueTasks = tasks.filter(task => {
            const taskDeadline = new Date(task.deadline).setHours(0, 0, 0, 0);
            const today = new Date().setHours(0, 0, 0, 0);
            return taskDeadline.valueOf() < today.valueOf() && !task.is_finish;
        })
        setOverdueTasks(overdueTasks);
        const todayTasks = tasks.filter(task => {
            const taskDeadline = new Date(task.deadline).setHours(0, 0, 0, 0);
            const today = new Date().setHours(0, 0, 0, 0);
            return taskDeadline.valueOf() === today.valueOf() && !task.is_finish;
        })
        setTodayTasks(todayTasks);
    }, [tasks])
    return (
        <div>
            {overdueTasks.length !== 0 &&
                <React.Fragment>
                    <p className="text-gray-500 font-semibold text-lg text-left mt-4 mb-2">Overdue</p>
                    <TaskList
                        tasks={overdueTasks}
                        isBlock={isBlock}
                        modifyContent={modifyContent}
                        deadline={deadline}
                        markImportant={markImportant}
                        handleBlock={handleBlock}
                        handleModifyContent={handleModifyContent}
                        handleDeadlineChange={handleDeadlineChange}
                        handleMarkImportant={handleMarkImportant}
                        handleUpdateFinish={handleUpdateFinish}
                        handleUpdateImportant={handleUpdateImportant}
                        handleUpdateTask={handleUpdateTask}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </React.Fragment>}
            {todayTasks.length !== 0 &&
                <React.Fragment>
                    <p className="text-gray-500 font-semibold text-lg text-left mt-4 mb-2">{"Today"}</p>
                    <TaskList
                        tasks={todayTasks}
                        isBlock={isBlock}
                        modifyContent={modifyContent}
                        deadline={deadline}
                        markImportant={markImportant}
                        handleBlock={handleBlock}
                        handleModifyContent={handleModifyContent}
                        handleDeadlineChange={handleDeadlineChange}
                        handleMarkImportant={handleMarkImportant}
                        handleUpdateFinish={handleUpdateFinish}
                        handleUpdateImportant={handleUpdateImportant}
                        handleUpdateTask={handleUpdateTask}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </React.Fragment>}
        </div>
    )
}

export default TodayTask;

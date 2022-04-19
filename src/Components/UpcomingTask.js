import { useEffect, useState } from "react";
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
        handleUpdateImportant,
        handleUpdateTask,
        handleSave,
        handleCancel } = useOutletContext();
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    useEffect(() => {
        const newUpcomingTasks = tasks.filter(task => {
            const taskDeadline = new Date(task.deadline).setHours(0, 0, 0, 0);
            const today = new Date().setHours(0, 0, 0, 0);
            return taskDeadline.valueOf() > today.valueOf() && !task.is_finish;
        })
        setUpcomingTasks(newUpcomingTasks);
    }, [tasks])
    return (
        <TaskList
            tasks={upcomingTasks}
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
    )
}

export default ImportantTask;

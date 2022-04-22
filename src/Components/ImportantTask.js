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
        handleUpdateDeleted,
        handleUpdateImportant,
        handleUpdateTask,
        handleSave,
        handleCancel } = useOutletContext();
    const [importantTasks, setImportantTasks] = useState([]);
    useEffect(() => {
        const newImportantTasks = tasks.filter(task => task.important && !task.is_finish)
        setImportantTasks(newImportantTasks);
    }, [tasks])
    return (
        <TaskList
            tasks={importantTasks}
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
    )
}

export default ImportantTask;

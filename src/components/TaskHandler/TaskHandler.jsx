import React, {useState} from 'react';
import styles from './TaskHandler.module.css';

// Components
import TaskList from '../TaskList/TaskList';
import UserInputHandler from '../UserInputHandler/UserInputHandler';

export default function TaskHandler() {
    const [tasks, setTasks] = useState([]);
    const hasTasks = tasks.length > 0;
    const hasCompletedTasks = tasks.filter(task => task.completion).length > 0;

    function handleAddTask(userInput) {
        setTasks((prev) => (
            [...prev,
                {
                    taskName: userInput,
                    completion: false,
                    id: Date.now().toString(36),
                }
            ].sort(sortTasks)
        ));
    }

    function handleRemoveTask(id){
        setTasks((prev) => prev.filter(task => task.id !== id));
    }

    function removeCompletedTasks(){
        setTasks((prev) => prev.filter(task => !task.completion));
    }

    function toggleCompletion(id) {
        setTasks((prev) => {
            const targetTask = {...prev.find(task => task.id === id)};
            targetTask.completion = !targetTask.completion;

            let newTaskList = prev.filter(task => task.id !== id);
            newTaskList.push(targetTask);

            return newTaskList.sort(sortTasks);
        });
    }

    //Callback function for sort()
    function sortTasks(a, b){
        // Sorting the order; uncompleted tasks comes first
        if(b.completion && !a.completion){
            return -1;
        }else if(a.completion && !b.completion){
            return 1;
        }else {
            return 0;
        }
    }

    return (
        <main>
            <UserInputHandler
                handleAddTask={handleAddTask}
                removeCompletedTasks={removeCompletedTasks}
                hasCompletedTasks={hasCompletedTasks}
            />
            {hasTasks ? 
                <TaskList
                    tasks={tasks}
                    toggleCompletion={toggleCompletion}
                    handleRemoveTask={handleRemoveTask}
                /> :
                <p className={`${styles['main-content--No-task-label']} no-task-msg`}>
                    Currently No Tasks
                </p>
            } 
        </main>
    )
}

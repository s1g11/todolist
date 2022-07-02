import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function addTodolist(title: string) {
        let newTodolist: TodolistsType = {id: v1(), title: title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }

    function editTodolistTitle(todolistId: string, newTitle: string) {
        setTodolists(todolists.map(tdl=>tdl.id === todolistId ? {...tdl, title:newTitle} : tdl))
    }

    function removeTask(todolistId: string, taskId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    function editTask(todolistId: string, taskId: string, newTitle: string) {
        console.log(newTitle)
        setTasks({...tasks, [todolistId]:tasks[todolistId].map(el=>el.id === taskId ? {...el, title:newTitle} : el)})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }


    return (
        <div className="App">

            <AddItemForm addItem={addTodolist}/>

            {
                todolists.map(tdl => {

                    let tasksForTodolist = tasks[tdl.id];

                    if (tdl.filter === "active") {
                        tasksForTodolist = tasks[tdl.id].filter(t => !t.isDone);
                    }
                    if (tdl.filter === "completed") {
                        tasksForTodolist = tasks[tdl.id].filter(t => t.isDone);
                    }

                    return (
                        <Todolist
                            key={tdl.id}
                            todolistId={tdl.id}
                            title={tdl.title}
                            tasks={tasksForTodolist}
                            removeTodolist={removeTodolist}
                            editTodolistTitle={editTodolistTitle}
                            removeTask={removeTask}
                            editTask={editTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tdl.filter}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;

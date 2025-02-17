import {ChangeEvent, useState} from 'react'

import './App.css'

type Todo = {
    id: number,
    title: string,
    done: "Complete" | "Pending"
}

function App() {
    const [todo, settodo] = useState<string>("")
    const [todos, settodos] = useState<Todo[]>([])

    const addToDo: () => void = (): void => {
        if (todo == "") {
            return;
        }
        const newtodo: Todo = {
            id: Date.now(),
            title: todo,
            done: "Pending",
        }
        settodos([...todos, newtodo])
        settodo("")
    }

    const delToDo: (id: number) => void = (id: number): void => {
        settodos(todos.filter(unit => unit.id != id));
    }

    const chnageStatus: (id: number) => void = (id: number): void => {
        settodos(todos.map((unit: Todo) => {
            if (unit.id === id) {
                if (unit.done === "Pending") {
                    const newtodo: Todo = {
                        id: unit.id,
                        title: unit.title,
                        done: "Complete",
                    }
                    return newtodo
                } else {
                    const newtodo: Todo = {
                        id: unit.id,
                        title: unit.title,
                        done: "Pending",
                    }
                    return newtodo
                }
            } else {
                return unit;
            }
        }));
    }

    return (<>
            <center>
                <h1>Todo Application</h1><br/>
                <div>
                    <input type="text" style={{margin: "10px"}} placeholder="Enter a Todo" value={todo}
                           onChange={(e: ChangeEvent<HTMLInputElement>): void => settodo(e.target.value)}></input>
                    <button onClick={addToDo}>Add</button>
                </div>

                <br/><h2>My Todos</h2>
                <br/>
                <ol>
                    {todos.map((unit: Todo) => <>
                            <li key={unit.id}>{unit.title}<em style={{margin: "10px"}}>Status:{unit.done}</em>
                                <button style={{margin: "10px"}} onClick={() => chnageStatus(unit.id)}>Change Status
                                </button>
                                <button key={unit.id} style={{margin: "10px"}} onClick={() => delToDo(unit.id)}>Delete
                                </button>
                            </li>
                        </>
                    )}
                </ol>
            </center>
        </>
    )
}

export default App;
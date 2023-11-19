import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);

  // Check The Inputfield;
  const submitHandler = (e) => {
    e.preventDefault();
    setInput("");
  };

  const addTodo = () => {
    if (input) {
      // Make A new Array and set to UI;
      const newTask = {
        id: Math.random(),
        inputValue: input,
      };
      setTask([...task, newTask]);

      // Set to LocalStorage;
      localStorage.setItem("LocalTask", JSON.stringify([...task, newTask]));
    }
  };

  // Delete Todos from UI and LocalStorage;
  const deleTodo = (id) => {
    let newTodos = task.filter((newTodo) => {
      return newTodo.id != id;
    });
    setTask(newTodos);
    localStorage.setItem("LocalTask", JSON.stringify(newTodos));
  };

  // reset All Todos from UI and LocalStorage;
  const resetAllTodos = (e) => {
    setTask([]);
    localStorage.removeItem("LocalTask");
    e.preventDefault();
  };

  useEffect(() => {
    if (localStorage.getItem("LocalTask")) {
      const storedData = JSON.parse(localStorage.getItem("LocalTask"));
      setTask(storedData);
    }
  }, []);

  return (
    <>
      <div className="full-todo-app  container  absolute left-52">
        <div className="title-todo-app w-1/2 flex justify-center py-5 ">
          <h1 className="pt-7 font-sans text-2xl font-semibold text-slate-200 ">
            Todo App
          </h1>
        </div>
        <form action="" onSubmit={submitHandler}>
          <div className=" form-container  w-1/2 my-2.5  flex gap-5">
            <input
              type="text"
              name="task"
              id=""
              className="w-full rounded-md tracking-widest font-medium font-sans p-2 focus:outline-yellow-400"
              placeholder="Type Your Tasks... "
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className=" addButton bg-red-700 flex w-16 rounded-md ">
              <button
                className="material-icons w-full flex items-center justify-center"
                onClick={addTodo}
                disabled={!input}
              >
                add
              </button>
            </div>
          </div>
        </form>
        <div
          className="task-manager border-2 border-slate-100 py-1 px-2.5 text-2xl text-slate-100"
          style={{ width: "44%" }}
        >
          You Have:
          {!task.length
            ? ` No Task`
            : task.length == 1
            ? ` 1 Task`
            : task.length > 1
            ? `${task.length} Tasks`
            : null}
        </div>
        <div className="FULL_TASK">
          {task.map((todo) => {
            return (
              <React.Fragment key={todo.id}>
                <div className="TODO_TITLE mt-2.5">
                  <h1
                    className="border-dashed border-y-1 border-black text-center text-xl text-slate-200"
                    style={{ width: "44%" }}
                  >
                    Task: {todo.inputValue}
                  </h1>
                  <div className="TODO_DESCRIPTION my-2.5">
                    <ul>
                      <li
                        className="bg-slate-200 rounded-md px-5  border-2 border-gray-800 relative "
                        style={{ width: "44%", height: "30px " }}
                      >
                        {todo.inputValue}
                        <MdDelete
                          className="text-2xl"
                          style={{
                            color: "red",
                            position: "absolute",
                            bottom: "0px",
                            right: "0px",
                          }}
                          onClick={() => {
                            deleTodo(todo.id);
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div
          className="resetButton  flex justify-center py-5"
          style={{ width: "44%" }}
        >
          <button
            className="bg-blue-700 rounded-md text-sm text-white p-1"
            onClick={resetAllTodos}
          >
            Delete All Todos
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoList;

import React, { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import Card from "../page/card";
import { Link } from "react-router-dom";

function TaskPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {tasks.length === 0 ? (
        <div>
          <h1 className=" mb-4">NO SE ENCUENTRAN TAREAS AGREGADAS...</h1>
          <Link to="/add-task">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full">
              <h1 className="font-bold text-3xl">+</h1>
            </button>
          </Link>
        </div>
      ) : (
        <div>
          {tasks.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskPage;

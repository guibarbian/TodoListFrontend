import { useEffect, useState } from 'react';
import api from './service/api';
import { type Task } from './types';
import { type TaskCreateDTO } from './types';
import { TaskCard } from './components/Taskcard';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
  api.get('/tasks')
    .then((res) => setTasks(res.data))
    .catch((err) => console.error("Erro ao buscar tarefas:", err));
}, []);

const handleAddTask = async () => {
  const newTaskDTO: TaskCreateDTO = {
    titulo: 'Insira um titulo',
    concluida: false,
  };

  try {
    const res = await api.post('/tasks', newTaskDTO);
    setTasks((prev) => [...prev, res.data]);
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
};

const handleDeleteTask = (id: number) => {
  api.delete(`/tasks/${id}`)
    .then(() => setTasks(tasks.filter((task) => task.id !== id)))
    .catch((err) => console.error(`Erro ao deletar tarefa ${id}:`, err));
};

  const handleChangeTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

const handleSaveAll = () => {
  const updatedTasks = tasks.map((task) => {
    if (task.titulo.trim() === '') {
      return { ...task, titulo: 'Insira um titulo' };
    }
    return task;
  });

  setTasks(updatedTasks);

  updatedTasks.forEach((task) => {
    api.put(`/tasks/${task.id}`, task)
        .catch((err) => console.error(`Erro ao salvar tarefa ${task.id}:`, err));
  });
};

  return (
  <div className="task-board">
    <div className="task-header">
      <h1>ToDo List</h1>
      <button className="button" onClick={handleAddTask}>Adicionar Tarefa</button>
    </div>

    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={handleDeleteTask}
          onChange={handleChangeTask}
        />
      ))}
    </div>

    <div className="footer">
      <button className="button" onClick={handleSaveAll}>Salvar Alterações</button>
    </div>
  </div>
);
}

export default App;
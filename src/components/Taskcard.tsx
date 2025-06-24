import type { Task } from "../types";

interface Props{
    task: Task;
    onDelete: (id:number) => void;
    onChange: (task:Task) => void;
}

export function TaskCard({ task, onDelete, onChange }: Props) {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <input
          type="text"
          value={task.titulo}
          onChange={(e) => onChange({ ...task, titulo: e.target.value })}
        />
      </div>
      <input
        type="checkbox"
        checked={task.concluida}
        onChange={(e) => onChange({ ...task, concluida: e.target.checked })}
      />
      <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
          aria-label="Deletar tarefa"
        >
          ×
        </button>
        <div className="task-card-content">
            <p className="task-card-content-adv">Descrição a ser adicionada futuramente</p>
        </div>
    </div>
  );
}
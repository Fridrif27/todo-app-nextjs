interface Todo {
    id: number
    title: string
    completed: boolean
  }
  
  interface TodoItemProps {
    todo: Todo
    onDelete: (id: number) => void
  }
  
  export default function TodoItem({ todo, onDelete }: TodoItemProps) {
    return (
      <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
        <span className={`${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.title}</span>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </li>
    )
  }
  
  
import { useState, useEffect } from "react";
import { PlusCircle, GripVertical } from "lucide-react";
import { DragDropProvider, Draggable, DropZone, DragPreview } from "../dnd";
import axios from "axios";
import "../../styles/Model.css"

// Define task interface
interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
}

// Define column interface
interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

// Dummy data
const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "task-1", title: "Research competitors", priority: "high" },
      { id: "task-2", title: "Create wireframes", priority: "medium" },
      { id: "task-3", title: "Define MVP features", priority: "high" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      { id: "task-4", title: "Design system setup", priority: "medium" },
      { id: "task-5", title: "Implement authentication", priority: "high" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: "task-6", title: "Project planning", priority: "medium" },
      { id: "task-7", title: "Setup development environment", priority: "low" },
    ],
  },
];

// Priority colors


export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [addingTaskToColumn, setAddingTaskToColumn] = useState<string | null>(
    null
  );
  const [suggestions, setSuggestions] = useState<string>("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/ingredients/").then((res) => {
      // No need to store ingredients since they're not used
      console.log("Ingredients loaded:", res.data);
    });
  }, []);

  // Send selected ingredients to backend
  const sendSelectedIngredients = async (ingredientNames: string[]) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/suggest-meals/",
        {
          ingredient_names: ingredientNames,
        }
      );
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error sending ingredients:", error);
      setSuggestions("Error getting suggestions. Please try again.");
    }
  };

  // Handler for dropping a task
  const handleTaskDrop = (
    item: any,
    sourceColumnId: string | null,
    targetColumnId: string
  ) => {
    if (!sourceColumnId || !item.id) return;

    // Create a copy of columns
    const newColumns = [...columns];

    // Find source and target column indexes
    const sourceColumnIndex = newColumns.findIndex(
      (col) => col.id === sourceColumnId
    );
    const targetColumnIndex = newColumns.findIndex(
      (col) => col.id === targetColumnId
    );

    if (sourceColumnIndex === -1 || targetColumnIndex === -1) return;

    // Find the task in source column
    const taskIndex = newColumns[sourceColumnIndex].tasks.findIndex(
      (task) => task.id === item.id
    );
    if (taskIndex === -1) return;

    // Get the task and remove it from source column
    const [task] = newColumns[sourceColumnIndex].tasks.splice(taskIndex, 1);

    // Add the task to target column
    newColumns[targetColumnIndex].tasks.push(task);

    // Update state
    setColumns(newColumns);

    // If the target column is "done", send the ingredient names to backend
    if (targetColumnId === "done") {
      const ingredientNames = newColumns[targetColumnIndex].tasks
        .map((task) => task.title)
        .filter(Boolean);

      sendSelectedIngredients(ingredientNames);
    }
  };

  // Add a new task
  const handleAddTask = (columnId: string) => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      priority: "medium",
    };

    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );

    setNewTaskTitle("");
    setAddingTaskToColumn(null);
  };
//mb-4 text-gray-600
  return (
    <DragDropProvider>
      <div className="  Kanban-container">
        <div className="kanban-column-container">
          <h2 className="Kanban-text1">
            Kanban Board Example
          </h2>
          <p className="Kanban-text2">
            Drag and drop tasks between columns
          </p>

          <div className="kanban-columns">
            {columns.map((column) => (
              <div
                key={column.id}
                className="kanban-column"
              >
                <div className="kanban-column-header ">
                  <h3>
                    {column.title}
                  </h3>
                  <p>
                    {column.tasks.length} tasks
                  </p>
                </div>

                <DropZone
                  id={column.id}
                  accept={["task"]}
                  onDrop={(item, sourceColumnId) =>
                    handleTaskDrop(item, sourceColumnId, column.id)
                  }
                  className="dropzone"
                  highlightClassName="dropzone-highlight"
                >
                  {column.tasks.map((task) => (
                    <Draggable
                      key={task.id}
                      id={task.id}
                      type="task"
                      data={task}
                      containerId={column.id}
                      className="task-card"
                    >
                      <div className="task-card-content">
                        <GripVertical className="task-card-icon" />
                        <div className="task-cart-flex-1">
                          <h4 className="task-card-title">
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="task-card-description">
                              {task.description}
                            </p>
                          )}
                          <span
                            className={`task-priority priority-${task.priority}`}
                          >
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </span>
                        </div>
                      </div>
                    </Draggable>
                  ))}

                  {addingTaskToColumn === column.id ? (
                    <div className="task-add-form">
                      <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Task title"
                        className="task-add-input"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddTask(column.id);
                          if (e.key === "Escape") {
                            setNewTaskTitle("");
                            setAddingTaskToColumn(null);
                          }
                        }}
                      />
                      <div className="task-add-actions">
                        <button
                          onClick={() => handleAddTask(column.id)}
                          className="task-add-button"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setNewTaskTitle("");
                            setAddingTaskToColumn(null);
                          }}
                          className="task-cancel-button"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAddingTaskToColumn(column.id)}
                      className="add-task-prompt"
                    >
                      <PlusCircle className="add-task-size" />
                      Add a task
                    </button>
                  )}
                </DropZone>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Suggestions Box */}
        <div className="kanban-meal-suggestions">
          <h3>Meal Suggestions</h3>
          <div className={suggestions ? "kanban-suggestions-box" : "kanban-suggestions-box kanban-suggestions-box-empty"}>
            {suggestions ? (
              <div className="suggestions">
                {suggestions}
              </div>
            ) : (
              <p>
                Drag ingredients to the "Done" column to get meal suggestions
              </p>
            )}
          </div>
        </div>
      </div>

      <DragPreview
        render={(item) => (
          <div className="drag-preview">
            <h4>{item.data.title}</h4>
            <span
              className={`task-priority priority-${item.data.priority}`}
            >
              {item.data.priority}
            </span>
          </div>
        )}
      />
    </DragDropProvider>
  );
}

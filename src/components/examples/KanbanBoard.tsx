import { useState, useEffect } from "react";
import { PlusCircle, GripVertical } from "lucide-react";
import { DragDropProvider, Draggable, DropZone, DragPreview } from "../dnd";
import axios from "axios";

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

// Define ingredient interface
interface Ingredient {
  id: number;
  name: string;
  category: string;
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
const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-red-100 text-red-800",
};

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [addingTaskToColumn, setAddingTaskToColumn] = useState<string | null>(
    null
  );
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [suggestions, setSuggestions] = useState<string>("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/ingredients/").then((res) => {
      // Flatten grouped ingredients
      const grouped = res.data;
      const all: Ingredient[] = [];
      Object.values(grouped).forEach((arr) =>
        all.push(...(arr as Ingredient[]))
      );
      setIngredients(all);
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

  return (
    <DragDropProvider>
      <div className="flex flex-row h-full gap-4">
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Kanban Board Example
          </h2>
          <p className="mb-4 text-gray-600">
            Drag and drop tasks between columns
          </p>

          <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
              <div
                key={column.id}
                className="flex-shrink-0 w-full md:w-80 bg-gray-50 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4 bg-white border-b border-gray-200">
                  <h3 className="font-semibold text-gray-700">
                    {column.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {column.tasks.length} tasks
                  </p>
                </div>

                <DropZone
                  id={column.id}
                  accept={["task"]}
                  onDrop={(item, sourceColumnId) =>
                    handleTaskDrop(item, sourceColumnId, column.id)
                  }
                  className="p-2 min-h-[200px] flex flex-col gap-2"
                  highlightClassName="bg-blue-50 border-2 border-dashed border-blue-300"
                >
                  {column.tasks.map((task) => (
                    <Draggable
                      key={task.id}
                      id={task.id}
                      type="task"
                      data={task}
                      containerId={column.id}
                      className="bg-white rounded-md shadow-sm p-3 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start gap-2">
                        <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-1">
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-sm text-gray-600 mb-2">
                              {task.description}
                            </p>
                          )}
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              priorityColors[task.priority]
                            }`}
                          >
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </span>
                        </div>
                      </div>
                    </Draggable>
                  ))}

                  {addingTaskToColumn === column.id ? (
                    <div className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
                      <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Task title"
                        className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddTask(column.id);
                          if (e.key === "Escape") {
                            setNewTaskTitle("");
                            setAddingTaskToColumn(null);
                          }
                        }}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddTask(column.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setNewTaskTitle("");
                            setAddingTaskToColumn(null);
                          }}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAddingTaskToColumn(column.id)}
                      className="mt-2 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add a task
                    </button>
                  )}
                </DropZone>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Suggestions Box */}
        <div className="w-80 bg-white rounded-lg shadow-sm p-4 h-full">
          <h3 className="font-semibold text-gray-700 mb-4">Meal Suggestions</h3>
          <div className="bg-gray-50 rounded-md p-4 h-[calc(100%-3rem)] overflow-y-auto">
            {suggestions ? (
              <div className="whitespace-pre-wrap text-gray-700">
                {suggestions}
              </div>
            ) : (
              <p className="text-gray-500">
                Drag ingredients to the "Done" column to get meal suggestions
              </p>
            )}
          </div>
        </div>
      </div>

      <DragPreview
        render={(item) => (
          <div className="bg-white rounded-md shadow-lg p-3 border border-gray-300 w-64">
            <h4 className="font-medium text-gray-800">{item.data.title}</h4>
            <span
              className={`mt-1 inline-block text-xs px-2 py-1 rounded-full ${
                priorityColors[
                  item.data.priority as keyof typeof priorityColors
                ]
              }`}
            >
              {item.data.priority}
            </span>
          </div>
        )}
      />
    </DragDropProvider>
  );
}

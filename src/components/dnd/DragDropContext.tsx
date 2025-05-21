import { createContext, useContext, useReducer, ReactNode } from "react";

// Define types for our drag and drop context
export interface DragItem {
  id: string;
  type: string;
  data?: any;
}

interface DragDropState {
  isDragging: boolean;
  currentItem: DragItem | null;
  sourceContainerId: string | null;
}

type DragDropAction =
  | { type: "START_DRAG"; item: DragItem; sourceContainerId: string }
  | { type: "END_DRAG" }
  | { type: "CANCEL_DRAG" };

// Create the initial state
const initialState: DragDropState = {
  isDragging: false,
  currentItem: null,
  sourceContainerId: null,
};

// Create the reducer to handle state updates
function dragDropReducer(
  state: DragDropState,
  action: DragDropAction
): DragDropState {
  switch (action.type) {
    case "START_DRAG":
      return {
        ...state,
        isDragging: true,
        currentItem: action.item,
        sourceContainerId: action.sourceContainerId,
      };
    case "END_DRAG":
    case "CANCEL_DRAG":
      return {
        ...state,
        isDragging: false,
        currentItem: null,
        sourceContainerId: null,
      };
    default:
      return state;
  }
}

// Create the context
interface DragDropContextValue {
  state: DragDropState;
  startDrag: (item: DragItem, sourceContainerId: string) => void;
  endDrag: () => void;
  cancelDrag: () => void;
}

const DragDropContext = createContext<DragDropContextValue | undefined>(
  undefined
);

// Create a provider component
interface DragDropProviderProps {
  children: ReactNode;
}

export function DragDropProvider({ children }: DragDropProviderProps) {
  const [state, dispatch] = useReducer(dragDropReducer, initialState);

  const startDrag = (item: DragItem, sourceContainerId: string) => {
    dispatch({ type: "START_DRAG", item, sourceContainerId });
  };

  const endDrag = () => {
    dispatch({ type: "END_DRAG" });
  };

  const cancelDrag = () => {
    dispatch({ type: "CANCEL_DRAG" });
  };

  return (
    <DragDropContext.Provider value={{ state, startDrag, endDrag, cancelDrag }}>
      {children}
    </DragDropContext.Provider>
  );
}

// Create a custom hook to use the context
export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (context === undefined) {
    throw new Error("useDragDrop must be used within a DragDropProvider");
  }
  return context;
}

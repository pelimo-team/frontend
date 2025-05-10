import { useState } from "react";
import { GripVertical } from "lucide-react";
import { DragDropProvider, Draggable, DropZone, DragPreview } from "../dnd";
import "../../styles/Model.css"

interface Item {
  id: string;
  content: string;
  color: string;
}

const initialItems: Item[] = [
  { id: "item-1", content: "Item 1", color: "SortL-bg-red-100" },
  { id: "item-2", content: "Item 2", color: "SortL-bg-blue-100" },
  { id: "item-3", content: "Item 3", color: "SortL-bg-green-100" },
  { id: "item-4", content: "Item 4", color: "SortL-bg-yellow-100" },
  { id: "item-5", content: "Item 5", color: "SortL-bg-purple-100" },
];

export function SortableList() {
  const [items, setItems] = useState<Item[]>(initialItems);

  const handleDrop = (droppedItem: any, _: string | null, index: number) => {
    if (!droppedItem.id) return;

    // Remove the item from its current position
    const currentItems = [...items];
    const itemIndex = currentItems.findIndex(
      (item) => item.id === droppedItem.id
    );

    if (itemIndex === -1) return;

    // Remove the item from the array
    const [removedItem] = currentItems.splice(itemIndex, 1);

    // Insert the item at the new position
    // If dropping after the original position, we need to account for the removed item
    const adjustedIndex = index > itemIndex ? index - 1 : index;
    currentItems.splice(adjustedIndex, 0, removedItem);

    setItems(currentItems);
  };

  return (
    
      <DragDropProvider>
        <div className="SortL-container">
          <h2 className="SortL-heading">Sortable List Example</h2>
          <p className="SortL-subheading">Drag items to reorder the list</p>
  
          <div className="SortL-list-container">
            <div className="SortL-list-header">
              <h3 className="SortL-list-title">Sortable Items</h3>
            </div>
  
            <ul className="SortL-item-list">
              {items.map((item, index) => (
                <li key={item.id} className="SortL-list-item-wrapper">
                  <DropZone
                    id={`dropzone-${index}`}
                    accept={["SortL-list-item"]}
                    onDrop={(droppedItem, sourceId) =>
                      handleDrop(droppedItem, sourceId, index)
                    }
                    className="SortL-drop-zone"
                    highlightClassName="SortL-drop-zone-highlight"
                  >
                    <Draggable
                      id={item.id}
                      type="SortL-list-item"
                      data={item}
                      containerId="SortL-sortable-list"
                      className={`SortL-draggable-item ${item.color}`}
                    >
                      <GripVertical className="SortL-drag-icon" />
                      <span className="SortL-item-text">{item.content}</span>
                    </Draggable>
                  </DropZone>
                </li>
              ))}
              <li>
                <DropZone
                  id={`dropzone-${items.length}`}
                  accept={["SortL-list-item"]}
                  onDrop={(droppedItem, sourceId) =>
                    handleDrop(droppedItem, sourceId, items.length)
                  }
                  className="SortL-drop-zone-end"
                  highlightClassName="SortL-drop-zone-highlight"
                >
                  <div className="SortL-empty-space"></div>
                </DropZone>
              </li>
            </ul>
          </div>
        </div>
  
        <DragPreview
          render={(item) => (
            <div className={`SortL-drag-preview ${item.data.color}`}>
              <GripVertical className="SortL-drag-icon" />
              <span className="SortL-item-text">{item.data.content}</span>
            </div>
          )}
        />
      </DragDropProvider>
    );
}

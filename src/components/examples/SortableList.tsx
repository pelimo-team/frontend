import { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { DragDropProvider, Draggable, DropZone, DragPreview } from '../dnd';

interface Item {
  id: string;
  content: string;
  color: string;
}

const initialItems: Item[] = [
  { id: 'item-1', content: 'Item 1', color: 'bg-red-100' },
  { id: 'item-2', content: 'Item 2', color: 'bg-blue-100' },
  { id: 'item-3', content: 'Item 3', color: 'bg-green-100' },
  { id: 'item-4', content: 'Item 4', color: 'bg-yellow-100' },
  { id: 'item-5', content: 'Item 5', color: 'bg-purple-100' },
];

export function SortableList() {
  const [items, setItems] = useState<Item[]>(initialItems);

  const handleDrop = (droppedItem: any, ourceContainerId: string | null, index: number) => {
    if (!droppedItem.id) return;
    
    // Remove the item from its current position
    const currentItems = [...items];
    const itemIndex = currentItems.findIndex(item => item.id === droppedItem.id);
    
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
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sortable List Example</h2>
        <p className="mb-4 text-gray-600">Drag items to reorder the list</p>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700">Sortable Items</h3>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <li key={item.id} className="relative">
                <DropZone
                  id={`dropzone-${index}`}
                  accept={['list-item']}
                  onDrop={(droppedItem, sourceId) => handleDrop(droppedItem, sourceId, index)}
                  className="py-1 px-2"
                  highlightClassName="bg-gray-50 before:content-[''] before:h-0.5 before:bg-blue-500 before:absolute before:left-0 before:right-0 before:top-0"
                >
                  <Draggable
                    id={item.id}
                    type="list-item"
                    data={item}
                    containerId="sortable-list"
                    className={`flex items-center gap-3 p-3 ${item.color} rounded-md`}
                  >
                    <GripVertical className="w-5 h-5 text-gray-500 flex-shrink-0 cursor-grab" />
                    <span className="font-medium">{item.content}</span>
                  </Draggable>
                </DropZone>
              </li>
            ))}
            
            {/* Empty drop zone at the end */}
            <li>
              <DropZone
                id={`dropzone-${items.length}`}
                accept={['list-item']}
                onDrop={(droppedItem, sourceId) => handleDrop(droppedItem, sourceId, items.length)}
                className="py-3 px-2"
                highlightClassName="bg-gray-50 before:content-[''] before:h-0.5 before:bg-blue-500 before:absolute before:left-0 before:right-0 before:top-0"
              >
                <div className="h-2"></div>
              </DropZone>
            </li>
          </ul>
        </div>
      </div>
      
      <DragPreview
        render={item => (
          <div className={`flex items-center gap-3 p-3 ${item.data.color} rounded-md shadow-lg border border-gray-300`}>
            <GripVertical className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="font-medium">{item.data.content}</span>
          </div>
        )}
      />
    </DragDropProvider>
  );
}
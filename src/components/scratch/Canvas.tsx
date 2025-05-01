import React, { useState } from "react";
import { DropZone, Draggable } from "../dnd";
import { Trash2, GripVertical } from "lucide-react";

interface Block {
  id: string;
  type: string;
  category: string;
  label: string;
  color: string;
}

export function Canvas() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const handleDrop = (
    item: any,
    sourceContainerId: string | null,
    index?: number
  ) => {
    if (sourceContainerId === "palette") {
      const newBlock = {
        ...item.data,
        id: `${item.data.id}-${Date.now()}`,
      };

      if (typeof index === "number") {
        setBlocks((prev) => [
          ...prev.slice(0, index),
          newBlock,
          ...prev.slice(index),
        ]);
      } else {
        setBlocks((prev) => [...prev, newBlock]);
      }
    } else if (sourceContainerId === "canvas") {
      setBlocks((prev) => {
        const newBlocks = [...prev];
        const blockIndex = newBlocks.findIndex((b) => b.id === item.id);
        if (blockIndex === -1) return prev;

        const [movedBlock] = newBlocks.splice(blockIndex, 1);
        const targetIndex =
          typeof index === "number" ? index : newBlocks.length;
        newBlocks.splice(targetIndex, 0, movedBlock);

        return newBlocks;
      });
    }
  };

  const handleDelete = (blockId: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== blockId));
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm p-6 h-[600px] flex flex-col">
      <div className="mb-4 flex-shrink-0">
        <h2 className="font-semibold text-gray-800">Menu Canvas</h2>
        <p className="text-sm text-gray-500">
          Drag food items here to build your menu
        </p>
      </div>

      <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto">
        {blocks.map((block, index) => (
          <div key={block.id} className="relative">
            <DropZone
              id={`dropzone-${index}`}
              accept={["block"]}
              onDrop={(item, sourceId) => handleDrop(item, sourceId, index)}
              className="py-1"
              highlightClassName="before:content-[''] before:h-0.5 before:bg-blue-500 before:absolute before:left-4 before:right-4 before:-top-1"
            >
              <Draggable
                id={block.id}
                type="block"
                data={block}
                containerId="canvas"
                className={`${block.color} text-white rounded-lg shadow-sm group relative`}
              >
                <div className="p-3 flex items-center gap-2">
                  <GripVertical className="w-5 h-5 text-white/70 cursor-grab" />
                  <span className="font-medium">{block.label}</span>
                  <button
                    onClick={() => handleDelete(block.id)}
                    className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/20 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Draggable>
            </DropZone>
          </div>
        ))}

        <DropZone
          id="dropzone-final"
          accept={["block"]}
          onDrop={(item, sourceId) => handleDrop(item, sourceId)}
          className={`${
            blocks.length === 0 ? "h-full" : "min-h-[100px]"
          } rounded-lg`}
          highlightClassName="bg-blue-50 border-2 border-dashed border-blue-300"
        >
          {blocks.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-400">
              Drag food items here to start building your menu
            </div>
          )}
        </DropZone>
      </div>
    </div>
  );
}

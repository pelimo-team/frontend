
import { BlockPalette } from "../components/scratch/BlockPalette";
import { Canvas } from "../components/scratch/Canvas";
import { DragDropProvider } from "../components/dnd";

export default function MenuBuilder() {
  return (
    <DragDropProvider>
      <div className="h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <main className="h-full flex flex-col">
          <div className="text-center py-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Food Menu Builder
            </h1>
            <p className="text-lg text-gray-600">
              Drag and drop items to create your menu
            </p>
          </div>
          <div className="flex-1 flex gap-6 bg-white p-6">
            <div className="w-1/3 h-full">
              <BlockPalette />
            </div>
            <div className="w-2/3 h-full">
              <Canvas />
            </div>
          </div>
        </main>
      </div>
    </DragDropProvider>
  );
}

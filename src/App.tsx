import React from 'react';
import { BlockPalette } from './components/scratch/BlockPalette';
import { Canvas } from './components/scratch/Canvas';
import { DragDropProvider } from './components/dnd';

function App() {
  return (
    <DragDropProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Food Menu Builder</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex gap-6">
            <BlockPalette />
            <Canvas />
          </div>
        </main>
      </div>
    </DragDropProvider>
  );
}

export default App;
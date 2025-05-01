import React from 'react';
import { BlockPalette } from '../components/scratch/BlockPalette';
import { Canvas } from '../components/scratch/Canvas';
import { DragDropProvider } from '../components/dnd';

export default function MenuBuilder() {
  return (
    <DragDropProvider>
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Food Menu Builder</h1>
            <p className="mt-2 text-gray-600">Drag and drop items to create your menu</p>
          </div>
          <div className="flex gap-6">
            <BlockPalette />
            <Canvas />
          </div>
        </main>
      </div>
    </DragDropProvider>
  );
}
import { BlockPalette } from "../components/scratch/BlockPalette";
import { Canvas } from "../components/scratch/Canvas";
import { DragDropProvider } from "../components/dnd";
import "../styles/Model.css";
//w-2/3 h-full
export default function MenuBuilder() {
  return (
    <DragDropProvider>
      <div className="menu-build-container">
        <main className="menu-build-main">
          <div className="menu-build-header">
            <h1>Food Menu Builder</h1>
            <p>Drag and drop items to create your menu</p>
          </div>
          <div className="menu-build-pallate">
            <BlockPalette />
          </div>
          <div className="menu-build-canvas">
            <Canvas />
          </div>
        </main>
      </div>
    </DragDropProvider>
  );
}

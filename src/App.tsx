import { ProjectRoutes } from "./pages/route";
import { ScoreProvider } from "./pages/AuthContext"; // Make sure this path is correct

function App() {
  return (
    <ScoreProvider>
      <ProjectRoutes />
    </ScoreProvider>
  );
}

export default App;

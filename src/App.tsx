import { ProjectRoutes } from "./pages/route";
import {AuthProvider } from "./pages/AuthContext"; // Make sure this path is correct

function App() {
  return (
    <AuthProvider>
      <ProjectRoutes />
    </AuthProvider>
  );
}

export default App;

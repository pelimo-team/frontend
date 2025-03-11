
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>

      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
      </Router>


    </div>
  );
}

export default App;

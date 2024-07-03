import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";
import CreateQuiz from "./pages/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz";

const App = () => {
  return (
    <main>
      <Nav />
      <div className="max-w-2xl lg:max-w-4xl m-auto px-6 py-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<TakeQuiz />} />
          <Route path="/create" element={<CreateQuiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;

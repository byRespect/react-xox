import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

import RoomPage from "./pages/GameRoom";
import RoomForm from "./pages/RoomForm";

function App() {
  return (
    <div className="flex h-screen justify-center">
      <Routes>
        <Route path="/" element={<RoomForm />} />
        <Route path="/:room" element={<RoomPage />} />
      </Routes>

      <ToastContainer
        toastStyle={{
          backgroundColor: "rgb(31 41 55)",
          color: "rgb(156 163 175)",
        }}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;

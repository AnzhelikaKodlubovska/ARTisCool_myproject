import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Pricing from "./pages/Pricing";
import UploadPage from "./pages/UploadPage";
import Gallery from "./pages/Gallery";
import AssistantBubble from "./components/AssistantBubble";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      {/* Додаємо flex та min-h-screen, щоб футер не стрибав */}
      <div className="min-h-screen bg-[#0a0f1a] font-sans text-white flex flex-col">
        <Navbar />

        {/* main з flex-grow розтягнеться і притисне футер до низу */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <Footer />
        <AssistantBubble />
      </div>
    </Router>
  );
}

export default App;

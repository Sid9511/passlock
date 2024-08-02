import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Passwords from "./components/Passwords";
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/pass" element={<Passwords />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

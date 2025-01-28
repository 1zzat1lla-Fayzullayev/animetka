import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./routes/home";
import SinglePage from "./routes/singlePage";
import { useEffect, useState } from "react";
import HistoryPage from "./routes/historyPage";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<SinglePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;

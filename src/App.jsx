import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import NanniesPage from "./pages/NanniesPage/NanniesPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<NanniesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;

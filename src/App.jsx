import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import NanniesPage from "./pages/NanniesPage/NanniesPage";
import FavouritesPage from "./pages/FavouritesPage/FavouritesPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<NanniesPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />

        {/* <Route path="/catalog/:id" element={<DetailsPage />}>
          <Route path="features" element={<FeaturesById />} />
          <Route path="reviews" element={<Reviews />} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;

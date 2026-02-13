import { Route, Routes } from "react-router";
import HomePage from "./components/pages/home";
import ProductsPage from "./components/pages/products";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </>
  );
}

export default App;

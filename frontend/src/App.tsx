import { Route, Routes } from "react-router";
import HomePage from "./components/pages/home";
import ProductsPage from "./components/pages/products";
import Navbar from "./components/navbar";
import { ThemeProvider } from "./components/theme-provider";
import { LenisProvider } from "./components/lenis-provider";

function App() {
  return (
    <LenisProvider>
      <ThemeProvider defaultTheme="system" storageKey="dapsgarage-ui-theme">
        <Navbar />
        <main className="min-h-screen container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop-all" element={<ProductsPage />} />
          </Routes>
        </main>
      </ThemeProvider>
    </LenisProvider>
  );
}

export default App;

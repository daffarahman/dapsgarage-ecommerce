import Header from "./components/header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/home"
import Footer from "./components/footer"
import ProductList from "./components/product-list"
import ProductPage from "./components/product-page"

function App() {
  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>

      <main className="min-h-screen bg-slate-50 mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:slug" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
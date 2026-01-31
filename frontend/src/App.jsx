import Header from "./components/header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/home"
import Footer from "./components/footer"
import ProductList from "./components/product-list"

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
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
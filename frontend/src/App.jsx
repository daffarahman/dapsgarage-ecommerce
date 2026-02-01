import Header from "./components/header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/home"
import Footer from "./components/footer"
import ProductList from "./components/product-list"
import ProductPage from "./components/product-page"
import Register from "./components/auth-pages/register"
import Login from "./components/auth-pages/login"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute, PublicRoute } from "./components/protected-route"
import Profile from "./components/profile"
import { About, Contact, Location, FAQs, Terms, Shipping, Reviews } from "./components/info-pages"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <header>
          <Header />
        </header>

        <main className="min-h-screen bg-slate-50 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:slug" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductPage />} />

            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />

            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/location" element={<Location />} />
            <Route path="/faq" element={<FAQs />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/shipping-and-returns" element={<Shipping />} />
            <Route path="/reviews" element={<Reviews />} />

          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
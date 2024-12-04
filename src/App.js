
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Coin from "./Components/Coin";
import Exchanges from "./Components/Exchanges";
import CoinDetails from "./Components/CoinDetails.jsx";
import Footer from "./Components/Footer.jsx";


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Coin" element={<Coin />} />
                <Route path="/exchanges" element={<Exchanges />} />
                <Route path="/coin/:id" element={<CoinDetails />} />
            </Routes>
            <Footer />
        </Router>
    )
}


export default App;
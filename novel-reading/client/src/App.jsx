import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/homePage";
import NovelInfoPage from "./pages/novelInfoPage";
import NovelReadingPage from "./pages/novelReadingPage";
import NovelSearchingPage from "./pages/novelSearchingPage";
import Footer from "./components/footer";

const App = () => {
    return (  
        <Routes>
                <Route path="/" element={<><Navbar /><Footer /></>}>
                    <Route index element={<HomePage />} />
                    <Route path="search" element={<NovelSearchingPage />} />
                    <Route path=":slug" element={<NovelInfoPage />} />
                    <Route path=":slug/:chapterNumber" element={<NovelReadingPage />} />
                </Route>
        </Routes>
        
    );
}

export default App;
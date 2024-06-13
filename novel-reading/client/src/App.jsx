import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/homePage";
import NovelInfoPage from "./pages/novelInfoPage";
import NovelReadingPage from "./pages/novelReadingPage";
import NovelSearchingPage from "./pages/novelSearchingPage";
import NovelListPage from "./pages/novelListPage";
import Footer from "./components/footer";

const App = () => {
    return (  
        <Routes>
                <Route path="/" element={<><Navbar /><Footer /></>}>
                    <Route index element={<HomePage />} />
                    <Route path="search" element={<NovelSearchingPage />} />
                    <Route path=":slug" element={<NovelInfoPage />} />
                    <Route path=":slug/:chapterNumber" element={<NovelReadingPage />} />
                    <Route path="danh-sach/:subitem" element={<NovelListPage type="danh-sach" />} />
                    <Route path="the-loai/:subitem" element={<NovelListPage type="the-loai" />} />
                    <Route path="phan-loai/:subitem" element={<NovelListPage type="phan-loai" />} />
                    <Route path="tac-gia/:subitem" element={<NovelListPage type="tac-gia" />} />
                </Route>
        </Routes>
        
    );
}

export default App;
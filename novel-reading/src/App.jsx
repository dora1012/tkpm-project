import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/homePage";
import NovelInfoPage from "./pages/novelInfoPage";
import Footer from "./components/footer";

const App = () => {
    return (  
        <Routes>
            <Route path="/" element={[<Navbar/>, <Footer/>]}>
                <Route path=':slug' element={<NovelInfoPage/>} />
                <Route index element={ <HomePage /> } />        
            </Route>
        </Routes>
        
    );
}

export default App;
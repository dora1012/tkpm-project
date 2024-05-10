import { Link, Outlet } from "react-router-dom"
import logo from "../imgs/logo.svg"
import {AiOutlineCaretUp, AiOutlineCaretDown} from "react-icons/ai"
import { useState, useRef } from "react"
//import Breadcrumbs from "./breadcrumb"
const Navbar = () => {
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
    const [open, setOpen] = useState(false);
    const [listOpen, setListOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);
    const [classifyOpen, setClassifyOpen] = useState(false);
    const feature1Ref = useRef();
    const listRef = useRef();
    const feature2Ref = useRef();
    const typeRef = useRef();
    const feature3Ref = useRef();
    const classifyRef = useRef();
    window.addEventListener('click', (e)=>{
        if(e.target !== listRef.current && e.target !== feature1Ref.current){
            setListOpen(false);
        }
        if(e.target !== typeRef.current && e.target !== feature2Ref.current){
            setTypeOpen(false);
        }
        if(e.target !== classifyRef.current && e.target !== feature3Ref.current){
            setClassifyOpen(false);
        }
    });
    const arrowDown = <i class= "fi fi-sr-angle-small-down mt-1"></i>;
    const listIcon = <i class="fi fi-rr-rectangle-list pr-2"></i>;
    return (
        <>
        <nav className="navbar">

            <Link to="/" className="nav-logo flex-none w-20">
                <img src={logo} alt="Masknet Logo" className="w-full" />
            </Link>

            <div className={"search-box absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " + (searchBoxVisibility ? "show" : "hide")}>
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder: text-dark-grey md:pl-12"
                />

                <i className="fi fi-br-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-x1 text-dark-grey"></i>
            </div>

            <div className="flex items-center gap-3 md:gap-6 ml-auto">
                <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center" 
                onClick={() => setSearchBoxVisibility(!searchBoxVisibility)}>
                    <i className="fi fi-br-search text-x1"></i>
                </button>
            </div>
            {/* <i class= {"fi fi-rr" + (open ? "-list" : "-cross-small") + " cursor-pointer"} onClick = {()=>setOpen(!open) }></i> */}

            <ul className="menu flex gap-5">
                <li>
                    <div ref={feature1Ref} className="relative flex items-center gap-1 cursor-pointer hover:text-crimson delay-0" onClick={()=> setListOpen(!listOpen)}>
                        {listIcon}
                        Danh sách
                        {arrowDown}
                    </div>
                    {
                       listOpen && <div ref={listRef} className="absolute border border-smoke rounded-lg bg-white">
                        {
                                <div className="w-full flex flex-col align-middle gap-5 p-3">
                                <p className="hover:text-crimson">
                                    <Link to="/truyen-moi-cap-nhat">Truyện mới cập nhật</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/truyen-hot">Truyện Hot</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/truyen-full">Truyện Full</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/tien-hiep-hay">Tiên hiệp hay</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/kiem-hiep-hay">Kiếm hiệp hay</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/truyen-teen-hay">Truyện teen hay</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/ngon-tinh-hay">Ngôn tình hay</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/ngon-tinh-hai">Ngôn tình hài</Link>
                                </p>
                            </div>
                        }
                           
                       </div>
                    }
                </li>
                <li>
                    <div ref={feature2Ref} className="relative flex items-center gap-1 hover:text-crimson delay-0 cursor-pointer" onClick={()=> setTypeOpen(!typeOpen)}>
                        {listIcon}
                        Thể loại
                        {arrowDown}
                    </div>
                    {
                       typeOpen && <div ref={typeRef} className="absolute border border-smoke rounded-lg bg-white">
                        {
                                <div className="w-full flex flex-col align-middle gap-5 p-3">
                                <p className="hover:text-crimson">
                                    <Link to="/tien-hiep">Tiên hiệp</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/kiem-hiep">Kiếm hiệp</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/ngon-tinh">Ngôn tình</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/viet-nam">Việt Nam</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/light-novel">Light Novel</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/truyen-teen">Truyện teen</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/hai-huoc">Hài hước</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/khac">Khác</Link>
                                </p>
                            </div>
                        }
                           
                       </div>
                    }
                </li><li>
                    <div ref={feature3Ref} className="relative flex items-center gap-1 hover:text-crimson delay-0 cursor-pointer" onClick={()=> setClassifyOpen(!classifyOpen)}>
                        {listIcon}
                        Phân loại theo chương
                        {arrowDown}
                    </div>
                    {
                       classifyOpen && <div ref={classifyRef} className="absolute border border-smoke rounded-lg bg-white">
                        {
                                <div className="w-full flex flex-col align-middle gap-5 p-3">
                                <p className="hover:text-crimson">
                                    <Link to="/duoi-100-chuong">Dưới 100 chương</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/100-500-chuong">100-500 chương</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/500-1000-chuong">500-1000 chương</Link>
                                </p>
                                <p className="hover:text-crimson">
                                    <Link to="/tren-1000-chuong">Trên 1000 chương</Link>
                                </p>
                            </div>
                        }
                           
                       </div>
                    }
                </li><li>
                    <Link to="/" className="">
                        Cài đặt
                    </Link>
                </li>
            </ul>
        </nav>
        {/* <Breadcrumbs/> */}
        <Outlet/>
    </>
    );
}

export default Navbar;
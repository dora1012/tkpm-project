import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.svg";
import { useState, useRef, useEffect } from "react";
import { slugify } from "../utils/slugify";
import axios from "axios";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [novelList, setNovelList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [classifyList, setClassifyList] = useState([]);
  const navigate = useNavigate();
  const [listOpen, setListOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [classifyOpen, setClassifyOpen] = useState(false);
  const feature1Ref = useRef();
  const listRef = useRef();
  const feature2Ref = useRef();
  const typeRef = useRef();
  const feature3Ref = useRef();
  const classifyRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target !== listRef.current && e.target !== feature1Ref.current) {
        setListOpen(false);
      }
      if (e.target !== typeRef.current && e.target !== feature2Ref.current) {
        setTypeOpen(false);
      }
      if (
        e.target !== classifyRef.current &&
        e.target !== feature3Ref.current
      ) {
        setClassifyOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Fetch novel list from backend

    const fetchNavBarData = async () => {
      try {
        const [novelResponse, categoryResponse, classifyResponse] =
          await Promise.all([
            axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/api/danh-sach"),
            axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/api/the-loai"),
            axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/api/phan-loai"),
          ]);

        if (Array.isArray(novelResponse.data)) {
          setNovelList(novelResponse.data);
        }

        if (Array.isArray(categoryResponse.data)) {
          setCategoryList(categoryResponse.data);
        }
        if (Array.isArray(classifyResponse.data)) {
          setClassifyList(classifyResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNavBarData();
  }, []);

  const arrowDown = <i className="fi fi-sr-angle-small-down mt-1"></i>;
  const listIcon = <i className="fi fi-rr-rectangle-list pr-2"></i>;
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const encodedKeyword = encodeURIComponent(searchQuery).replace(/%20/g, "+");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodedKeyword}`);
  };

  return (
    <>
      <nav
        className={`navbar ${
          visible ? "transform translate-y-0" : "transform -translate-y-full"
        }`}
      >
        <Link to="/" className="nav-logo flex-none w-20">
          <img src={logo} alt="Masknet Logo" className="w-full" />
        </Link>
        <form
          onSubmit={handleSearch}
          className={`search-box absolute w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto ${
            searchBoxVisibility ? "block" : "hidden"
          }`}
        >
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full md:w-auto bg-white p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl text-dark-grey"
          >
            <i className="fi fi-br-search"></i>
          </button>
        </form>
        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => setSearchBoxVisibility(!searchBoxVisibility)}
          >
            <i className="fi fi-br-search text-xl"></i>
          </button>
        </div>
        <ul className="menu flex gap-5">
          <li>
            <div
              ref={feature1Ref}
              className="text-white font-semibold relative py-5 px-3 rounded-md flex items-center gap-1 cursor-pointer hover:bg-coral-pink1 transition-colors"
              onClick={() => setListOpen(!listOpen)}
            >
              {listIcon}
              Danh sách
              {arrowDown}
            </div>
            {listOpen && (
              <div
                ref={listRef}
                className="absolute border border-smoke rounded-lg bg-white"
              >
                <div className="w-full columns-2 gap-10 p-3">
                  {novelList.map((items, index) => (
                    <p className="hover:text-crimson mb-5" key={index}>
                      <Link to={`/danh-sach/${slugify(items)}`}>{items}</Link>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </li>
          <li>
            <div
              ref={feature2Ref}
              className="text-white font-semibold relative py-5 px-3 rounded-md flex items-center gap-1 cursor-pointer hover:bg-coral-pink1 transition-colors"
              onClick={() => setTypeOpen(!typeOpen)}
            >
              {listIcon}
              Thể loại
              {arrowDown}
            </div>
            {typeOpen && (
              <div
                ref={typeRef}
                className="absolute border border-smoke rounded-lg bg-white"
              >
                <div className="w-full columns-3 gap-10 p-3">
                  {categoryList.map((category, index) => (
                    <p className="hover:text-crimson mb-5" key={index}>
                      <Link to={`/the-loai/${slugify(category)}`}>
                        {category}
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </li>
          <li>
            <div
              ref={feature3Ref}
              className="text-white font-semibold relative py-5 px-3 rounded-md flex items-center gap-1 cursor-pointer hover:bg-coral-pink1 transition-colors"
              onClick={() => setClassifyOpen(!classifyOpen)}
            >
              {listIcon}
              Phân loại theo chương
              {arrowDown}
            </div>
            {classifyOpen && (
              <div
                ref={classifyRef}
                className="absolute border border-smoke rounded-lg bg-white"
              >
                <div className="w-full flex flex-col align-middle gap-5 p-3">
                  {classifyList.map((classify, index) => (
                    <p className="hover:text-crimson mb-5" key={index}>
                      <Link to={`/phan-loai/${slugify(classify)}`}>
                        {classify}
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;

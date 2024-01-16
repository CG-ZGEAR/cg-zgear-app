import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {HiOutlineMenuAlt4} from "react-icons/hi";
import {FaCaretDown, FaSearch, FaShoppingCart, FaUser} from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {productListSelector} from "../../../features/product/productReducer";
import {searchProducts} from "../../../features/product/productReducerService";

const HeaderBottom = () => {
    const products = useSelector(productListSelector) || [];
    const [show, setShow] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const navigate = useNavigate();
    const ref = useRef();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        if (ref && ref.current) {
            const handleClick = (e) => {
                if (ref.current.contains(e.target)) {
                    setShow(true);
                } else {
                    setShow(false);
                }
            };
            document.body.addEventListener("click", handleClick);

            return () => {
                document.body.removeEventListener("click", handleClick);
            };
        }
    }, [show, ref]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showSearchBar, setShowSearchBar] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value !== "") {
            dispatch(searchProducts(e.target.value));

        }
    };

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredProducts([]);
        } else {
            // Ensure products and products.content are defined before applying filter
            if (products && products.content && Array.isArray(products.content)) {
                const filtered = products.content.filter((product) =>
                    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilteredProducts(filtered);
            }
        }
    }, [searchQuery, products]);
    return (
        <div className="w-full bg-[#F5F5F3] relative">
            <div className="max-w-container mx-auto">
                <Flex
                    className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
                    <div
                        onClick={() => setShow(!show)}
                        ref={ref}
                        className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
                    >
                        <HiOutlineMenuAlt4 className="w-5 h-5"/>
                        <p className="text-[14px] font-normal mb-0">Shop by Category</p>

                        {show && (
                            <motion.ul
                                initial={{y: 30, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                transition={{duration: 0.5}}
                                className="absolute top-14 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-4 mb-0"
                            >
                                <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                                    onClick={() => navigate('/category/VGA')}>VGA
                                </li>
                                <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                                    onClick={() => navigate('/category/Monitor')}>Monitor
                                </li>
                                <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                                    onClick={() => navigate('/category/Laptop')}>Laptop
                                </li>
                                <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                                    onClick={() => navigate('/category/Gaming PC')}>Gaming PC
                                </li>
                                <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                                    onClick={() => navigate('/category/Keyboard')}>Keyboard
                                </li>
                                <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                                    onClick={() => navigate('/category/Mouse')}>Mouse
                                </li>
                                <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration
-300 cursor-pointer"
                                    onClick={() => navigate('/category/Headset')}>Headset
                                </li>
                                <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                                    onClick={() => navigate('/category/Gaming Chair')}>Gaming Chair
                                </li>
                            </motion.ul>
                        )}
                    </div>
                    <div
                        className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
                        <input
                            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
                            type="text"
                            onChange={handleSearch}
                            value={searchQuery}
                            placeholder="Search your products here"
                        />
                        <FaSearch className="w-5 h-5"/>
                        {searchQuery && (
                            <div
                                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
                            >
                                {searchQuery &&
                                    filteredProducts.map((item) => (
                                        <div
                                            onClick={() =>
                                                navigate(
                                                    `/product/${item.productName
                                                        .toLowerCase()
                                                        .split(" ")
                                                        .join("-")}`,
                                                    {
                                                        state: {
                                                            item: item,
                                                        },
                                                    }
                                                ) &
                                                setShowSearchBar(true) &
                                                setSearchQuery("")
                                            }
                                            key={item._id}
                                            className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                                        >
                                            <img className="w-24" src={item.imageUrls[0]} alt="productImg"/>
                                            <div className="flex flex-col gap-1">
                                                <p className="font-semibold text-lg">
                                                    {item.productName}
                                                </p>
                                                <p className="text-xs">{item.categoryName}</p>
                                                <p className="text-sm">
                                                    Price:{" "}
                                                    <span className="text-primeColor font-semibold">
                            ${item.price}
                          </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
                        <div onClick={() => setShowUser(!showUser)} className="flex">
                            <FaUser/>
                            <FaCaretDown/>
                        </div>
                        {showUser && (
                            <motion.ul
                                initial={{y: 30, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                transition={{duration: 0.5}}
                                className="absolute top-6 right-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
                            >
                                <Link to="/signin" className="">
                                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                        Login
                                    </li>
                                </Link>
                                <Link onClick={() => setShowUser(false)} to="/signup">
                                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                        Sign Up
                                    </li>
                                </Link>
                                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                    Profile
                                </li>
                                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                                    Others
                                </li>
                            </motion.ul>
                        )}
                        <Link to="/cart">
                            <div className="relative">
                                <FaShoppingCart/>
                                <span
                                    className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
                            </div>
                        </Link>
                    </div>
                </Flex>
            </div>
        </div>
    );
};

export default HeaderBottom;

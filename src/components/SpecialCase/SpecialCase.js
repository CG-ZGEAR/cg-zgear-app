import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {RiShoppingCart2Fill} from "react-icons/ri";
import {MdSwitchAccount} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {userDetail} from "../../features/user/userSlice";

const SpecialCase = () => {
    const products = useSelector((state) => state.zgearReducer.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken)
        if (accessToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleProfileClick = () => {
        if (isLoggedIn) {
            navigate("/user-profile");
        } else {
            navigate("/signin");
        }
    };

    return (
        <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
            <div onClick={handleProfileClick} className="cursor-pointer">
                <div
                    className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group">
                    <div className="flex justify-center items-center">
                        <MdSwitchAccount
                            className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200"/>

                        <MdSwitchAccount
                            className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200"/>
                    </div>
                    <p className="text-xs font-semibold font-titleFont mb-0">Profile</p>
                </div>
            </div>
            <Link to="/cart">
                <div
                    className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
                    <div className="flex justify-center items-center">
                        <RiShoppingCart2Fill
                            className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200"/>

                        <RiShoppingCart2Fill
                            className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200"/>
                    </div>
                    <p className="text-xs font-semibold font-titleFont mb-0">Buy Now</p>
                    {products.length > 0 && (
                        <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                            {products.length}
                        </p>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default SpecialCase;

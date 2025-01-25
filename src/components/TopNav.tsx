import { RiMenu4Fill } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useLocation } from "react-router-dom";



const TopNav = () => {
    const location = useLocation();
    const pathname = location.pathname.split("/").pop() || "Home";


    return (
        <menu className="flex flex-wrap gap-10 items-center justify-between border border-gray-400 px-14 py-7 mb-32">
            <div className="flex items-center gap-5">
                <RiMenu4Fill className="cursor-pointer" size={35} color="#10609F" />
                <h1 className="text-primary2 text-baseTwo font-semibold uppercase">
                    {pathname}
                </h1>
            </div>
            <div className="flex items-center gap-28">
                <div className="flex items-center gap-10">
                    <IoIosNotificationsOutline
                        color="#10609F"
                        size={30}
                        className="cursor-pointer"
                    />
                    <AiOutlinePoweroff
                        className="cursor-pointer"
                        color="#10609F"
                        size={25}
                    />
                </div>
            </div>
        </menu>
    );
};

export default TopNav;

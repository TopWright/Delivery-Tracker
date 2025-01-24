import { RiMenu4Fill } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";

const TopNav = () => {
    return (
        <menu className="flex flex-wrap gap-10 items-center justify-between py-[2rem] px-[0]">
            <div className="flex items-center gap-5">
                <RiMenu4Fill className="cursor-pointer" size={35} color="#10609F" />
                <h1 className="text-primary2 text-baseTwo font-semibold uppercase">
                    izymart
                </h1>
            </div>
            <div className="flex items-center gap-28">
                {/* <div className="flex items-center gap-20">
                    <div className="flex items-center gap-5 cursor-pointer">
                        <AddressIcon />
                        <p className="font-semibold text-base">Marketplace</p>
                    </div>
                    <div className="flex items-center gap-5 cursor-pointer">
                        <CartIcon />
                        <p className="font-semibold text-base">Cart</p>
                    </div>
                    <div className="flex items-center gap-5 cursor-pointer">
                        <LocationIcon />
                        <p className="font-semibold text-base">Address Book</p>
                    </div>
                    <div className="flex items-center gap-5 cursor-pointer">
                        <OrderIcon />
                        <p className="font-semibold text-base">Orders</p>
                    </div>
                </div> */}
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

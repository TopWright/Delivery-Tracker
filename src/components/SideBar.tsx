import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import Logo from "../assets/images/Vector.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    DashboardIcon,
    SignoutIcon,
    TrackingIcon,
} from "../assets/svg";

import { IoMdArrowRoundBack } from "react-icons/io";

interface SideBarProps {
    toggled: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    setBroken: React.Dispatch<React.SetStateAction<boolean>>;
    broken: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ toggled, setToggle, setBroken, broken }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <Sidebar
            backgroundColor="white"
            customBreakPoint="900px"
            width="270px"
            padding="20px"
            className="overflow-y-auto"
            toggled={toggled}
            onBreakPoint={setBroken}
        >
            <div className="px-16 mt-10 header">
                <div className="flex justify-between">
                    <div className="mb-20 img">
                        <img src={Logo} alt="Logo" />
                    </div>
                    {broken && (
                        <IoMdArrowRoundBack size={25} className="mt-12 cursor-pointer" onClick={() => setToggle(!toggled)} />
                    )}
                </div>
                <div className="text">
                    <p className="text-2xl text-[#d7d6d6] font-semibold">MANAGEMENT</p>
                </div>
            </div>
            <Menu
                menuItemStyles={{
                    root: ({ active }) => {
                        return {
                            color: active ? "#0059AC" : "#333",
                            backgroundColor: active ? "#E6EEF7" : undefined,
                            marginBottom: 7,
                            borderRadius: 10,
                        };
                    },
                    button: {
                        paddingInline: 10,
                        borderRadius: 10,
                        "&:hover": {
                            backgroundColor: "#E6EEF7",
                            color: "#0059AC",
                        },
                    },
                    icon: {
                        marginRight: 10,
                    },
                    label: {
                        fontSize: "1.5rem",
                        fontWeight: "500",
                    },
                }}
                rootStyles={{
                    width: "75%",
                    marginInline: "auto",
                    marginTop: 10,
                    borderRadius: 70,
                }}
            >
                <MenuItem component={<Link to="/dashboard" />} icon={<img src={DashboardIcon} alt="Dashboard Icon" />} active={pathname.endsWith("/dashboard")}>
                    Dashboard
                </MenuItem>
                <MenuItem component={<Link to="/tracking" />} icon={<img src={TrackingIcon} alt="Dashboard Icon" />} active={pathname.endsWith("/tracking")}>
                    Tracking
                </MenuItem>
                <MenuItem
                    className="mb-10"
                    icon={<img src={SignoutIcon} alt="Dashboard Icon" />}
                    onClick={() => {
                        localStorage.clear();
                        navigate("/");
                    }}
                >
                    Sign Out
                </MenuItem>
                <div>&nbsp;</div>
            </Menu>
        </Sidebar>
    );
};

export default SideBar;

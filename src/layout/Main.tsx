import { Outlet } from "react-router-dom";

import SideBar from "../components/SideBar";
import TopNav from "../components/TopNav";
import { Suspense, useState } from "react";
import { Loader } from "../helpers/Functions";


const MainLayout = () => {

    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(window.matchMedia("(max-width: 900px)").matches);

    return (
        <>
            <div className="flex overflow-hidden">
                <SideBar toggled={toggled} setToggle={setToggled} setBroken={setBroken} broken={broken} />
                <main className="main">
                    <TopNav toggled={toggled} setToggle={setToggled} broken={broken} />
                    <Suspense fallback={<Loader spin />}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </>
    );
};

export default MainLayout;

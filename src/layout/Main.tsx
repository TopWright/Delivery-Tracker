import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import TopNav from "../components/TopNav";
import { Suspense, useState, useEffect } from "react";
import { Loader } from "../helpers/Functions";
import { useProtectedRoutesContext } from "../context/ProtectedRoutes";

// Type definitions for state
interface MainLayoutProps { }

const MainLayout: React.FC<MainLayoutProps> = () => {
    const { user } = useProtectedRoutesContext();

    if (user === null) return <Navigate to="/" />;

    const [toggled, setToggled] = useState<boolean>(false);
    const [broken, setBroken] = useState<boolean>(window.matchMedia("(max-width: 900px)").matches);

    // Listen for window resizing and update the broken state accordingly
    useEffect(() => {
        const handleResize = () => {
            setBroken(window.matchMedia("(max-width: 900px)").matches);
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <div className="flex overflow-hidden">
                <SideBar toggled={toggled} setToggle={setToggled} setBroken={setBroken} broken={broken} />
                <main className="main">
                    <TopNav />
                    <Suspense fallback={<Loader white={false} />}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </>
    );
};

export default MainLayout;

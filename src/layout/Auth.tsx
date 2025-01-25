import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="min-h-[100vh] flex">
      <div className="h-screen bg-slate-500 w-1/2 px-20">
        <div className="flex flex-col justify-center h-full">
          <div className="mb-5 heading-primary">
            <h1 className="text-[6rem] font-[700] text-white">Delivery Tracking App</h1>
          </div>

          <div className=" w-[70%]">
            <p className="text-[2rem] font-[300] text-white">
              Delivery Tracking Dashboard with Map Integration
            </p>
          </div>
        </div>
      </div>
      <div className="h-screen w-[55%] flex justify-center items-center">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;

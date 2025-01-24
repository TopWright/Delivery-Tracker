import { useEffect } from "react";
import nProgress from "nprogress";


////////////////////////////////////////////
///////====  Storages
////////////////////////////////////////////
export const SetToStorage = (key: string, value: any) => {
  let storedValue = JSON.stringify(value);
  localStorage.setItem(key, storedValue);
};

export const GetFromStorage = (key: string) => {
  let value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const RemoveFromStorage = (key: string): void => {
    localStorage.removeItem(key);
};

////////////////////////////////////////////
///////====  Loaders
////////////////////////////////////////////
export const Loader = ({ white }: { white: boolean }) => {
  return (
    <div className="flex justify-center" style={{ width: "100%" }}>
      <span className={`loader ${white ? "white" : ""}`}></span>
    </div>
  );
};

export const ProgressBar = () => {
  useEffect(() => {
    nProgress.configure({ showSpinner: false, easing: "ease", speed: 500 });
    nProgress.start();

    return () => {
      nProgress.done();
    };
  }, []);

  return null;
};


export function If({ condition, children }: { condition: boolean; children: React.ReactNode }) {
  return condition ? <>{children}</> : null;
}

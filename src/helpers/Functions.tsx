import { useEffect } from "react";
import nProgress from "nprogress";

////////////////////////////////////////////
///////==== Storages
////////////////////////////////////////////

export const SetToStorage = (key: string, value: any): void => {
  const storedValue = JSON.stringify(value);
  localStorage.setItem(key, storedValue);
};

export const GetFromStorage = <T = any>(key: string): T | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const RemoveFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};

////////////////////////////////////////////
///////==== Loaders
////////////////////////////////////////////

interface LoaderProps {
  white: boolean;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ white, className }) => {
  return (
    <div className={`flex justify-center ${className}`} style={{ width: "100%" }}>
      <span className={`loader ${white ? "white" : ""}`}></span>
    </div>
  );
};

export const ProgressBar: React.FC = () => {
  useEffect(() => {
    nProgress.configure({ showSpinner: false, easing: "ease", speed: 500 });
    nProgress.start();

    return () => {
      nProgress.done();
    };
  }, []);

  return null;
};

////////////////////////////////////////////
///////==== Conditional Rendering
////////////////////////////////////////////

interface IfProps {
  condition: boolean;
  children: React.ReactNode;
}

export const If: React.FC<IfProps> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

////////////////////////////////////////////
///////==== Utility Functions
////////////////////////////////////////////

export const convertDate = (timestamp: string | number): string => {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

export const showDash = (str: string | null | undefined): string => {
  return str === null || str === "" || str === " " || str === undefined ? "-" : str;
};

export const capitalizeString = (inputString: string): string => {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
};

export const formatOrderDate = (inputDate: string): string => {
  const orderDate = new Date(inputDate);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const day = orderDate.getDate();
  const month = monthNames[orderDate.getMonth()];
  const year = orderDate.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const getOrderTime = (inputTime: string): string => {
  const [hour, minute] = inputTime.split(":").map(Number);

  const amOrPm = hour >= 12 ? "PM" : "AM";
  const formattedHour = (hour > 12 ? hour - 12 : hour) || 12;

  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${amOrPm}`;
};

export const formatPrice = (price: string | number | null): string => {
  if (price === null) {
    return "₦0.00";
  }

  const numericPrice = parseFloat(String(price));

  if (!isNaN(numericPrice)) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(numericPrice);
  }

  return String(price);
};

export const replaceNullWithHyphen = (obj: Record<string, any>): void => {
  for (const key in obj) {
    if (obj[key] === null) {
      obj[key] = "-";
    }
  }
};

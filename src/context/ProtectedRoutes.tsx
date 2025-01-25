/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { GetFromStorage, SetToStorage } from "../helpers/Functions";

interface ProtectedRoutesContextProps {
    user: any;
    setUser: (user: any) => void;
}

const ProtectedRoutesContext = createContext<ProtectedRoutesContextProps>({
    user: true,
    setUser: () => { },
});

export const useProtectedRoutesContext = () => useContext(ProtectedRoutesContext);

interface ProtectedRoutesProviderProps {
    children: ReactNode;
}

const ProtectedRoutesProvider = ({ children }: ProtectedRoutesProviderProps) => {
    const [user, setUser] = useState(() => GetFromStorage("user") || null);

    useEffect(() => {
        SetToStorage("user", user);
    }, [user]);

    return (
        <ProtectedRoutesContext.Provider value={{ user, setUser }}>
            {children}
        </ProtectedRoutesContext.Provider>
    );
};

export default ProtectedRoutesProvider;

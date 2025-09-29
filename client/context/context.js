import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState("")
    const [employeUserId, setEmployUserId] = useState("")

    return (
        <AppContext.Provider 
        value={{
        authToken,
            setAuthToken
    }
}
        >
    { children }
        </AppContext.Provider >
    );

};
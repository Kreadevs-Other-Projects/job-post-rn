import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext } from "react";
import { jwtDecode } from 'jwt-decode'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState("")
    const [userId, setUserId] = useState("")
    const userRef = useRef()
    const [role, setRole] = useState("")

    const authentication = async () => {
        try {
            const token = await AsyncStorage.getItem("TOKEN");

            if (token) {
                setAuthToken(token);

                const decodeToken = jwtDecode(token);
                const userIdFromToken = decodeToken?.id;

                if (userIdFromToken) {
                    setUserId(userIdFromToken);
                    userRef.current = userIdFromToken;
                }
            } else {
                console.log("No token found");
            }

            const roleValue = await AsyncStorage.getItem("role");
            if (roleValue) {
                setRole(roleValue);
            }

        } catch (error) {
            console.log("Error in retrieving token", error);
        }
    };


    useEffect(() => {
        authentication()
    }, [])

    return (
        <AppContext.Provider
            value={{
                authToken,
                setAuthToken,
                userId,
                setUserId,
                userRef,
                setRole
            }
            }
        >
            {children}
        </AppContext.Provider >
    );

};
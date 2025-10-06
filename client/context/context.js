import { useEffect, useRef, useState, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { url } from "@/app/url";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const userRef = useRef();

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
    authentication();
  }, []);

  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/jobs/listJobs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const result = await response.json();
      console.log("data", result);

      if (Array.isArray(result)) {
        setAllJobs(result);
      } else if (result.success) {
        setAllJobs(result.jobs);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchAllJobs();
    }
  }, [authToken]);

  return (
    <AppContext.Provider
      value={{
        authToken,
        setAuthToken,
        userId,
        setUserId,
        userRef,
        role,
        setRole,
        allJobs,
        setAllJobs,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

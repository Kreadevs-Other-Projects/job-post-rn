import { useEffect, useRef, useState, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { url } from "@/app/url";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employerJobs, setEmployerJobs] = useState([]);

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
    console.log("AuthToken", authToken);

    if (authToken) {
      fetchAllJobs();
    }
  }, [authToken]);

  // const fetchAllListedJobs = async () => {
  //   try {
  //     const response = await fetch(`${url}/jobs/getAllJobs`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const result = await response.json();

  //     if (result.success) {
  //       const jobs = result.jobs[0];
  //       setEmployerJobs(jobs.title);
  //       console.log(jobs.title);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   console.log("AuthToken", authToken);

  //   if (authToken && role === "employer") {
  //     fetchAllListedJobs();
  //   }
  // }, [authToken]);

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
        setEmployerJobs,
        loading,
        employerJobs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

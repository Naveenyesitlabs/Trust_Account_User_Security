import { createContext, useContext, useEffect, useState } from "react";
import { getStoredSession } from "../utils/authStorage";

// Create Context
const SidebarContext = createContext();

// Context Provider Component
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogedinData, setIsLogedinData] = useState();

  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem("trust-account"))?.token;
  //   if (token) {
  //     const userData = { id: 1, role: "admin" };
  //     setUser(userData);
  //   }
  // }, []);



  useEffect(() => {
    // const storedData = JSON.parse(localStorage.getItem("trust-account"));
    const storedData = getStoredSession();
    if (storedData) {
      // alert("storedData: " + JSON.stringify(storedData, null, 2));
      // You should ideally verify the token and fetch user data here
      const userData = {
        id: storedData?.userid, // Get from stored data or API
        role: storedData?.role || "user" // Default to "user" if not specified
      };
      setUser(userData);
      setIsLogedinData(true);
    } else {
      setIsLogedinData(false);
    }
  }, []);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setSidebarOpen, user, setUser, isLogedinData, setIsLogedinData }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = () => {
  // const context = useContext(SidebarContext);
  // alert(JSON.stringify({
  //   isSidebarOpen: context.isSidebarOpen,
  //   user: context.user,
  //   isLogedinData: context.isLogedinData,
  //   hasSetSidebarOpen: !!context.setSidebarOpen,
  //   hasSetUser: !!context.setUser,
  //   hasSetIsLogedinData: !!context.setIsLogedinData,
  // }, null, 2));
  return useContext(SidebarContext);
};
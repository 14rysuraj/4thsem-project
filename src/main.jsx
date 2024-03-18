import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

export const context = createContext({ isAuthenticated: false });
export const adminContext =createContext({ isAdminAuthenticated: false});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated,] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  

  return (
    <adminContext.Provider value={{isAdminAuthenticated,setIsAdminAuthenticated}}>
    <context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
      }}
    >
      <App />
      </context.Provider>
      </adminContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    
    
    <React.StrictMode>
        <AppWrapper />
        </React.StrictMode>


);

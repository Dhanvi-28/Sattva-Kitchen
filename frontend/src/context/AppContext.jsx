import { createContext, useContext, useMemo, useState } from "react";

/**
 * App-wide context for cross-cutting state (e.g. current user, theme).
 * Extend the shape here as features are built; keep page-level state
 * in local component state instead.
 */
const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  const value = useMemo(
    () => ({ user, setUser, theme, setTheme }),
    [user, theme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (ctx === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return ctx;
};

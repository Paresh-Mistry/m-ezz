import { createContext } from "react";

interface ContextType {
    isOpen: boolean;
    toggle_sidebar: () => void;
    theme: string;
    toggleTheme: () => void;
}

export const context = createContext<ContextType>({
    isOpen: false,
    toggle_sidebar: () => {}, 
    theme: "light",
    toggleTheme: () => {},
});

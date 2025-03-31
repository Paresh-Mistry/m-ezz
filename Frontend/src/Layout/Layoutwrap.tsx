import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { context } from "./Context";

const Layoutwrap = ({ children }: { children: React.ReactNode }) => {

    const { theme } = useContext(context)

    return (
        <div className={`flex flex-col md:flex-row w-full h-screen ${theme === 'light' ? 'bg-[#fefbfc] text-black' : 'bg-[#121212] text-[#E0E0E0]'}`}>

            <Sidebar />

            {children}
            
        </div>
    );
};

export default Layoutwrap;

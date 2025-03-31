import { Menu } from 'lucide-react';
import React, { useContext } from 'react';
import { context } from '../Layout/Context';

export const Navbar: React.FC = () => {

    const { toggle_sidebar , theme} = useContext(context) ?? {};

    return (

        <React.Fragment>

            <header className={`${theme === 'light' ? 'bg-white text-black border-gray-200' : 'bg-[#1E1E1E] text-white border-none'} md:hidden visible border-b p-4`}>
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <button className={`visible ${theme==="light" && "text-gray-600 hover:text-gray-800"} md:hidden`} onClick={() => toggle_sidebar()}>
                        <Menu />
                    </button>
                    {/* Authentication Avatar */}
                </div>
            </header>

        </React.Fragment>
    );
};

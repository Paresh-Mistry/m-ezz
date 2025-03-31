import { ArrowLeftToLine, ArrowRight, Box, Info, MessageCircle, SearchCheck, UserCircle, X } from 'lucide-react'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { context } from '../Layout/Context'
import image from '../assets/image/mcp_logo.png'
import Popover from './PopoverBtn'

const Sidebar: React.FC = () => {

    const { isOpen, toggle_sidebar, theme } = useContext(context) ?? {};
    const [md_sidebar, setmd_sidebar] = useState<boolean>(window.innerWidth > 768 ? false : true)
    const sidebarRef = useRef<HTMLDivElement>(null);

    const md_togglebar = () => {
        setmd_sidebar(!md_sidebar)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                toggle_sidebar();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => setmd_sidebar(window.innerWidth > 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const icon = {
        0: <SearchCheck size={20} />,
        1: <Info size={20} />,
        2: <MessageCircle size={20} />,
        3: <Box size={20} />
    }

    return (
        <aside
            ref={sidebarRef}
            className={`w-70 shadow-sm ${md_sidebar ? 'md:w-55' : 'md:w-22'} pt-4 px-1 flex flex-col md:justify-between md:transition-[width] duration-300 md:rounded-none rounded-r-xl ease-in-out md:top-auto top-0 absolute h-screen z-10 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 md:relative  ${theme === 'light' ? 'bg-[#E6E6E2] text-black' : 'bg-[#1E1E1E] text-white'}`}
        >
            <div className='space-y-7 sticky top-0 h-full min-h-0 flex-1 flex-col'>
                <div className={`flex items-center px-2 ${md_sidebar ? 'justify-between' : 'justify-center'}`}>
                    <Link to={'/'} className='font-display text-cyan-700 text-2xl font-semibold'>{md_sidebar && 'M-Ezz'}</Link>
                    {window.innerWidth > 768 && <ArrowLeftToLine size={20} className={`mt-1 cursor-pointer text-gray-600 rounded-full ${!md_sidebar && 'hidden'}`} onClick={md_togglebar} />}
                    {!md_sidebar && <ArrowRight size={30} className='mt-1 p-1 cursor-pointer text-gray-600 bg-gray-300 rounded-full mb-6' onClick={md_togglebar} />}
                    <button className='md:hidden' onClick={() => toggle_sidebar()}><X /></button>
                </div>
                <div className='mb-5' onClick={() => toggle_sidebar()}>
                    <Link to={'/mcp'} className={`flex gap-2 font-mono text-[20px] items-center ${md_sidebar && 'text-black bg-gray-200 border border-gray-200 shadow py-1.5 rounded-full pl-2'}`}><img src={image} alt="" className={`mix-blend-multiply ${!md_sidebar && theme === "dark" ? "invert-75" : "invert-0"} ${md_sidebar && 'w-7' || 'w-10 mx-auto'}`} />{md_sidebar && 'MCP'}</Link>
                </div>
                <nav className="flex flex-col pt-2">
                    {['Home', 'About', 'Chat', 'Pricing'].map((list, index) => {
                        const path = list === "Home" ? "/" : `/${list}`;
                        const isActive = location.pathname === path;

                        return (
                            <Link
                                onClick={() => toggle_sidebar()}
                                key={index}
                                to={path}
                                title={list}
                                className={`flex items-center truncate leading-none font-display text-[17px] font-[575] gap-2 px-2 ${theme === "dark" ? 'text-gray-400  hover:bg-gray-800' : 'text-gray-500 hover:bg-stone-200'} py-3.5 w-full ${!md_sidebar && 'border-r-4 rounded'}
                        ${isActive ? `${theme==='light' ? 'text-gray-800 border-gray-700' : 'text-sky-500 border-sky-700'}`: 'border-transparent'} 
                        ${!md_sidebar && 'justify-center'}`}
                            >
                                {Object.values(icon)[index]} {md_sidebar && list}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="md:mt-0 mt-8">
                {md_sidebar && (
                    <div className="mx-auto mb-3">
                        <button className="bg-cyan-800 leading-loose truncate w-full text-white rounded-4xl mt-2">
                            Sign up
                        </button>
                        <button className="bg-gray-300 leading-loose truncate w-full rounded-4xl mt-2">
                            Login
                        </button>
                    </div>
                )}

                <div className={`flex gap-3 px-2 items-center justify-between border-stone-300 border-t py-3 ${!md_sidebar && 'justify-center'}`}>
                    <span className='flex items-center gap-2'><UserCircle size={20} />{md_sidebar && 'Paresh'}</span>
                   {md_sidebar && <span><Popover/></span>}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
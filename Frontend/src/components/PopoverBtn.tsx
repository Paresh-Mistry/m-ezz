import React, { useState, useRef, useEffect, useContext } from "react";
import { EllipsisVertical } from "lucide-react";
import { context } from "../Layout/Context";

const Popover: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const { toggleTheme , theme } = useContext(context)

    const togglePopover = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={popoverRef}>
            <button onClick={togglePopover} className="p-2 rounded-full cursor-pointer">
                <EllipsisVertical size={24} />
            </button>
            {isOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-40 bg-white shadow-lg rounded-md border z-10">
                    <ul className="py-2 text-sm text-gray-700">
                        <li className="px-4 py-2 flex items-center justify-between gap-2 hover:bg-gray-100 cursor-pointer">
                        <span className="text-sm text-gray-700">{theme==="light"?"Light":"Dark"}{" Mode"}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    onChange={toggleTheme}
                                />
                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-800"></div>
                            </label>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Popover;
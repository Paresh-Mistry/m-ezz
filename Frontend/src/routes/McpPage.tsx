import React, { useEffect, useState } from 'react'
import Layoutwrap from '../Layout/Layoutwrap'
import { Search } from 'lucide-react'
import McpCard from '../components/McpCard'

const McpPage: React.FC = () => {
    useEffect(() => {
        document.title = "Models";
    }, []);

    const [inputvalue, setInputValue] = useState<string>('');

    return (
        <Layoutwrap>
            <div className="w-full overflow-y-auto">
                <div className="py-4 w-full px-6 flex justify-end">
                    <div className="flex items-center border w-80 pr-3 gap-2 border-gray-300 h-12 rounded-md">
                        <input
                            className="w-full h-full pl-5 outline-none placeholder-gray-500 text-sm"
                            placeholder="Search for model"
                            value={inputvalue}
                            onChange={(e) => setInputValue(e.target.value)}
                            type="text"
                        />
                        <Search className="text-gray-600 cursor-pointer" />
                    </div>
                </div>
                <div className="container mx-auto w-full grid grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 py-4">
                    <McpCard inputvalue={inputvalue} />
                </div>
            </div>
        </Layoutwrap>
    );
};

export default McpPage;

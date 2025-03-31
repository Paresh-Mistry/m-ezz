import React, { useContext, useEffect } from "react";
import Layoutwrap from "../Layout/Layoutwrap";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { context } from "../Layout/Context";

const Home: React.FC = () => {

    const {theme} = useContext(context)

    useEffect(() => {
        document.title = "Home"
    }, [])

    return (
        <Layoutwrap>

            {/* Dummy Home Page */}

            <div className="mx-auto min-h-screen flex flex-col items-center pt-20 relative px-4 text-center space-y-1.5">
                <h1 className="text-4xl md:text-6xl font-bold text-cyan-600">
                    <span className="font-semibold">Introducing</span> M-Ezz
                </h1>

                <p className="text-lg md:text-xl text-gray-500 max-w-3xl mt-4">
                    Unlock the power of AI-driven insights! Our cutting-edge generative models provide
                    real-time answers with unmatched precision.
                </p>
                <div className="flex flex-col md:flex-row md:gap-2">
                    <Link
                        to="/chat"
                        className="mt-6 flex gap-2 w-fit mx-auto items-center px-4 py-2 border-cyan-700 border-2 text-cyan-700 font-semibold rounded-lg hover:border-cyan-900 transition duration-300"
                    >
                        Try M-Ezz <ArrowUpRight size={20} />
                    </Link>
                    <Link
                        to="/about"
                        className={`${theme==="light"?"text-black":"text-white"} mt-6 px-4 py-3 w-fit mx-auto flex gap-2 items-center font-semibold rounded-lg hover:text-cyan-700`}
                    >
                        Learn about M-Ezz <ChevronRight size={20} />
                    </Link>
                </div>
            </div>
        </Layoutwrap>
    );
};

export default Home;

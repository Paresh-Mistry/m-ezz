import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { context } from '../Layout/Context'
import { Check } from 'lucide-react';

interface PriceCardProps {
    title: string;
    price: string;
    features: string[];
  }

const PriceCard: React.FC<PriceCardProps> = ({ title, price, features }) => {

    const { theme } = useContext(context)

    return (

        <div className={`rounded-3xl ${theme === "light" ? 'ring-gray-900/10' : 'ring-gray-600'} p-8 ring-1 sm:mx-8 sm:p-10 lg:mx-0`}>
            <h3 id="tier-hobby" className="text-base/7 font-semibold text-indigo-600">{title}</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
                <span className={`text-5xl font-semibold tracking-tight ${theme === "light" ? "text-gray-900" : "text-cyan-300"}`}>{price}</span>
                <span className="text-base text-gray-500">/month</span>
            </p>
            <ul role="list" className={`mt-8 space-y-3 text-sm/6 ${theme === "light" ? 'text-gray-600' : 'text-white'} sm:mt-10`}>
                {features.map((e) => (
                    <li className="flex gap-x-3">
                        <Check/>
                        {e}
                    </li>
                ))}
            </ul>
            <Link to="/" aria-describedby="tier-hobby" className="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10">Get started today</Link>
        </div>

    )
}

export default PriceCard
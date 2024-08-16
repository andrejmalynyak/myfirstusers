import React from "react";

export const Header = () => (
    <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-4xl font-bold text-purple-300 mb-4 sm:mb-0">Marketing Dashboard</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="bg-gray-700 hover:bg-gray-600 transition-colors px-6 py-3 rounded-lg text-sm text-gray-300">
                Get 6 new tips in your inbox every Monday
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-3 rounded-lg text-sm font-semibold text-white">
                Yes Please :)
            </button>
        </div>
    </header>
)

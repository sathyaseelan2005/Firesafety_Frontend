import React from 'react';
import Dock from '../components/Dock';
import { Home, Archive, User, Settings, ShoppingBag, Shield } from 'lucide-react';

export const DockDemo = () => {
    const items = [
        {
            icon: <Home size={20} className="text-white" />,
            label: 'Home',
            onClick: () => window.location.hash = 'home'
        },
        {
            icon: <ShoppingBag size={20} className="text-blue-400" />,
            label: 'Products',
            onClick: () => window.location.hash = 'products'
        },
        {
            icon: <Shield size={20} className="text-red-500" />,
            label: 'Admin',
            onClick: () => window.location.hash = 'admin'
        },
        {
            icon: <User size={20} className="text-green-400" />,
            label: 'Profile',
            onClick: () => window.location.hash = 'customer-login'
        },
        {
            icon: <Settings size={20} className="text-gray-400" />,
            label: 'Settings',
            onClick: () => alert('Settings!')
        },
        {
            icon: <Archive size={20} className="text-yellow-400" />,
            label: 'Archive',
            onClick: () => alert('Archive!')
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>

            <div className="z-10 text-center mb-32">
                <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    macOS Style Dock
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    A beautiful, interactive dock menu built with React, Tailwind CSS, and Framer Motion.
                    Hover over the items to see the magnification effect.
                </p>
            </div>

            <div className="fixed bottom-10 left-0 right-0 z-50">
                <Dock
                    items={items}
                    panelHeight={68}
                    baseItemSize={50}
                    magnification={70}
                />
            </div>
        </div>
    );
};

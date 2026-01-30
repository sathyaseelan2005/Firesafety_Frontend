import React from 'react';
import CardSwap, { Card } from '../components/CardSwap';

export const CardSwapDemo = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
            <div className="max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">Fire Safety Gear Showcase</h1>
                <div style={{ height: '600px', position: 'relative' }}>
                    <CardSwap
                        cardDistance={60}
                        verticalDistance={70}
                        delay={5000}
                        pauseOnHover={true}
                    >
                        <Card className="flex flex-col items-center justify-center p-6 bg-gray-800 border-yellow-500/30">
                            <img
                                src="/firefighter_helmet.png"
                                alt="Firefighter Helmet"
                                className="w-48 h-48 object-contain mb-4 drop-shadow-lg"
                            />
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-yellow-500 mb-2">Safety Helmet</h3>
                                <p className="text-gray-300">Premium impact protection with heat resistance.</p>
                            </div>
                        </Card>
                        <Card className="flex flex-col items-center justify-center p-6 bg-gray-800 border-orange-500/30">
                            <img
                                src="/firefighter_gloves.png"
                                alt="Firefighter Gloves"
                                className="w-48 h-48 object-contain mb-4 drop-shadow-lg"
                            />
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-orange-500 mb-2">Fire Gloves</h3>
                                <p className="text-gray-300">Thermal insulation and cut resistance.</p>
                            </div>
                        </Card>
                        <Card className="flex flex-col items-center justify-center p-6 bg-gray-800 border-red-500/30">
                            <div className="w-48 h-48 mb-4 flex items-center justify-center bg-red-900/20 rounded-full">
                                <span className="text-6xl">🔥</span>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-red-500 mb-2">More Tools</h3>
                                <p className="text-gray-300">Explore our full catalog of safety equipment.</p>
                            </div>
                        </Card>
                    </CardSwap>
                </div>
            </div>
        </div>
    );
};

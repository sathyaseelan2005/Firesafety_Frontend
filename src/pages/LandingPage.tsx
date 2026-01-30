import { useRef } from 'react';
import { ChevronRight, Factory, Truck, ShieldCheck, HardHat, Stethoscope, GraduationCap, Zap, Beaker, Users, Home, Archive, ShoppingBag } from 'lucide-react';

import Dock from '../components/Dock';


import VariableProximity from '../components/VariableProximity';
import TextType from '../components/TextType';
import Plasma from '../components/Plasma';
import Marquee from '../components/Marquee';




interface LandingPageProps {
    onNavigate: (path: string) => void;
}

export const LandingPage = ({ onNavigate }: LandingPageProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dockItems = [
        {
            icon: <Home size={20} className="text-white" />,
            label: 'Home',
            onClick: () => onNavigate('/')
        },
        {
            icon: <ShoppingBag size={20} className="text-orange-400" />,
            label: 'Products',
            onClick: () => onNavigate('/products')
        },

        {
            icon: <Archive size={20} className="text-yellow-400" />,
            label: 'Contact',
            onClick: () => onNavigate('/contact')
        },
    ];

    return (
        <div className="font-sans text-theme-text">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-theme-bg text-theme-text min-h-[600px] flex items-center">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <Plasma
                        color="#D32F2F"
                        speed={0.6}
                        direction="forward"
                        scale={1.1}
                        opacity={0.8}
                        mouseInteractive={true}
                    />
                </div>
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-theme-surface to-transparent opacity-50 z-0"></div>
                <div className="absolute -left-20 top-20 text-[400px] font-black text-black/5 select-none leading-none z-0">
                    250
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            {/* Logo placeholder if needed within hero, but usually header handles it */}
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight flex flex-col items-start">
                            <span className="text-theme-text">KC</span>
                            <span className="text-9xl font-black text-theme-accent">SALES</span>
                        </h1>
                        <div className="text-4xl font-bold text-theme-text">
                            Kumaran Chemical Dealers in Salt, Acid & Chemicals
                        </div>
                        <p className="text-xl text-theme-text-muted max-w-lg">
                            Your trusted partner for quality chemicals and fire safety solutions!
                        </p>
                        <button
                            onClick={() => onNavigate('/products')}
                            className="bg-theme-accent hover:bg-red-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg shadow-theme-accent/20 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
                        >
                            Know More <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>


                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-theme-surface py-20 text-theme-text-on-surface border-y border-theme-surface-hover overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div ref={containerRef} style={{ position: 'relative' }}>
                            <VariableProximity
                                label={'LEADING MANUFACTURER OF FIRE FIGHTING EQUIPMENT & SYSTEM'}
                                className={'text-4xl lg:text-5xl font-bold mb-6 text-theme-text-on-surface block leading-tight cursor-pointer'}
                                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                                containerRef={containerRef}
                                radius={100}
                                falloff='linear'
                            />
                        </div>
                        <div className="text-theme-text-muted text-lg leading-relaxed">
                            <TextType
                                text="Kumaran Chemical is one of the leading dealers of chemicals and fire safety equipment in Erode. Our aim remains to provide high-quality products and innovative solutions for industrial and commercial needs."
                                typingSpeed={30}
                                loop={false}
                                showCursor={true}
                                cursorCharacter="|"
                            />
                        </div>
                    </div>


                </div>
            </div>



            {/* Infrastructure Section */}
            <div className="py-20 bg-theme-surface border-y border-theme-surface-hover text-theme-text-on-surface">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-theme-surface-hover">
                                <img
                                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    alt="Warehouse Infrastructure"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <h4 className="text-xl font-bold mb-2">
                                            State-of-the-Art Facility
                                        </h4>
                                        <p className="text-gray-300">
                                            Erode, Tamil Nadu
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 space-y-8">
                            <div>
                                <h3 className="text-theme-accent font-bold tracking-wider uppercase mb-2">
                                    Infrastructure
                                </h3>
                                <h2 className="text-3xl lg:text-4xl font-bold text-theme-text-on-surface mb-4">
                                    Built for Excellence & Safety
                                </h2>
                                <p className="text-theme-text-muted text-lg leading-relaxed">
                                    Our robust infrastructure is the backbone of our operations, enabling us to store, handle, and distribute dangerous chemicals and safety equipment with utmost precision and care.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-theme-bg p-3 rounded-lg border border-theme-surface-hover">
                                        <Factory className="w-6 h-6 text-theme-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-theme-text-on-surface mb-1">Large Storage Capacity</h4>
                                        <p className="text-sm text-theme-text-muted">
                                            Over 10,000 sq. ft. of dedicated warehousing space.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-theme-bg p-3 rounded-lg border border-theme-surface-hover">
                                        <Truck className="w-6 h-6 text-theme-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-theme-text-on-surface mb-1">Efficient Logistics</h4>
                                        <p className="text-sm text-theme-text-muted">
                                            Own fleet of vehicles for prompt and safe delivery.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-theme-bg p-3 rounded-lg border border-theme-surface-hover">
                                        <ShieldCheck className="w-6 h-6 text-theme-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-theme-text-on-surface mb-1">Safety Compliant</h4>
                                        <p className="text-sm text-theme-text-muted">
                                            Adherence to strict safety protocols and handling standards.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-theme-bg p-3 rounded-lg border border-theme-surface-hover">
                                        <Users className="w-6 h-6 text-theme-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-theme-text-on-surface mb-1">Expert Team</h4>
                                        <p className="text-sm text-theme-text-muted">
                                            Trained professionals for technical support and guidance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Industries Served */}
            < div className="py-20 bg-theme-bg text-center" >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <h3 className="text-theme-accent font-bold tracking-wider uppercase mb-2">Our Reach</h3>
                    <h2 className="text-3xl lg:text-4xl font-bold text-theme-text mb-16">Industries We Serve</h2>

                    <Marquee
                        items={[
                            { name: 'Textile', icon: <Factory className="w-8 h-8" /> },
                            { name: 'Chemicals', icon: <Beaker className="w-8 h-8" /> },
                            { name: 'Construction', icon: <HardHat className="w-8 h-8" /> },
                            { name: 'Hospitals', icon: <Stethoscope className="w-8 h-8" /> },
                            { name: 'Education', icon: <GraduationCap className="w-8 h-8" /> },
                            { name: 'Electrical', icon: <Zap className="w-8 h-8" /> },
                        ]}
                        speed={20}
                        renderItem={(industry) => (
                            <div className="group w-64 h-48 p-6 bg-theme-surface rounded-xl border border-theme-surface-hover hover:border-theme-accent transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-theme-bg rounded-full flex items-center justify-center text-theme-text-muted group-hover:text-white group-hover:bg-theme-accent transition-colors mb-4 border border-theme-surface-hover">
                                    {industry.icon}
                                </div>
                                <h4 className="font-semibold text-theme-text-on-surface">{industry.name}</h4>
                            </div>
                        )}
                    />
                </div>
            </div >

            {/* Clients Section */}
            < div className="py-20 bg-theme-surface border-t border-theme-surface-hover text-theme-text-on-surface" >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-theme-text-on-surface mb-4">Trusted By Leaders</h2>
                        <p className="text-theme-text-muted max-w-2xl mx-auto">
                            We are proud to be the preferred vendor for over 500+ corporate clients across Tamil Nadu.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 opacity-70">
                        {['TATA Projects', 'L&T Construction', 'Apollo Hospitals', 'Anna University', 'TNPL', 'JSW Steel'].map((client, idx) => (
                            <div key={idx} className="px-8 py-4 bg-theme-bg rounded-lg border border-theme-surface-hover text-xl font-bold text-theme-text-muted hover:text-theme-accent hover:border-theme-accent transition-colors cursor-default">
                                {client}
                            </div>
                        ))}
                    </div>
                </div>
            </div >
            {/* Fixed Dock Navigation */}
            < div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none" >
                <div className="pointer-events-auto">
                    <Dock
                        items={dockItems}
                        panelHeight={60}
                        baseItemSize={45}
                        magnification={60}
                        distance={100}
                    />
                </div>
            </div >
        </div >
    );
};

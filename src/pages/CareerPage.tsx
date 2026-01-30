import { ArrowLeft } from 'lucide-react';

interface CareerPageProps {
    onBack: () => void;
}

export const CareerPage = ({ onBack }: CareerPageProps) => {
    return (
        <div className="min-h-screen bg-theme-bg py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-theme-text-muted hover:text-theme-accent transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Home</span>
                </button>

                <div className="bg-theme-surface rounded-lg shadow-sm border border-theme-surface-hover overflow-hidden">
                    <div className="relative h-64 sm:h-80">
                        <img
                            src="https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Careers at Kumaran Chemical"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                            <div className="p-8">
                                <h1 className="text-4xl font-bold text-white mb-2">Join Our Team</h1>
                                <p className="text-gray-200 text-lg">Help us shape the future of fire protection.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 sm:p-12">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-bold text-theme-text mb-6">Why work with Kumaran Chemical?</h2>
                            <p className="text-theme-text-muted leading-relaxed mb-8">
                                At Kumaran Chemical, we are more than just a chemical and safety equipment dealer. We are a team of dedicated professionals committed to quality and service. We offer a dynamic work environment, opportunities for professional growth, and the chance to make a real difference.
                            </p>

                            <h2 className="text-2xl font-bold text-theme-text mb-6">Current Openings</h2>
                            <div className="space-y-4">
                                {[
                                    { title: 'Senior Safety Engineer', loc: 'Mumbai, India', type: 'Full-time' },
                                    { title: 'Product Designer', loc: 'Bangalore, India', type: 'Full-time' },
                                    { title: 'Sales Executive', loc: 'Delhi, India', type: 'Remote' },
                                ].map((job, idx) => (
                                    <div key={idx} className="bg-theme-bg border border-theme-surface-hover rounded-lg p-6 hover:border-theme-accent transition-colors group cursor-pointer">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-theme-text group-hover:text-theme-accent transition-colors">
                                                    {job.title}
                                                </h3>
                                                <p className="text-theme-text-muted mt-1">{job.loc} • {job.type}</p>
                                            </div>
                                            <button className="px-4 py-2 bg-theme-surface text-theme-text rounded hover:bg-theme-accent hover:text-white transition-colors text-sm font-medium border border-theme-surface-hover">
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

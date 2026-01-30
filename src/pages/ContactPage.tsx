import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react';

export const ContactPage = () => {
    return (
        <div className="min-h-screen bg-theme-bg py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h1 className="text-4xl font-bold text-theme-text mb-6">Get in Touch</h1>
                        <p className="text-theme-text-muted text-lg mb-8">
                            Have questions about our fire suppression systems or need technical support?
                            Our team is here to help you.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-theme-accent/10 rounded-lg">
                                    <MapPin className="w-6 h-6 text-theme-accent" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-theme-text">Our Headquarters</h3>
                                    <p className="text-theme-text-muted">
                                        Kumaran Chemical<br />
                                        173/2 VMC Parvatham Towers, KVB Upstaire<br />
                                        Veerappan Chatram (Po.), Erode - 638 004
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-theme-accent/10 rounded-lg">
                                    <Phone className="w-6 h-6 text-theme-accent" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-theme-text">Phone Number</h3>
                                    <p className="text-theme-text-muted">
                                        +91 93611 49490 (Pk.Sekar)<br />

                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-theme-accent/10 rounded-lg">
                                    <Mail className="w-6 h-6 text-theme-accent" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-theme-text">Email Address</h3>
                                    <p className="text-theme-text-muted">
                                        kumarans2020@gmail.com<br />

                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-theme-accent/10 rounded-lg">
                                    <Clock className="w-6 h-6 text-theme-accent" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-theme-text">Business Hours</h3>
                                    <p className="text-theme-text-muted">
                                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                                        Sunday: Closed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-theme-surface rounded-xl shadow-sm p-8 border border-theme-surface-hover">
                        <h2 className="text-2xl font-bold text-theme-text mb-6">Send us a Message</h2>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-theme-text-muted mb-1">First Name</label>
                                    <input type="text" className="w-full px-4 py-2 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent focus:border-transparent outline-none placeholder-theme-text-muted" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-text-muted mb-1">Last Name</label>
                                    <input type="text" className="w-full px-4 py-2 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent focus:border-transparent outline-none placeholder-theme-text-muted" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-text-muted mb-1">Email Address</label>
                                <input type="email" className="w-full px-4 py-2 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent focus:border-transparent outline-none placeholder-theme-text-muted" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-text-muted mb-1">Subject</label>
                                <input type="text" className="w-full px-4 py-2 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent focus:border-transparent outline-none placeholder-theme-text-muted" placeholder="How can we help?" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-text-muted mb-1">Message</label>
                                <textarea rows={4} className="w-full px-4 py-2 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent focus:border-transparent outline-none resize-none placeholder-theme-text-muted" placeholder="Your message..." />
                            </div>

                            <button type="submit" className="w-full py-3 bg-theme-accent text-white font-semibold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-theme-accent/20">
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

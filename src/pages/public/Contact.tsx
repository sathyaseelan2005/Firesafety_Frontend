import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react';

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0!2d77.7!3d11.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE4JzAwLjAiTiA3N8KwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1';

export function Contact() {
  return (
    <div className="min-h-screen bg-theme-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-theme-text mb-8">Get in Touch</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-theme-text-muted text-lg mb-8">
              Have questions about our safety equipment or need a dealer enquiry? Our team is here to help.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-theme-accent/10 rounded-lg shrink-0">
                  <MapPin className="w-6 h-6 text-theme-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-theme-text">Address</h3>
                  <p className="text-theme-text-muted">
                    Kumaran Safety Equipments<br />
                    Erode, Tamil Nadu
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-theme-accent/10 rounded-lg shrink-0">
                  <Phone className="w-6 h-6 text-theme-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-theme-text">Phone</h3>
                  <p className="text-theme-text-muted">+91 93611 49490</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-theme-accent/10 rounded-lg shrink-0">
                  <Mail className="w-6 h-6 text-theme-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-theme-text">Email</h3>
                  <p className="text-theme-text-muted">kumarans2020@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-theme-accent/10 rounded-lg shrink-0">
                  <Clock className="w-6 h-6 text-theme-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-theme-text">Hours</h3>
                  <p className="text-theme-text-muted">Mon–Sat: 9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-theme-surface rounded-xl border border-theme-surface-hover p-8">
              <h2 className="text-xl font-bold text-theme-text mb-6">Send a message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-4 py-2 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent outline-none placeholder-theme-text-muted"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full px-4 py-2 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent outline-none placeholder-theme-text-muted"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent outline-none placeholder-theme-text-muted"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-2 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent outline-none placeholder-theme-text-muted"
                />
                <textarea
                  rows={4}
                  placeholder="Message"
                  className="w-full px-4 py-2 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:ring-2 focus:ring-theme-accent outline-none resize-none placeholder-theme-text-muted"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-theme-accent text-white font-semibold rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send
                </button>
              </form>
            </div>

            <div className="rounded-xl overflow-hidden border border-theme-surface-hover h-64 bg-theme-surface">
              <iframe
                title="Google Map"
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

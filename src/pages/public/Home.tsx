import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Factory, 
  Truck, 
  ShieldCheck, 
  Users,
  Flame,
  Award,
  Clock,
  HeartHandshake
} from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: Factory,
      title: 'Premium Quality',
      description: 'Industry-standard safety equipment certified to meet global safety regulations',
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      description: 'Timely and safe delivery across Tamil Nadu with our dedicated logistics fleet',
      color: 'from-green-500/20 to-green-600/20'
    },
    {
      icon: ShieldCheck,
      title: 'ISI Certified',
      description: 'All products meet ISI and international safety standards',
      color: 'from-purple-500/20 to-purple-600/20'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Technical guidance from trained professionals whenever you need it',
      color: 'from-orange-500/20 to-orange-600/20'
    }
  ];

  const stats = [
    { value: '25+', label: 'Years of Excellence', icon: Award },
    { value: '500+', label: 'Happy Clients', icon: Users },
    { value: '1000+', label: 'Products Delivered', icon: Clock },
    { value: '24/7', label: 'Customer Support', icon: HeartHandshake }
  ];

  return (
    <div className="font-sans text-theme-text">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-theme-bg via-theme-bg to-theme-surface/50 min-h-[600px] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-theme-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-theme-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-theme-accent/10 rounded-full text-theme-accent border border-theme-accent/20">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-medium">Trusted Since 1995</span>
              </div>
              
              <h1 className="text-4xl lg:text-7xl font-bold leading-tight">
                <span className="text-theme-text">Kumaran</span>
                <br />
                <span className="bg-gradient-to-r from-theme-accent to-red-400 bg-clip-text text-transparent">
                  Safety Equipments
                </span>
              </h1>
              
              <h4 className="text-xl text-theme-accent/90 font-medium">
                A division of Kumaran Chemicals
              </h4>
              
              <p className="text-lg text-theme-text-muted leading-relaxed max-w-xl">
                Your trusted partner for comprehensive fire safety and industrial safety solutions. 
                Protecting lives and assets with premium quality equipment since three decades.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 bg-theme-accent hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-theme-accent/20 transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  Explore Products 
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-theme-accent text-theme-accent font-semibold rounded-xl hover:bg-theme-accent/10 transition-all duration-300"
                >
                  Contact Sales
                </Link>
              </div>
            </div>

            {/* Right side - Visual element */}
            {/* Right side - Logo with Frame */}
<div className="hidden lg:block relative">
  <div className="relative w-full h-[450px] flex items-center justify-center">
    {/* Decorative background layers */}
    <div className="absolute inset-0 bg-gradient-to-br from-theme-accent/20 via-transparent to-transparent rounded-full blur-3xl" />
    
    {/* Outer circle decoration */}
    <div className="absolute w-80 h-80 border-2 border-theme-accent/20 rounded-full animate-pulse" />
    <div className="absolute w-72 h-72 border border-theme-accent/10 rounded-full animate-pulse delay-300" />
    
    {/* Glass morphism background */}
    <div className="absolute w-96 h-96 bg-gradient-to-br from-theme-accent/10 to-transparent rounded-full backdrop-blur-sm" />
    
    {/* Logo with frame */}
    <div className="relative z-10 group cursor-pointer">
      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-accent/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
      
      {/* Logo frame */}
      <div className="relative bg-gradient-to-br from-theme-surface to-theme-bg p-8 rounded-3xl border border-theme-accent/20 shadow-2xl backdrop-blur-sm">
        <img 
          src="/kumarans-logo.png" 
          alt="Kumaran Safety Equipments" 
          className="w-auto h-auto max-w-[320px] max-h-[320px] object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            // Show fallback with company name
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = 'text-center p-8';
              fallback.innerHTML = `
                <div class="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-theme-accent/20 to-transparent rounded-full flex items-center justify-center">
                  <span class="text-4xl font-bold text-theme-accent/50">KC</span>
                </div>
                <h3 class="text-2xl font-bold text-theme-text">Kumaran Safety</h3>
                <p class="text-theme-text-muted text-sm mt-2">Since 1995</p>
              `;
              parent.appendChild(fallback);
            }
          }}
        />
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-theme-accent/10 rounded-full blur-md animate-pulse" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-theme-accent/10 rounded-full blur-md animate-pulse delay-700" />
    </div>
    
    {/* Bottom caption */}
    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
      <p className="text-sm text-theme-text-muted bg-theme-surface/80 backdrop-blur-sm px-4 py-2 rounded-full border border-theme-surface-hover">
        Trusted Safety Dealer
      </p>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-theme-surface border-y border-theme-surface-hover">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center group">
                <div className="inline-flex p-4 bg-theme-bg rounded-2xl border border-theme-surface-hover group-hover:border-theme-accent/50 transition-all duration-300 mb-4">
                  <Icon className="w-8 h-8 text-theme-accent" />
                </div>
                <div className="text-3xl font-bold text-theme-text mb-1">{value}</div>
                <div className="text-sm text-theme-text-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-theme-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-theme-text mb-4">
              Why Choose Kumaran Safety?
            </h2>
            <p className="text-theme-text-muted text-lg">
              We combine decades of experience with cutting-edge safety solutions to protect what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="group relative p-8 bg-gradient-to-br from-theme-surface to-theme-bg rounded-2xl border border-theme-surface-hover hover:border-theme-accent/50 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="inline-flex p-4 bg-theme-bg rounded-xl border border-theme-surface-hover group-hover:border-theme-accent/30 mb-4 transition-colors">
                    <Icon className="w-8 h-8 text-theme-accent" />
                  </div>
                  <h3 className="font-bold text-theme-text text-lg mb-2">{title}</h3>
                  <p className="text-theme-text-muted text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-theme-accent to-red-500">
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Enhance Your Safety Standards?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Browse our comprehensive range of safety equipment or reach out for customized solutions and dealer enquiries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="px-8 py-4 bg-white text-theme-accent font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              View Product Catalog
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
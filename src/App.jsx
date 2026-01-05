import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Phone, Mail, MapPin, Shield, Truck, ArrowRight, CheckCircle,
  TrendingUp, Users, Award, Factory, Building2, Clock, Star, Package, ChevronRight
} from 'lucide-react';

// Simple intersection observer hook to fade/slide sections into view
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// Scroll-based Building Construction Background Animation
// Scroll-based Building Construction Background Animation
const BuildingAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min((scrolled / documentHeight) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-light via-blue-100 to-white opacity-40"></div>

      <div className={`relative w-full h-full flex items-end justify-center transition-transform duration-1000 ease-out ${loaded ? 'scale-100 translate-y-0' : 'scale-110 translate-y-10 opacity-0'}`}>

        {/* Under Construction Building (Base) */}
        <div className="absolute bottom-0 w-full flex justify-center items-end">
          <img
            src="/assets/building_under_construction.png"
            alt="Building Under Construction"
            className="h-[85vh] w-auto object-contain max-w-none opacity-90 origin-bottom"
            style={{
              filter: 'grayscale(20%) contrast(110%)',
            }}
          />
        </div>

        {/* Completed Building (Overlay with Clip Path) */}
        <div
          className="absolute bottom-0 w-full flex justify-center items-end"
          style={{
            // Reveal from bottom to top as we scroll down
            // crop-rect logic: inset(top right bottom left)
            // As scrollProgress increases (0 -> 100), we want to reveal MORE of the building.
            // But usually building is revealed bottom-up?
            // "starts building.. at the end complete" -> yes, construction usually goes bottom-up.
            // So at 0%, we see bottom 0% (or base). At 100%, we see top.
            // Wait, if I use inset(100% 0 0 0), it clips from TOP down 100%, so NOTHING is visible.
            // if I use inset(0% 0 0 0), it clips nothing, so EVERYTHING is visible.
            // So ${100 - scrollProgress}% creates a reveal from bottom to top.
            clipPath: `inset(${100 - scrollProgress}% 0 0 0)`
          }}
        >
          <img
            src="/assets/building_completed.png"
            alt="Building Completed"
            className="h-[85vh] w-auto object-contain max-w-none origin-bottom"
            style={{
              filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))'
            }}
          />
        </div>

        {/* Boom Animation Effect layer */}
        <div className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-[2000ms] ease-out ${loaded ? 'opacity-0' : 'opacity-100'}`}></div>
      </div>
    </div>
  );
};

const COMPANY_DETAILS = {
  fullName: 'Shiv Iron Store',
  tagline: 'Your Trusted Iron & Steel Materials Specialist',
  description: 'Leading supplier of premium construction materials across NCR with 40+ years of excellence. Authorized dealers of JSW Steel, APL Apollo Pipes, Rathi TMT Bars, SAIL, and other leading brands.',
  logo: '/assets/logo shiv 2.png',
  phone1: '+91-9999999999',
  phone2: '+91-8888888888',
  email: 'info@shivironstore.com',
  address: 'Ghaziabad, NCR, India'
};

const PRODUCTS = [
  {
    id: 1,
    name: 'SAIL SS Beams - Steel Railing',
    desc: 'Steel Railing that gives your house an Elegant Look. Trust Apollo and SAIL certified steel for beauty, strength, and long-life railings.',
    image: '/assets/steel-beams-railing.jpg',
    features: [
      'Elegant Look Railings',
      'SAIL Certified Steel',
      'Apollo Trusted Quality',
      'Superior Strength',
      'Weather Resistant Finish',
      'Easy to Install'
    ],
    sizes: 'ISMB: 100mm to 600mm | ISMC: 75mm to 400mm',
    category: 'Steel Railings',
    applications: 'Home railings, Balcony grills, Staircases, Commercial properties'
  },
  {
    id: 2,
    name: 'Sel Tiger TMT Bars - JSW',
    desc: 'High Strength with Better Durability. Trust JSW for a roof that looks new for years with minimal maintenance. Best Price guaranteed.',
    image: '/assets/tmt-bars-1.jpg',
    features: [
      'Better Durability',
      'Best Price Promise',
      'Trust JSW Quality',
      'Fe 500D & Fe 550D',
      'High Tensile Strength',
      'Corrosion Resistant'
    ],
    sizes: '8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm',
    category: 'TMT Bars',
    applications: 'Residential, Commercial, Bridges, Industrial construction'
  },
  {
    id: 3,
    name: 'Sel Tiger TMT Bars',
    desc: 'Experience The Legacy of Strength. India\'s trusted TMT bars delivering superior quality and reliability for all construction needs.',
    image: '/assets/tmt-bars-2.jpg',
    features: [
      'Legacy of Strength',
      'Premium Quality TMT',
      'High Tensile Strength',
      'Earthquake Resistant',
      'ISI Certified',
      'Best Price Guarantee'
    ],
    sizes: '8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm',
    category: 'TMT Bars',
    applications: 'Residential buildings, High-rises, Bridges, Infrastructure'
  },
  {
    id: 4,
    name: 'SAIL Beams - Strong Foundation',
    desc: 'Great dreams are built on Strong Foundation. SAIL beams designed to provide exceptional support for your construction needs.',
    image: '/assets/steel-foundation.jpg',
    features: [
      'Strong Foundation',
      'SAIL Quality Beams',
      'ISMC & ISMB Sections',
      'Exceptional Support',
      'High Load Capacity',
      'Trusted Quality'
    ],
    sizes: 'ISMB: 100mm to 600mm | ISMC: 75mm to 400mm',
    category: 'Structural Steel',
    applications: 'Building frames, Industrial structures, Construction foundations'
  },
  {
    id: 5,
    name: 'Apollo Stainless Steel Pipes & Tubes',
    desc: 'Flow with Strength, Built to Last. Apollo stainless steel pipes combining hygiene, strength, and versatility for all applications.',
    image: '/assets/steel-pipes-1.jpg',
    features: [
      'Flow with Strength',
      'Built to Last',
      'Hygiene & Strength',
      'Corrosion Resistant',
      'Apollo Quality',
      'Multiple Sizes Available'
    ],
    sizes: '15mm to 200mm | SS 304 & SS 316 grades',
    category: 'Steel Pipes',
    applications: 'Plumbing, Food industry, Pharmaceutical, Chemical plants'
  },
  {
    id: 6,
    name: 'TMT Bars - Unbeatable Prices',
    desc: 'Discover Top-Tier TMT Bars at Unbeatable Prices. Premium construction steel for your projects at the best rates in the market.',
    image: '/assets/tmt-bars-value.jpg',
    features: [
      'Top-Tier Quality',
      'Unbeatable Prices',
      'Best Market Rates',
      'Fe 500D & Fe 550D',
      'High Strength',
      'Immediate Availability'
    ],
    sizes: '8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm',
    category: 'TMT Bars',
    applications: 'All construction types, Residential, Commercial, Infrastructure'
  },
  {
    id: 7,
    name: 'JSW Neosteel FE 550D TMT Bars',
    desc: 'Strength and Reliability for All Seasons. JSW Neosteel delivering superior performance in all weather conditions.',
    image: '/assets/tmt-bars-jsw.jpg',
    features: [
      'All Seasons Performance',
      'JSW Neosteel Brand',
      'FE 550D Grade',
      'High Strength',
      'Weather Resistant',
      'Best Price'
    ],
    sizes: '8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm',
    category: 'TMT Bars',
    applications: 'Residential, Commercial, Industrial, All weather construction'
  },
  {
    id: 8,
    name: 'APL Apollo Steel Pipes',
    desc: 'Durable, cost-effective, and versatile. Ideal for general construction and infrastructure with trusted Apollo quality.',
    image: '/assets/apollo-pipes.jpg',
    features: [
      'APL Apollo Quality',
      'Durable & Cost-Effective',
      'Versatile Applications',
      'MS Black & GI Options',
      'All Sizes Available',
      'Best Price Guarantee'
    ],
    sizes: '15mm to 200mm (All NB sizes available)',
    category: 'Steel Pipes',
    applications: 'Construction, Infrastructure, Plumbing, Structural work'
  },
  {
    id: 9,
    name: 'JSW Roofing Sheets',
    desc: 'Built Strong, Built for All Seasons. Premium JSW roofing sheets with best price guarantee for durable, leak-proof roofing.',
    image: '/assets/roofing-sheets.jpg',
    features: [
      'Built Strong',
      'All Seasons Protection',
      'Best Price Guarantee',
      'Weather Resistant',
      'Long Life Coating',
      'Easy Installation'
    ],
    sizes: '0.35mm to 0.80mm thickness | Standard widths',
    category: 'Roofing',
    applications: 'Homes, Warehouses, Factories, Agricultural sheds'
  },
  {
    id: 10,
    name: 'Heavy Steel Coils & Sheets',
    desc: 'Durable steel coils and sheet packs for industrial processing, slitting, and fabrication.',
    image: '/assets/steel-coils.jpg',
    features: [
      'Prime Coils',
      'Consistent Gauge',
      'Good Flatness',
      'Process Ready',
      'Bulk Availability',
      'Factory Direct'
    ],
    sizes: 'Custom coil widths and thickness on request',
    category: 'Coils & Sheets',
    applications: 'Service centers, Fabrication, Roofing, Panels'
  },
  {
    id: 11,
    name: 'Welding Electrodes',
    desc: 'Reliable welding electrodes for strong joints with consistent arc stability and minimal spatter.',
    image: '/assets/welding-electrodes.jpg',
    features: [
      'Smooth Arc',
      'Low Spatter',
      'Strong Welds',
      'Trusted Brands',
      'All Positions',
      'Ready Stock'
    ],
    sizes: 'Popular diameters: 2.5mm, 3.15mm, 4mm',
    category: 'Welding Consumables',
    applications: 'Structural welding, Fabrication, Maintenance'
  },
  {
    id: 12,
    name: 'Welded Wire Mesh',
    desc: 'Uniform welded mesh for reinforcement, safety grills, and fencing with rust-resistant finish.',
    image: '/assets/wire-mesh.jpg',
    features: [
      'Uniform Grid',
      'Strong Welds',
      'Rust Resistant',
      'Easy to Install',
      'Cut-to-Size',
      'Bulk Rolls'
    ],
    sizes: 'Common apertures and gauges available',
    category: 'Wire Mesh',
    applications: 'Reinforcement, Fencing, Safety covers, Enclosures'
  },
  {
    id: 13,
    name: 'Hot Rolled Coils',
    desc: 'Hot rolled steel coils for downstream processing with reliable mechanical properties and surface quality.',
    image: '/assets/steel-coils.jpg',
    features: [
      'HR Quality',
      'Process Ready',
      'Stable Properties',
      'Consistent Thickness',
      'Bulk Supply',
      'Trusted Mills'
    ],
    sizes: 'Custom widths and thicknesses on order',
    category: 'Coils',
    applications: 'Pipes, Tubes, Fabrication, General steelwork'
  },
  {
    id: 14,
    name: 'Wire Rod Coils',
    desc: 'High quality wire rod coils for drawing, binding, and fabrication with consistent chemistry.',
    image: '/assets/binding-wire.jpg',
    features: [
      'Consistent Chemistry',
      'Good Drawability',
      'Clean Surface',
      'High Strength Options',
      'Bulk Coils',
      'Ready Dispatch'
    ],
    sizes: 'Common rod diameters available',
    category: 'Wire Rods',
    applications: 'Wire drawing, Binding, Nails, Industrial use'
  },
  {
    id: 15,
    name: 'Hollow Structural Sections',
    desc: 'Square and rectangular hollow sections with clean edges and high load capacity for modern structures.',
    image: '/assets/angles-channels.jpg',
    features: [
      'Square & Rectangular',
      'Clean Edges',
      'High Load Capacity',
      'Smooth Finish',
      'Weldable & Paintable',
      'Ready Stock'
    ],
    sizes: 'Multiple sizes and thicknesses available',
    category: 'Hollow Sections',
    applications: 'Architectural frames, Industrial sheds, Fabrication'
  },
  {
    id: 16,
    name: 'Shiv Iron Store Profile',
    desc: 'Your trusted partner for every steel and construction material need across NCR with fast delivery.',
    image: '/assets/steel-beams-railing.jpg',
    features: [
      'Authorized Brands',
      'Large Inventory',
      'Fast Dispatch',
      'Best Price Deals',
      'Expert Guidance',
      'Pan NCR Service'
    ],
    sizes: 'Comprehensive product range',
    category: 'About Us',
    applications: 'Builders, Contractors, Architects, Homeowners'
  },
  {
    id: 17,
    name: 'Premium Steel Promo',
    desc: 'Featured steel solutions for strong, reliable construction—priced right and ready to move.',
    image: '/assets/tmt-bars-3.jpg',
    features: [
      'Quality Assured',
      'Attractive Pricing',
      'Ready Stock',
      'Trusted Brands',
      'Fast Delivery',
      'Project Support'
    ],
    sizes: 'Standard and custom options',
    category: 'Promotions',
    applications: 'All construction and fabrication'
  },
  {
    id: 18,
    name: 'Structural Steel Promo',
    desc: 'Highlighted structural steel offerings for immediate projects with dependable performance.',
    image: '/assets/steel-foundation.jpg',
    features: [
      'Structural Grade',
      'Reliable Supply',
      'Competitive Rates',
      'Ready Dispatch',
      'Quality Checked',
      'On-site Support'
    ],
    sizes: 'Common structural sizes available',
    category: 'Promotions',
    applications: 'Frames, Sheds, Buildings'
  },
  {
    id: 19,
    name: 'Steel Pipes Bundle',
    desc: 'Stocked steel pipe bundles for quick plumbing and structural deployments with consistent quality.',
    image: '/assets/steel-pipes-2.jpg',
    features: [
      'Bundle Supply',
      'Consistent Quality',
      'Quick Loading',
      'Multiple Sizes',
      'Value Pricing',
      'Trusted Brands'
    ],
    sizes: 'NB sizes across 15mm to 200mm',
    category: 'Steel Pipes',
    applications: 'Plumbing, Structural, Industrial'
  },
  {
    id: 20,
    name: 'Roofing & Sheet Display',
    desc: 'Color and metal sheet options showcased for leak-proof, long-life roofing and cladding.',
    image: '/assets/roofing-sheets.jpg',
    features: [
      'Color Options',
      'Weather Resistant',
      'Leak Proof Overlaps',
      'Long Life Coating',
      'Quick Install',
      'Great Value'
    ],
    sizes: 'Popular roofing widths and gauges',
    category: 'Roofing',
    applications: 'Homes, Warehouses, Sheds'
  },
  {
    id: 21,
    name: 'Binding Wire Display',
    desc: 'Ready-to-use binding wire bundles for rebar tying and site work with consistent gauge.',
    image: '/assets/binding-wire.jpg',
    features: [
      'Uniform Gauge',
      'Strong Hold',
      'Easy to Use',
      'Tangle-Free',
      'Bulk Packs',
      'Site Ready'
    ],
    sizes: 'Gauge 18/20/22',
    category: 'Wire Products',
    applications: 'Rebar tying, Fencing, General binding'
  },
  {
    id: 22,
    name: 'Steel Plates Stack',
    desc: 'Stacked steel plates showcasing uniform thickness and surface quality for fabrication and heavy duty use.',
    image: '/assets/steel-plates.jpg',
    features: [
      'Uniform Thickness',
      'Smooth Surface',
      'High Strength',
      'Cut-to-Size Service',
      'Bulk Stock',
      'Reliable Supply'
    ],
    sizes: '1mm to 100mm thickness options',
    category: 'Plates & Sheets',
    applications: 'Fabrication, Tanks, Machine parts'
  },
  {
    id: 23,
    name: 'Hollow Sections Stack',
    desc: 'Ready stock of hollow sections for fast dispatch—ideal for frames, supports, and modern builds.',
    image: '/assets/angles-channels.jpg',
    features: [
      'Square & Rectangular',
      'Clean Cut Ends',
      'Uniform Gauge',
      'High Load Capacity',
      'Paintable Surface',
      'Bulk Availability'
    ],
    sizes: 'Multiple sizes and thicknesses in stock',
    category: 'Hollow Sections',
    applications: 'Frames, Supports, Architectural use'
  }
];
const STATS = [
  { icon: <Users className="w-8 h-8" />, value: '10,000+', label: 'Happy Clients', color: 'from-secondary to-secondary-dark' },
  { icon: <Package className="w-8 h-8" />, value: '50,000+', label: 'Tons of Iron Delivered', color: 'from-slate-500 to-slate-700' },
  { icon: <Award className="w-8 h-8" />, value: '100%', label: 'Quality Iron Assured', color: 'from-zinc-600 to-slate-700' },
  { icon: <Clock className="w-8 h-8" />, value: '40+', label: 'Years of Excellence', color: 'from-primary to-primary-dark' }
];

const WHY_CHOOSE_US = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Certified Quality Products',
    desc: 'All our products come with ISI certification, BIS licenses, and mill test certificates. We source directly from authorized dealers of leading brands like JSW, APL Apollo, Rathi, and SAIL, ensuring 100% genuine materials. Every product undergoes strict quality checks before dispatch.',
    color: 'from-secondary to-secondary-dark'
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Fast & Reliable Delivery',
    desc: 'Same day delivery available across entire NCR region including Delhi, Noida, Greater Noida, Ghaziabad, Faridabad, and Gurgaon. We own our transportation fleet ensuring timely delivery directly to your construction site. Loading and unloading assistance provided.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Competitive Wholesale Prices',
    desc: 'Being direct authorized stockists, we offer the best wholesale rates in NCR for bulk orders. Special discounts for contractors, builders, and long-term clients. Transparent pricing with no hidden charges. Request quote to get today\'s best rates.',
    color: 'from-slate-600 to-slate-700'
  },
  {
    icon: <Factory className="w-8 h-8" />,
    title: '40+ Years Iron Experience',
    desc: 'Established in 1984, we have served over 10,000 satisfied customers including leading construction companies, government projects, and individual builders. Our experienced team provides technical guidance and iron product recommendations for your specific needs.',
    color: 'from-secondary-light to-secondary'
  },
  {
    icon: <Package className="w-8 h-8" />,
    title: 'Complete Iron & Steel Range',
    desc: 'One-stop solution for all your iron and steel construction material needs. From TMT bars to fasteners, we stock everything under one roof. Avoid multiple vendors - get all materials with single invoice and coordinated delivery.',
    color: 'from-secondary to-secondary-dark'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Professional Service',
    desc: 'Dedicated relationship managers for B2B clients. Technical support from industry experts. Material handling guidance. Post-sales support. Easy return and replacement policy for manufacturing defects.',
    color: 'from-primary to-primary-dark'
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Construction Contractor',
    company: 'RK Builders',
    rating: 5,
    text: 'Best quality TMT bars at competitive prices. Their delivery service is exceptional and they always meet deadlines.'
  },
  {
    id: 2,
    name: 'Amit Sharma',
    role: 'Project Manager',
    company: 'Metro Construction',
    rating: 5,
    text: 'Trusted supplier for all our projects. Genuine products, professional service, and great after-sales support.'
  },
  {
    id: 3,
    name: 'Sunita Verma',
    role: 'Architect',
    company: 'SV Associates',
    rating: 5,
    text: 'Reliable and consistent quality. They understand the requirements of large-scale projects perfectly.'
  }
];

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-[0_8px_30px_rgba(15,23,42,0.12)]' : 'bg-white/30 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_30px_rgba(15,23,42,0.08)]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo shiv 2.png"
              alt="SIS - Shiv Iron Store"
              className="h-24 w-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { name: 'Home', href: '#home' },
              { name: 'About Us', href: '#aboutus' },
              { name: 'Products', href: '#products' },
              { name: 'Applications', href: '#applications' },
              { name: 'Contact', href: '#contact' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-secondary font-semibold transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <a
              href={`tel:${COMPANY_DETAILS.phone1}`}
              className="px-6 py-2.5 bg-gradient-to-r from-slate-700 to-secondary hover:from-slate-800 hover:to-secondary-dark text-white rounded-md font-bold transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {[
              { name: 'Home', href: '#home' },
              { name: 'About Us', href: '#aboutus' },
              { name: 'Products', href: '#products' },
              { name: 'Applications', href: '#applications' },
              { name: 'Contact', href: '#contact' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-secondary font-semibold py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href={`tel:${COMPANY_DETAILS.phone1}`}
              className="block w-full px-6 py-3 bg-gradient-to-r from-slate-700 to-secondary text-white rounded-md font-bold text-center"
            >
              <Phone className="w-4 h-4 inline mr-2" />
              Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="home" className="relative min-h-screen flex flex-col pt-20 bg-slate-900 overflow-hidden">
      {/* === Animated Background (CSS-based for performance) === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep gradient base - Made slightly lighter for contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#1e293b] to-[#0f172a]"></div>

        {/* Animated Grid - Increased opacity from 20 to 30 and made lines brighter */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>

        {/* Moving Orbs / Glow Effects - Increased opacity significantly */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/40 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div ref={ref} className="relative z-10 flex-grow flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

            {/* Company Badge with Glassmorphism */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full mb-10 shadow-xl ring-1 ring-white/10">
              <Building2 className="w-5 h-5 text-primary-light" />
              <span className="text-blue-50 font-bold text-sm tracking-widest uppercase">Leading Iron & Steel Corporation</span>
            </div>

            {/* Main Heading with Gradient Text */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-tight drop-shadow-2xl">
              <span className="text-white">Welcome to</span><br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-white to-secondary-light filter drop-shadow-lg">
                Shiv Iron Store
              </span>
            </h1>

            {/* Decorative Divider */}
            <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full mb-10 opacity-80"></div>

            {/* Company Name Subtitle */}
            <h2 className="text-2xl md:text-3xl text-blue-100 mb-8 font-semibold tracking-wide" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {COMPANY_DETAILS.fullName}
            </h2>

            {/* Description Text */}
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              <span className="text-primary-light font-bold">40+ Years</span> of Excellence. Authorized dealers of JSW, SAIL, Apollo & Rathi.
              <span className="block mt-4 text-base text-slate-400 font-normal border-t border-slate-700/50 pt-4 w-fit mx-auto">
                Premium Construction Materials • Wholesale Prices • NCR Delivery
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <a
                href="#products"
                className="group px-10 py-4 bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-light hover:to-secondary text-white rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(30,58,138,0.5)] hover:shadow-[0_0_30px_rgba(30,58,138,0.8)] hover:-translate-y-1 flex items-center gap-3 min-w-[220px] justify-center border border-white/10"
              >
                View Products
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`https://wa.me/91${COMPANY_DETAILS.phone2.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3 min-w-[220px] justify-center hover:bg-gray-50 ring-2 ring-white/50"
              >
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators Strip (Moved out of main flow) */}
      <div className="bg-white/5 backdrop-blur-md border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center md:justify-between gap-6 md:gap-0">
            {[
              { icon: <Truck className="w-6 h-6" />, text: 'Same Day Delivery', sub: 'Across NCR' },
              { icon: <Award className="w-6 h-6" />, text: 'Best Prices', sub: 'Wholesale Rates' },
              { icon: <CheckCircle className="w-6 h-6" />, text: 'Genuine Products', sub: '100% Original' },
              { icon: <Shield className="w-6 h-6" />, text: 'Secure Payments', sub: 'Trusted' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 px-4 group cursor-default">
                <div className="bg-white/10 group-hover:bg-primary/20 p-3 rounded-xl transition-colors text-primary-light">
                  {item.icon}
                </div>
                <div className="text-left">
                  <p className="font-bold text-white text-sm">{item.text}</p>
                  <p className="text-xs text-blue-200 font-medium">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats Bar


// Why Choose Us
// Why Choose Us
const WhyChooseUs = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Why Choose <span className="text-secondary">SIS</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your trusted partner for construction materials with decades of experience and commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className={`group bg-white border-2 border-gray-200 hover:border-secondary p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Products Section
// Products Section
const ProductsSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} className="w-full h-full"></div>
      </div>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Our <span className="text-secondary">Products & Services</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-4">
            We offer a wide variety of products & sizes to satisfy all our customer's specific applications.
            Premium materials from India's most trusted brands - JSW, APL Apollo, Rathi, SAIL & more.
          </p>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Authorized dealers and stockists with complete range of construction materials.
            All products come with manufacturer warranty and test certificates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, idx) => (
            <div
              key={product.id}
              className={`group bg-white border-2 border-gray-200 hover:border-secondary rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl translate-y-0 opacity-100 flex flex-col`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Product Header */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 text-center relative h-80 flex items-center justify-center border-b border-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-md transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 text-xs font-bold text-secondary bg-white px-3 py-1 rounded-full shadow-md">
                  {product.category}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.desc}</p>

                {product.sizes && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-xs font-bold text-gray-500 mb-1">AVAILABLE SIZES</p>
                    <p className="text-xs text-gray-700">{product.sizes}</p>
                  </div>
                )}

                <div className="space-y-2 mb-6 max-h-40 overflow-y-auto">
                  {product.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="block w-full py-3 bg-gradient-to-r from-secondary-dark to-secondary hover:from-secondary hover:to-secondary-light text-white font-bold rounded-xl transition-all transform group-hover:scale-105 shadow-md text-center"
                >
                  Get Quote
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className={`mt-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-200 rounded-3xl px-8 py-6 shadow-lg hover:shadow-xl transition-all">
              <Package className="w-12 h-12 text-secondary flex-shrink-0" />
              <div className="text-left">
                <p className="text-gray-900 font-black text-lg">Bulk Orders Welcome!</p>
                <p className="text-gray-600 text-sm font-semibold">Special wholesale rates for contractors & builders • Minimum order quantity applies</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-3xl px-8 py-6 shadow-lg hover:shadow-xl transition-all">
              <Factory className="w-12 h-12 text-secondary flex-shrink-0" />
              <div className="text-left">
                <p className="text-gray-900 font-black text-lg">Custom Services Available</p>
                <p className="text-gray-600 text-sm font-semibold">Cut to length • Gas cutting • Material handling • Loading assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Applications Section
// Applications Section
const ApplicationsSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  const applications = [
    {
      icon: <Building2 className="w-12 h-12" />,
      title: 'Residential Construction',
      desc: 'Complete range of TMT bars, cement, steel pipes, and building materials for homes, apartments, and villas.',
      items: ['Foundation work', 'Structural frames', 'Plumbing systems', 'Roofing solutions'],
      color: 'from-secondary to-secondary-dark'
    },
    {
      icon: <Factory className="w-12 h-12" />,
      title: 'Commercial Buildings',
      desc: 'Heavy-duty structural steel, beams, channels, and angles for offices, malls, and commercial complexes.',
      items: ['High-rise structures', 'Shopping complexes', 'Office buildings', 'Parking structures'],
      color: 'from-secondary-light to-secondary'
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      title: 'Industrial Projects',
      desc: 'Bulk steel materials, plates, sheets, and fabrication items for factories, warehouses, and industrial units.',
      items: ['Factory sheds', 'Warehouses', 'Industrial equipment', 'Storage facilities'],
      color: 'from-slate-600 to-slate-700'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Infrastructure',
      desc: 'Heavy structural steel, reinforcement bars, and construction materials for bridges, flyovers, and highways.',
      items: ['Bridge construction', 'Highway projects', 'Metro rail works', 'Flyovers'],
      color: 'from-primary to-primary-dark'
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      title: 'Fabrication Work',
      desc: 'MS rounds, flats, plates, angles, and channels for custom fabrication, gates, grills, and furniture.',
      items: ['Gates & grills', 'Steel furniture', 'Industrial racks', 'Custom fabrication'],
      color: 'from-primary to-primary-dark'
    },
    {
      icon: <Factory className="w-12 h-12" />,
      title: 'Agricultural Structures',
      desc: 'GI pipes, roofing sheets, and wire mesh for farm sheds, poultry houses, and agricultural buildings.',
      items: ['Farm sheds', 'Poultry structures', 'Green houses', 'Storage units'],
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section id="applications" className="py-20 bg-gradient-to-br from-slate-900 via-secondary-dark to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-secondary-light bg-clip-text text-transparent">Applications</span> & Use Cases
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
            Discover how our premium construction materials are used across diverse projects and industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, idx) => (
            <div
              key={idx}
              className={`group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                {app.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{app.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm mb-6">{app.desc}</p>

              <div className="space-y-2">
                {app.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need Materials for Your Project?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Whatever your construction needs, we have the right materials and expertise to support your project from start to finish.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-secondary hover:from-cyan-600 hover:to-secondary-dark text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
            >
              Get Expert Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            What Our <span className="text-secondary">Clients Say</span>
          </h2>
          <p className="text-gray-600 text-lg">Trusted by thousands of builders, contractors, and architects across NCR</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className={`bg-white border-2 border-gray-200 hover:border-secondary p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-900 font-bold text-lg">{testimonial.name}</p>
                <p className="text-secondary text-sm font-semibold">{testimonial.role}</p>
                <p className="text-gray-500 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
      </div>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-3xl p-12 md:p-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Left Column */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Get Instant <span className="text-secondary">Quote</span>
              </h2>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Contact us for the best prices on TMT bars, steel pipes, and roofing sheets.
                <span className="block mt-2 text-gray-900 font-bold">
                  ✓ We respond within 2 hours!
                </span>
              </p>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/91${COMPANY_DETAILS.phone2.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition-all mb-10 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp for Instant Quote
              </a>

              {/* Contact Info */}
              <div className="space-y-6">
                {[
                  { icon: <MapPin className="w-6 h-6" />, title: 'Visit Us', info: COMPANY_DETAILS.address, color: 'from-secondary to-secondary-dark' },
                  { icon: <Phone className="w-6 h-6" />, title: 'Call Us', info: `${COMPANY_DETAILS.phone1} / ${COMPANY_DETAILS.phone2}`, color: 'from-green-500 to-green-600' },
                  { icon: <Mail className="w-6 h-6" />, title: 'Email', info: COMPANY_DETAILS.email, color: 'from-primary to-primary-dark' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-gray-900 font-bold text-lg">{item.title}</h4>
                      <p className="text-gray-700 mt-1">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white border-2 border-gray-200 p-8 rounded-3xl shadow-lg">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border-2 border-gray-200 focus:border-secondary rounded-lg px-4 py-3 text-gray-900 focus:outline-none transition-colors"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border-2 border-gray-200 focus:border-secondary rounded-lg px-4 py-3 text-gray-900 focus:outline-none transition-colors"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-secondary rounded-lg px-4 py-3 text-gray-900 focus:outline-none transition-colors"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Interest</label>
                  <select className="w-full bg-gray-50 border-2 border-gray-200 focus:border-secondary rounded-lg px-4 py-3 text-gray-900 focus:outline-none transition-colors">
                    <option>JSW TMT Bars</option>
                    <option>APL Apollo Pipes</option>
                    <option>Color Roofing</option>
                    <option>Rathi TMT Bars</option>
                    <option>Bulk Order</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                  <textarea
                    rows="4"
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-secondary rounded-lg px-4 py-3 text-gray-900 focus:outline-none transition-colors"
                    placeholder="Tell us your requirements..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-secondary-dark to-secondary hover:from-secondary hover:to-secondary-light text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Request Quote Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="mb-4 bg-white p-3 rounded-xl inline-block shadow-lg">
              <img
                src="/assets/logo shiv 2.png"
                alt="SIS - Shiv Iron Store"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {COMPANY_DETAILS.fullName} - Your trusted partner for premium construction and building materials across NCR.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Us', href: '#aboutus' },
                { name: 'Products', href: '#products' },
                { name: 'Services', href: '#services' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-secondary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">Business Hours</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span>Monday - Saturday</span>
              </div>
              <p className="ml-6">9:00 AM - 6:00 PM</p>
              <p className="ml-6 text-gray-500">Sunday - Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} {COMPANY_DETAILS.fullName}. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm text-center">
            Designed & Developed by <a href="https://garvik.in" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary-dark font-bold transition-colors">Garvik India</a>
          </p>
          <p className="text-blue-600 font-bold text-sm text-center md:text-right">
            Building Trust Since 1984
          </p>
        </div>
      </div>
    </footer>
  );
};

// About Us Page Section
const AboutUsPage = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="aboutus" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-slate-300 to-secondary-light rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary-light to-cyan-300 rounded-full filter blur-3xl"></div>
      </div>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block bg-secondary-light/20 text-secondary px-4 py-2 rounded-full text-sm font-bold mb-6">
            ABOUT US
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Welcome to <span className="text-secondary">Shiv Iron Store</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in construction materials since 1984. Building NCR's infrastructure with quality, reliability, and integrity.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className={`transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We are a leading TMT bars supplier in Noida, offering premium-grade steel for residential, commercial, and infrastructure projects. Our wide product range includes TMT Bars, Structural Steel, Steel Angles, Steel Channels, MS Flats, Steel Pipes, and Colour Coated Sheets, making us a one-stop iron and steel store in Noida.
              </p>
              <p>
                We proudly deal in India’s most trusted steel brands, including JSW Steel, Tata Steel, SAIL, Jindal, Apollo, Hisar, and Rana Brands. All products supplied by us meet industry standards, ensuring strength, durability, and long-term performance.
              </p>
              <p>
                Located in Noida, we are a preferred construction steel supplier in Noida, known for our customer-first approach and dependable service. Whether you are searching for the best iron store in Noida or a reliable steel supplier near you, Shiv Iron Store is your trusted partner for quality steel solutions.
              </p>
            </div>
          </div>
          <div className={`transition-all duration-700 h-full ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="rounded-3xl shadow-2xl overflow-hidden h-auto w-full border-2 border-primary bg-white">
              <img
                src="/assets/ww.jpeg"
                alt="Our Facility"
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gradient-to-br from-primary-light/10 to-transparent border-2 border-primary-light/30 p-8 rounded-3xl">
            <div className="bg-primary text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Our Mission</h3>
            <ul className="space-y-3 text-gray-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>To supply certified and branded steel materials</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>To maintain competitive pricing with consistent quality</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>To ensure on-time delivery and customer satisfaction</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>To support construction and industrial growth with complete steel solutions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>To build trust through transparency and professionalism</span>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-secondary-light/10 to-cyan-50 border-2 border-secondary-light/30 p-8 rounded-3xl">
            <div className="bg-secondary text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To become the most reliable iron and steel supplier in Noida, recognized for quality products, ethical business practices, and long-lasting relationships with our customers.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">
            Our Core <span className="text-primary">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-10 h-10" />,
                title: 'Integrity',
                desc: 'We believe in transparent business practices. Every product comes with proper documentation, mill test certificates, and genuine brand warranties. No hidden charges, no compromises on quality.',
                color: 'from-secondary to-secondary-dark'
              },
              {
                icon: <CheckCircle className="w-10 h-10" />,
                title: 'Quality First',
                desc: 'We source only from authorized dealers of leading brands like JSW, APL Apollo, Rathi, and SAIL. Each batch is inspected before dispatch to ensure it meets industry standards and customer expectations.',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: 'Customer Centric',
                desc: 'Your success is our success. We provide free technical consultation, material recommendations, quantity estimation support, and after-sales service. Our relationship doesn\'t end with delivery.',
                color: 'from-primary to-primary-dark'
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-200 p-8 rounded-3xl hover:border-primary transition-all hover:shadow-xl">
                <div className={`bg-gradient-to-br ${value.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What Sets Us Apart */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 text-center">
            What Sets Us <span className="text-primary">Apart</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <Factory className="w-6 h-6" />, title: 'Authorized Stockist', desc: 'Direct partnership with major brands ensures authenticity and best prices' },
              { icon: <Truck className="w-6 h-6" />, title: 'Own Fleet', desc: 'Our vehicles ensure timely delivery and careful material handling' },
              { icon: <Clock className="w-6 h-6" />, title: '40+ Years Experience', desc: 'Four decades of industry knowledge at your service' },
              { icon: <Package className="w-6 h-6" />, title: 'Vast Inventory', desc: '500+ product variants always in stock for immediate delivery' },
              { icon: <Award className="w-6 h-6" />, title: 'ISO Certified', desc: 'Adherence to international quality management standards' },
              { icon: <Users className="w-6 h-6" />, title: 'Expert Team', desc: 'Technical experts to guide your material selection' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-3xl shadow-md">
                <div className="bg-primary-light/20 text-primary p-3 rounded-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Ready to Start Your Project?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-red-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
            >
              Get in Touch
            </a>
            <a
              href="#products"
              className="px-8 py-4 bg-white border-2 border-gray-300 hover:border-primary text-gray-900 rounded-xl font-bold transition-all shadow-lg text-center"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Company Section
const AboutCompany = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary rounded-full filter blur-3xl"></div>
      </div>
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className={`transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative rounded-3xl shadow-2xl overflow-hidden h-auto w-full border-2 border-primary bg-white">
              <img
                src="/assets/www.jpeg"
                alt="Company Warehouse"
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = '/assets/ww.jpeg';
                }}
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 rounded-3xl shadow-xl z-20">
                <div className="text-5xl font-black">40+</div>
                <div className="text-sm font-bold">Years of Trust</div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="inline-block bg-primary-light/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              ABOUT OUR COMPANY
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Building <span className="text-primary">NCR's Future</span> Since 1984
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {COMPANY_DETAILS.description}
            </p>

            <div className="space-y-6 mb-8">
              {[
                { label: 'Established', value: '1984', icon: <Clock className="w-5 h-5" /> },
                { label: 'Products Range', value: '500+ Items', icon: <Package className="w-5 h-5" /> },
                { label: 'Service Area', value: 'Entire NCR Region', icon: <MapPin className="w-5 h-5" /> },
                { label: 'Certifications', value: 'Government Approved', icon: <Award className="w-5 h-5" /> }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-5 rounded-3xl shadow-xl border-2 border-primary hover:border-primary-dark transition-colors">
                  <div className="bg-primary-light/20 text-primary p-3 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-semibold">{item.label}</div>
                    <div className="text-lg font-bold text-gray-900">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-red-700 text-white rounded-3xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
              >
                Contact Us Today
              </a>
              <a
                href="#products"
                className="px-8 py-4 bg-white border-2 border-gray-300 hover:border-primary text-gray-900 rounded-3xl font-bold transition-all shadow-lg text-center"
              >
                View Products
              </a>
            </div>
          </div>
        </div>

        {/* Our Services Grid */}
        <div id="services" className="mt-20">
          <h3 className="text-3xl font-black text-gray-900 mb-4 text-center">
            Our <span className="text-primary">Services</span>
          </h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Beyond supplying quality materials, we provide comprehensive services to support your construction projects from start to finish.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Truck className="w-8 h-8" />, title: 'Free Delivery', desc: 'Free delivery on bulk orders across NCR. Own fleet ensures timely delivery.' },
              { icon: <CheckCircle className="w-8 h-8" />, title: 'Quality Testing', desc: 'All materials tested and certified. Mill test certificates provided.' },
              { icon: <Users className="w-8 h-8" />, title: 'Technical Support', desc: 'Expert guidance on material selection and quantity estimation.' },
              { icon: <Package className="w-8 h-8" />, title: 'Custom Cutting', desc: 'Cut to length services for plates, sheets, and structural steel.' }
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 p-6 rounded-3xl hover:border-primary transition-all hover:shadow-lg"
              >
                <div className="bg-primary-light/20 text-primary w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Working Partners Marquee
const PartnersMarquee = () => {
  const partners = [
    { name: 'SAIL', logo: '/assets/Partners/SAIL_LOGO_NEW.png' },
    { name: 'JSW', logo: '/assets/Partners/jsw-steel.jpeg' },
    { name: 'APL Apollo', logo: '/assets/Partners/apl_logo_white_bg.png' },
    { name: 'Rathi', logo: '/assets/Partners/rathi.png' },
    { name: 'Sel Tiger', logo: '/assets/Partners/sel tiger.png' },
  ];

  return (
    <section className="py-12 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h3 className="text-2xl font-bold text-gray-900">Our <span className="text-secondary">Working Partners</span></h3>
      </div>

      {/* Container must be overflow hidden */}
      <div className="relative overflow-hidden w-full">
        {/* Inner track width needs to be wide enough to hold both sets of items side by side */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
          {/* First set of partners */}
          <div className="flex gap-20 px-10">
            {partners.map((partner, idx) => (
              <div key={`s1-${idx}`} className="inline-flex items-center justify-center w-40 h-28 transform hover:scale-110 transition-transform duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow-md"
                />
              </div>
            ))}
          </div>

          {/* Second set of partners (Duplicate for seamless loop) */}
          <div className="flex gap-20 px-10">
            {partners.map((partner, idx) => (
              <div key={`s2-${idx}`} className="inline-flex items-center justify-center w-40 h-28 transform hover:scale-110 transition-transform duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow-md"
                />
              </div>
            ))}
          </div>

          {/* Third set of partners (Extra buffer for wide screens) */}
          <div className="flex gap-20 px-10">
            {partners.map((partner, idx) => (
              <div key={`s3-${idx}`} className="inline-flex items-center justify-center w-40 h-28 transform hover:scale-110 transition-transform duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Floating WhatsApp Button
const FloatingWhatsApp = () => {
  return (
    <a
      href={`https://wa.me/91${COMPANY_DETAILS.phone2.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%27m%20interested%20in%20your%20construction%20materials.%20Please%20share%20details.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">1</span>
    </a>
  );
};

// Call Now Floating Button
const FloatingCallButton = () => {
  return (
    <a
      href={`tel:${COMPANY_DETAILS.phone1}`}
      className="fixed bottom-28 right-6 z-50 bg-secondary hover:bg-secondary-dark text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
      aria-label="Call Now"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans antialiased relative">
      <BuildingAnimation />
      <Navbar />
      <Hero />

      <PartnersMarquee />
      <AboutUsPage />
      <AboutCompany />
      <WhyChooseUs />
      <ProductsSection />
      <ApplicationsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
      <FloatingCallButton />
    </div>
  );
};

export default App;

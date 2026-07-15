// Centralized site data — easy to migrate to API endpoints later

export const siteConfig = {
  name: "Solarcraft",
  tagline: "Premium Solar Energy Solutions",
  description: "Kenya's trusted supplier of premium solar panels, inverters, batteries, and complete solar systems for homes, businesses, and farms.",
  email: "orders@solarcraft.co.ke",
  phone: "+254 700 123 456",
  phoneTollFree: "0800 SOLARCRAFT",
  hours: "Mon-Sat 8am-6pm EAT",
  address: { street: "Westlands Business Park, 3rd Floor", city: "Nairobi", country: "Kenya" },
  socials: {
    twitter: "https://twitter.com/solarcraftke",
    instagram: "https://instagram.com/solarcraftke",
    facebook: "https://facebook.com/solarcraftke",
    linkedin: "https://linkedin.com/company/solarcraftke",
  },
};

export const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Why Solar", href: "#about" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: "8,500+", label: "Systems installed across Kenya" },
  { value: "98%", label: "Customer satisfaction rate" },
  { value: "25yr", label: "Panel warranty" },
  { value: "47", label: "Counties served" },
];

export const heroContent = {
  badge: "Now available in all 47 counties",
  title: ["Power your", "home with", "African sun"],
  subtitle: "Premium solar panels, inverters, and battery systems — designed for Kenyan homes and businesses. Cut your electricity bills by up to 90%.",
  primaryCta: { label: "Browse Products", href: "#products" },
  secondaryCta: { label: "Why Go Solar?", href: "#about" },
  image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80&auto=format",
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  priceValue: number;
  description: string;
  specs: string[];
  image: string;
  badge?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "helios-450", name: "Helios 450W Mono Panel", category: "Solar Panels",
    price: "KSh 32,500", priceValue: 32500,
    description: "High-efficiency monocrystalline panel built for equatorial sun. Performs exceptionally in high temperatures — tested in Turkana conditions.",
    specs: ["450W output", "21.7% efficiency", "Tier 1 rated", "25yr warranty"],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80&auto=format",
    badge: "Best Seller", featured: true,
  },
  {
    id: "voltedge-5k", name: "VoltEdge 5K Hybrid Inverter", category: "Inverters",
    price: "KSh 105,000", priceValue: 105000,
    description: "Intelligent hybrid inverter with MPPT tracking and WiFi monitoring. Seamless grid-tie and off-grid switching. Silent, wall-mounted operation.",
    specs: ["5kW capacity", "97.6% efficiency", "WiFi monitoring", "MPPT built-in"],
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80&auto=format",
    featured: true,
  },
  {
    id: "powervault-10", name: "PowerVault 10kWh Battery", category: "Battery Storage",
    price: "KSh 410,000", priceValue: 410000,
    description: "LiFePO4 battery built for daily deep cycling. Stores daylight for nighttime use. Stack up to 4 units for larger systems. 10-year warranty.",
    specs: ["10kWh capacity", "6000+ cycles", "Modular stacking", "10yr warranty"],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba149380b?w=600&q=80&auto=format",
    badge: "Popular", featured: true,
  },
  {
    id: "suntrack-mount", name: "SunTrack Roof Mount Kit", category: "Mounting",
    price: "KSh 15,800", priceValue: 15800,
    description: "Heavy-duty aluminium roof mount. Fits any panel, any roof type — corrugated iron, tile, or flat concrete. Stainless steel hardware included.",
    specs: ["Universal fit", "Aluminium alloy", "30° tilt range", "20yr lifespan"],
    image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=600&q=80&auto=format",
  },
  {
    id: "gridsync-60", name: "GridSync 60A Controller", category: "Charge Controllers",
    price: "KSh 36,000", priceValue: 36000,
    description: "MPPT charge controller with LCD display and Bluetooth app. Auto-detects 12/24/48V systems. Built-in surge and reverse-polarity protection.",
    specs: ["60A max current", "Bluetooth app", "LCD display", "Surge protection"],
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80&auto=format",
  },
  {
    id: "solarshield-cable", name: "SolarShield Cable Kit", category: "Accessories",
    price: "KSh 10,800", priceValue: 10800,
    description: "Complete wiring kit: 30m of 6mm² solar cable, MC4 connectors, and cable clips. UV-resistant jacket rated for tropical conditions.",
    specs: ["30m cable", "IP68 MC4 connectors", "UV resistant", "6mm² gauge"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&auto=format",
  },
  {
    id: "helios-550", name: "Helios 550W Panel", category: "Solar Panels",
    price: "KSh 42,000", priceValue: 42000,
    description: "Our highest-output panel for commercial installations and large residential systems. Half-cut cell technology for better shade tolerance.",
    specs: ["550W output", "21.9% efficiency", "Half-cut cells", "25yr warranty"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80&auto=format",
    badge: "New",
  },
  {
    id: "voltedge-10k", name: "VoltEdge 10K Three-Phase Inverter", category: "Inverters",
    price: "KSh 215,000", priceValue: 215000,
    description: "Three-phase hybrid inverter for larger homes and light commercial. Dual MPPT inputs, generator support, and remote diagnostics.",
    specs: ["10kW capacity", "Three-phase", "Dual MPPT", "Generator input"],
    image: "https://images.unsplash.com/photo-1566093098261-3a39d71e6a31?w=600&q=80&auto=format",
  },
  {
    id: "powervault-5", name: "PowerVault 5kWh Battery", category: "Battery Storage",
    price: "KSh 225,000", priceValue: 225000,
    description: "Compact LiFePO4 battery ideal for small to medium homes. Wall-mounted, zero maintenance, and pairs with any of our inverters.",
    specs: ["5kWh capacity", "6000+ cycles", "Wall-mounted", "10yr warranty"],
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80&auto=format",
  },
  {
    id: "complete-home-kit", name: "Complete Home Solar Kit", category: "Complete Systems",
    price: "KSh 580,000", priceValue: 580000,
    description: "Everything in one box: 8x 450W panels, 5K inverter, 10kWh battery, mounting, cables, and installation hardware. Ready for a 3-4 bedroom home.",
    specs: ["3.6kW system", "8 panels", "Inverter + battery", "All hardware"],
    image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=600&q=80&auto=format",
    badge: "Best Value", featured: true,
  },
  {
    id: "solar-water-pump", name: "AquaSun Water Pump Kit", category: "Water Pumping",
    price: "KSh 78,000", priceValue: 78000,
    description: "Solar-powered water pump for irrigation and domestic use. Submersible, brushless motor. Pumps up to 4,000 litres per day.",
    specs: ["4000L/day", "Submersible", "Brushless motor", "No batteries needed"],
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80&auto=format",
  },
  {
    id: "solar-security-light", name: "BrightGuard Security Light", category: "Lighting",
    price: "KSh 8,500", priceValue: 8500,
    description: "All-in-one solar security light with motion sensor and camera-style housing. Charges during the day, illuminates all night. No wiring needed.",
    specs: ["3000 lumens", "PIR motion sensor", "IP65 rated", "Auto on/off"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80&auto=format",
  },
];

export const productCategories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

export const reasons = [
  { number: "01", title: "It pays for itself fast", text: "With KPLC rates climbing past KSh 24/kWh, the average Kenyan home saves KSh 8,000-15,000 per month. Most systems break even in 3-5 years." },
  { number: "02", title: "Kenya has some of the best sun on earth", text: "Nairobi gets 5-7 peak sun hours daily. Northern Kenya gets even more. You're sitting on a goldmine of free energy — might as well use it." },
  { number: "03", title: "Beat blackouts for good", text: "Pair panels with battery storage and you'll never worry about power outages again. Your lights stay on when the grid goes down." },
  { number: "04", title: "Property value goes up", text: "Homes with solar sell faster and for more. Buyers want lower bills — and a working solar system is a major selling point." },
];

export const testimonials = [
  { quote: "Our KPLC bill used to be KSh 18,000 a month for the shop. Now it's under KSh 2,000. The system paid for itself in less than 3 years.", name: "Wanjiku M.", location: "Nakuru", system: "5kW commercial", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80&auto=format" },
  { quote: "We run our entire lodge on solar now — lights, fridge, water heating, even the WiFi. Guests love that we're off-grid but fully powered.", name: "David O.", location: "Maasai Mara", system: "15kW lodge system", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format" },
  { quote: "I was sceptical about solar in Kisumu — but the team sized everything perfectly. Six months in, not a single blackout at home.", name: "Amina H.", location: "Kisumu", system: "4kW residential", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format" },
];

export const brands = ["Canadian Solar", "JA Solar", "Trina Solar", "Fronius", "Enphase", "BYD", "Pylontech", "Victron", "Schneider Electric", "Huawei", "Deye", "Growatt"];

export const footerLinks = {
  products: ["Solar Panels", "Inverters", "Battery Storage", "Mounting Kits", "Complete Systems", "Water Pumps"],
  company: ["About Us", "Our Installers", "Warranty Info", "Blog", "Careers", "Partners"],
};


import { Vendor } from '../types/vendor';

export const mockVendors: Vendor[] = [
  {
    id: "v1",
    name: "Delicious Catering Co.",
    image: "/placeholder.svg",
    tagline: "Exquisite cuisine for every occasion",
    category: "Catering",
    priceFrom: 45,
    priceType: "per_head",
    rating: 4.8,
    reviewCount: 124,
    verified: true,
    location: "San Francisco, CA",
    description: "We bring 15 years of culinary excellence to your event. Our team specializes in creating memorable dining experiences with locally-sourced ingredients and custom menus tailored to your preferences.",
    services: [
      "Custom menu planning",
      "Appetizers and main courses",
      "Dessert stations",
      "Staff and servers",
      "Setup and cleanup"
    ],
    addOns: [
      {
        id: "a1",
        name: "Premium Bar Package",
        description: "Selection of top-shelf spirits, craft beers, and wines",
        price: 25
      },
      {
        id: "a2",
        name: "Late Night Snack Station",
        description: "Variety of crowd-pleasing snacks for later in the evening",
        price: 12
      },
      {
        id: "a3",
        name: "Chef Live Station",
        description: "Chef preparing custom dishes in front of your guests",
        price: 18
      }
    ]
  },
  {
    id: "v2",
    name: "Harmony Sounds DJ",
    image: "/placeholder.svg",
    tagline: "Setting the perfect mood for your event",
    category: "Music",
    priceFrom: 950,
    priceType: "flat",
    rating: 4.9,
    reviewCount: 89,
    verified: true,
    location: "Los Angeles, CA",
    description: "Harmony Sounds specializes in reading the crowd and creating the perfect atmosphere for any event. With state-of-the-art equipment and an extensive music library, we ensure your dance floor stays packed all night.",
    services: [
      "Professional DJ services (6 hours)",
      "Sound system setup",
      "Wireless microphone",
      "Basic lighting",
      "Online planning portal"
    ],
    addOns: [
      {
        id: "a4",
        name: "Premium Light Show",
        description: "Additional intelligent lighting, lasers, and effects",
        price: 350
      },
      {
        id: "a5",
        name: "Photo Booth (3 hours)",
        description: "Includes unlimited prints, props, and digital copies",
        price: 550
      },
      {
        id: "a6",
        name: "Extended Hours",
        description: "Additional hour of DJ service",
        price: 150
      }
    ]
  },
  {
    id: "v3",
    name: "Enchanted Florals",
    image: "/placeholder.svg",
    tagline: "Breathtaking floral designs for every occasion",
    category: "Flowers",
    priceFrom: 800,
    priceType: "flat",
    rating: 4.7,
    reviewCount: 63,
    verified: true,
    location: "Portland, OR",
    description: "Enchanted Florals creates custom floral arrangements that perfectly complement your event's theme and color palette. We work with seasonal blooms to ensure freshness and sustainability.",
    services: [
      "Consultation and custom design",
      "Bridal bouquet and party flowers",
      "Ceremony decorations",
      "Reception centerpieces",
      "Setup and teardown"
    ],
    addOns: [
      {
        id: "a7",
        name: "Archway/Ceremony Backdrop",
        description: "Custom floral installation for ceremony space",
        price: 650
      },
      {
        id: "a8",
        name: "Additional Centerpieces",
        description: "Per table beyond the base package",
        price: 85
      },
      {
        id: "a9",
        name: "Venue Accent Pieces",
        description: "Additional arrangements for bars, restrooms, entry tables",
        price: 300
      }
    ]
  },
  {
    id: "v4",
    name: "Moments Photography",
    image: "/placeholder.svg",
    tagline: "Capturing your special moments forever",
    category: "Photography",
    priceFrom: 2200,
    priceType: "flat",
    rating: 4.9,
    reviewCount: 112,
    verified: true,
    location: "Chicago, IL",
    description: "Our talented team of photographers blend candid moments with artfully directed shots to tell the unique story of your event. We pride ourselves on attention to detail and quick turnaround times.",
    services: [
      "8 hours of photography coverage",
      "Two professional photographers",
      "Online gallery with high-resolution images",
      "Basic photo editing and color correction",
      "Personal usage rights"
    ],
    addOns: [
      {
        id: "a10",
        name: "Engagement/Pre-Event Session",
        description: "1-hour photoshoot before your event date",
        price: 450
      },
      {
        id: "a11",
        name: "Premium Photo Album",
        description: "Hardcover, custom-designed 40-page album",
        price: 650
      },
      {
        id: "a12",
        name: "Additional Hour",
        description: "Extend photography coverage",
        price: 250
      }
    ]
  },
  {
    id: "v5",
    name: "Elegant Events Venue",
    image: "/placeholder.svg",
    tagline: "The perfect backdrop for your perfect day",
    category: "Venue",
    priceFrom: 4500,
    priceType: "flat",
    rating: 4.6,
    reviewCount: 78,
    verified: true,
    location: "Denver, CO",
    description: "Our stunning venue features both indoor and outdoor spaces that can be customized to match your vision. With panoramic mountain views and elegant architecture, we provide a versatile canvas for any celebration.",
    services: [
      "Venue rental (10 hours)",
      "Tables and chairs for up to 150 guests",
      "Bridal suite and groom's room",
      "On-site coordinator",
      "Parking for guests"
    ],
    addOns: [
      {
        id: "a13",
        name: "Ceremony Space Setup",
        description: "Additional setup for on-site ceremony",
        price: 800
      },
      {
        id: "a14",
        name: "Extended Hours",
        description: "Additional hour of venue access",
        price: 500
      },
      {
        id: "a15",
        name: "Day-Before Rehearsal",
        description: "1-hour access for ceremony rehearsal",
        price: 300
      }
    ]
  },
  {
    id: "v6",
    name: "Sweet Celebrations Bakery",
    image: "/placeholder.svg",
    tagline: "Delicious works of art for your special day",
    category: "Cake",
    priceFrom: 350,
    priceType: "flat",
    rating: 4.8,
    reviewCount: 94,
    verified: true,
    location: "Seattle, WA",
    description: "Our award-winning pastry chefs create custom cakes and desserts that taste as amazing as they look. We use premium ingredients and can accommodate dietary restrictions without compromising on flavor.",
    services: [
      "Custom cake design consultation",
      "Three-tier cake (serves 100)",
      "Cake cutting service",
      "Cake stand rental",
      "Delivery and setup"
    ],
    addOns: [
      {
        id: "a16",
        name: "Dessert Bar",
        description: "Assortment of cookies, mini pastries, and chocolate-dipped treats",
        price: 450
      },
      {
        id: "a17",
        name: "Groom's Cake",
        description: "Custom-designed secondary cake",
        price: 250
      },
      {
        id: "a18",
        name: "Additional Cake Tier",
        description: "Adds approximately 50 servings",
        price: 200
      }
    ]
  }
];

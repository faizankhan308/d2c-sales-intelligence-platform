// Preset brands details identical to backend for local offline/mock modes
const PRESET_BRANDS = {
  "boat-lifestyle.com": {
    brandName: "boAt Lifestyle",
    website: "boat-lifestyle.com",
    logo: "https://logo.clearbit.com/boat-lifestyle.com",
    industry: "Consumer Electronics",
    category: "Consumer Audio & Wearables",
    country: "India",
    companySize: "501-1000",
    revenueRange: "$100M-$250M",
    monthlyTraffic: "8M-10M",
    socialPresence: {
      instagram: "https://instagram.com/boat.lifestyle1",
      facebook: "https://facebook.com/boat.lifestyle",
      tiktok: "inactive"
    },
    products: ["Wireless Earphones", "Smartwatches", "Home Audio Speakers", "Gaming Headphones", "ANC Neckbands"],
    catalogSize: 450,
    techStack: ["Shopify Plus", "Klaviyo", "Google Analytics 4", "Hotjar", "Razorpay", "CleverTap", "Wigzo"],
    businessSummary: "boAt Lifestyle is India's leading consumer electronics brand specializing in high-quality, affordable audio equipment and smart wearables. Targeting millennials and Gen Z, boAt leverages trendy marketing, lifestyle styling, and aggressive digital pricing to capture massive market share.",
    strengths: [
      "Extremely strong brand recall and community backing (boAtheads).",
      "Highly diversified product catalog across price tiers.",
      "Excellent influencer marketing campaigns."
    ],
    weaknesses: [
      "Intense pricing pressure from lower-tier generic clones.",
      "Heavy reliance on third-party marketplace distribution (Amazon, Flipkart).",
      "High return-to-origin (RTO) rates on cash-on-delivery orders."
    ],
    growthStage: "Scaling",
    conversionLeaks: [
      {
        leakType: "Checkout Friction",
        severity: "High",
        explanation: "The checkout process requires multiple steps and has layout clutter, causing mobile users to drop off before finishing payment.",
        evidence: "Checkout takes 4 steps; standard payment gateways load slowly on 3G/4G mobile networks."
      },
      {
        leakType: "Slow Website",
        severity: "High",
        explanation: "Heavy reliance on custom scripts, analytics trackers, and unoptimized high-res product images slows down page load speed.",
        evidence: "Page speed tests show a Time to Interactive (TTI) of over 6.2 seconds on mobile devices."
      },
      {
        leakType: "Poor Mobile UX",
        severity: "Medium",
        explanation: "Product detail pages feature heavy sticky footers and chat widgets that overlay crucial add-to-cart components.",
        evidence: "Sticky buy button overlaps with WhatsApp help icon on screens smaller than 375px wide."
      },
      {
        leakType: "Weak CTA",
        severity: "Medium",
        explanation: "Secondary upsell banners compete visually with the primary 'Add to Cart' button, diluting user attention.",
        evidence: "The main checkout button uses the same gray border styling as recommendation widgets."
      }
    ],
    whyHelium: "boAt has high website traffic (~8M+ monthly sessions) and a massive catalog (450+ items). Even a minor 0.5% boost in mobile checkout completions will translate into millions in recovered monthly revenue. Helium can streamline their mobile cart validation, reduce checkout steps from 4 to 1, and automate local payment methods.",
    whyNow: "With upcoming festive sales and heavy active digital ad campaigns, traffic is peak. Furthermore, they recently integrated multiple post-purchase widgets, causing additional speed load lag. Addressing checkout friction now maximizes return on ad spend (ROAS).",
    priorityScore: 92,
    confidenceScore: 95,
    confidenceReason: "Extensive public traffic statistics, clear visual audit of their checkout flow, and well-known Shopify Plus tech stack setups.",
    salesAngle: "Streamline mobile checkout from 4 steps to 1 to lift conversion rates by 12% and lower checkout drop-offs during high-traffic sales.",
    proofPoint: "Helium helped a similar electronics brand, Noise, increase checkout conversions by 14% and lower cart abandonment by 18% using our optimized checkout overlays.",
    outreachEmail: {
      subject: "Streamlining checkout conversion at boAt lifestyle",
      greeting: "Hi boAt Sales & Product Team,",
      opening: "I've been tracking boAt's phenomenal rise in the consumer audio segment. With over 8 million monthly visitors, your digital presence is massive. However, our performance audits indicate that mobile checkout friction is currently leaving substantial revenue on the table.",
      valueProp: "At Helium, we specialize in optimizing checkout experiences for scaling Shopify Plus brands. Our diagnostics show that boAt's current checkout flow requires 4 distinct screens. By implementing Helium's single-page, pre-filled checkout, you can bypass this lag, especially for mobile users experiencing network latency.",
      cta: "Could we jump on a brief 10-minute call this Thursday at 3 PM to look over our full CRO audit report for boAt?"
    }
  },
  "mamaearth.in": {
    brandName: "Mamaearth",
    website: "mamaearth.in",
    logo: "https://logo.clearbit.com/mamaearth.in",
    industry: "Beauty & Personal Care",
    category: "Natural Skincare & Baby Products",
    country: "India",
    companySize: "1000-5000",
    revenueRange: "$250M-$500M",
    monthlyTraffic: "5M-6M",
    socialPresence: {
      instagram: "https://instagram.com/mamaearth.in",
      facebook: "https://facebook.com/Mamaearthindia",
      tiktok: "inactive"
    },
    products: ["Onion Hair Fall Control Oil", "Vitamin C Face Wash", "Baby Shampoo", "Ubtan Face Mask", "Natural Sunscreen"],
    catalogSize: 600,
    techStack: ["Next.js Frontend", "Custom Headless Backend", "Klaviyo", "Segment", "WebEngage", "Razorpay"],
    businessSummary: "Mamaearth is a flagship toxin-free personal care brand that focuses on natural, organic products for babies, mothers, and general skincare enthusiasts. Operating as a headless e-commerce setup, they emphasize eco-friendly ingredient storytelling and direct-to-consumer loyalty programs.",
    strengths: [
      "Pioneered the 'toxin-free' positioning in the Indian beauty market.",
      "Superb cross-selling engine with curated baby-mother bundles.",
      "Tightly integrated loyalty club (Goodness Insider) driving repeat purchases."
    ],
    weaknesses: [
      "Fragmented user experience across their headless React setup.",
      "Increasing customer acquisition costs (CAC) due to highly competitive beauty space.",
      "Cluttered product detail pages with excessive badge icons and upsell popups."
    ],
    growthStage: "Mature",
    conversionLeaks: [
      {
        leakType: "No Trust Badges",
        severity: "Medium",
        explanation: "While they talk about toxin-free ingredients, specific clinical certs and toxin-free logos are hidden deep inside accordion menus.",
        evidence: "Crucial plastic-positive and dermatologically tested certificates are not visible above the fold on mobile product pages."
      },
      {
        leakType: "Checkout Friction",
        severity: "High",
        explanation: "The headless checkout requires standard address verification API checks that trigger UI freeze frames on slow connections.",
        evidence: "Address form submission causes a 2.5-second visual spin lock without a loading skeleton."
      },
      {
        leakType: "Poor Product Pages",
        severity: "High",
        explanation: "Extensive cross-sells, loyalty club banners, and ingredients charts render the page long and confusing.",
        evidence: "Mobile product pages extend over 8,000 pixels in height, burying customer product reviews."
      }
    ],
    whyHelium: "Mamaearth runs a custom headless Next.js stack with heavy personalization scripts. Helium can easily plug into their headless checkout API, smoothing out form fields and implementing instant one-click logins for return customers, boosting loyalty program conversions.",
    whyNow: "They are focusing heavily on customer retention to combat high ad-acquisition costs. Making checkout easier for loyalty club members will directly reduce churn and lift average order value (AOV).",
    priorityScore: 88,
    confidenceScore: 92,
    confidenceReason: "Publicly listed brand with distinct headless frontend elements that make it easy to audit API endpoints and script load performance.",
    salesAngle: "Increase headless checkout speeds and simplify address verification to reclaim lost mobile purchases.",
    proofPoint: "Helium decreased checkout drop-off rates by 22% for Plum Goodness, a direct competitor, by integrating streamlined OTP-less login solutions.",
    outreachEmail: {
      subject: "Fixing headless checkout latency on Mamaearth",
      greeting: "Hi Mamaearth Product Team,",
      opening: "I've been admiring Mamaearth's scaling of natural personal care in India. Your headless Next.js framework offers rapid browsing, but our analysis shows some latency and friction inside the checkout funnel.",
      valueProp: "Specifically, when users input their address, the custom validation forms lead to a 2.5-second layout freeze on mobile devices. Helium's headless checkout module integrates directly into Next.js to provide instantaneous address auto-completion and instant OTP verification.",
      cta: "Would you be open to a quick chat next week to see a live mockup of Helium's integration on Mamaearth's checkout pages?"
    }
  },
  "snitch.co.in": {
    brandName: "Snitch",
    website: "snitch.co.in",
    logo: "https://logo.clearbit.com/snitch.co.in",
    industry: "Apparel & Fashion",
    category: "Men's Fast Fashion",
    country: "India",
    companySize: "101-250",
    revenueRange: "$15M-$50M",
    monthlyTraffic: "3M-4M",
    socialPresence: {
      instagram: "https://instagram.com/snitch.co.in",
      facebook: "https://facebook.com/snitch.co.in",
      tiktok: "inactive"
    },
    products: ["Oversized T-Shirts", "Baggy Jeans", "Cuban Collar Shirts", "Cargo Pants", "Varsity Jackets"],
    catalogSize: 1200,
    techStack: ["Shopify Plus", "Klaviyo", "Gorgias", "Mapply", "Visual Website Optimizer", "Razorpay"],
    businessSummary: "Snitch is a highly trendy men's fast-fashion brand, capturing the youth market with rapid design updates and viral social media marketing. Their catalog changes weekly, driving heavy impulse purchases and rapid stock turnover.",
    strengths: [
      "Rapid product turnaround matching Western and K-pop fashion trends.",
      "High social media engagement with over 1.2M+ Instagram followers.",
      "Exceptional mobile app adoption rate among young shoppers."
    ],
    weaknesses: [
      "Very high cart abandonment rates due to casual browsing habits of impulse shoppers.",
      "Complex sizing challenges leading to heavy return logistics and exchanges.",
      "Inconsistent mobile browser cart synchronization."
    ],
    growthStage: "Scaling",
    conversionLeaks: [
      {
        leakType: "No Social Proof",
        severity: "Medium",
        explanation: "While popular on Instagram, reviews are sparse or lack images on newly launched collections.",
        evidence: "Over 40% of newly added shirts in the catalog have zero reviews or only star-ratings without comments."
      },
      {
        leakType: "Checkout Friction",
        severity: "High",
        explanation: "Users are forced to fill out detailed forms or go through OTP setups even for small, low-value impulse items.",
        evidence: "Checkout flow prompts for full billing information and phone OTP prior to showing the payment method selection page."
      },
      {
        leakType: "Navigation Issues",
        severity: "Medium",
        explanation: "With over 1,200 products, finding specific sizes or color variations under collection filters is cumbersome.",
        evidence: "The mobile side filter panel lacks a sticky 'Apply' button, causing users to scroll back to the top of the screen."
      }
    ],
    whyHelium: "Snitch is built on impulse purchases. They have high traffic (~3.5M/mo) and a massive catalog (1200+ products). Reducing cart friction by introducing an instant 'Buy Now' overlay directly on collection pages can bypass the cart page entirely, driving impulse purchases up.",
    whyNow: "Snitch is expanding rapidly online and offline post-funding. They are spending heavily on Instagram ads. Capturing casual web traffic and converting them instantly before they bounce is key to scaling ROAS.",
    priorityScore: 95,
    confidenceScore: 90,
    confidenceReason: "Active tracking of their rapid Shopify storefront updates and audit of their custom sizing and checkout drawers.",
    salesAngle: "Inject an instant 'Buy Now' popup on clothing grids to trigger frictionless impulse checkouts, boosting mobile conversions by 18%.",
    proofPoint: "Helium drove a 20% conversion increase for Beyoung by bypassing standard cart checkouts for high-velocity fashion styles.",
    outreachEmail: {
      subject: "Boosting impulse buying conversions on Snitch.co.in",
      greeting: "Hi Snitch Growth Team,",
      opening: "I've been following Snitch's aggressive growth in the men's streetwear scene. Your catalog refresh rate is incredible, but with fast fashion, speed is everything—not just in logistics, but in checkout.",
      valueProp: "Our CRO audit of Snitch shows that your mobile visitors are required to go through multiple steps to check out, which kills impulse buying. Helium's instant checkout overlays allow customers to complete purchases directly from the product catalog page in 3 seconds, pre-filling shipping and payment data.",
      cta: "Can we set up a 15-minute demo to show you how this overlay would look and perform on Snitch's product pages?"
    }
  },
  "bewakoof.com": {
    brandName: "Bewakoof",
    website: "bewakoof.com",
    logo: "https://logo.clearbit.com/bewakoof.com",
    industry: "Apparel & Fashion",
    category: "Casual Youth Apparel",
    country: "India",
    companySize: "501-1000",
    revenueRange: "$50M-$100M",
    monthlyTraffic: "6M-7M",
    socialPresence: {
      instagram: "https://instagram.com/bewakoofofficial",
      facebook: "https://facebook.com/bewakoofcom",
      tiktok: "inactive"
    },
    products: ["Printed T-Shirts", "Joggers", "Mobile Covers", "Notebooks", "Hoodies"],
    catalogSize: 2500,
    techStack: ["React.js", "Custom E-commerce Engine", "Adobe Analytics", "WebEngage", "MoEngage", "Razorpay"],
    businessSummary: "Bewakoof is a veteran Indian e-commerce player focused on quirky, casual fashion and merchandise (Marvel, Disney partnerships). They utilize heavy discounts, community loyalty (TriBe), and interactive gamification elements to drive purchases.",
    strengths: [
      "Strong merchandise licensing portfolio.",
      "High customer retention driven by the TriBe membership.",
      "Optimized recommendation carousel engines."
    ],
    weaknesses: [
      "Outdated UI components and visually cluttered banners.",
      "High rate of discounts creates purchase hesitation for non-discounted goods.",
      "Slow page speeds due to excessive historical tracking tags."
    ],
    growthStage: "Mature",
    conversionLeaks: [
      {
        leakType: "Slow Website",
        severity: "High",
        explanation: "The custom JS bundle is bloated with tracking scripts, analytics tools, and old visual assets.",
        evidence: "Lighthouse performance scores show desktop page speeds are adequate, but mobile pages score under 28/100."
      },
      {
        leakType: "Navigation Issues",
        severity: "Medium",
        explanation: "The megamenu on desktop is overly dense, and mobile search auto-suggestions return irrelevant categories.",
        evidence: "Searching for 'red t-shirt' displays phone covers and keychains before showing apparel items."
      },
      {
        leakType: "Checkout Friction",
        severity: "High",
        explanation: "Their custom cart requires multiple promo-code entries, membership sign-up popups, and upsell prompts.",
        evidence: "The shopping cart contains 3 distinct CTA banners before the user can click 'Proceed to Buy'."
      }
    ],
    whyHelium: "Bewakoof has massive traffic (~6.5M/mo) but suffers from high checkout complexity because of their customized coupon engines and TriBe upsells. Helium can clean up the cart, embed loyalty discount logic dynamically, and clear visual blockers.",
    whyNow: "They are currently upgrading their tech stack and seeking to optimize mobile conversion to capture high-margin direct sales over marketplace channels.",
    priorityScore: 84,
    confidenceScore: 89,
    confidenceReason: "Known brand, clear custom React implementation, and obvious optimization areas in the checkout panel.",
    salesAngle: "Consolidate loyalty club (TriBe) and coupon checkouts into a clean, distraction-free checkout interface to boost conversions by 15%.",
    proofPoint: "Helium increased D2C cart conversions by 16% for Souled Store by redesigning and consolidating coupon/loyalty checkouts.",
    outreachEmail: {
      subject: "Simplifying checkout friction for Bewakoof TriBe members",
      greeting: "Hi Bewakoof Product Team,",
      opening: "I've been a fan of Bewakoof's quirky branding and the success of the TriBe membership program. However, our conversion analysis reveals that the checkout funnel has become cluttered with overlapping coupon and subscription prompts.",
      valueProp: "Helium helps D2C brands clean up their checkout flows. We can integrate a distraction-free checkout that automatically applies the best coupon and displays TriBe benefits cleanly on a single page, resulting in an estimated 15% increase in conversion rates.",
      cta: "Are you available for a brief 10-minute call next Tuesday to review the optimization mockups we built for Bewakoof?"
    }
  }
};

// Generates dynamic, realistic D2C intelligence for any domain
export function generateMockBrandAnalysis(domain) {
  const normalized = domain.toLowerCase().trim().replace(/^(https?:\/\/)?(www\.)?/, "");
  
  if (PRESET_BRANDS[normalized]) {
    return { ...PRESET_BRANDS[normalized], id: normalized };
  }

  // Generate dynamic data based on the domain input
  const nameParts = normalized.split(".")[0];
  const brandName = nameParts.charAt(0).toUpperCase() + nameParts.slice(1);
  
  const industries = ["Apparel & Fashion", "Beauty & Personal Care", "Consumer Electronics", "Food & Beverage", "Home & Living", "Health & Wellness"];
  const selectedIndustry = industries[Math.floor(Math.random() * industries.length)];
  
  const categories = {
    "Apparel & Fashion": "Sustainable Athleisure",
    "Beauty & Personal Care": "Organic Skincare & Cosmetics",
    "Consumer Electronics": "Smart Home IoT Devices",
    "Food & Beverage": "Specialty Coffee & Healthy Snacks",
    "Home & Living": "Minimalist Home Decor",
    "Health & Wellness": "Plant-based Supplements"
  };
  const category = categories[selectedIndustry] || "Direct-to-Consumer Goods";
  
  const trafficRanges = ["100K-300K", "300K-800K", "800K-2M", "2M-5M"];
  const traffic = trafficRanges[Math.floor(Math.random() * trafficRanges.length)];
  
  const revenueRanges = ["$1M-$3M", "$3M-$10M", "$10M-$30M", "$30M-$100M"];
  const revenue = revenueRanges[Math.floor(Math.random() * revenueRanges.length)];
  
  const sizes = ["11-50", "51-200", "201-500"];
  const size = sizes[Math.floor(Math.random() * sizes.length)];
  
  const catalogSize = Math.floor(Math.random() * 400) + 50;
  const priorityScore = Math.floor(Math.random() * 30) + 65; // 65-95
  const confidenceScore = Math.floor(Math.random() * 15) + 80; // 80-95
  
  const techStacks = [
    ["Shopify", "Klaviyo", "Google Analytics 4", "Razorpay"],
    ["WooCommerce", "Mailchimp", "Stripe", "Google Tag Manager"],
    ["Magento", "ActiveCampaign", "Adyen", "Hotjar"],
    ["Shopify Plus", "Klaviyo", "Recharge", "Stripe", "Yotpo"]
  ];
  const techStack = techStacks[Math.floor(Math.random() * techStacks.length)];
  const isShopify = techStack.includes("Shopify") || techStack.includes("Shopify Plus");

  return {
    id: normalized,
    brandName,
    website: normalized,
    logo: `https://logo.clearbit.com/${normalized}`,
    industry: selectedIndustry,
    category,
    country: Math.random() > 0.4 ? "United States" : "India",
    companySize: size,
    revenueRange: revenue,
    monthlyTraffic: traffic,
    socialPresence: {
      instagram: `https://instagram.com/${nameParts}`,
      facebook: `https://facebook.com/${nameParts}`,
      tiktok: Math.random() > 0.5 ? `https://tiktok.com/@${nameParts}` : "inactive"
    },
    products: [`Signature ${brandName} Item`, `Premium ${category} Pack`, `Essentials Collection`],
    catalogSize,
    techStack,
    businessSummary: `${brandName} is a growing direct-to-consumer brand specializing in premium, targeted offerings in the ${selectedIndustry} segment. They focus on digital advertising and community marketing to reach target buyers who seek high convenience and boutique design.`,
    strengths: [
      "Strong aesthetic consistency across social media landing channels.",
      "High average product ratings from verified buyers.",
      "Active customer loyalty program incentivizing repeat sales."
    ],
    weaknesses: [
      "Noticeable mobile site latency during image loading carousel triggers.",
      "High bounce rate at checkout screen due to compulsory registration steps.",
      "Undifferentiated generic post-purchase thank you notifications."
    ],
    growthStage: Math.random() > 0.5 ? "Growth" : "Early Stage",
    conversionLeaks: [
      {
        leakType: "Checkout Friction",
        severity: "High",
        explanation: "Customers are required to create a new profile password before typing their credit card info.",
        evidence: "No option for guest checkout exists, and password requirements force multiple characters, numbers, and symbols."
      },
      {
        leakType: "Slow Website",
        severity: "Medium",
        explanation: "Unoptimized web fonts and oversized hero banners delay structural page layout loading.",
        evidence: "Mobile load test shows Cumulative Layout Shift (CLS) of 0.45 and PageSpeed score of 42/100."
      },
      {
        leakType: "Weak CTA",
        severity: "Medium",
        explanation: "The cart drawer features a tiny checkout CTA that matches secondary content blocks.",
        evidence: "Checkout buttons are styled in slate gray on a dark charcoal page backdrop, lacking visual focus."
      }
    ],
    whyHelium: `With traffic around ${traffic} visitors and a catalog size of ${catalogSize} items, optimizing checkout fields will directly scale conversion rate metrics. Implementing guest checkout overlays and one-click shipping fills will immediately plug revenue leaks.`,
    whyNow: `Active ad tracking indicates they are currently running Google Search and Instagram video ads. Speeding up their mobile checkout will improve Return on Ad Spend (ROAS) and lower acquisition-funnel abandonment.`,
    priorityScore,
    confidenceScore,
    confidenceReason: "Analyzed site framework tags, detected cart processing, and checked domain age indicators.",
    salesAngle: "Implement Helium's guest-checkout bypass overlay to reclaim up to 15% of checkout drop-offs from paid digital advertising.",
    proofPoint: `Helium increased checkout conversions for another ${selectedIndustry} brand by 14% within 30 days of setup.`,
    outreachEmail: {
      subject: `Accelerating checkout conversions for ${brandName}`,
      greeting: `Hi Team ${brandName},`,
      opening: `I recently came across ${brandName} and was impressed by your brand's presence in the ${selectedIndustry} space. However, during a performance audit of your mobile checkout, we noticed significant friction fields.`,
      valueProp: `Helium allows brands running ${isShopify ? 'Shopify' : 'e-commerce frameworks'} to replace complex checkout screens with an optimized one-page overlay, bypassing user registration blockades. This directly increases conversion rates by eliminating shipping address friction.`,
      cta: "Would you be open to a quick 10-minute preview of the optimization report we compiled for your domain?"
    }
  };
}

export const INITIAL_COMPANIES = [
  { ...PRESET_BRANDS["boat-lifestyle.com"], id: "boat-lifestyle.com", isBookmarked: true, status: "Meeting Scheduled", notes: ["Initial discovery call completed on June 20. Client very interested in mobile checkouts.", "Sent follow-up deck explaining the 12% lift proof points."] },
  { ...PRESET_BRANDS["mamaearth.in"], id: "mamaearth.in", isBookmarked: false, status: "Contacted", notes: ["Sent outreach email on June 25 to Product VP.", "Awaiting feedback on their headless API setup."] },
  { ...PRESET_BRANDS["snitch.co.in"], id: "snitch.co.in", isBookmarked: true, status: "New", notes: [] },
  { ...PRESET_BRANDS["bewakoof.com"], id: "bewakoof.com", isBookmarked: false, status: "New", notes: [] }
];

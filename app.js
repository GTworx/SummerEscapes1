/**
 * SummerEscapes - Dashboard Logic
 * Features: Map integration, custom markers, geo-search, dynamic venue generation,
 * filtering logic, sharing system, and query parameter routing.
 */

// --- Constants & Configuration ---
const FEATURED_CITIES = {
    nice: { name: "Nice, France", lat: 43.7102, lon: 7.2620 },
    amalfi: { name: "Amalfi Coast, Italy", lat: 40.6340, lon: 14.6027 },
    honolulu: { name: "Honolulu, Hawaii", lat: 21.3069, lon: -157.8583 },
    bali: { name: "Bali, Indonesia", lat: -8.4095, lon: 115.1889 },
    miami: { name: "Miami, Florida", lat: 25.7617, lon: -80.1918 },
    barcelona: { name: "Barcelona, Spain", lat: 41.3851, lon: 2.1734 },
    capetown: { name: "Cape Town, South Africa", lat: -33.9249, lon: 18.4241 },
    vancouver: { name: "Vancouver, Canada", lat: 49.2827, lon: -123.1207 },
    kyoto: { name: "Kyoto, Japan", lat: 35.0116, lon: 135.7681 }
};

// Curated Photos matching views from Unsplash
const UNSPLASH_IMAGES = {
    sea: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
    ],
    lake: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    ],
    mountain: [
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486873249359-2731bd6dafc7?auto=format&fit=crop&w=800&q=80"
    ],
    forest: [
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80"
    ],
    city: [
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    ]
};

// Hand-crafted static database for Nice, Amalfi, Bali to serve as high-fidelity presets
const STATIC_VENUES = [
    // Nice, France (lat: 43.7102, lon: 7.2620)
    {
        id: "nice-beach-rivage",
        name: "Plage Beau Rivage Beach Club",
        city: "Nice",
        view: "sea",
        vibe: "casual",
        lat: 43.6958,
        lon: 7.2680,
        rating: 4.8,
        description: "An iconic oceanfront club on the Promenade des Anglais. Enjoy premium sun loungers, freshly mixed tropical drinks, and high-quality Mediterranean dining with direct view and access to the azure waters.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        amenities: ["Beach Access", "Pool", "Open Bar", "Restaurante", "High-speed Wifi"]
    },
    {
        id: "nice-castle-hill",
        name: "Castle Hill Panoramic Lodge",
        city: "Nice",
        view: "mountain",
        vibe: "family",
        lat: 43.6985,
        lon: 7.2790,
        rating: 4.6,
        description: "Perched atop Nice's ancient citadel, this cozy retreat offers breathtaking views of the Baie des Anges. Perfect for families looking to explore shaded forest pathways, ruins, and children play areas.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        amenities: ["Guided Tours", "Spacious Suites", "Kids Play Area", "High-speed Wifi", "Scenic Hiking"]
    },
    {
        id: "nice-negresco-rooftop",
        name: "Negresco Skyline Lounge",
        city: "Nice",
        view: "city",
        vibe: "business",
        lat: 43.6945,
        lon: 7.2520,
        rating: 4.9,
        description: "A gorgeous modern penthouse suite overlooking Nice's skyline and seaside. Equipped with collaborative meeting zones, ultra-fast fiber internet, and a sleek cocktail lounge for corporate networking.",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
        amenities: ["Executive Lounge", "High-speed Wifi", "Workspace", "Meeting Spaces", "Dedicated Parking"]
    },
    {
        id: "nice-gairaut-cascade",
        name: "Cascade de Gairaut Lakeside Inn",
        city: "Nice",
        view: "lake",
        vibe: "casual",
        lat: 43.7380,
        lon: 7.2530,
        rating: 4.5,
        description: "A tranquil lake-side escape near Nice's high-altitude waterfall reservoir. Surrounded by local olive orchards, it's a perfect oasis for a casual afternoon picnic, local craft beers, and peaceful relaxation.",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
        amenities: ["Hammock Lounges", "Campfire Rings", "Pet Friendly", "Local Craft Drinks", "High-speed Wifi"]
    },
    {
        id: "nice-chateauneuf-forest",
        name: "Châteauneuf Woodland Treehouse",
        city: "Nice",
        view: "forest",
        vibe: "casual",
        lat: 43.7920,
        lon: 7.2950,
        rating: 4.7,
        description: "Nestled deep in the forest pine hills overlooking the Nice backcountry. Stay in custom suspended cabins, hear birds chirping, and sit around cozy evening bonfires away from city noises.",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        amenities: ["Scenic Hiking", "Campfire Rings", "Pet Friendly", "Hammock Lounges", "Open Bar"]
    },

    // Amalfi Coast, Italy (lat: 40.6340, lon: 14.6027)
    {
        id: "amalfi-furore-cove",
        name: "Fiordo di Furore Sea Hideaway",
        city: "Amalfi",
        view: "sea",
        vibe: "casual",
        lat: 40.6210,
        lon: 14.5510,
        rating: 4.9,
        description: "Tucked inside Amalfi's most legendary geological gorge. This hidden venue offers private cliff-diving platforms, artisanal Limoncello bar, and cozy rooms with waves crashing right underneath.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        amenities: ["Beach Access", "Open Bar", "Restaurante", "Local Craft Drinks", "High-speed Wifi"]
    },
    {
        id: "amalfi-rufolo-gardens",
        name: "Ravello Crest Mountain Lodge",
        city: "Amalfi",
        view: "mountain",
        vibe: "business",
        lat: 40.6495,
        lon: 14.6115,
        rating: 4.8,
        description: "Suspended 350 meters above the sea in historic Ravello. Offers breathtaking vistas of the Tyrrhenian coast, pristine workspaces, curated gardens, and absolute quiet for high-profile business retreats.",
        image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
        amenities: ["Executive Lounge", "High-speed Wifi", "Workspace", "Meeting Spaces", "Scenic Hiking"]
    },
    {
        id: "amalfi-ferriere-canopy",
        name: "Valle delle Ferriere Forest Camp",
        city: "Amalfi",
        view: "forest",
        vibe: "family",
        lat: 40.6430,
        lon: 14.5900,
        rating: 4.7,
        description: "A forest haven located right within Amalfi's lush bio-nature reserve. Walk through ancient fern valleys, swim in natural waterfalls, and let children participate in interactive ecological farming tours.",
        image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
        amenities: ["Kids Play Area", "Guided Tours", "Spacious Suites", "Scenic Hiking", "Pet Friendly"]
    },

    // Bali, Indonesia (lat: -8.4095, lon: 115.1889)
    {
        id: "bali-ubud-hanging",
        name: "Ubud Canopy Forest Resort",
        city: "Bali",
        view: "forest",
        vibe: "casual",
        lat: -8.5069,
        lon: 115.2625,
        rating: 4.9,
        description: "Located deep in Bali's volcanic rainforest valleys. Featuring multi-tier infinity pools, treehouse dining, bamboo design structures, and yoga decks surrounded by chirping monkeys.",
        image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80",
        amenities: ["Pool", "Hammock Lounges", "Open Bar", "Restaurante", "High-speed Wifi"]
    },
    {
        id: "bali-seminyak-club",
        name: "Seminyak Wave Beachfront Resort",
        city: "Bali",
        view: "sea",
        vibe: "family",
        lat: -8.6913,
        lon: 115.1558,
        rating: 4.7,
        description: "A vibrant ocean retreat right on the warm sand flats of Seminyak. Perfect family getaway featuring water slides, kids programs, beachfront volleyball, and beautiful evening sunset DJ sessions.",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        amenities: ["Beach Access", "Pool", "Kids Play Area", "Spacious Suites", "Restaurante"]
    },
    {
        id: "bali-batur-lake",
        name: "Lake Batur Volcanic Lodge",
        city: "Bali",
        view: "lake",
        vibe: "casual",
        lat: -8.2600,
        lon: 115.3950,
        rating: 4.8,
        description: "Stay directly on the shores of Bali's sacred volcanic crater lake. Indulge in hot mineral springs, canoe across misty waters, and gather around lakeshore campfires under starry skies.",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
        amenities: ["Campfire Rings", "Local Craft Drinks", "Hammock Lounges", "Pet Friendly", "Pool"]
    }
];

// Dynamic names dictionary used when generating sites for new cities
const DYNAMIC_NAMES = {
    sea: [
        "Sunny Wave Lounge", "Sea Breeze Retreat", "Golden Beach Sands", "Turquoise Horizon Cove",
        "Saltwater Marina Spa", "Sunseeker Oceanfront Club", "Coral Reef Oasis", "Azure Shore Cabin"
    ],
    lake: [
        "Stillwater Pier Lodge", "Mirror Water Villa", "Swan Lake Retreat", "Pebble Creek Chalet",
        "Mist Harbor Boathouse", "Cottage on the Shore", "Amber Lake Hideaway", "Silver Bay Camp"
    ],
    mountain: [
        "Highland Summit Peak", "Eagle Ridge Cabins", "Alpine Sunrise Lodge", "Grand Ravine Vista",
        "Boulder Slope Sanctuary", "Pinnacle Valley Retreat", "Whispering Gorge Villa", "Glacier Overlook"
    ],
    forest: [
        "Ancient Canopy Treehouse", "Mosswood Wilderness Cabin", "Timberline Fern Glen", "Forest Pathway Lodge",
        "Deep Green Sanctuary", "Elm Shade Hideout", "Acorn Valley Hammocks", "Bramblewood Eco-Nest"
    ],
    city: [
        "Rooftop Oasis Penthouse", "Skyline Promenade Terrace", "Metropolitan View Club", "Downtown Plaza Suites",
        "Boutique Highrise Loft", "Central Boulevard Garden", "Neon Arch Deck", "Urban Escape Suite"
    ]
};

const AMENITY_LIST = [
    { name: "Beach Access", icon: "fa-solid fa-umbrella-beach" },
    { name: "Pool", icon: "fa-solid fa-person-swimming" },
    { name: "Open Bar", icon: "fa-solid fa-martini-glass-citrus" },
    { name: "Restaurante", icon: "fa-solid fa-utensils" },
    { name: "High-speed Wifi", icon: "fa-solid fa-wifi" },
    { name: "Guided Tours", icon: "fa-solid fa-person-hiking" },
    { name: "Spacious Suites", icon: "fa-solid fa-hotel" },
    { name: "Kids Play Area", icon: "fa-solid fa-child-reaching" },
    { name: "Scenic Hiking", icon: "fa-solid fa-route" },
    { name: "Executive Lounge", icon: "fa-solid fa-briefcase" },
    { name: "Workspace", icon: "fa-solid fa-laptop-code" },
    { name: "Meeting Spaces", icon: "fa-solid fa-users" },
    { name: "Dedicated Parking", icon: "fa-solid fa-square-parking" },
    { name: "Hammock Lounges", icon: "fa-solid fa-cubes-stacked" },
    { name: "Campfire Rings", icon: "fa-solid fa-fire" },
    { name: "Pet Friendly", icon: "fa-solid fa-paw" },
    { name: "Local Craft Drinks", icon: "fa-solid fa-beer-mug-empty" }
];

// --- Application State Manager ---
class SummerEscapesApp {
    constructor() {
        this.map = null;
        this.currentCity = "Nice";
        this.centerCoords = [43.7102, 7.2620];
        
        // Caches for dynamic or loaded venues
        this.cachedVenues = []; 
        this.filteredVenues = [];
        this.selectedVenue = null;
        this.markersList = [];
        this.perimeterCircle = null;

        // Active filters state
        this.activeViews = ["sea", "lake", "mountain", "forest", "city"];
        this.activeVibe = "all";
        this.perimeterRadius = 15; // in kilometers

        this.initElements();
        this.initLeaflet();
        this.bindEvents();
        this.processQueryParams();
    }

    // Connect and cache DOM Nodes
    initElements() {
        this.cityInput = document.getElementById("city-input");
        this.searchBtn = document.getElementById("search-btn");
        this.fetchBtn = document.getElementById("fetch-btn");
        
        this.perimeterInput = document.getElementById("perimeter-input");
        this.perimeterValue = document.getElementById("perimeter-value");
        
        this.viewOptionsContainer = document.getElementById("view-options");
        this.vibeOptionsContainer = document.getElementById("vibe-options");
        this.venuesListContainer = document.getElementById("venues-list");
        this.resultsCountBadge = document.getElementById("results-count");
        this.activeLocationText = document.getElementById("active-location-text");
        
        this.mapLoader = document.getElementById("map-loader");
        this.detailsOverlay = document.getElementById("details-overlay");
        this.toastContainer = document.getElementById("toast-container");
    }

    // Initialize Leaflet Map Instance
    initLeaflet() {
        // Center on default city (Nice)
        this.map = L.map("map", {
            zoomControl: false,
            scrollWheelZoom: true
        }).setView(this.centerCoords, 12);

        // Position zoom controls on the bottom-right (out of the way of overlays)
        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.map);

        // Load clean Voyager Map style (warm, beachy colors, very elegant)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(this.map);
    }

    // Bind event handlers
    bindEvents() {
        // Perimeter Slider
        this.perimeterInput.addEventListener("input", (e) => {
            this.perimeterRadius = parseInt(e.target.value);
            this.perimeterValue.textContent = `${this.perimeterRadius} km`;
            this.updatePerimeterCircle();
            this.applyFilters();
        });

        // View Option Toggles (multi-select)
        this.viewOptionsContainer.addEventListener("click", (e) => {
            const button = e.target.closest(".pill-btn");
            if (!button) return;

            const val = button.getAttribute("data-value");
            button.classList.toggle("active");

            if (button.classList.contains("active")) {
                if (!this.activeViews.includes(val)) this.activeViews.push(val);
            } else {
                this.activeViews = this.activeViews.filter(v => v !== val);
            }
            this.applyFilters();
        });

        // Vibe Choice Toggles (single choice)
        this.vibeOptionsContainer.addEventListener("click", (e) => {
            const button = e.target.closest(".vibe-btn");
            if (!button) return;

            document.querySelectorAll(".vibe-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            this.activeVibe = button.getAttribute("data-value");
            this.applyFilters();
        });

        // Action Buttons
        this.searchBtn.addEventListener("click", () => this.handleFetch(true));
        this.fetchBtn.addEventListener("click", () => this.handleFetch(true));
        
        this.cityInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") this.handleFetch(true);
        });

        // Details Panel Close
        document.getElementById("close-details-btn").addEventListener("click", () => {
            this.closeDetails();
        });

        // Share Buttons
        document.getElementById("share-friend-btn").addEventListener("click", () => this.shareCopyLink());
        document.getElementById("share-whatsapp-btn").addEventListener("click", () => this.shareWhatsApp());
    }

    // Read initial Query Parameters for shared link support
    processQueryParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const cityParam = urlParams.get('city');
        const radiusParam = urlParams.get('radius');
        const venueParam = urlParams.get('venue');

        if (cityParam) {
            this.cityInput.value = cityParam;
            this.currentCity = cityParam;
        }

        if (radiusParam) {
            const r = parseInt(radiusParam);
            if (r >= 2 && r <= 50) {
                this.perimeterRadius = r;
                this.perimeterInput.value = r;
                this.perimeterValue.textContent = `${r} km`;
            }
        }

        // Run initial loading
        this.handleFetch(false).then(() => {
            if (venueParam) {
                const target = this.cachedVenues.find(v => v.id === venueParam);
                if (target) {
                    // Match filters to show it if necessary
                    if (!this.activeViews.includes(target.view)) {
                        this.activeViews.push(target.view);
                        const pill = document.querySelector(`.pill-btn[data-value="${target.view}"]`);
                        if (pill) pill.classList.add("active");
                    }
                    if (this.activeVibe !== "all" && this.activeVibe !== target.vibe) {
                        this.activeVibe = "all";
                        document.querySelectorAll(".vibe-btn").forEach(btn => {
                            btn.classList.toggle("active", btn.getAttribute("data-value") === "all");
                        });
                    }
                    
                    this.applyFilters();
                    this.selectVenueItem(target);
                }
            }
        });
    }

    // Show Custom Toast alerts
    showToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #2ecc71;"></i> ${message}`;
        this.toastContainer.appendChild(toast);

        // Remove element after animation ends
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Haversine formula to compute distance in km
    getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's Radius
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    // Handles Refresh/Fetch triggers
    async handleFetch(triggerTransition = true) {
        const cityName = this.cityInput.value.trim();
        if (!cityName) return;

        this.closeDetails();
        
        // Show Loading Overlay
        if (triggerTransition) {
            this.mapLoader.classList.remove("hidden");
        }
        this.activeLocationText.textContent = `Searching...`;

        const normalizedCity = cityName.toLowerCase();
        let targetCoords = null;

        // Check in static featured list
        if (FEATURED_CITIES[normalizedCity]) {
            targetCoords = [FEATURED_CITIES[normalizedCity].lat, FEATURED_CITIES[normalizedCity].lon];
            this.currentCity = FEATURED_CITIES[normalizedCity].name;
            
            // Wait slightly for a premium feel
            if (triggerTransition) await new Promise(r => setTimeout(r, 600));
            this.loadFeaturedCityVenues(normalizedCity, targetCoords);
        } else {
            // Fetch dynamically via OpenStreetMap Nominatim
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`, {
                    headers: { 'Accept-Language': 'en' }
                });
                const data = await response.json();
                
                if (data && data.length > 0) {
                    targetCoords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                    this.currentCity = data[0].display_name.split(",")[0] + ", " + (data[0].display_name.split(",").slice(-1)[0] || "").trim();
                    this.generateDynamicVenues(cityName, targetCoords);
                } else {
                    throw new Error("City not found");
                }
            } catch (err) {
                console.error("Geocoding failed:", err);
                this.showToast(`Couldn't find '${cityName}'. Loading Nice preset! ☀️`);
                
                // Fallback to Nice
                targetCoords = [FEATURED_CITIES.nice.lat, FEATURED_CITIES.nice.lon];
                this.currentCity = FEATURED_CITIES.nice.name;
                this.cityInput.value = "Nice";
                this.loadFeaturedCityVenues("nice", targetCoords);
            }
        }

        // Center map & draw circle
        this.centerCoords = targetCoords;
        this.map.setView(targetCoords, 12);
        this.updatePerimeterCircle();
        this.activeLocationText.textContent = this.currentCity;
        
        // Filter and Render
        this.applyFilters();

        if (triggerTransition) {
            this.mapLoader.classList.add("hidden");
            this.showToast(`Fetched escapes in ${this.currentCity.split(',')[0]}!`);
        }
    }

    // Loads standard featured local datasets
    loadFeaturedCityVenues(cityKey, coords) {
        const baseVenues = STATIC_VENUES.filter(v => v.city.toLowerCase() === cityKey);
        
        // Calculate dynamic relative distances from new center coordinates
        this.cachedVenues = baseVenues.map(venue => {
            const distance = this.getDistance(coords[0], coords[1], venue.lat, venue.lon);
            return {
                ...venue,
                distance: parseFloat(distance.toFixed(1))
            };
        });
    }

    // Dynamically generates reasonable venues in real-time for any city in the world
    generateDynamicVenues(cityName, coords) {
        const generated = [];
        const viewTypes = ["sea", "lake", "mountain", "forest", "city"];
        const vibeTypes = ["family", "business", "casual"];
        
        // Create 8 dynamic points scattered logically inside the perimeter area
        for (let i = 0; i < 9; i++) {
            const view = viewTypes[i % viewTypes.length];
            const vibe = vibeTypes[i % vibeTypes.length];
            
            // Random distance distribution within 2km up to 25km (constrained by slider)
            const angle = Math.random() * 2 * Math.PI;
            // Distribute markers somewhat uniformly
            const randDist = (0.2 + 0.8 * Math.random()) * this.perimeterRadius; 
            
            // Coordinate conversion (Roughly 111.32 km per degree)
            const deltaLat = (randDist * Math.cos(angle)) / 111.32;
            const deltaLon = (randDist * Math.sin(angle)) / (111.32 * Math.cos(coords[0] * Math.PI / 180));
            
            const venueLat = coords[0] + deltaLat;
            const venueLon = coords[1] + deltaLon;

            // Generate name based on lists
            const nameTemplates = DYNAMIC_NAMES[view];
            const nameBase = nameTemplates[Math.floor(Math.random() * nameTemplates.length)];
            const venueName = `${cityName.split(',')[0]} ${nameBase}`;

            // Generate descriptive text
            const description = `A gorgeous ${view}-view getaway located near the heart of ${cityName.split(',')[0]}. Designed especially for ${vibe} travelers, offering peaceful ambient surroundings and state-of-the-art conveniences.`;

            // Pull matching Unsplash images list
            const imgOptions = UNSPLASH_IMAGES[view];
            const image = imgOptions[i % imgOptions.length];

            // Pull randomized applicable amenities
            const chosenAmenities = this.getRandomAmenities(view, vibe);

            generated.push({
                id: `dyn-venue-${i}`,
                name: venueName,
                city: cityName,
                view: view,
                vibe: vibe,
                lat: venueLat,
                lon: venueLon,
                rating: parseFloat((4.2 + Math.random() * 0.8).toFixed(1)),
                description: description,
                image: image,
                amenities: chosenAmenities,
                distance: parseFloat(randDist.toFixed(1))
            });
        }

        this.cachedVenues = generated;
    }

    // Pull 4-5 relevant amenities based on location structure
    getRandomAmenities(view, vibe) {
        const matches = [];
        
        // Base view amenities
        if (view === "sea") matches.push("Beach Access", "Open Bar");
        if (view === "lake") matches.push("Hammock Lounges", "Pet Friendly");
        if (view === "mountain") matches.push("Scenic Hiking", "Guided Tours");
        if (view === "forest") matches.push("Campfire Rings", "Scenic Hiking");
        if (view === "city") matches.push("Dedicated Parking", "Pool");

        // Vibe matches
        if (vibe === "family") matches.push("Kids Play Area", "Spacious Suites");
        if (vibe === "business") matches.push("High-speed Wifi", "Workspace", "Meeting Spaces");
        if (vibe === "casual") matches.push("Local Craft Drinks", "Hammock Lounges");

        // General padding
        matches.push("Restaurante", "Pool");

        // Unique filter array
        const unique = [...new Set(matches)];
        return unique.slice(0, 5);
    }

    // Update Perimeter dotted boundary on Leaflet
    updatePerimeterCircle() {
        if (this.perimeterCircle) {
            this.map.removeLayer(this.perimeterCircle);
        }

        // Draw dotted Leaflet circle
        this.perimeterCircle = L.circle(this.centerCoords, {
            radius: this.perimeterRadius * 1000, // convert km to meters
            className: 'perimeter-circle'
        }).addTo(this.map);
    }

    // Filter, process, and render venues dynamically
    applyFilters() {
        // Recompute distance of all cached venues in case center coords shifted
        this.cachedVenues.forEach(v => {
            v.distance = parseFloat(this.getDistance(this.centerCoords[0], this.centerCoords[1], v.lat, v.lon).toFixed(1));
        });

        // Perform cascading filter checks
        this.filteredVenues = this.cachedVenues.filter(venue => {
            // Distance radius check
            if (venue.distance > this.perimeterRadius) return false;

            // View Option check (any selected match)
            if (!this.activeViews.includes(venue.view)) return false;

            // Vibe Category check
            if (this.activeVibe !== "all" && venue.vibe !== this.activeVibe) return false;

            return true;
        });

        this.resultsCountBadge.textContent = `${this.filteredVenues.length} found`;
        
        this.renderList();
        this.renderMapMarkers();
    }

    // Draw the list cards
    renderList() {
        this.venuesListContainer.innerHTML = "";

        if (this.filteredVenues.length === 0) {
            this.venuesListContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-face-frown"></i>
                    <p>No matching escapes inside this perimeter. Try expanding the radius or checking more view options.</p>
                </div>
            `;
            return;
        }

        this.filteredVenues.forEach(venue => {
            const isSelected = this.selectedVenue && this.selectedVenue.id === venue.id;
            const card = document.createElement("div");
            card.className = `escape-card ${isSelected ? 'selected' : ''}`;
            card.setAttribute("data-id", venue.id);

            // Generate Rating Stars HTML
            let starsHtml = "";
            const floorRating = Math.floor(venue.rating);
            for (let s = 1; s <= 5; s++) {
                if (s <= floorRating) {
                    starsHtml += `<i class="fa-solid fa-star"></i>`;
                } else if (s === floorRating + 1 && venue.rating % 1 >= 0.5) {
                    starsHtml += `<i class="fa-solid fa-star-half-stroke"></i>`;
                } else {
                    starsHtml += `<i class="fa-regular fa-star"></i>`;
                }
            }

            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${venue.image}" alt="${venue.name}" loading="lazy">
                </div>
                <div class="card-details">
                    <div>
                        <h4>${venue.name}</h4>
                        <div class="card-rating-distance">
                            <span class="rating-stars">${starsHtml}</span>
                            <span>&bull;</span>
                            <span>${venue.distance} km away</span>
                        </div>
                    </div>
                    <div class="card-tags">
                        <span class="mini-badge view">${venue.view} View</span>
                        <span class="mini-badge vibe">${venue.vibe}</span>
                    </div>
                </div>
            `;

            card.addEventListener("click", () => {
                this.selectVenueItem(venue);
            });

            this.venuesListContainer.appendChild(card);
        });
    }

    // Refresh markers on Leaflet map
    renderMapMarkers() {
        // Clear existing markers
        this.markersList.forEach(m => this.map.removeLayer(m));
        this.markersList = [];

        this.filteredVenues.forEach(venue => {
            const isSelected = this.selectedVenue && this.selectedVenue.id === venue.id;
            
            // Map icons for View types
            const iconMap = {
                sea: "fa-solid fa-umbrella-beach",
                lake: "fa-solid fa-water",
                mountain: "fa-solid fa-mountain-sun",
                forest: "fa-solid fa-tree",
                city: "fa-solid fa-city"
            };

            const iconClass = iconMap[venue.view] || "fa-solid fa-location-dot";

            // Custom HTML element overlay pin
            const customIcon = L.divIcon({
                className: 'custom-div-icon',
                html: `
                    <div class="marker-pin-wrapper ${isSelected ? 'selected' : ''}" id="pin-wrap-${venue.id}">
                        <div class="marker-pin">
                            <i class="${iconClass}"></i>
                        </div>
                    </div>
                `,
                iconSize: [40, 40],
                iconAnchor: [0, 20]
            });

            const marker = L.marker([venue.lat, venue.lon], { icon: customIcon }).addTo(this.map);
            
            // Bind tooltips for hover interaction
            marker.bindTooltip(`<strong>${venue.name}</strong><br>${venue.rating} ⭐ &bull; ${venue.view} view`, {
                direction: 'top',
                offset: [0, -40]
            });

            marker.on("click", () => {
                this.selectVenueItem(venue);
            });

            this.markersList.push(marker);
        });
    }

    // Handle full Venue click workflow
    selectVenueItem(venue) {
        this.selectedVenue = venue;
        
        // Highlight active list card
        document.querySelectorAll(".escape-card").forEach(card => {
            card.classList.toggle("selected", card.getAttribute("data-id") === venue.id);
        });

        // Toggle selected styling on map pins
        document.querySelectorAll(".marker-pin-wrapper").forEach(wrapper => {
            wrapper.classList.remove("selected");
        });
        const activePin = document.getElementById(`pin-wrap-${venue.id}`);
        if (activePin) {
            activePin.classList.add("selected");
        }

        // Center map smoothly on location
        this.map.panTo([venue.lat, venue.lon]);

        // Render Details overlay content
        document.getElementById("detail-image").src = venue.image;
        document.getElementById("detail-image").alt = venue.name;
        document.getElementById("detail-name").textContent = venue.name;
        
        document.getElementById("detail-view-badge").textContent = `${venue.view} View`;
        document.getElementById("detail-vibe-badge").textContent = venue.vibe;
        document.getElementById("detail-distance").textContent = `${venue.distance} km from central area`;
        document.getElementById("detail-description").textContent = venue.description;

        // Render Stars
        const ratingContainer = document.getElementById("detail-rating");
        ratingContainer.innerHTML = "";
        const floorRating = Math.floor(venue.rating);
        for (let s = 1; s <= 5; s++) {
            if (s <= floorRating) {
                ratingContainer.innerHTML += `<i class="fa-solid fa-star"></i>`;
            } else if (s === floorRating + 1 && venue.rating % 1 >= 0.5) {
                ratingContainer.innerHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
            } else {
                ratingContainer.innerHTML += `<i class="fa-regular fa-star"></i>`;
            }
        }
        ratingContainer.innerHTML += ` <span style="font-size: 13px; font-weight:700; color:var(--color-text-dark); margin-left: 5px;">${venue.rating}</span>`;

        // Render Amenities
        const amenitiesContainer = document.getElementById("detail-amenities");
        amenitiesContainer.innerHTML = "";
        venue.amenities.forEach(amenityName => {
            const matchInfo = AMENITY_LIST.find(a => a.name.toLowerCase() === amenityName.toLowerCase());
            const icon = matchInfo ? matchInfo.icon : "fa-solid fa-circle-check";
            
            const item = document.createElement("div");
            item.className = "amenity-item";
            item.innerHTML = `<i class="${icon}"></i> <span>${amenityName}</span>`;
            amenitiesContainer.appendChild(item);
        });

        // Present detailed Panel slide-in
        this.detailsOverlay.classList.remove("hidden");
    }

    // Close detail card view
    closeDetails() {
        this.detailsOverlay.classList.add("hidden");
        this.selectedVenue = null;

        // Remove active highlights
        document.querySelectorAll(".escape-card").forEach(c => c.classList.remove("selected"));
        document.querySelectorAll(".marker-pin-wrapper").forEach(p => p.classList.remove("selected"));
    }

    // Copy formatted URL share link to user's clipboard
    shareCopyLink() {
        if (!this.selectedVenue) return;

        // Build fully functional URL query route
        const shareUrl = `${window.location.origin}${window.location.pathname}?city=${encodeURIComponent(this.cityInput.value)}&radius=${this.perimeterRadius}&venue=${encodeURIComponent(this.selectedVenue.id)}`;

        navigator.clipboard.writeText(shareUrl).then(() => {
            this.showToast("Escape link copied to clipboard! ☀️");
        }).catch(err => {
            console.error("Clipboard copy failed: ", err);
            // Fallback copy popup
            alert(`Share this link: ${shareUrl}`);
        });
    }

    // Format and trigger WhatsApp share links
    shareWhatsApp() {
        if (!this.selectedVenue) return;

        const shareUrl = `${window.location.origin}${window.location.pathname}?city=${encodeURIComponent(this.cityInput.value)}&radius=${this.perimeterRadius}&venue=${encodeURIComponent(this.selectedVenue.id)}`;
        
        const message = `Check out this gorgeous summer escape I found on SummerEscapes: *${this.selectedVenue.name}*! It has a wonderful ${this.selectedVenue.view} view. Explore it here: ${shareUrl}`;
        
        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp in a clean tab
        window.open(waUrl, "_blank");
    }
}

// Instantiate and load application on page load
document.addEventListener("DOMContentLoaded", () => {
    window.app = new SummerEscapesApp();
});

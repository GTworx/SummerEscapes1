# SummerEscapes ☀️

A premium, interactive summer travel dashboard built with vanilla web technologies, glassmorphic styling, and Leaflet.js mapping.

## Features

- **Summer Themed Dashboard**: Styled using warm gradients (sun orange/salmon), ocean teals, and glassmorphic card designs.
- **Left Panel Search & Controls**:
  - **Designated City Input**: Type in any city globally. Falls back to Nice, France on errors.
  - **Perimeter Radius Slider**: Restrict search results within a radius of 2 km to 50 km.
  - **View Options Multi-Select**: Filter escapes based on *Sea, Lake, Mountain, Forest, or City* views.
  - **Vibe/Category Selector**: Tailor results by *Family, Business, or Casual* vibes.
  - **Discover Escapes (Fetch/Refresh) Button**: Animates and fetches coordinates and locations dynamically.
- **Right Panel Interactive Mapping & Details**:
  - **Dotted Perimeter Circle**: Shows the exact search radius visually on the map.
  - **Custom Map Markers**: Unique pins containing icons representing the view type.
  - **Slide-in Details Panel**: Displays ratings (star indicators), high-quality Unsplash cover photos, distance calculation, rich descriptions, and custom amenities grids.
  - **Dynamic Share Options**: 
    - **Copy Link**: Copies a fully parameterized URL that automatically restores the city, radius, and chosen venue when opened by a friend.
    - **Share on WhatsApp**: Opens a pre-composed message in a new WhatsApp tab.

## Technologies Used

- **HTML5**: Structured semantic markup.
- **Vanilla CSS3**: Glassmorphism (`backdrop-filter`), smooth hover animations, custom sliders, responsive flex/grid layouts.
- **Vanilla JavaScript (ES6)**: State management, Haversine distance tracking, dynamic coordinates generation.
- **Leaflet.js & CARTO Voyager**: Beautiful, lightweight mapping framework and tiles (does not require API keys).
- **OpenStreetMap Nominatim API**: Free geocoding lookup service.
- **FontAwesome**: Modern vector iconography.

## How to Run Locally

Since this app is built purely with client-side code, no build steps are required.

1. **Direct Browser Execution**:
   Simply double-click the `index.html` file or open it in your browser.

2. **Local HTTP Server (Optional)**:
   If you want to serve it through a local server, run:
   ```bash
   npx http-server
   ```
   Or if you have Python installed:
   ```bash
   python -m http.server
   ```
   Then open `http://localhost:8000` in your web browser.

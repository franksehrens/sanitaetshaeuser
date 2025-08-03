// Global variables
let map;
let markers = [];
let allLocations = [];
let currentFilteredLocations = [];

// Sample data from Gelbe Seiten (based on the provided content)
const sanitaetshausData = [
    {
        name: "Gesundheitsfachhaus von Schlieben GmbH",
        address: "Sonnenstr. 17, 80331 München (Altstadt)",
        phone: "089 54 54 37 21",
        rating: 4.9,
        reviews: 7,
        lat: 48.1351,
        lng: 11.5820,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Sanitätshaus Kleinzschachwitz",
        address: "Putjatinstr. 5, 01259 Dresden (Kleinzschachwitz)",
        phone: "0351 20 57 69 37",
        rating: 4.5,
        reviews: 8,
        lat: 51.0504,
        lng: 13.7373,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Sanitätshaus Nimbs",
        address: "Burglengenfeld 1, 93133 Burglengenfeld",
        phone: "09471 80 75 94",
        rating: 4.0,
        reviews: 1,
        lat: 49.2033,
        lng: 12.0389,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Sanitätshaus Rosenau GmbH",
        address: "Gerhart-Hauptmann-Str. 30, 07973 Greiz",
        phone: "03661 45 46 73",
        rating: 5.0,
        reviews: 2,
        lat: 50.6567,
        lng: 12.1994,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Harald Gerke Orthopädie-Schuhtechnik",
        address: "Halskestr. 47, 12167 Berlin (Steglitz)",
        phone: "030 7 95 47 57",
        rating: 2.3,
        reviews: 3,
        lat: 52.5200,
        lng: 13.4050,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Sanitätshaus Meisel",
        address: "Hochstr. 9, 92637 Weiden",
        phone: "0961 48 17 50",
        rating: 0,
        reviews: 0,
        lat: 49.6769,
        lng: 12.1561,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Bialas GbR",
        address: "Rochusstr. 149, 53123 Bonn",
        phone: "0228 61 46 64",
        rating: 0,
        reviews: 0,
        lat: 50.7374,
        lng: 7.0982,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Sanitätshaus Küffner GmbH",
        address: "Ohmstr. 6-8, 90443 Nürnberg (Steinbühl)",
        phone: "0911 44 72 88",
        rating: 4.3,
        reviews: 6,
        lat: 49.4521,
        lng: 11.0767,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Sanitätshaus Salgert GmbH",
        address: "Dürener Str. 186, 50931 Köln (Lindenthal)",
        phone: "0221 40 49 46",
        rating: 0,
        reviews: 0,
        lat: 50.9375,
        lng: 6.9603,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Schön & Endres GmbH & Co. KG",
        address: "Schustergasse 3, 97070 Würzburg (Altstadt)",
        phone: "0931 7 97 79-38",
        rating: 5.0,
        reviews: 1,
        lat: 49.7913,
        lng: 9.9534,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Werner",
        address: "Gathe 94, 42107 Wuppertal (Elberfeld)",
        phone: "0202 44 43 13",
        rating: 3.0,
        reviews: 7,
        lat: 51.2562,
        lng: 7.1508,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Sanitätshaus Samberger",
        address: "Landsberger Str. 203, 80687 München (Laim)",
        phone: "089 5 17 77 70",
        rating: 0,
        reviews: 0,
        lat: 48.1351,
        lng: 11.5820,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Sanitätshaus Langmann",
        address: "Rheinstr. 25, 76185 Karlsruhe",
        phone: "0721 2 01 80 24-0",
        rating: 4.2,
        reviews: 29,
        lat: 49.0069,
        lng: 8.4037,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Orthoforum Orthopädietechnik GmbH",
        address: "Neufarner Str. 1, 85586 Poing",
        phone: "08121 22 32 80",
        rating: 0,
        reviews: 0,
        lat: 48.1708,
        lng: 11.8186,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Orthopädiehaus Blaschke GmbH & Co. KG",
        address: "Coburger Str. 1 -7, 96515 Sonneberg",
        phone: "03675 8 92 40",
        rating: 0,
        reviews: 0,
        lat: 50.3592,
        lng: 11.1747,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "FEUERABEND",
        address: "Roßbachstr. 1, 44369 Dortmund (Huckarde)",
        phone: "0231 53 20 12-0",
        rating: 4.8,
        reviews: 124,
        lat: 51.5136,
        lng: 7.4653,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Mais reha team Das Sanitätshaus Aktuell",
        address: "Josef-Großwald-Weg 1, 94036 Passau (Haidenhof-Nord)",
        phone: "0851 98 82 80",
        rating: 5.0,
        reviews: 1,
        lat: 48.5665,
        lng: 13.4667,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Sanitätshaus mit Herz, Inh. R. Kadur",
        address: "Rentforter Str. 7, 45964 Gladbeck (Mitte)",
        phone: "02043 2 95 02-0",
        rating: 5.0,
        reviews: 1,
        lat: 51.5736,
        lng: 6.9859,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Doppler GmbH",
        address: "An der Römerbrücke 14-18, 66121 Saarbrücken (St Johann)",
        phone: "0681 30 98 90",
        rating: 3.0,
        reviews: 2,
        lat: 49.2373,
        lng: 6.9816,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Sanitätshaus Reiss GmbH",
        address: "Bahnhofstr. 2, 93128 Regenstauf",
        phone: "09402 50 01 88",
        rating: 5.0,
        reviews: 1,
        lat: 49.1204,
        lng: 12.1302,
        website: "https://www.gelbeseiten.de"
    },
    {
        name: "Bialas Orthopädietechnik",
        address: "Neuer Markt 33, 53340 Meckenheim",
        phone: "02225 1 80 20",
        rating: 4.8,
        reviews: 15,
        lat: 50.6239,
        lng: 7.0167,
        website: "https://www.gelbeseiten.de"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    loadSanitaetshausData();
    setupEventListeners();
});

// Initialize the map
function initializeMap() {
    // Create map centered on Germany
    map = L.map('map').setView([51.1657, 10.4515], 6);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
}

// Load and display Sanitätshaus data
function loadSanitaetshausData() {
    allLocations = [...sanitaetshausData];
    currentFilteredLocations = [...allLocations];
    
    // Add markers to map
    allLocations.forEach((location, index) => {
        addMarker(location, index);
    });
    
    // Update the location list
    updateLocationList();
    updateStats();
}

// Add a marker to the map
function addMarker(location, index) {
    const markerColor = getMarkerColor(location.rating);
    
    const marker = L.circleMarker([location.lat, location.lng], {
        radius: 8,
        fillColor: markerColor,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
    }).addTo(map);
    
    // Create popup content
    const popupContent = `
        <div style="min-width: 200px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">${location.name}</h3>
            <p style="margin: 5px 0; color: #666;"><strong>Adresse:</strong> ${location.address}</p>
            <p style="margin: 5px 0; color: #666;"><strong>Telefon:</strong> ${location.phone}</p>
            ${location.rating > 0 ? `
                <p style="margin: 5px 0; color: #666;">
                    <strong>Bewertung:</strong> 
                    <span style="color: #FFD700;">${'★'.repeat(Math.floor(location.rating))}${'☆'.repeat(5-Math.floor(location.rating))}</span>
                    ${location.rating}/5 (${location.reviews} Bewertungen)
                </p>
            ` : '<p style="margin: 5px 0; color: #999;">Keine Bewertungen verfügbar</p>'}
            <a href="${location.website}" target="_blank" style="color: #4CAF50; text-decoration: none; font-weight: 600;">Mehr Info</a>
        </div>
    `;
    
    marker.bindPopup(popupContent);
    
    // Store marker reference
    markers.push({
        marker: marker,
        location: location,
        index: index
    });
    
    // Add click event to highlight in list
    marker.on('click', function() {
        highlightLocationInList(index);
    });
}

// Get marker color based on rating
function getMarkerColor(rating) {
    if (rating >= 4) return '#4CAF50'; // Green for 4+ stars
    if (rating >= 3) return '#FF9800'; // Orange for 3+ stars
    if (rating > 0) return '#F44336';  // Red for under 3 stars
    return '#9E9E9E'; // Gray for no rating
}

// Update the location list sidebar
function updateLocationList() {
    const locationList = document.getElementById('locationList');
    locationList.innerHTML = '';
    
    currentFilteredLocations.forEach((location, index) => {
        const locationItem = document.createElement('div');
        locationItem.className = 'location-item';
        locationItem.onclick = () => {
            // Center map on this location
            map.setView([location.lat, location.lng], 13);
            // Open popup
            markers[index].marker.openPopup();
            // Highlight in list
            highlightLocationInList(index);
        };
        
        const ratingStars = location.rating > 0 
            ? '★'.repeat(Math.floor(location.rating)) + '☆'.repeat(5-Math.floor(location.rating))
            : 'Keine Bewertung';
        
        locationItem.innerHTML = `
            <div class="location-name">${location.name}</div>
            <div class="location-address">${location.address}</div>
            <div class="location-rating">
                <span class="rating-stars">${ratingStars}</span>
                ${location.rating > 0 ? `<span>(${location.rating}/5 - ${location.reviews} Bewertungen)</span>` : ''}
            </div>
            <div class="location-phone">📞 ${location.phone}</div>
        `;
        
        locationList.appendChild(locationItem);
    });
}

// Highlight location in the list
function highlightLocationInList(index) {
    // Remove previous highlights
    document.querySelectorAll('.location-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Add highlight to current item
    const locationItems = document.querySelectorAll('.location-item');
    if (locationItems[index]) {
        locationItems[index].classList.add('selected');
    }
}

// Update statistics
function updateStats() {
    const totalCount = document.getElementById('totalCount');
    totalCount.textContent = currentFilteredLocations.length;
}

// Search functionality
function searchLocation() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        currentFilteredLocations = [...allLocations];
    } else {
        currentFilteredLocations = allLocations.filter(location => 
            location.name.toLowerCase().includes(searchTerm) ||
            location.address.toLowerCase().includes(searchTerm) ||
            location.phone.includes(searchTerm)
        );
    }
    
    updateMarkers();
    updateLocationList();
    updateStats();
}

// Filter markers by rating
function filterMarkers() {
    const ratingFilter = document.getElementById('ratingFilter').value;
    
    if (ratingFilter === '') {
        currentFilteredLocations = [...allLocations];
    } else {
        const minRating = parseFloat(ratingFilter);
        currentFilteredLocations = allLocations.filter(location => 
            location.rating >= minRating
        );
    }
    
    updateMarkers();
    updateLocationList();
    updateStats();
}

// Update markers visibility based on filtered data
function updateMarkers() {
    // Hide all markers
    markers.forEach(markerObj => {
        markerObj.marker.remove();
    });
    
    // Clear markers array
    markers = [];
    
    // Add only filtered markers
    currentFilteredLocations.forEach((location, index) => {
        addMarker(location, index);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search input enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchLocation();
        }
    });
    
    // Rating filter change
    document.getElementById('ratingFilter').addEventListener('change', function() {
        filterMarkers();
    });
}

// Export functions for global access
window.searchLocation = searchLocation;
window.filterMarkers = filterMarkers; 
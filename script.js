// Global variables
let map;
let markers = [];
let allLocations = [];
let currentFilteredLocations = [];

// CSV data will be loaded here
let sanitaetshausData = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    loadCSVData();
    setupEventListeners();
});

// Load data from CSV file
function loadCSVData() {
    Papa.parse('data/sanitaetshaeuser.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            if (results.errors.length > 0) {
                console.error('CSV parsing errors:', results.errors);
                return;
            }
            
            // Convert CSV data to the format expected by the app
            sanitaetshausData = results.data.map(row => ({
                name: row.name,
                address: row.address,
                phone: row.phone,
                rating: parseFloat(row.rating) || 0,
                reviews: parseInt(row.reviews) || 0,
                lat: parseFloat(row.lat),
                lng: parseFloat(row.lng),
                website: row.website
            }));
            
            // Load the data into the app
            loadSanitaetshausData();
        },
        error: function(error) {
            console.error('Error loading CSV:', error);
            // Fallback to empty data
            sanitaetshausData = [];
            loadSanitaetshausData();
        }
    });
}

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
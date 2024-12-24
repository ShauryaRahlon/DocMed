import React, { useEffect, useState } from 'react';
import '../Styling/Map.css';

const Map = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 }); // Default location
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [destination, setDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const apiKey = "AlzaSysctiLlgQwq9tMknNHDZfql8yJotgwPRlZ";

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error fetching user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Initialize the map
  useEffect(() => {
    const initializeMap = () => {
      const newMap = new google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 14,
      });
      // Add a unique marker for the user's location
      new google.maps.Marker({
        position: userLocation,
        map: newMap,
        title: "Your Unique Location",
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // Custom icon URL
          scaledSize: new google.maps.Size(30, 30), // Adjust size
        },
      });
      setMap(newMap);
      // Initialize DirectionsService and DirectionsRenderer
      const directionsServiceInstance = new google.maps.DirectionsService();
      const directionsRendererInstance = new google.maps.DirectionsRenderer();
      directionsRendererInstance.setMap(newMap);
      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);

      // Initialize Autocomplete
      const input = document.getElementById('search-box');
      const autocompleteInstance = new google.maps.places.Autocomplete(input);
      autocompleteInstance.setFields(['place_id', 'geometry', 'name']);
      autocompleteInstance.addListener('place_changed', () => {
        const place = autocompleteInstance.getPlace();
        if (place.geometry) {
          setDestination(place.geometry.location);
          setSearchQuery(autocompleteInstance.getPlace().name);

        }
      });
      setAutocomplete(autocompleteInstance);
    };

    const script = document.createElement('script');
    script.src = `https://maps.gomaps.pro/maps/api/js?key=${apiKey}&libraries=places`;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [userLocation, apiKey]);

  // Fetch nearby places using Google Places API
  const fetchNearbyPlaces = (type = 'hospitals', radius = 1500) => {
    const { lat, lng } = userLocation;

    const url = `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          setPlaces(data.results);
          if (map) {
            const markers = [];
            const infoWindows = [];
            // Add markers to the map
            data.results.forEach((place) => {
              const marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name,
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',



                //  // Blue icon for places
              });
              // Create an info window for the place
              const infoWindow = new google.maps.InfoWindow({
                content: `<h3>${place.name}</h3><p>${place.vicinity}</p>`, // Display name and vicinity
              });

              // Show the info window when the user hovers over the marker
              marker.addListener('mouseover', () => {
                infoWindow.open(map, marker);
              });

              // Close the info window when the mouse leaves the marker
              marker.addListener('mouseout', () => {
                infoWindow.close();
              });

              // Add click listener to open the URL for the place
              marker.addListener('click', () => {
                window.location.href = `http://localhost:5173/doctorlisting`;
              });

              // Store the marker and infoWindow to manage them later (if needed)
              markers.push(marker);
              infoWindows.push(infoWindow);

              // Add info window for each marker
            });


            // Adjust map bounds to show all places
            const bounds = new google.maps.LatLngBounds();
            data.results.forEach((place) => bounds.extend(place.geometry.location));
            map.fitBounds(bounds);
          }
        } else {
          console.error('Error fetching nearby places:', data.status);
        }
      })
      .catch((error) => {
        console.error('Error making API call:', error);
      });
  };
  const calculateAndDisplayRoute = () => {
    if (!destination) {
      alert('Please select a valid place from the suggestions.');
      return;
    }

    const request = {
      origin: userLocation,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className='map-nav'>
      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
        <button
          onClick={() => fetchNearbyPlaces('hospital', 5000)}
          style={{
            margin: '5px',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Find Nearby Hospitals (5km)
        </button>
        <button
          onClick={() => fetchNearbyPlaces('hospital', 15000)}
          style={{
            margin: '5px',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#28A745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Find Nearby Hospitals (15km)
        </button>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input
            id="search-box"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for places..."
            style={{
              margin: '5px',
              padding: '10px',
              fontSize: '16px',
              width: '300px',
              borderRadius: '5px',
              paddingLeft: '30px', // For search icon
            }}
          />
          <span
            onClick={calculateAndDisplayRoute}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          >
            🔍
          </span>
        </div>
      </div>
      <div id="map" style={{ height: '70vh', width: '100%' }}></div>
      <div style={{ padding: '10px' }}>
        <h3>Nearby Places:</h3>
        <ul>
          {places.map((place) => (
            <li key={place.place_id}>
              <strong>{place.name}</strong> - {place.vicinity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;

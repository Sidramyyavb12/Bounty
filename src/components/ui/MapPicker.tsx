// src/components/ui/MapPicker.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { LatLngLiteral } from "leaflet";
import axios from "axios";

// -----------------------------
// Draggable Marker Component
// -----------------------------
function DraggableMarker({
  position,
  onDragEnd,
}: {
  position: LatLngLiteral;
  onDragEnd: (latlng: LatLngLiteral) => void;
}) {
  const markerRef = useRef<any>(null);

  return (
    <Marker
      draggable
      eventHandlers={{
        dragend() {
          const marker = markerRef.current;
          if (marker) {
            const latlng = marker.getLatLng();
            onDragEnd({ lat: latlng.lat, lng: latlng.lng });
          }
        },
      }}
      position={position}
      ref={markerRef}
    />
  );
}

// -----------------------------
// Recenter map on input change
// -----------------------------
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
}

// -----------------------------
// Main Component
// -----------------------------
type Props = {
  lat?: number;
  lng?: number;
  radiusKm?: number;
  onChange?: (payload: {
    lat: number;
    lng: number;
    radiusKm: number;
  }) => void;
  height?: string;
};

export default function MapPicker({
  lat = 12.9716,
  lng = 77.5946,
  radiusKm = 5,
  onChange,
  height = "260px",
}: Props) {
  const [position, setPosition] = useState<LatLngLiteral>({ lat, lng });
  const [radius, setRadius] = useState(radiusKm * 1000);

  // Search bar state
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sync props → state
  useEffect(() => {
    setPosition({ lat, lng });
  }, [lat, lng]);

  useEffect(() => {
    setRadius(radiusKm * 1000);
  }, [radiusKm]);

  // Return new values to parent
  useEffect(() => {
    onChange &&
      onChange({
        lat: position.lat,
        lng: position.lng,
        radiusKm: radius / 1000,
      });
  }, [position, radius]);

  // Handle map clicks
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  }

  // Auto-complete search
const searchLocation = async (text: string) => {
  setQuery(text);

  if (text.length < 3) {
    setSuggestions([]);
    return;
  }

  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(
        text
      )}`
    );

    setSuggestions(res.data);
    setShowSuggestions(true);
  } catch (err) {
    console.error("Search error:", err);
  }
};


  const handleSuggestionClick = (s: any) => {
    const newLat = parseFloat(s.lat);
    const newLng = parseFloat(s.lon);

    setPosition({ lat: newLat, lng: newLng });
    setQuery(s.display_name);
    setShowSuggestions(false);
  };

  const center = useMemo(
    () => [position.lat, position.lng] as [number, number],
    [position]
  );

  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "16px",
        border: "1px solid #E6E6E6",
        background: "#FFF",
      }}
    >
      {/* --------------------
          SEARCH BAR
      -------------------- */}
      <div style={{ position: "relative" }}>
        <div className="input-group mb-3">
          <span className="input-group-text bg-white">
            <i className="bi bi-geo-alt"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search location..."
            value={query}
            onChange={(e) => searchLocation(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            style={{ borderRadius: "8px" }}
          />
        </div>

        {/* Suggestions Box */}
        {showSuggestions && suggestions.length > 0 && (
          <ul
            className="list-group"
            style={{
              position: "absolute",
              top: "58px",
              width: "100%",
              zIndex: 10,
              maxHeight: "200px",
              overflowY: "auto",
              borderRadius: "10px",
            }}
          >
            {suggestions.map((s) => (
              <li
                key={s.place_id}
                className="list-group-item list-group-item-action"
                style={{ cursor: "pointer" }}
                onClick={() => handleSuggestionClick(s)}
              >
                {s.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --------------------
          MAP VIEW
      -------------------- */}
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #E6E6E6",
          width: "100%",
        }}
      >
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height, width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler />
          <RecenterMap lat={position.lat} lng={position.lng} />

          <DraggableMarker
            position={position}
            onDragEnd={(latlng) => setPosition(latlng)}
          />

          <Circle
            center={position}
            radius={radius}
            pathOptions={{ color: "#3b82f6", fillOpacity: 0.15 }}
          />
        </MapContainer>
      </div>

      {/* --------------------
          LAT / LNG + RADIUS
      -------------------- */}
      <div className="d-flex gap-3 align-items-center mt-3">
        <div style={{ minWidth: 200 }}>
          <label className="form-label fw-semibold small">
            Marker Position (Lat, Lng)
          </label>

          <div className="d-flex gap-2">
            <input
              className="form-control"
              type="number"
              value={position.lat}
              onChange={(e) =>
                setPosition((p) => ({ ...p, lat: parseFloat(e.target.value) }))
              }
              style={{ borderRadius: 10, height: 40 }}
            />

            <input
              className="form-control"
              type="number"
              value={position.lng}
              onChange={(e) =>
                setPosition((p) => ({ ...p, lng: parseFloat(e.target.value) }))
              }
              style={{ borderRadius: 10, height: 40 }}
            />
          </div>
        </div>

        <div style={{ minWidth: 200 }}>
          <label className="form-label fw-semibold small">
            Radius (KM)
          </label>

          <input
            type="number"
            className="form-control"
            value={(radius / 1000).toFixed(2)}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!isNaN(v)) setRadius(v * 1000);
            }}
            min={0}
            step="0.1"
            style={{ borderRadius: 10, height: 40 }}
          />
        </div>

        <div className="ms-auto small text-muted">
          Tip: Click map or drag marker to change location
        </div>
      </div>
    </div>
  );
}

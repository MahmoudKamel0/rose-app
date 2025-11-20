"use client";

import PageLoader from "@components/shared/page-loader";
import { Button } from "@components/ui/button";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MapPinHouse } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useCallback, useRef, useState } from "react";

// Types
type Props = {
    initial?: { lat: number; lng: number };
    onChange?: (coords: { lat: number; lng: number }) => void;
};

const centerDefault = { lat: 30.0444, lng: 31.2357 }; // Cairo fallback

export default function MapCard({ initial, onChange }: Props) {
    // Transaltions
    const t = useTranslations("address-step-2");
    // Use state
    const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(initial ?? null);

    // Use Ref
    const mapRef = useRef<google.maps.Map | null>(null);
    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    // Hooks
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries: ["places"],
    });

    // Functions
    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const coords = { lat, lng };
        setMarker(coords);
        onChange?.(coords);
    };

    const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return;
        const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        setMarker(coords);
        onChange?.(coords);
    };

    const findMyLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported in this browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                setMarker(coords);
                onChange?.(coords);
                mapRef.current?.panTo(coords);
                mapRef.current?.setZoom(16);
            },
            () => {
                alert("Unable to get your location. Check permissions.");
            }
        );
    };

    return (
        <div>
            {loadError && <div>Error loading maps</div>}
            {!isLoaded && <PageLoader />}

            {!loadError && isLoaded && (
                <div className="relative rounded-md">
                    {/* Find My Location button */}
                    <Button onClick={findMyLocation} variant={"location"} className="absolute right-3 top-3 z-10">
                        <MapPinHouse size={20} className="text-maroon-600 dark:text-softpink-200" /> {t("find-map")}
                    </Button>

                    {/* Map */}
                    <div className="mt-8 rounded-md">
                        <GoogleMap
                            mapContainerClassName="rounded-md w-full h-96"
                            center={marker ?? centerDefault}
                            zoom={marker ? 15 : 12}
                            onLoad={onMapLoad}
                            onClick={handleMapClick}
                            options={{
                                streetViewControl: false,
                                mapTypeControl: false,
                                fullscreenControl: false,
                            }}
                        >
                            {marker && <Marker position={marker} draggable onDragEnd={handleMarkerDragEnd} />}
                        </GoogleMap>
                    </div>
                </div>
            )}

            {/* Footer controls */}
        </div>
    );
}

import { useState, useEffect, ChangeEvent } from "react";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LuMapPinned } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";
import tracking from '../assets/images/tracking.png';
import { useQuery } from "@tanstack/react-query";
import { getShipmentById } from "../services/EventsApi";
import { formatOrderDate, Loader } from "../helpers/Functions";
import { motion } from "motion/react";

const mockData = {
  trackingNumber: "TRK001",
  currentLocation: {
    latitude: 37.7749,
    longitude: -122.4194,
  },
  routeHistory: [
    {
      latitude: 34.0522,
      longitude: -118.2437,
      timestamp: "2025-01-01T10:00:00Z",
    },
    {
      latitude: 36.7783,
      longitude: -119.4179,
      timestamp: "2025-01-02T14:00:00Z",
    },
  ],
  statusTimeline: [
    {
      status: "Shipped",
      timestamp: "2025-01-01T09:00:00Z",
    },
    {
      status: "In Transit",
      timestamp: "2025-01-01T12:00:00Z",
    },
    {
      status: "Out for Delivery",
      timestamp: "2025-01-03T08:00:00Z",
    },
  ],
  id: "3302",
};

const Tracking: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [track, setTrack] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get('TrackItem') || '');
  const [shipment, setShipment] = useState(mockData);

  const { data, isLoading } = useQuery({
    queryKey: ['shipments-details'],
    queryFn: () => getShipmentById(searchValue),
  });

  const { currentLocation, trackingNumber, statusTimeline, routeHistory } = shipment;

  useEffect(() => {
    if (data) {
      setShipment(data);
    }
  }, [data]);

  const defaultProps = {
    center: {
      lat: currentLocation.latitude || 0,
      lng: currentLocation.longitude || 0,
    },
    zoom: 10,
  };

  const [mapProps, setMapProps] = useState(defaultProps);

  const handlePointClick = (latitude: number, longitude: number) => {
    setMapProps({ center: { lat: latitude, lng: longitude }, zoom: 14 });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    setTrack(true);
  };

  // WebSocket integration
  useEffect(() => {
    if (!track) return;

    let ws = new WebSocket('wss://localhost:5173');

    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({ action: 'subscribe', trackingNumber: searchValue }));
    };

    ws.onmessage = (event) => {
      const updatedData = JSON.parse(event.data);
      setShipment((prev) => ({
        ...prev,
        currentLocation: updatedData.currentLocation,
        statusTimeline: updatedData.statusTimeline,
        routeHistory: updatedData.routeHistory,
      }));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Automatically reconnect after 30 seconds
    const interval = setInterval(() => {
      if (ws.readyState !== WebSocket.OPEN) {
        ws.close();
        ws = new WebSocket('wss://your-server-url');
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      ws.close();
    };
  }, [track, searchValue]);

  return (
    <section>
      {/* Input field and button */}
      <div className="top-menu flex gap-7 items-center mb-20">
        <div className="input w-full b-black rounded-md bg-white flex px-10 py-2 gap-8 items-center">
          <input
            className="text-2xl h-[3.75rem] w-full text-[#424656]"
            type="text"
            placeholder="Enter Tracking Number"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="flex-1 flex items-center gap-3 px-7 py-6 rounded-md h-fit cursor-pointer bg-slate-400"
          onClick={handleSearchClick}
        >
          <LuMapPinned size={15} />
          <p className="text-xl font-medium">Track</p>
        </button>
      </div>

      {isLoading && <Loader white={false} />}

      {track ? (
        <>
          {/* Current Tracking Section */}
          <div className="current-tracking">
            <div className="flex items-center gap-5 mb-10">
              <button
                className="flex items-center gap-1"
                onClick={() => {
                  navigate("/tracking");
                  setTrack(false);
                  setSearchValue("");
                }}
              >
                <IoMdArrowRoundBack size={20} title="Back to Tracking" className="pointy-cursor" />
                <p className="text-2xl">Back</p>
              </button>
            </div>
            <div className="track-details flex gap-5">
              {/* Map */}
              <div className="bg-[#d7d7d7] w-1/2 flex-1 flex justify-center items-center">
                <div style={{ height: "50vh", width: "100%" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAP_API_KEY || "" }}
                    center={mapProps.center}
                    zoom={mapProps.zoom}
                  >
                    {routeHistory.map((point, index) => (
                      <AnyReactComponent
                        key={index}
                        lat={point.latitude}
                        lng={point.longitude}
                        text={<FaMapMarkerAlt color="#0059ac" size={20} />}
                        onClick={() => handlePointClick(point.latitude, point.longitude)}
                      />
                    ))}
                  </GoogleMapReact>
                </div>
              </div>
              {/* Shipment Details */}
              <div className="map-details w-[40rem] bg-white py-4 px-7 h-fit">
                <h2 className="text-2xl font-medium text-sec mb-10">Package Info</h2>
                <div className="flex items-center gap-5 mb-5">
                  <p className="text-[#919191] text-xl">Tracking Number:</p>
                  <h2 className="text-sec font-semibold text-xl">{trackingNumber}</h2>
                </div>
              </div>
            </div>
          </div>
          {/* Status Timeline */}
          <div className="tracking-status mt-20">
            <h2 className="text-2xl text-sec font-medium mb-10">Tracking Status</h2>
            <div className="status ml-16">
              {statusTimeline.map((el, ind) => {
                const date = formatOrderDate(el.timestamp);
                const time = formatOrderDate(el.timestamp);
                return (
                  <TrackStatus
                    key={ind}
                    status={el.status}
                    location="San Francisco, CA"
                    date={date}
                    time={time}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mt-56 flex-col gap-10">
          <p className="text-2xl font-semibold">Order Tracking - Stay in the Loop!</p>
          <div className="">
            <img src={tracking} alt="Map" className="w-full" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Tracking;

const AnyReactComponent = ({
  text,
  onClick,
}: {
  text: React.ReactNode;
  lat: number;
  lng: number;
  onClick: () => void;
}) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className="pointy-cursor"
    onClick={onClick}
  >
    {text}
  </motion.div>
);

const TrackStatus: React.FC<{ status: string; date: string; time: string; location: string }> = ({ status, date, time, location }) => (
  <div className="flex gap-24 items-center mb-16">
    <div className="point">
      <div className="line"></div>
    </div>
    <div>
      <h2 className="text-2xl text-sec font-medium mb-5">{status}</h2>
      <p className="text-xl font-light flex items-center gap-3">{location}</p>
    </div>
    <h2 className="text-[1.3rem] text-sec font-semibold">
      <span>{date}</span>, <span>{time}</span>
    </h2>
  </div>
);

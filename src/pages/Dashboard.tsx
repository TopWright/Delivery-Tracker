import { useNavigate, useSearchParams } from "react-router-dom";
import CustomDataTable from "../components/CustomTable";
import { useQuery } from "@tanstack/react-query";
import { getShipments } from "../services/EventsApi";
import { GrMapLocation } from "react-icons/gr";
import { shipmentData } from "../helpers/Constants";
import { formatOrderDate } from "../helpers/Functions";

// Define types for data
interface ShipmentStatus {
  status: string;
  timestamp: string;
}

interface Shipment {
  id: number;
  trackingNumber: string;
  statusTimeline: ShipmentStatus[];
}

const Dashboard: React.FC = () => {
  const setSearchParams = useSearchParams()[1]; // Fixed to get the correct searchParams
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["shipments"],
    queryFn: getShipments,
  });

  const columns = [
    {
      name: "SN",
      selector: (_: Shipment, rowIndex?: number) => (rowIndex !== undefined ? rowIndex + 1 : 0),
      width: "100px",
    },
    {
      name: "Tracking Number",
      selector: (row: Shipment) => row.trackingNumber,
    },
    {
      name: "Status Timeline",
      selector: (row: Shipment) => (
        <div className="text-sm">
          {row.statusTimeline?.length > 0
            ? row.statusTimeline.map((status, index) => (
              <div key={index} className="mb-1">
                <span className="font-bold text-2xl">{status.status}: </span>
                <span className="font-medium text-xl">
                  {formatOrderDate(status.timestamp)}
                </span>
              </div>
            ))
            : "No status available"}
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row: Shipment) => (
        <div className="flex gap-7">
          <GrMapLocation
            size={23}
            title="Track Item"
            onClick={() => {
              navigate("/tracking");
              setSearchParams({ TrackItem: row.id.toString() });
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <CustomDataTable
        column={columns}
        data={data || shipmentData} // Use fallback data when API call is not complete
        pointerOnHover
        highlightOnHover
        progressPending={isLoading}
      />
    </div>
  );
};

export default Dashboard;

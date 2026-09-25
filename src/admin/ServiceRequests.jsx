import LeadsTable from "./components/LeadsTable";

const columns = [
  { key: "customer_name", label: "Customer" },
  { key: "phone", label: "Phone" },
  { key: "service_type", label: "Service" },
  { key: "location", label: "Location" },
];

export default function ServiceRequests() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-1">Service Requests</h1>
      <p className="text-sm text-navy-700/60 mb-6">Leads submitted for AC servicing.</p>
      <LeadsTable table="service_requests" columns={columns} />
    </div>
  );
}

import LeadsTable from "./components/LeadsTable";

const columns = [
  { key: "customer_name", label: "Customer" },
  { key: "phone", label: "Phone" },
  { key: "service_type", label: "Service" },
  { key: "ac_type", label: "AC Type" },
  { key: "capacity", label: "Capacity" },
  { key: "location", label: "Location" },
];

export default function QuoteRequests() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-1">Quote Requests</h1>
      <p className="text-sm text-navy-700/80 mb-6">Leads submitted through the Request a Quote form.</p>
      <LeadsTable table="quote_requests" columns={columns} />
    </div>
  );
}

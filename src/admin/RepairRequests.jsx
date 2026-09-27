import LeadsTable from "./components/LeadsTable";

const columns = [
  { key: "customer_name", label: "Customer" },
  { key: "phone", label: "Phone" },
  { key: "brand", label: "Brand" },
  { key: "problem", label: "Problem" },
  { key: "location", label: "Location" },
];

export default function RepairRequests() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-1">Repair Requests</h1>
      <p className="text-sm text-navy-700 mb-6">Leads submitted through the Book AC Repair form.</p>
      <LeadsTable table="repair_requests" columns={columns} />
    </div>
  );
}

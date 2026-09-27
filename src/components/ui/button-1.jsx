import { LoaderCircle } from "lucide-react";

export default function Button({ loading = false, disabled = false, className = "", children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
import { useEffect, useState } from "react";
import { CheckCircle2, CircleAlert, X } from "lucide-react";

let nextToastId = 0;

function notify(type, message) {
  window.dispatchEvent(new CustomEvent("app-toast", {
    detail: { id: ++nextToastId, type, message },
  }));
}

export const toast = {
  success: (message) => notify("success", message),
  error: (message) => notify("error", message),
};

export function ToastViewport() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    function addToast(event) {
      const item = event.detail;
      setItems((current) => [...current, item]);
      window.setTimeout(() => {
        setItems((current) => current.filter(({ id }) => id !== item.id));
      }, 5000);
    }

    window.addEventListener("app-toast", addToast);
    return () => window.removeEventListener("app-toast", addToast);
  }, []);

  return (
    <div className="fixed right-4 top-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2" aria-live="polite">
      {items.map(({ id, type, message }) => {
        const Icon = type === "success" ? CheckCircle2 : CircleAlert;
        return (
          <div
            key={id}
            role={type === "error" ? "alert" : "status"}
            className={`flex items-start gap-3 border bg-white p-3 text-sm shadow-lg ${type === "success" ? "border-green-300 text-green-800" : "border-red-300 text-red-800"}`}
          >
            <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p className="min-w-0 flex-1 break-words">{message}</p>
            <button
              type="button"
              className="shrink-0 opacity-70 hover:opacity-100"
              onClick={() => setItems((current) => current.filter((item) => item.id !== id))}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
import { useState } from "react";

function getOptimizedSource(src, width, quality, format) {
  if (!src) return src;

  try {
    const url = new URL(src);
    if (!url.pathname.includes("/storage/v1/object/public/")) return src;

    url.pathname = url.pathname.replace(
      "/storage/v1/object/public/",
      "/storage/v1/render/image/public/"
    );
    url.searchParams.set("width", String(width));
    url.searchParams.set("format", format);
    url.searchParams.set("quality", String(quality));
    return url.toString();
  } catch {
    return src;
  }
}

export default function OptimizedImage({
  src,
  alt = "",
  width = 800,
  height = 600,
  loading = "lazy",
  fetchPriority,
  decoding = "async",
  quality = 80,
  format = "webp",
  className = "",
  frameClassName = "w-full",
  onLoad,
  onError,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const imageSrc = getOptimizedSource(src, width, quality, format);

  function handleLoad(event) {
    setLoaded(true);
    onLoad?.(event);
  }

  function handleError(event) {
    setLoaded(true);
    onError?.(event);
  }

  return (
    <span
      className={`relative isolate block overflow-hidden bg-silver-100 ${frameClassName}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 bg-silver-200 transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`}
      />
      <img
        {...props}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority || (loading === "eager" ? "high" : "auto")}
        onLoad={handleLoad}
        onError={handleError}
        className={`relative block h-full w-full object-cover transition-[filter,opacity] duration-500 ${loaded ? "blur-0 opacity-100" : "blur-md opacity-70"} ${className}`}
      />
    </span>
  );
}
import { Link } from "react-router-dom";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
  ghost: "text-navy-900 hover:bg-silver-100",
  whatsapp: "bg-[#15803d] text-white hover:bg-[#166534]",
};

export default function Button({ as, to, href, variant = "primary", className = "", children, ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold tracking-wide transition-colors ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

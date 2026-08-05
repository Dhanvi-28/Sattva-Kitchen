import { classNames } from "../../utils/helpers.js";

/**
 * Renders a real image when `src` is provided; otherwise renders a
 * deliberate placeholder block (no fake stock photography) so layouts
 * stay legible before real content/images are wired up.
 *
 * @param {string} [src]
 * @param {string} alt - required; ignored visually when no src
 * @param {"square"|"landscape"|"portrait"|"wide"} ratio
 */
const RATIOS = {
  square: "1 / 1",
  landscape: "4 / 3",
  portrait: "3 / 4",
  wide: "16 / 9",
};

const PlaceholderIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 16l5-4.5 4 3 3.5-3L21 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ImagePlaceholder = ({ src, alt = "", ratio = "landscape", className, children }) => (
  <div
    className={classNames("image-frame", className)}
    style={{ aspectRatio: RATIOS[ratio] || RATIOS.landscape }}
  >
    {src ? (
      <img src={src} alt={alt} className="image-frame-img" />
    ) : (
      <div className="image-frame-empty">
        <PlaceholderIcon />
      </div>
    )}
    {children}
  </div>
);

export default ImagePlaceholder;

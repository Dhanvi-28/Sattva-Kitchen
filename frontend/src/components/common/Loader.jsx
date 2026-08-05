/**
 * Shared loading indicator used anywhere data is being fetched.
 */
const Loader = ({ label = "Loading..." }) => (
  <div className="loader" role="status" aria-live="polite">
    <span className="loader-spinner" aria-hidden="true" />
    <span className="loader-label">{label}</span>
  </div>
);

export default Loader;

/**
 * Linear progress indicator — used for quiz step progress.
 * @param {number} value - 0 to 100
 * @param {string} [label] - accessible label, e.g. "Question 2 of 5"
 */
const ProgressBar = ({ value = 0, label }) => (
  <div className="progress-bar" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
    <div className="progress-bar-track">
      <div className="progress-bar-fill" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
    {label && <span className="progress-bar-label">{label}</span>}
  </div>
);

export default ProgressBar;

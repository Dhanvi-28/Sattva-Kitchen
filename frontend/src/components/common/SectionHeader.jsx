/**
 * Serif section title + optional trailing action (pagination arrows,
 * a "See all" link, etc.) — the recurring heading pattern from the
 * reference ("Categories", "Popular products", "New items").
 *
 * @param {string} title
 * @param {string} [subtitle]
 * @param {React.ReactNode} [action]
 */
const SectionHeader = ({ title, subtitle, action }) => (
  <div className="section-header">
    <div>
      <h2 className="display-heading section-header-title">{title}</h2>
      {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
    </div>
    {action && <div className="section-header-action">{action}</div>}
  </div>
);

export default SectionHeader;

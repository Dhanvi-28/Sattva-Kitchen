import { classNames } from "../../utils/helpers.js";

/**
 * Shimmer placeholder for content still loading. Use instead of
 * spinners when the final layout shape is already known (cards, text
 * lines) so the page doesn't jump once data arrives.
 */
const Skeleton = ({ className, style }) => (
  <div className={classNames("skeleton", className)} style={style} aria-hidden="true" />
);

export default Skeleton;

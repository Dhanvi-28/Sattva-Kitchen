import { classNames } from "../../utils/helpers.js";

/**
 * Base card surface: white background, soft shadow, rounded corners.
 * Feature cards (RecipeCard, CategoryCard, etc.) build on top of this.
 */
const Card = ({ children, className, as: As = "div", ...props }) => (
  <As className={classNames("card", className)} {...props}>
    {children}
  </As>
);

export default Card;

import { classNames } from "../../utils/helpers.js";

/**
 * Base button primitive — pill-shaped, matching the reference's
 * gold "Add to cart" CTA styling. Compose this everywhere instead
 * of styling raw <button> elements.
 *
 * @param {"primary"|"secondary"|"ghost"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {boolean} fullWidth
 */
const VARIANTS = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  ghost: "btn btn-ghost",
};

const SIZES = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  as: As = "button",
  ...props
}) => {
  return (
    <As
      className={classNames(
        VARIANTS[variant] || VARIANTS.primary,
        SIZES[size] || SIZES.md,
        fullWidth && "btn-full",
        className
      )}
      {...props}
    >
      {children}
    </As>
  );
};

export default Button;

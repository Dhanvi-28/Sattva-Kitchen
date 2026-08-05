import { Link } from "react-router-dom";
import ImagePlaceholder from "../common/ImagePlaceholder.jsx";
import Badge from "../common/Badge.jsx";

/**
 * Recipe category tile — image with an overlay label, mirroring the
 * reference's "Categories" cards.
 *
 * @param {{ id: string|number, name: string, imageUrl?: string, to?: string }} category
 */
const CategoryCard = ({ category, onClick }) => {
  const content = (
    <>
      <ImagePlaceholder src={category.imageUrl} alt={category.name} ratio="landscape">
        <Badge variant="overlay" tone="olive">{category.name}</Badge>
      </ImagePlaceholder>
    </>
  );

  if (category.to) {
    return (
      <Link to={category.to} className="category-card" onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className="category-card category-card-button" onClick={onClick}>
      {content}
    </button>
  );
};

export default CategoryCard;

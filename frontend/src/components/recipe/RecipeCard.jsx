import { Link } from "react-router-dom";
import Card from "../common/Card.jsx";
import ImagePlaceholder from "../common/ImagePlaceholder.jsx";
import IconButton from "../common/IconButton.jsx";
import Badge from "../common/Badge.jsx";
import Button from "../common/Button.jsx";
import HeartIcon from "./HeartIcon.jsx";

/**
 * Recipe summary card — image, save toggle, title, quick meta tags,
 * and a CTA. Used in grids on the Dashboard and Recipe Results pages.
 *
 * @param {{
 *   id: string|number,
 *   title: string,
 *   imageUrl?: string,
 *   time?: string,        // e.g. "25 min"
 *   difficulty?: string,  // e.g. "Easy"
 *   tags?: string[],      // e.g. ["Vegan", "Gluten-free"]
 *   isNew?: boolean,
 * }} recipe
 * @param {boolean} [saved]
 * @param {function} [onToggleSave]
 * @param {string} [detailsPath] - route to the recipe details page
 */
const RecipeCard = ({ recipe, saved = false, onToggleSave, detailsPath }) => {
  return (
    <Card className="recipe-card">
      <div className="recipe-card-media">
        <ImagePlaceholder src={recipe.imageUrl} alt={recipe.title} ratio="landscape">
          {recipe.isNew && (
            <Badge variant="overlay" tone="olive" className="recipe-card-new-badge">
              New
            </Badge>
          )}
        </ImagePlaceholder>
        <IconButton
          icon={<HeartIcon filled={saved} />}
          label={saved ? "Remove from saved recipes" : "Save recipe"}
          active={saved}
          onClick={() => onToggleSave?.(recipe.id)}
          className="recipe-card-save"
        />
      </div>

      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{recipe.title}</h3>

        {(recipe.time || recipe.difficulty || recipe.tags?.length > 0) && (
          <div className="recipe-card-meta">
            {recipe.time && <Badge tone="cream">{recipe.time}</Badge>}
            {recipe.difficulty && <Badge tone="cream">{recipe.difficulty}</Badge>}
            {recipe.tags?.map((tag) => (
              <Badge tone="cream" key={tag}>{tag}</Badge>
            ))}
          </div>
        )}

        <Button as={Link} to={detailsPath || "#"} variant="primary" size="sm" fullWidth>
          View recipe
        </Button>
      </div>
    </Card>
  );
};

export default RecipeCard;

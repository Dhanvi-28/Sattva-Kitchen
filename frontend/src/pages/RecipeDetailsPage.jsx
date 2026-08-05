import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImagePlaceholder from "../components/common/ImagePlaceholder.jsx";
import Badge from "../components/common/Badge.jsx";
import Button from "../components/common/Button.jsx";
import IconButton from "../components/common/IconButton.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import { IngredientList, StepList, RecipeMetaBar, HeartIcon } from "../components/recipe/index.js";

const BookOpenIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 6.5C10 5 6.5 4.5 3.5 5.2v13c3-.7 6.5-.2 8.5 1.3 2-1.5 5.5-2 8.5-1.3v-13C17.5 4.5 14 5 12 6.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M12 6.5v13.5" stroke="currentColor" strokeWidth="1.6"/></svg>
);
const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.6"/><circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6"/><circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M8.3 10.7l7.4-4.4M8.3 13.3l7.4 4.4" stroke="currentColor" strokeWidth="1.6"/></svg>
);

/**
 * Recipe Details — full view for a single recipe. Reads :recipeId from
 * the route, but has no backend to fetch from, so the actual recipe
 * object must be supplied via the `recipe` prop until data fetching is
 * wired up. Expected shape:
 *
 *   recipe = {
 *     id, title, imageUrl?, tags?: string[],
 *     stats?: [{ label, value }],           // e.g. Prep time / 20 min
 *     ingredients?: [{ id, label, quantity? }],
 *     steps?: [{ id, text }],
 *   }
 */
const RecipeDetailsPage = ({ recipe, saved = false, onToggleSave }) => {
  const { recipeId } = useParams();
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());
  const [isSaved, setIsSaved] = useState(saved);

  const toggleIngredient = (id) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleToggleSave = () => {
    setIsSaved((v) => !v);
    onToggleSave?.(recipeId);
  };

  if (!recipe) {
    return (
      <div className="container section">
        <EmptyState
          icon={<BookOpenIcon />}
          title="Recipe not loaded"
          description={`No recipe data was provided for id "${recipeId}". Pass a \`recipe\` prop into RecipeDetailsPage to render its content.`}
          action={{ label: "Back to results", to: "/recipes" }}
        />
      </div>
    );
  }

  return (
    <div className="container section">
      <div className="recipe-details-hero">
        <div>
          {recipe.tags?.length > 0 && (
            <div className="recipe-details-tags">
              {recipe.tags.map((tag) => (
                <Badge tone="cream" key={tag}>{tag}</Badge>
              ))}
            </div>
          )}
          <h1 className="display-heading recipe-details-title">{recipe.title}</h1>
          {recipe.description && <p className="body-text">{recipe.description}</p>}

          {recipe.stats?.length > 0 && <RecipeMetaBar stats={recipe.stats} />}

          <div className="recipe-details-actions">
            <Button variant="primary" onClick={handleToggleSave}>
              <HeartIcon filled={isSaved} />
              {isSaved ? "Saved" : "Save recipe"}
            </Button>
            <IconButton icon={<ShareIcon />} label="Share recipe" />
          </div>
        </div>

        <ImagePlaceholder src={recipe.imageUrl} alt={recipe.title} ratio="square" />
      </div>

      <div className="details-columns">
        <div>
          <h2 className="display-heading details-section-title">Ingredients</h2>
          {recipe.ingredients?.length > 0 ? (
            <IngredientList
              ingredients={recipe.ingredients}
              checked={checkedIngredients}
              onToggle={toggleIngredient}
            />
          ) : (
            <EmptyState title="No ingredients listed" description="Add an `ingredients` array to this recipe." />
          )}
        </div>

        <div>
          <h2 className="display-heading details-section-title">Instructions</h2>
          {recipe.steps?.length > 0 ? (
            <StepList steps={recipe.steps} />
          ) : (
            <EmptyState title="No steps listed" description="Add a `steps` array to this recipe." />
          )}
        </div>
      </div>

      <div style={{ marginTop: "var(--space-8)" }}>
        <Link to="/recipes" className="btn btn-ghost">&larr; Back to all results</Link>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;

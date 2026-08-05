import { useMemo, useState } from "react";
import SectionHeader from "../components/common/SectionHeader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import { RecipeCard } from "../components/recipe/index.js";
import { classNames } from "../utils/helpers.js";

const SearchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6"/><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
);

/**
 * Recipe Results — the recommendations produced by the quiz (or by
 * browsing). No data is fetched here; results are entirely prop-driven.
 *
 * @param {{ id, title, imageUrl?, time?, difficulty?, tags?, isNew? }[]} recipes
 * @param {string[]} [filters] - available filter chip labels
 * @param {string[]} [savedRecipeIds]
 * @param {function} [onToggleSave]
 */
const RecipeResultsPage = ({ recipes = [], filters = [], savedRecipeIds = [], onToggleSave }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [saved, setSaved] = useState(new Set(savedRecipeIds));

  const visibleRecipes = useMemo(() => {
    if (!activeFilter) return recipes;
    return recipes.filter((r) => r.tags?.includes(activeFilter));
  }, [recipes, activeFilter]);

  const handleToggleSave = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    onToggleSave?.(id);
  };

  return (
    <div className="container section">
      <SectionHeader
        title="Your recipe matches"
        subtitle={
          recipes.length > 0
            ? `${visibleRecipes.length} recipe${visibleRecipes.length === 1 ? "" : "s"} picked for you`
            : "Complete the quiz to see recommendations here."
        }
      />

      {filters.length > 0 && (
        <div className="filter-bar" role="group" aria-label="Filter recipes by tag">
          <button
            type="button"
            className={classNames("filter-chip", !activeFilter && "filter-chip-active")}
            onClick={() => setActiveFilter(null)}
          >
            All
          </button>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={classNames("filter-chip", activeFilter === filter && "filter-chip-active")}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-3">
        {visibleRecipes.length > 0 ? (
          visibleRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              saved={saved.has(recipe.id)}
              onToggleSave={handleToggleSave}
              detailsPath={`/recipes/${recipe.id}`}
            />
          ))
        ) : (
          <EmptyState
            icon={<SearchIcon />}
            title="No recipes to show yet"
            description="Results will appear here once recipe data is passed into this page — no dummy content is baked in."
            action={{ label: "Retake the quiz", to: "/quiz" }}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeResultsPage;

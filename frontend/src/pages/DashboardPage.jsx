import { useState } from "react";
import SectionHeader from "../components/common/SectionHeader.jsx";
import PaginationArrows from "../components/common/PaginationArrows.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import { CategoryCard, RecipeCard } from "../components/recipe/index.js";

const BookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 5.5A2.5 2.5 0 016.5 3H20v15.5H6.5A2.5 2.5 0 004 21V5.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M4 18.5A2.5 2.5 0 016.5 16H20" stroke="currentColor" strokeWidth="1.6"/></svg>
);
const GridIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/></svg>
);
const SparkIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
);

/**
 * Dashboard — recipe categories, popular recipes, and recently added.
 * No backend is connected, so all three lists default to empty and
 * render a designed empty state. Wire real data in like:
 *
 *   <DashboardPage
 *     categories={[{ id, name, imageUrl, to }]}
 *     popularRecipes={[{ id, title, imageUrl, time, difficulty, tags }]}
 *     recentRecipes={[...]}
 *     savedRecipeIds={[]}
 *     onToggleSave={(id) => {}}
 *   />
 */
const DashboardPage = ({
  categories = [],
  popularRecipes = [],
  recentRecipes = [],
  savedRecipeIds = [],
  onToggleSave,
}) => {
  const [saved, setSaved] = useState(new Set(savedRecipeIds));

  const handleToggleSave = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    onToggleSave?.(id);
  };

  const stats = [
    { label: "Saved recipes", value: saved.size },
    { label: "Categories", value: categories.length },
    { label: "New this week", value: recentRecipes.length },
  ];

  return (
    <div className="container section">
      <SectionHeader title="Your dashboard" subtitle="Everything you've saved and discovered, in one place." />

      <div className="stat-strip">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span className="stat-card-value">{stat.value}</span>
            <span className="stat-card-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <section style={{ marginBottom: "var(--space-8)" }}>
        <SectionHeader
          title="Categories"
          action={<PaginationArrows onPrev={() => {}} onNext={() => {}} />}
        />
        <div className="grid grid-3">
          {categories.length > 0 ? (
            categories.map((category) => <CategoryCard key={category.id} category={category} />)
          ) : (
            <EmptyState
              icon={<GridIcon />}
              title="No categories yet"
              description="Categories will appear here once recipe data is connected."
            />
          )}
        </div>
      </section>

      <section style={{ marginBottom: "var(--space-8)" }}>
        <SectionHeader
          title="Popular recipes"
          action={<PaginationArrows onPrev={() => {}} onNext={() => {}} />}
        />
        <div className="grid grid-4">
          {popularRecipes.length > 0 ? (
            popularRecipes.map((recipe) => (
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
              icon={<SparkIcon />}
              title="No popular recipes yet"
              description="Take the quiz to get your first personalized recommendations."
              action={{ label: "Take the quiz", to: "/quiz" }}
            />
          )}
        </div>
      </section>

      <section>
        <SectionHeader title="Recently added" />
        <div className="grid grid-4">
          {recentRecipes.length > 0 ? (
            recentRecipes.map((recipe) => (
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
              icon={<BookIcon />}
              title="Nothing added recently"
              description="New recipes matched to you will show up here."
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;

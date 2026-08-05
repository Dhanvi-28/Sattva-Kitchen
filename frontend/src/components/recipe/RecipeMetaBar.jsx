/**
 * Row of at-a-glance stats on the Recipe Details page
 * (prep time, servings, difficulty, calories — whichever are provided).
 * @param {{ label: string, value: string }[]} stats
 */
const RecipeMetaBar = ({ stats = [] }) => (
  <div className="recipe-meta-bar">
    {stats.map((stat) => (
      <div className="recipe-meta-stat" key={stat.label}>
        <span className="recipe-meta-value">{stat.value}</span>
        <span className="recipe-meta-label">{stat.label}</span>
      </div>
    ))}
  </div>
);

export default RecipeMetaBar;

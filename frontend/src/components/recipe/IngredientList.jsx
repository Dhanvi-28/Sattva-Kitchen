/**
 * Checklist-style ingredient list for the Recipe Details page.
 *
 * @param {{ id: string|number, label: string, quantity?: string }[]} ingredients
 * @param {Set<string|number>} [checked]
 * @param {function} [onToggle]
 */
const IngredientList = ({ ingredients = [], checked = new Set(), onToggle }) => (
  <ul className="ingredient-list">
    {ingredients.map((item) => (
      <li key={item.id} className="ingredient-item">
        <label className="ingredient-item-label">
          <input
            type="checkbox"
            checked={checked.has(item.id)}
            onChange={() => onToggle?.(item.id)}
            className="ingredient-checkbox"
          />
          <span className={checked.has(item.id) ? "ingredient-text ingredient-text-checked" : "ingredient-text"}>
            {item.label}
          </span>
        </label>
        {item.quantity && <span className="ingredient-quantity">{item.quantity}</span>}
      </li>
    ))}
  </ul>
);

export default IngredientList;

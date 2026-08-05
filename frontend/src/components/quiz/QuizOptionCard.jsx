import { classNames } from "../../utils/helpers.js";

/**
 * Selectable quiz answer. Works for single- or multi-select questions —
 * the parent QuizPage owns selection state and passes `selected` down.
 *
 * @param {string} label
 * @param {React.ReactNode} [icon]
 * @param {boolean} selected
 * @param {function} onSelect
 */
const QuizOptionCard = ({ label, icon, selected = false, onSelect }) => (
  <button
    type="button"
    className={classNames("quiz-option", selected && "quiz-option-selected")}
    onClick={onSelect}
    aria-pressed={selected}
  >
    {icon && <span className="quiz-option-icon">{icon}</span>}
    <span className="quiz-option-label">{label}</span>
    <span className="quiz-option-check" aria-hidden="true" />
  </button>
);

export default QuizOptionCard;

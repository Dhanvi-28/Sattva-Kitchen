import QuizOptionCard from "./QuizOptionCard.jsx";

/**
 * One quiz question: prompt + its option grid.
 *
 * @param {{
 *   id: string|number,
 *   prompt: string,
 *   helperText?: string,
 *   options: { id: string|number, label: string, icon?: React.ReactNode }[]
 * }} question
 * @param {string|number|Array} selected - single id, or array of ids for multi-select
 * @param {function} onSelect - (optionId) => void
 */
const QuizQuestionCard = ({ question, selected, onSelect }) => {
  const isSelected = (optionId) =>
    Array.isArray(selected) ? selected.includes(optionId) : selected === optionId;

  return (
    <div className="quiz-question">
      <h2 className="display-heading quiz-question-prompt">{question.prompt}</h2>
      {question.helperText && <p className="quiz-question-helper">{question.helperText}</p>}

      <div className="quiz-options-grid">
        {question.options.map((option) => (
          <QuizOptionCard
            key={option.id}
            label={option.label}
            icon={option.icon}
            selected={isSelected(option.id)}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizQuestionCard;

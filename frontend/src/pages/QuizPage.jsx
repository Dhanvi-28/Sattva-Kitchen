import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/common/ProgressBar.jsx";
import Button from "../components/common/Button.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import { QuizQuestionCard } from "../components/quiz/index.js";

const QuizIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M9 9a3 3 0 115.2 2c-.9.9-1.7 1.2-1.7 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="17" r="0.9" fill="currentColor"/><circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6"/></svg>
);

/**
 * Multi-step recipe-preference quiz. Fully driven by the `questions`
 * prop — no backend and no built-in question bank, so this renders an
 * empty state until questions are supplied. Expected shape:
 *
 *   questions = [{
 *     id: "diet",
 *     prompt: "Any dietary preferences?",
 *     helperText: "Pick as many as apply.",
 *     multiSelect: true, // optional, default false
 *     options: [{ id: "vegan", label: "Vegan", icon: "🌱" }],
 *   }]
 *
 * @param {function} [onComplete] - called with the full answers map
 *   when the user finishes; the page then navigates to /recipes.
 */
const QuizPage = ({ questions = [], onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const total = questions.length;
  const current = questions[step];
  const progress = total > 0 ? ((step + 1) / total) * 100 : 0;

  const isAnswered = useMemo(() => {
    if (!current) return false;
    const value = answers[current.id];
    return current.multiSelect ? Array.isArray(value) && value.length > 0 : value !== undefined;
  }, [answers, current]);

  const handleSelect = (optionId) => {
    if (!current) return;
    setAnswers((prev) => {
      if (current.multiSelect) {
        const existing = new Set(prev[current.id] || []);
        existing.has(optionId) ? existing.delete(optionId) : existing.add(optionId);
        return { ...prev, [current.id]: Array.from(existing) };
      }
      return { ...prev, [current.id]: optionId };
    });
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const handleNext = () => {
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      onComplete?.(answers);
      navigate("/recipes");
    }
  };

  if (total === 0) {
    return (
      <div className="container section">
        <EmptyState
          icon={<QuizIcon />}
          title="No quiz questions configured"
          description="Pass a `questions` prop into QuizPage to render the flow. Nothing is hardcoded here."
        />
      </div>
    );
  }

  return (
    <div className="container section quiz-shell">
      <div className="quiz-progress-bar">
        <ProgressBar value={progress} label={`Question ${step + 1} of ${total}`} />
      </div>

      <QuizQuestionCard question={current} selected={answers[current.id]} onSelect={handleSelect} />

      <div className="quiz-nav">
        <Button variant="secondary" onClick={handleBack} disabled={step === 0}>
          Back
        </Button>
        <Button variant="primary" onClick={handleNext} disabled={!isAnswered}>
          {step < total - 1 ? "Next" : "See recipes"}
        </Button>
      </div>
    </div>
  );
};

export default QuizPage;

/**
 * Numbered instruction steps for the Recipe Details page.
 * @param {{ id: string|number, text: string }[]} steps
 */
const StepList = ({ steps = [] }) => (
  <ol className="step-list">
    {steps.map((step, index) => (
      <li key={step.id} className="step-item">
        <span className="step-number">{index + 1}</span>
        <p className="step-text">{step.text}</p>
      </li>
    ))}
  </ol>
);

export default StepList;

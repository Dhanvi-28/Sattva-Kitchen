/**
 * Shared inline error display, used by data-fetching components/hooks.
 */
const ErrorMessage = ({ message = "Something went wrong." }) => (
  <div className="error-message" role="alert">
    {message}
  </div>
);

export default ErrorMessage;

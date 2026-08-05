import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import { router } from "./routes/index.jsx";

/**
 * Root component. Routes for all five pages are registered in
 * src/routes/index.jsx.
 */
function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;

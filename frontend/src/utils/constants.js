export const APP_NAME = import.meta.env.VITE_APP_NAME || "Sattva Kitchen";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  QUIZ: "/quiz",
  RECIPE_RESULTS: "/recipes",
  RECIPE_DETAILS: "/recipes/:recipeId",
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

import { useEffect, useState } from "react";
import { createBrowserRouter, useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import {
  LandingPage,
  DashboardPage,
  QuizPage,
  RecipeResultsPage,
  RecipeDetailsPage,
} from "../pages/index.js";
import { recipeService } from "../services/recipeService.js";
import Loader from "../components/common/Loader.jsx";

// Persistent saved recipe IDs in localStorage
const getSavedFromStorage = () => {
  try {
    const item = localStorage.getItem("sattva_saved_recipes");
    return item ? JSON.parse(item) : [];
  } catch (e) {
    return [];
  }
};

const saveToStorage = (savedArray) => {
  try {
    localStorage.setItem("sattva_saved_recipes", JSON.stringify(savedArray));
  } catch (e) {}
};

function DashboardWrapper() {
  const [categories, setCategories] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [savedIds, setSavedIds] = useState(getSavedFromStorage());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadDashboard() {
      setLoading(true);
      const [cats, pop, rec] = await Promise.all([
        recipeService.getCategories(),
        recipeService.getPopularRecipes(),
        recipeService.getRecentRecipes(),
      ]);
      if (mounted) {
        setCategories(cats);
        setPopularRecipes(pop);
        setRecentRecipes(rec);
        setLoading(false);
      }
    }
    loadDashboard();
    return () => {
      mounted = false;
    };
  }, []);

  const handleToggleSave = (id) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveToStorage(next);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="container section" style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
        <Loader size="lg" label="Loading Sattva Kitchen Dashboard..." />
      </div>
    );
  }

  return (
    <DashboardPage
      categories={categories}
      popularRecipes={popularRecipes}
      recentRecipes={recentRecipes}
      savedRecipeIds={savedIds}
      onToggleSave={handleToggleSave}
    />
  );
}

function QuizWrapper() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function loadQuiz() {
      setLoading(true);
      const qData = await recipeService.getQuizQuestions();
      if (mounted) {
        setQuestions(qData);
        setLoading(false);
      }
    }
    loadQuiz();
    return () => {
      mounted = false;
    };
  }, []);

  const handleComplete = async (answers) => {
    setLoading(true);
    const recommended = await recipeService.getRecommendations(answers);
    navigate("/recipes", { state: { recommendations: recommended, answers } });
  };

  if (loading) {
    return (
      <div className="container section" style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
        <Loader size="lg" label="Curating personalized Ayurvedic & TCM matches..." />
      </div>
    );
  }

  return <QuizPage questions={questions} onComplete={handleComplete} />;
}

function RecipeResultsWrapper() {
  const location = useLocation();
  const [recipes, setRecipes] = useState(location.state?.recommendations || []);
  const [filters, setFilters] = useState([]);
  const [savedIds, setSavedIds] = useState(getSavedFromStorage());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadResults() {
      if (location.state?.recommendations) {
        setRecipes(location.state.recommendations);
        const tags = await recipeService.getTags();
        if (mounted) setFilters(tags);
        return;
      }

      setLoading(true);
      const searchParams = new URLSearchParams(location.search);
      const categoryParam = searchParams.get("category");
      const searchRes = await recipeService.searchRecipes({ category: categoryParam });
      const tags = await recipeService.getTags();

      if (mounted) {
        setRecipes(searchRes.recipes);
        setFilters(tags);
        setLoading(false);
      }
    }
    loadResults();
    return () => {
      mounted = false;
    };
  }, [location.search, location.state]);

  const handleToggleSave = (id) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveToStorage(next);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="container section" style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
        <Loader size="lg" label="Searching recipes..." />
      </div>
    );
  }

  return (
    <RecipeResultsPage
      recipes={recipes}
      filters={filters}
      savedRecipeIds={savedIds}
      onToggleSave={handleToggleSave}
    />
  );
}

function RecipeDetailsWrapper() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [savedIds, setSavedIds] = useState(getSavedFromStorage());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchDetails() {
      setLoading(true);
      const data = await recipeService.getRecipeById(recipeId);
      if (mounted) {
        setRecipe(data);
        setLoading(false);
      }
    }
    fetchDetails();
    return () => {
      mounted = false;
    };
  }, [recipeId]);

  const handleToggleSave = (id) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveToStorage(next);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="container section" style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
        <Loader size="lg" label="Loading recipe details..." />
      </div>
    );
  }

  return (
    <RecipeDetailsPage
      recipe={recipe}
      saved={savedIds.includes(recipeId)}
      onToggleSave={handleToggleSave}
    />
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <LandingPage />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <DashboardWrapper />
      </Layout>
    ),
  },
  {
    path: "/quiz",
    element: (
      <Layout>
        <QuizWrapper />
      </Layout>
    ),
  },
  {
    path: "/recipes",
    element: (
      <Layout>
        <RecipeResultsWrapper />
      </Layout>
    ),
  },
  {
    path: "/recipes/:recipeId",
    element: (
      <Layout>
        <RecipeDetailsWrapper />
      </Layout>
    ),
  },
]);

export { Layout };

import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/LandingPage";
import routes from "tempo-routes";
import { ThemeProvider } from "./lib/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/calculator" element={<Home />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

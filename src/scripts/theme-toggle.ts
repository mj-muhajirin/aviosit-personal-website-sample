const themeToggle = document.querySelector<HTMLButtonElement>(
  "[data-theme-toggle]",
);

if (themeToggle) {
  const root = document.documentElement;

  const getStoredTheme = (): "light" | "dark" | null => {
    const theme = localStorage.getItem("theme");

    if (theme === "light" || theme === "dark") {
      return theme;
    }

    return null;
  };

  const getPreferredTheme = (): "light" | "dark" => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const applyTheme = (theme: "light" | "dark") => {
    root.dataset.theme = theme;

    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
  };

  const storedTheme = getStoredTheme();
  const initialTheme = storedTheme ?? getPreferredTheme();

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = root.dataset.theme === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}

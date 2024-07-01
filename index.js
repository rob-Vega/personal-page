const toggleThemeButton = document.querySelector("#toogle-theme-button");
const icons = ["☼", "☾"];

toggleThemeButton.addEventListener("click", () => {
  const theme = localStorage.getItem("ui-theme");
  console.log(typeof theme, theme);

  if (theme === "dark") {
    toggleThemeButton.innerHTML = icons[1];
    document.body.classList.remove("dark-mode");
    localStorage.setItem("ui-theme", "light");
  } else {
    toggleThemeButton.innerHTML = icons[0];
    document.body.classList.add("dark-mode");
    localStorage.setItem("ui-theme", "dark");
  }
});

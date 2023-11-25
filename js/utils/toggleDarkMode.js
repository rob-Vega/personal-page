export default function toggleDarkMode() {
  const darkModeButton = document.querySelector("#dark-mode");
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    darkModeButton.classList.replace("fa-sun", "fa-moon");
  } else {
    document.body.classList.remove("dark-mode");
    darkModeButton.classList.replace("fa-moon", "fa-sun");
  }

  darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);

    isDarkMode
      ? darkModeButton.classList.replace("fa-sun", "fa-moon")
      : darkModeButton.classList.replace("fa-moon", "fa-sun");
  });
}

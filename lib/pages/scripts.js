import { renderNavigation } from "../components/navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  fetch("/public/data/index.json")
    .then((response) => response.json())
    .then((data) => {
     
      const headerElement = document.getElementById("header");
      headerElement.innerHTML = `<h1>${data.title}</h1>`;

   
      const navigationElement = document.getElementById("navigation");
      navigationElement.innerHTML = ""; // Clear previous content
      const nav = renderNavigation(data.navigation);
      navigationElement.appendChild(nav);

      const footerElement = document.getElementById("app");
      footerElement.innerHTML = `<footer>${data.footer}</footer>`;
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
});

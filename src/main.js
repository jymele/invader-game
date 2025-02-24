import "./style.css";

/**
 * Start the script after everything has been loaded
 */
window.addEventListener("load", () => {
  const canvas = document.getElementById("app");
  const ctx = canvas.getContext("2d");

  /**
   * html canvas has 2 sizes. Element size and context (drawing surface) size. Both need to be set to thesame value to prevent distortions
   * setting the size in css only sets the element size
   */
  canvas.width = 600;
  canvas.height = 800;
});

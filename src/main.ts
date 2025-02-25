import "./style.css";
import Game from "./classes/Game";

/**
 * Start the script after everything has been loaded
 */
window.addEventListener("load", () => {
  const canvas: HTMLCanvasElement = document.getElementById(
    "game"
  ) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  /**
   * html canvas has 2 sizes. Element size and context (drawing surface) size. Both need to be set to thesame value to prevent distortions
   * setting the size in css only sets the element size
   */
  canvas.width = 600;
  canvas.height = 800;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;

  const game = new Game(canvas);

  function animate() {
    // clear the canvas before rendering the next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    requestAnimationFrame(animate);
  }

  animate();
});

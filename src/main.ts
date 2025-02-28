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

  let lastTime = 0;

  function animate(timestamp?: number) {
    // The first time the function is called, the timestamp is undefined
    // This could also be solved simply by calling animate(0)
    if (timestamp === undefined) {
      timestamp = 0;
    }

    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // clear the canvas before rendering the next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx, deltaTime);
    requestAnimationFrame(animate);
  }

  animate();
});

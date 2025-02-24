import Player from "./Player";
/**
 * Contains the game logic.
 */
class Game {
  private canvas: HTMLCanvasElement;
  public width: number;
  public height: number;

  private player: Player;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.player = new Player(this);
  }

  render(context: CanvasRenderingContext2D) {
    this.player.draw(context);
    this.player.update();
  }
}

export default Game;

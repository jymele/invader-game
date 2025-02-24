import Player from "./Player";
/**
 * Contains the game logic.
 */
class Game {
  private canvas: HTMLCanvasElement;
  public width: number;
  public height: number;

  private player: Player;
  public keys: string[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = [];
    this.player = new Player(this);

    window.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      }
      // console.log(this.keys);
    });
    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);
      if (index > -1) this.keys.splice(index, 1);
      // console.log(this.keys);
    });
  }

  render(context: CanvasRenderingContext2D) {
    this.player.draw(context);
    this.player.update();
  }
}

export default Game;

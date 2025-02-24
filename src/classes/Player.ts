import Game from "./Game";
/**
 * Handle the movement and animation of the player character
 * It only has one instance, so it's a singleton (can be a function but will be a class for consistency)
 */
class Player {
  private game: Game;
  private width: number;
  private height: number;
  private x: number;
  private y: number;
  private speed: number = 5;

  constructor(game: Game) {
    this.game = game;
    this.width = 100;
    this.height = 100;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x += this.speed;
  }
}

export default Player;

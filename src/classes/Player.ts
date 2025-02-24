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
  private speed: number = 10;

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
    // horizontal movement
    if (this.game.keys.indexOf("ArrowLeft") > -1) {
      this.x -= this.speed;
    }
    if (this.game.keys.indexOf("ArrowRight") > -1) {
      this.x += this.speed;
    }

    // horizontal boundaries
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }
  }
}

export default Player;

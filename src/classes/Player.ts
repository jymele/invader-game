import Game from "./Game";
/**
 * Handle the movement and animation of the player character
 * It only has one instance, so it's a singleton (can be a function but will be a class for consistency)
 */
class Player {
  private game: Game;
  public width: number;
  public height: number;
  public x: number;
  public y: number;
  private speed: number;
  public lives: number;

  constructor(game: Game) {
    this.game = game;
    this.width = 100;
    this.height = 100;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height;
    this.speed = 10;
    this.lives = 3;
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

    if (this.game.keys.indexOf("1") > -1) {
      this.shoot();
    }

    // horizontal boundaries
    if (this.x < -this.width * 0.5) {
      this.x = -this.width * 0.5;
    } else if (this.x > this.game.width - this.width * 0.5) {
      this.x = this.game.width - this.width * 0.5;
    }
  }

  shoot() {
    const projectile = this.game.getProjectile();
    if (projectile) {
      projectile.start(this.x + this.width * 0.5, this.y);
    }
  }
}

export default Player;

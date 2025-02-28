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
  private image: HTMLImageElement;
  private jets_image: HTMLImageElement;
  private frameX: number;
  private jetsFrame: number;
  public maxLives: number;

  constructor(game: Game) {
    this.game = game;
    this.width = 140;
    this.height = 120;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height;
    this.speed = 5;
    this.lives = 3;
    this.image = document.getElementById("player") as HTMLImageElement;
    this.jets_image = document.getElementById(
      "player_jets"
    ) as HTMLImageElement;
    this.frameX = 0;
    this.jetsFrame = 1;
    this.maxLives = 10;
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.game.keys.indexOf("1") > -1) {
      this.frameX = 1;
    } else {
      this.frameX = 0;
    }
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    context.drawImage(
      this.jets_image,
      this.jetsFrame * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    // horizontal movement
    if (this.game.keys.indexOf("ArrowLeft") > -1) {
      this.x -= this.speed;
      this.jetsFrame = 2;
    } else if (this.game.keys.indexOf("ArrowRight") > -1) {
      this.x += this.speed;
      this.jetsFrame = 0;
    } else {
      this.jetsFrame = 1;
    }

    // if (this.game.keys.indexOf("1") > -1) {
    //   this.shoot();
    // }

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

  restart() {
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height;
    this.lives = 3;
  }
}

export default Player;

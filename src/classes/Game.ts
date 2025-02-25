import Player from "./Player";
import Projectile from "./Projectile";
import Wave from "./Wave";

/**
 * Contains the game logic.
 */
class Game {
  private canvas: HTMLCanvasElement;
  public width: number;
  public height: number;

  private player: Player;
  public keys: string[];

  // enemy wave data
  public columns: number;
  public rows: number;
  public enemysize: number;
  private waves: Wave[];

  projectilePool: Projectile[];
  numberOfProjectiles: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = [];
    this.player = new Player(this);

    this.columns = 3;
    this.rows = 3;
    this.enemysize = 60;

    this.waves = [];
    this.waves.push(new Wave(this));

    window.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      }
      // if (e.key === "1") this.player.shoot();
    });
    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);
      if (index > -1) this.keys.splice(index, 1);
    });

    this.projectilePool = [];
    this.numberOfProjectiles = 10;
    this.createProjectiles();
    console.log(this.projectilePool);
  }

  render(context: CanvasRenderingContext2D) {
    this.player.draw(context);
    this.player.update();
    this.projectilePool.forEach((projectile) => {
      projectile.update();
      projectile.draw(context);
    });

    // draw the enemy wave
    this.waves.forEach((wave) => {
      wave.render(context);
    });
  }

  // create projectiles object pool
  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilePool.push(new Projectile());
    }
  }

  // get a free projectile from the pool
  getProjectile() {
    for (let i = 0; i < this.projectilePool.length; i++) {
      if (this.projectilePool[i].free) {
        return this.projectilePool[i];
      }
    }
  }
}

export default Game;

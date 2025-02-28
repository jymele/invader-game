import Enemy from "./Enemy";
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

  public player: Player;
  public keys: string[];

  // enemy wave data
  public columns: number;
  public rows: number;
  public enemysize: number;
  private waves: Wave[];
  private waveCount: number;
  private fired: boolean;

  spriteUpdate: boolean;
  spriteTimer: number;
  spriteInterval: number;

  projectilePool: Projectile[];
  numberOfProjectiles: number;

  score: number;

  gameOver: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = [];
    this.player = new Player(this);
    this.fired = false;
    this.spriteUpdate = false;
    this.spriteTimer = 0;
    this.spriteInterval = 120;

    this.enemysize = 80;

    this.initialize();

    window.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
      }
      if (e.key === "1" && !this.fired) {
        this.player.shoot();
        this.fired = true;
      }
      if (e.key === "r" && this.gameOver) this.restart();
    });
    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);
      if (index > -1) this.keys.splice(index, 1);
      if (e.key === "1") this.fired = false;
    });

    this.projectilePool = [];
    this.numberOfProjectiles = 10;
    this.createProjectiles();
    // console.log(this.projectilePool);
  }

  initialize() {
    this.columns = 1;
    this.rows = 1;
    this.waves = [];
    this.waves.push(new Wave(this));
    this.waveCount = 1;
    this.score = 0;
    this.gameOver = false;
  }

  restart() {
    this.player.restart();
    this.initialize();
  }

  render(context: CanvasRenderingContext2D, deltaTime: number) {
    // console.log(deltaTime);

    if (this.spriteTimer > this.spriteInterval) {
      this.spriteUpdate = true;
      this.spriteTimer = 0;
    } else {
      this.spriteUpdate = false;
      this.spriteTimer += deltaTime;
    }

    this.drawStatusText(context);
    this.projectilePool.forEach((projectile) => {
      projectile.update();
      projectile.draw(context);
    });
    this.player.draw(context);
    this.player.update();

    context.font = "30px impact";

    // draw the enemy wave
    this.waves.forEach((wave) => {
      wave.render(context);
      if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver) {
        this.newWave();
        this.waveCount++;
        wave.nextWaveTrigger = true;
        if (this.player.lives < this.player.maxLives) this.player.lives++;
      }
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

  // collision detection between 2 rectangles
  checkCollision(a: Projectile | Enemy, b: Wave | Projectile | Player) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  drawStatusText(context: CanvasRenderingContext2D) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.fillText("Score: " + this.score, 20, 40);
    context.fillText("Wave: " + this.waveCount, 20, 80);

    for (let i = 0; i < this.player.maxLives; i++) {
      context.strokeRect(20 + 20 * i, 100, 10, 15);
    }

    // Drawing the lives
    for (let i = 0; i < this.player.lives; i++) {
      context.fillRect(20 + 20 * i, 100, 10, 15);
    }
    if (this.gameOver) {
      context.textAlign = "center";
      context.font = "100px Impact";
      context.fillText("Game Over", this.width / 2, this.height / 2);
      context.font = "20px Impact";
      context.fillText(
        "Press R to restart!",
        this.width / 2,
        this.height / 2 + 30
      );
    }
    context.restore();
  }

  newWave() {
    if (
      Math.random() < 0.5 &&
      this.columns * this.enemysize < this.width * 0.8
    ) {
      this.columns++;
    } else if (this.rows * this.enemysize < this.height * 0.6) {
      this.rows++;
    }
    this.waves.push(new Wave(this));
  }
}

export default Game;

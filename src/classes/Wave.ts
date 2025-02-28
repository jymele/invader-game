import Enemy from "./Enemy";
import Beetlemorph from "./Beetlemorph";
import Game from "./Game";

class Wave {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  enemies: Enemy[];
  public nextWaveTrigger: boolean;

  constructor(game: Game) {
    this.game = game;
    this.width = this.game.enemysize * this.game.columns;
    this.height = this.game.enemysize * this.game.rows;
    this.x = 0;
    this.y = -this.height;
    this.speedX = 3;
    this.speedY = 0;
    this.enemies = [];
    this.nextWaveTrigger = false;
    this.create();
  }

  render(context: CanvasRenderingContext2D) {
    if (this.y < 0) this.y += 5;
    this.speedY = 0;

    if (this.x + this.width > this.game.width || this.x < 0) {
      this.speedX *= -1;
      this.speedY = this.game.enemysize;
    }
    this.x += this.speedX;
    this.y += this.speedY;

    this.enemies.forEach((enemy) => {
      enemy.update(this.x, this.y);
      enemy.draw(context);
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
  }

  create() {
    for (let y = 0; y < this.game.rows; y++) {
      for (let x = 0; x < this.game.columns; x++) {
        let enemyX = x * this.game.enemysize;
        let enemyY = y * this.game.enemysize;
        this.enemies.push(new Beetlemorph(this.game, enemyX, enemyY));
      }
    }
  }
}

export default Wave;

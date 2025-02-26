import Game from "./Game";

class Enemy {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  positionX: number;
  positionY: number;
  markedForDeletion: boolean;

  constructor(game: Game, positionX: number, positionY: number) {
    this.game = game;
    this.width = this.game.enemysize;
    this.height = this.game.enemysize;
    this.x = 0;
    this.y = 0;
    this.positionX = positionX;
    this.positionY = positionY;
    this.markedForDeletion = false;
  }

  draw(context: CanvasRenderingContext2D) {
    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  update(x: number, y: number) {
    this.x = x + this.positionX;
    this.y = y + this.positionY;
    // check for collision between enemies and projectiles
    this.game.projectilePool.forEach((projectile) => {
      if (!projectile.free && this.game.checkCollision(this, projectile)) {
        this.markedForDeletion = true;
        projectile.reset();
      }
    });
  }
}

export default Enemy;

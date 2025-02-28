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
  image: HTMLImageElement;
  frameX: number;
  frameY: number;
  lives: number = 0;
  maxFrame: number = 0;
  maxLives: number = 0;
  11;

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
    // context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(x: number, y: number) {
    this.x = x + this.positionX;
    this.y = y + this.positionY;

    // check collision between enemies and player
    if (this.game.checkCollision(this, this.game.player) && this.lives > 0) {
      this.lives = 0;
      this.game.player.lives--;
    }

    if (this.lives < 1) {
      if (this.game.spriteUpdate) this.frameX++;
      if (this.frameX >= this.maxFrame) {
        this.markedForDeletion = true;
        if (!this.game.gameOver) this.game.score += this.maxLives;
      }
    }

    // check for collision between enemies and projectiles
    this.game.projectilePool.forEach((projectile) => {
      if (
        !projectile.free &&
        this.game.checkCollision(this, projectile) &&
        this.lives > 0
      ) {
        this.hit(1);
        projectile.reset();
      }
    });

    //lose condition
    if (this.y + this.height > this.game.height || this.game.player.lives < 1) {
      this.game.gameOver = true;
    }
  }

  hit(damage: number) {
    this.lives -= damage;
  }
}

export default Enemy;

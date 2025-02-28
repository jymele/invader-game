import Enemy from "./Enemy";
import Game from "./Game";

class Beetlemorph extends Enemy {
  image: HTMLImageElement;

  frameX: number;
  frameY: number;

  constructor(game: Game, positionX: number, positionY: number) {
    super(game, positionX, positionY);
    this.image = document.getElementById("beetlemorph") as HTMLImageElement;
    this.frameX = 0;
    this.maxFrame = 2;
    this.frameY = Math.floor(Math.random() * 4);
    this.lives = 1;
    this.maxLives = this.lives;
  }
}

export default Beetlemorph;

import Enemy from "./Enemy";
import Game from "./Game";

class Beetlemorph extends Enemy {
  image: HTMLImageElement;

  constructor(game: Game, positionX: number, positionY: number) {
    super(game, positionX, positionY);
    this.image = document.getElementById("beetlemorph") as HTMLImageElement;
  }
}

export default Beetlemorph;

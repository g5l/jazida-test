const db = require('../models');

class Arena {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }

  async fight() {
    const valueToRandon = this.buildRandomValue();

    const idx = Math.floor(Math.random() * valueToRandon.length);
    const winnerId = valueToRandon[idx];
    const loserId = valueToRandon.find((value) => value !== winnerId);

    const winner = await db.Pokemons.increment({ nivel: 1 }, { where: { id: winnerId } });
    const loser = await db.Pokemons.decrement({ nivel: 1 }, { where: { id: loserId } });

    this.testLoserLevel(loser);

    const builtReturn = this.buildReturn(winner, loser);

    return builtReturn;
  }

  buildRandomValue() {
    const { id: idOne, nivel: levelOne } = this.playerOne;
    const { id: idTwo, nivel: levelTow } = this.playerTwo;
    let valueToRandon;

    if (levelOne === levelTow) {
      valueToRandon = [idOne, idTwo];
    } else if (levelOne > levelTow) {
      valueToRandon = [idOne, idOne, idTwo];
    } else {
      valueToRandon = [idOne, idTwo, idTwo];
    }

    return valueToRandon;
  }

  buildReturn(winner, loser) {
    return {
      vencedor: {
        winner,
      },
      perdedor: {
        loser,
      },
    };
  }

  testLoserLevel(loser) {
    console.log('loser', loser);
  }
}

module.exports = Arena;

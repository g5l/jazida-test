module.exports = (sequelize, DataTypes) => {
  const Pokemons = sequelize.define('Pokemons', {
    tipo: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['charizard', 'mewtwo', 'pikachu']],
      },
    },
    treinador: DataTypes.STRING,
    nivel: DataTypes.INTEGER,
  }, {
    schema: 'GABRIEL',
    timestamps: false,
  });
  Pokemons.associate = () => {
    // associations can be defined here
  };
  return Pokemons;
};

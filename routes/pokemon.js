module.exports = (app, db) => {
  app.get('/pokemons', (req, res) => {
    db.Pokemons.findAll().then((result) => res.status(200).json(result));
  });

  app.get('/pokemons/:id', (req, res) => {
    const { id } = req.params;

    db.Pokemons.findOne({
      where: { id },
    }).then((result) => res.status(200).json(result));
  });

  app.post('/pokemons', (req, res) => {
    const {
      tipo,
      treinador,
    } = req.body;

    db.Pokemons.create({
      tipo,
      treinador,
      nivel: 1,
    }).then((result) => res.status(200).json(result));
  });

  app.put('/pokemons/:id', (req, res) => {
    const { id } = req.params;
    const { treinador } = req.body;

    db.Pokemons.update({
      treinador,
    }, {
      where: { id },
    }).then(() => res.status(204).json());
  });

  app.delete('/pokemons/:id', (req, res) => {
    const { id } = req.params;

    db.Pokemons.destroy({
      where: { id },
    }).then(() => res.status(204).json());
  });

  app.post('/batalhar/:pokemonAId/:pokemonBId', async (req, res) => {
    const { pokemonAId, pokemonBId } = req.params;

    const pokemonA = await db.Pokemons.findOne({ where: { id: pokemonAId } });
    const pokemonB = await db.Pokemons.findOne({ where: { id: pokemonBId } });

    res.status(200).json({
      vencedor: {
        pokemonA,
      },
      perdedor: {
        pokemonB,
      },
    });
  });
};

import InformModel from '../models/InformModel.js';
import PlayersModel from '../models/PlayersModel.js';

// Definir métodos para el CRUD 

// Mostrar TODAS las fichas
export const getAllPlayers = async (req, res) => {
  try {
    const players = await PlayersModel.find();
    const playersWithReports = [];

    for (const player of players) {
      const informes = await InformModel.find({ PlayerId: player._id });
      const jugadorConInformes = {
        jugador: player,
        informes: informes
      };
      playersWithReports.push(jugadorConInformes);
    }

    res.json(playersWithReports);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar UNA ficha
export const getPlayer = async (req, res) => {
  try {
    const id = req.params.id
    const player = await PlayersModel.findById({ _id: id })
    const inform = await  InformModel.find({PlayerId: id})
    res.json({ jugador: player,informes: inform })
  } catch (error) {
    res.json({ message: error.message })
  }
}



// ...

// Crear una ficha
export const createPlayer = async (req, res) => {
  try {
    const player = await PlayersModel.create(req.body);

    // ...

    res.status(200).json({
      "message": "Ficha creada correctamente"
    });
  } catch (error) {
    res.json({ message: error.message });
  }
}

// Actualizar una ficha
export const updatePlayer = async (req, res) => {
  try {
    const id = req.params.id;

    // Actualiza la ficha del jugador
    await PlayersModel.updateOne({ _id: id }, req.body);

    // Obtén el jugador actualizado
    const player = await PlayersModel.findById(id);

    // Si hay un informe relacionado, actualiza el Rating
    const informe = await InformModel.findOne({ PlayerId: player._id });
    if (informe) {
      player.Rating = informe.MediaInforme;
      await player.save();
    }

    res.status(200).json({
      "message": "Ficha actualizada correctamente"
    });
  } catch (error) {
    res.json({ message: error.message });
  }
}

// ...


// Eliminar una ficha
export const deletePlayer = async (req, res) => {
  try {
    const id = req.params.id
    await PlayersModel.deleteOne({ _id: id }).then(res => {
      console.log(res)
    })
    res.status(200).json({
      "message": "Ficha eliminada correctamente"
    })
  } catch (error) {
    res.json({ message: error.message })
  }

}
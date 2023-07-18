import InformModel from '../models/InformModel.js';
import PlayersModel from '../models/PlayersModel.js';
import  path  from 'path';
import fs from 'fs';

// Definir métodos para el CRUD 

// Crear una ficha
export const createPlayer = async (req, res) => {
  try {
    await PlayersModel.create(req.body)
    res.status(200).json({
      "message": "Ficha creada correctamente"
    })
  } catch (error) {
    res.json({ message: error.message })
  }
}

// Mostrar un player y una ficha
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


// Consumir foto-avatar

export const avatar = (req, res) => {
  //sacar el parametro de la url
  const file = req.params.file;

  // montar el path real de la imagen

  const filepath = "./uploads/jugador/" + file;

  //comprobar que existe la imagen

  fs.stat(filepath, (error, exists) => {
    if (!exists)
      return res.status(404).send({
        status: "error",
        message: "no existe la imagen",
      });

    //devolver file
    return res.sendFile(path.resolve(filepath));
  });
};
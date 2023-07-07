import InformModel from '../models/InformModel.js';
import PmetricsModel from '../models/PMetricsModel.js';
import PlayersModel from '../models/PlayersModel.js';

// Obtener los datos de la colección "player-metrics"
export const getPlayerMetrics = async (req, res) => {
  try {
    const playerMetrics = await PmetricsModel.find();
    res.json(playerMetrics);
  } catch (error) {
    console.error('Error al obtener los datos de la colección "player-metrics":', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

// Calcular la media de Media de Skillsprincipales y la MediaGlobal y almacenarlas en la colección "player-metrics"
export const calculateSkillsPrincipales = async (id) => {
  try {
    console.log(id);
    const informs = await InformModel.find({PlayerId: id}); // Obtener todos los informes
    console.log(informs)
    const playerMetrics = {};
    let totalMediaInforme = 0; // Variable para almacenar la suma de todas las MediaInforme
    let totalInformes = 0; // Variable para almacenar el número total de informes

    // Calcular la media de habilidades para cada jugador y la suma de todas las MediaInforme
    informs.forEach((inform) => {
      const playerId = inform.PlayerId.toString();
      const SkillsPrincipales = inform.SkillsPrincipales[0];

      if (!playerMetrics[playerId]) {
        playerMetrics[playerId] = {
          ControlDelBalón: [],
          Disparo: [],
          Cabeza: [],
          Asociación: [],
          PieDerecho: [],
          PieIzquierdo: [],
          PasesLargos: [],
          Dribling: [],
          Reflejos: [],
          Centros: [],
          totalMediaInforme: 0,
          informCount: 0,
        };
      }

      playerMetrics[playerId].ControlDelBalón.push(SkillsPrincipales.ControlDelBalón);
      playerMetrics[playerId].Disparo.push(SkillsPrincipales.Disparo);
      playerMetrics[playerId].Cabeza.push(SkillsPrincipales.Cabeza);
      playerMetrics[playerId].Asociación.push(SkillsPrincipales.Asociación);
      playerMetrics[playerId].PieDerecho.push(SkillsPrincipales.PieDerecho);
      playerMetrics[playerId].PieIzquierdo.push(SkillsPrincipales.PieIzquierdo);
      playerMetrics[playerId].PasesLargos.push(SkillsPrincipales.PasesLargos);
      playerMetrics[playerId].Dribling.push(SkillsPrincipales.Dribling);
      playerMetrics[playerId].Reflejos.push(SkillsPrincipales.Reflejos);
      playerMetrics[playerId].Centros.push(SkillsPrincipales.Centros);

      playerMetrics[playerId].totalMediaInforme += inform.MediaInforme;
      playerMetrics[playerId].informCount++;
      totalMediaInforme += inform.MediaInforme;
      totalInformes++;
    });

    // Calcular la media de habilidades para cada jugador y actualizar la MediaGlobal
    for (let playerId in playerMetrics) {
      const playerMetric = playerMetrics[playerId];

      const mediaControlDelBalón = calculateAverage(playerMetric.ControlDelBalón);
      const mediaDisparo = calculateAverage(playerMetric.Disparo);
      const mediaCabeza = calculateAverage(playerMetric.Cabeza);
      const mediaAsociación = calculateAverage(playerMetric.Asociación);
      const mediaPieDerecho = calculateAverage(playerMetric.PieDerecho);
      const mediaPieIzquierdo = calculateAverage(playerMetric.PieIzquierdo);
      const mediaPasesLargos = calculateAverage(playerMetric.PasesLargos);
      const mediaDribling = calculateAverage(playerMetric.Dribling);
      const mediaReflejos = calculateAverage(playerMetric.Reflejos);
      const mediaCentros = calculateAverage(playerMetric.Centros);

      const mediaGlobal = playerMetric.informCount > 0
        ? playerMetric.totalMediaInforme / playerMetric.informCount
        : 0;

      const existingPlayerMetric = await PmetricsModel.findOne({ PlayerId: playerId });

      if (existingPlayerMetric) {
        // Actualizar el documento existente con los nuevos valores
        existingPlayerMetric.ControlDelBalón = mediaControlDelBalón;
        existingPlayerMetric.Disparo = mediaDisparo;
        existingPlayerMetric.Cabeza = mediaCabeza;
        existingPlayerMetric.Asociación = mediaAsociación;
        existingPlayerMetric.PieDerecho = mediaPieDerecho;
        existingPlayerMetric.PieIzquierdo = mediaPieIzquierdo;
        existingPlayerMetric.PasesLargos = mediaPasesLargos;
        existingPlayerMetric.Dribling = mediaDribling;
        existingPlayerMetric.Reflejos = mediaReflejos;
        existingPlayerMetric.Centros = mediaCentros;
        existingPlayerMetric.mediaGlobal = mediaGlobal;
        await existingPlayerMetric.save();
      } else {
        // Crear un nuevo documento si no existe uno con el mismo PlayerId
        const newPlayerMetric = new PmetricsModel({
          PlayerId: playerId,
          ControlDelBalón: mediaControlDelBalón,
          Disparo: mediaDisparo,
          Cabeza: mediaCabeza,
          Asociación: mediaAsociación,
          PieDerecho: mediaPieDerecho,
          PieIzquierdo: mediaPieIzquierdo,
          PasesLargos: mediaPasesLargos,
          Dribling: mediaDribling,
          Reflejos: mediaReflejos,
          Centros: mediaCentros,
          PasesLargos: mediaPasesLargos,
          mediaGlobal: mediaGlobal,
        });

        await newPlayerMetric.save();
      }
    }

    // Calcular el rating de jugador
    const globalMediaGlobal = totalInformes > 0
      ? totalMediaInforme / totalInformes
      : 0;
    
    console.log(globalMediaGlobal);

    // Actualizar el campo Rating de todos los jugadores en la colección Players
    // await PlayersModel.updateOne({id: id}, { Rating: globalMediaGlobal });
    
    try {
      const MetricUpdated = await PlayersModel.updateOne({_id: id}, { Rating: globalMediaGlobal });
      console.log(MetricUpdated)
    } catch (error) {
      console.log(error)
    }

    console.log('Cálculo de métricas de jugador completado');

    // ... puedes realizar otras acciones o retornar algún valor si es necesario
  } catch (error) {
    console.error('Error al calcular las métricas de jugador:', error);
  }
};

// Calcular la media de Media de SkillsTacticas y la MediaGlobal y almacenarlas en la colección "player-metrics"
export const calculateSkillsTacticas = async (id) => {
  try {
    console.log(id);
    const informs = await InformModel.find({PlayerId: id}); // Obtener todos los informes
    console.log(informs)
    const playerMetrics = {};
    let totalMediaInforme = 0; // Variable para almacenar la suma de todas las MediaInforme
    let totalInformes = 0; // Variable para almacenar el número total de informes

    // Calcular la media de habilidades para cada jugador y la suma de todas las MediaInforme
    informs.forEach((inform) => {
      const playerId = inform.PlayerId.toString();
      const SkillsTacticas = inform.SkillsTacticas[0];

      if (!playerMetrics[playerId]) {
        playerMetrics[playerId] = {
          Anticipación: [],
          Colocación: [],
          Concentración: [],
          Contundencia: [],
          Desdoble: [],
          Desmarque: [],
          Posicionamientos: [],
          VisiónDeJuego: [],
          totalMediaInforme: 0,
          informCount: 0,
        };
      }

      playerMetrics[playerId].Anticipación.push(SkillsTacticas.Anticipación);
      playerMetrics[playerId].Colocación.push(SkillsTacticas.Colocación);
      playerMetrics[playerId].Concentración.push(SkillsTacticas.Concentración);
      playerMetrics[playerId].Contundencia.push(SkillsTacticas.Contundencia);
      playerMetrics[playerId].Desdoble.push(SkillsTacticas.Desdoble);
      playerMetrics[playerId].Desmarque.push(SkillsTacticas.Desmarque);
      playerMetrics[playerId].Posicionamientos.push(SkillsTacticas.Posicionamientos);
      playerMetrics[playerId].VisiónDeJuego.push(SkillsTacticas.VisiónDeJuego);

      playerMetrics[playerId].totalMediaInforme += inform.MediaInforme;
      playerMetrics[playerId].informCount++;
      totalMediaInforme += inform.MediaInforme;
      totalInformes++;
    });

    // Calcular la media de habilidades para cada jugador y actualizar la MediaGlobal
    for (let playerId in playerMetrics) {
      const playerMetric = playerMetrics[playerId];

      const mediaAnticipación = calculateAverage(playerMetric.Anticipación);
      const mediaColocación = calculateAverage(playerMetric.Colocación);
      const mediaConcentración = calculateAverage(playerMetric.Concentración);
      const mediaContundencia = calculateAverage(playerMetric.Contundencia);
      const mediaDesdoble = calculateAverage(playerMetric.Desdoble);
      const mediaDesmarque = calculateAverage(playerMetric.Desmarque);
      const mediaPosicionamientos = calculateAverage(playerMetric.Posicionamientos);
      const mediaVisiónDeJuego = calculateAverage(playerMetric.VisiónDeJuego);

      const mediaGlobal = playerMetric.informCount > 0
        ? playerMetric.totalMediaInforme / playerMetric.informCount
        : 0;

      const existingPlayerMetric = await PmetricsModel.findOne({ PlayerId: playerId });

      if (existingPlayerMetric) {
        // Actualizar el documento existente con los nuevos valores
        existingPlayerMetric.Anticipación = mediaAnticipación;
        existingPlayerMetric.Colocación = mediaColocación;
        existingPlayerMetric.Concentración = mediaConcentración;
        existingPlayerMetric.Contundencia = mediaContundencia;
        existingPlayerMetric.Desdoble = mediaDesdoble;
        existingPlayerMetric.Desmarque = mediaDesmarque;
        existingPlayerMetric.Posicionamientos = mediaPosicionamientos;
        existingPlayerMetric.VisiónDeJuego = mediaVisiónDeJuego;
        existingPlayerMetric.mediaGlobal = mediaGlobal;
        await existingPlayerMetric.save();
      } else {
        // Crear un nuevo documento si no existe uno con el mismo PlayerId
        const newPlayerMetric = new PmetricsModel({
          PlayerId: playerId,
          Anticipación: mediaAnticipación,
          Colocación: mediaColocación,
          Concentración: mediaConcentración,
          Contundencia: mediaContundencia,
          Desdoble: mediaDesdoble,
          Desmarque: mediaDesmarque,
          Posicionamientos: mediaPosicionamientos,
          VisiónDeJuego: mediaVisiónDeJuego,
          mediaGlobal: mediaGlobal,
        });

        await newPlayerMetric.save();
      }
    }

    // Calcular el rating de jugador
    const globalMediaGlobal = totalInformes > 0
      ? totalMediaInforme / totalInformes
      : 0;
    
    console.log(globalMediaGlobal);

    // Actualizar el campo Rating de todos los jugadores en la colección Players
    // await PlayersModel.updateOne({id: id}, { Rating: globalMediaGlobal });
    
    try {
      const MetricUpdated = await PlayersModel.updateOne({_id: id}, { Rating: globalMediaGlobal });
      console.log(MetricUpdated)
    } catch (error) {
      console.log(error)
    }

    console.log('Cálculo de métricas de jugador completado');

    // ... puedes realizar otras acciones o retornar algún valor si es necesario
  } catch (error) {
    console.error('Error al calcular las métricas de jugador:', error);
  }
};

// Calcular la media de Media de SkillsFísicas y la MediaGlobal y almacenarlas en la colección "player-metrics"
export const calculateSkillsFísicas = async (id) => {
  try {
    console.log(id);
    const informs = await InformModel.find({PlayerId: id}); // Obtener todos los informes
    console.log(informs)
    const playerMetrics = {};
    let totalMediaInforme = 0; // Variable para almacenar la suma de todas las MediaInforme
    let totalInformes = 0; // Variable para almacenar el número total de informes

    // Calcular la media de habilidades para cada jugador y la suma de todas las MediaInforme
    informs.forEach((inform) => {
      const playerId = inform.PlayerId.toString();
      const SkillsFísicas = inform.SkillsFísicas[0];

      if (!playerMetrics[playerId]) {
        playerMetrics[playerId] = {
          Agilidad: [],
          Flexibilidad: [],
          Fuerza: [],
          Potencia: [],
          Resistencia: [],
          Salto: [],
          Velocidad: [],
          totalMediaInforme: 0,
          informCount: 0,
        };
      }

      playerMetrics[playerId].Agilidad.push(SkillsFísicas.Agilidad);
      playerMetrics[playerId].Flexibilidad.push(SkillsFísicas.Flexibilidad);
      playerMetrics[playerId].Fuerza.push(SkillsFísicas.Fuerza);
      playerMetrics[playerId].Potencia.push(SkillsFísicas.Potencia);
      playerMetrics[playerId].Resistencia.push(SkillsFísicas.Resistencia);
      playerMetrics[playerId].Salto.push(SkillsFísicas.Salto);
      playerMetrics[playerId].Velocidad.push(SkillsFísicas.Posicionamientos);
      playerMetrics[playerId].totalMediaInforme += inform.MediaInforme;
      playerMetrics[playerId].informCount++;
      totalMediaInforme += inform.MediaInforme;
      totalInformes++;
    });

    // Calcular la media de habilidades para cada jugador y actualizar la MediaGlobal
    for (let playerId in playerMetrics) {
      const playerMetric = playerMetrics[playerId];

      const mediaAgilidad = calculateAverage(playerMetric.Agilidad);
      const mediaFlexibilidad = calculateAverage(playerMetric.Flexibilidad);
      const mediaFuerza = calculateAverage(playerMetric.Fuerza);
      const mediaPotencia = calculateAverage(playerMetric.Potencia);
      const mediaResistencia = calculateAverage(playerMetric.Resistencia);
      const mediaSalto = calculateAverage(playerMetric.Salto);
      const mediaVelocidad = calculateAverage(playerMetric.Velocidad);
      const mediaGlobal = playerMetric.informCount > 0
        ? playerMetric.totalMediaInforme / playerMetric.informCount
        : 0;

      const existingPlayerMetric = await PmetricsModel.findOne({ PlayerId: playerId });

      if (existingPlayerMetric) {
        // Actualizar el documento existente con los nuevos valores
        existingPlayerMetric.Agilidad = mediaAgilidad;
        existingPlayerMetric.Flexibilidad = mediaFlexibilidad;
        existingPlayerMetric.Fuerza = mediaFuerza;
        existingPlayerMetric.Potencia = mediaPotencia;
        existingPlayerMetric.Resistencia = mediaResistencia;
        existingPlayerMetric.Salto = mediaSalto;
        existingPlayerMetric.Velocidad = mediaVelocidad;
        existingPlayerMetric.mediaGlobal = mediaGlobal;
        await existingPlayerMetric.save();
      } else {
        // Crear un nuevo documento si no existe uno con el mismo PlayerId
        const newPlayerMetric = new PmetricsModel({
          PlayerId: playerId,
          Agilidad: mediaAgilidad,
          Flexibilidad: mediaFlexibilidad,
          Fuerza: mediaFuerza,
          Potencia: mediaPotencia,
          Resistencia: mediaResistencia,
          Salto: mediaSalto,
          Velocidad: mediaVelocidad,
          mediaGlobal: mediaGlobal,
        });

        await newPlayerMetric.save();
      }
    }

    // Calcular el rating de jugador
    const globalMediaGlobal = totalInformes > 0
      ? totalMediaInforme / totalInformes
      : 0;
    
    console.log(globalMediaGlobal);

    // Actualizar el campo Rating de todos los jugadores en la colección Players
    // await PlayersModel.updateOne({id: id}, { Rating: globalMediaGlobal });
    
    try {
      const MetricUpdated = await PlayersModel.updateOne({_id: id}, { Rating: globalMediaGlobal });
      console.log(MetricUpdated)
    } catch (error) {
      console.log(error)
    }

    console.log('Cálculo de métricas de jugador completado');

    // ... puedes realizar otras acciones o retornar algún valor si es necesario
  } catch (error) {
    console.error('Error al calcular las métricas de jugador:', error);
  }
};

// Calcular el promedio de un arreglo de números
const calculateAverage = (array) => {
  const sum = array.reduce((a, b) => a + b, 0);
  const average = sum / array.length;
  return isNaN(average) ? 0 : average;
};
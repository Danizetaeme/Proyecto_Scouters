import InformModel from '../models/InformModel.js';
import PmetricsModel from '../models/PMetricsModel.js';

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

// Calcular la media de habilidades y la MediaGlobal y almacenarlas en la colección "player-metrics"
export const calculatePlayerMetrics = async (id) => {
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
      const habilidades = inform.habilidades[0];

      if (!playerMetrics[playerId]) {
        playerMetrics[playerId] = {
          Ofensiva: [],
          Tecnica: [],
          Movimiento: [],
          Potencia: [],
          Mentalidad: [],
          Defensa: [],
          totalMediaInforme: 0,
          informCount: 0,
        };
      }

      playerMetrics[playerId].Ofensiva.push(habilidades.Ofensiva);
      playerMetrics[playerId].Tecnica.push(habilidades.Tecnica);
      playerMetrics[playerId].Movimiento.push(habilidades.Movimiento);
      playerMetrics[playerId].Potencia.push(habilidades.Potencia);
      playerMetrics[playerId].Mentalidad.push(habilidades.Mentalidad);
      playerMetrics[playerId].Defensa.push(habilidades.Defensa);

      playerMetrics[playerId].totalMediaInforme += inform.MediaInforme;
        // playerMetrics[playerId].totalMediaInforme = playerMetrics[playerId].totalMediaInforme + inform.MediaInforme;
      playerMetrics[playerId].informCount++;
      totalMediaInforme += inform.MediaInforme;
      totalInformes++;
    });

    // Calcular la media de habilidades para cada jugador y actualizar la MediaGlobal
    for (let playerId in playerMetrics) {
      const playerMetric = playerMetrics[playerId];

      const mediaOfensiva = calculateAverage(playerMetric.Ofensiva);
      const mediaTecnica = calculateAverage(playerMetric.Tecnica);
      const mediaMovimiento = calculateAverage(playerMetric.Movimiento);
      const mediaPotencia = calculateAverage(playerMetric.Potencia);
      const mediaMentalidad = calculateAverage(playerMetric.Mentalidad);
      const mediaDefensa = calculateAverage(playerMetric.Defensa);
      const mediaGlobal = playerMetric.informCount > 0
        ? playerMetric.totalMediaInforme / playerMetric.informCount
        : 0;

      const existingPlayerMetric = await PmetricsModel.findOne({ PlayerId: playerId });

      if (existingPlayerMetric) {
        // Actualizar el documento existente con los nuevos valores
        existingPlayerMetric.Ofensiva = mediaOfensiva;
        existingPlayerMetric.Tecnica = mediaTecnica;
        existingPlayerMetric.Movimiento = mediaMovimiento;
        existingPlayerMetric.Potencia = mediaPotencia;
        existingPlayerMetric.Mentalidad = mediaMentalidad;
        existingPlayerMetric.Defensa = mediaDefensa;
        existingPlayerMetric.mediaGlobal = mediaGlobal;
        await existingPlayerMetric.save();
      } else {
        // Crear un nuevo documento si no existe uno con el mismo PlayerId
        const newPlayerMetric = new PmetricsModel({
          PlayerId: playerId,
          Ofensiva: mediaOfensiva,
          Tecnica: mediaTecnica,
          Movimiento: mediaMovimiento,
          Potencia: mediaPotencia,
          Mentalidad: mediaMentalidad,
          Defensa: mediaDefensa,
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





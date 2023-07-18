<<<<<<< HEAD



=======
>>>>>>> 154561e74719ee07d5ca7a5580c91b65ad8182ec
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pmetricsSchema = new Schema(
  {
    PlayerId: {
      type: Schema.Types.ObjectId,
      ref: "PlayersModel",
      required: true,
    },
    mediaGlobal: { type: Number },
    SkillsPrincipales: [
      {
        ControlDelBalon: { type: Number, required: true },
        Disparo: { type: Number, required: true },
        Cabeza: { type: Number, required: true },
        Asociacion: { type: Number, required: true },
        PieDerecho: { type: Number },
        PieIzquierdo: { type: Number },
        PasesLargos: { type: Number, required: true },
        Dribling: { type: Number, required: true },
        Reflejos: { type: Number, required: true },
        Centros: { type: Number, required: true },
        // mediaGlobalPrincipales: { type: Number },
        mediaGlobal: { type: Number },
      },
    ],
    SkillsTacticas: [
      {
        Anticipacion: { type: Number, required: true },
        Colocacion: { type: Number, required: true },
        Concentracion: { type: Number, required: true },
        Contundencia: { type: Number, required: true },
        Desdoble: { type: Number, required: true },
        Desmarque: { type: Number, required: true },
        Posicionamientos: { type: Number, required: true },
        VisionDeJuego: { type: Number, required: true },
        // mediaGlobalTacticas: { type: Number },
        mediaGlobal: { type: Number },
      },
    ],
    SkillsFisicas: [
      {
        Agilidad: { type: Number, required: true },
        Flexibilidad: { type: Number, required: true },
        Fuerza: { type: Number, required: true },
        Potencia: { type: Number, required: true },
        Resistencia: { type: Number, required: true },
        Salto: { type: Number, required: true },
        Velocidad: { type: Number, required: true },
        // mediaGlobalFisicas: { type: Number },
        mediaGlobal: { type: Number },
      },
    ],
    Created_At: { type: Date, default: Date.now },
  },
  { collection: 'playermetrics',versionKey: false }
);
// Redondear las medias de habilidades y la media global hacia números enteros
pmetricsSchema.pre('save', function (next) {
  this.ControlDelBalón = Math.round(this.ControlDelBalón);
  this.Disparo = Math.round(this.Disparo);
  this.Cabeza = Math.round(this.Cabeza);
  this.Asociación = Math.round(this.Asociación);
  this.PieDerecho = Math.round(this.PieDerecho);
  this.PieIzquierdo = Math.round(this.PieIzquierdo);
  this.PasesLargos = Math.round(this.PasesLargos);
  this.Dribling = Math.round(this.Dribling);
  this.Reflejos = Math.round(this.Reflejos);
  this.Centros = Math.round(this.Centros);
  this.mediaGlobal = Math.round(this.mediaGlobal);

  this.Anticipación = Math.round(this.Anticipación);
  this.Colocación = Math.round(this.Colocación);
  this.Concentración = Math.round(this.Concentración);
  this.Contundencia = Math.round(this.Contundencia);
  this.Desdoble = Math.round(this.Desdoble);
  this.Desmarque = Math.round(this.Desmarque);
  this.Posicionamientos = Math.round(this.Posicionamientos);
  this.VisiónDeJuego = Math.round(this.VisiónDeJuego);
  this.mediaGlobal = Math.round(this.mediaGlobal);

  this.Agilidad = Math.round(this.Agilidad);
  this.Flexibilidad = Math.round(this.Flexibilidad);
  this.Fuerza = Math.round(this.Fuerza);
  this.Potencia = Math.round(this.Potencia);
  this.Resistencia = Math.round(this.Desdoble);
  this.Salto = Math.round(this.Desmarque);
  this.Velocidad = Math.round(this.Posicionamientos);
  this.mediaGlobal = Math.round(this.mediaGlobal);

  next();
});

const PmetricsModel = mongoose.model('PmetricsModel', pmetricsSchema);

export default PmetricsModel;
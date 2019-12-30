/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntaVotada = new Evento(this);
  this.aplicacionIniciada = new Evento(this);
  this.checkLocalStorage();
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    var primerId = -1;
    for (var i = 0; i < this.preguntas.length; ++i) {
      if (this.preguntas[i].id > primerId)
        primerId = this.preguntas[i].id;
    }
    return primerId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },


  borrarPregunta: function (identificar) {
    for (var i in this.preguntas) {
      if (this.preguntas[i].id == identificar) {
        this.preguntas.splice(i, 1);

      }
    }
    this.guardar();
    this.resetLocalStorage();
    this.preguntaEliminada.notificar();
  },

  //se guardan las preguntas
  guardar: function () {
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas))
  },

  borrarPregunta: function (identificador) {
    for (var i in this.preguntas) {
      if (this.preguntas[i].id == identificador) {
        this.preguntas.splice(i, 1);

      }
    }
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  borrarTodasLasPreguntas: function () {
    this.preguntas = [];
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  agregarVotos: function (pregunta, respuesta) {
    for (var i = 0; i < pregunta.cantidadPorRespuesta.length; ++i) {
      if (pregunta.cantidadPorRespuesta[i].textoRespuesta === respuesta) {
        var indicePregunta = -1;
        for (var j = 0; j < this.preguntas.length; ++j) {
          if (this.preguntas[j].textoPregunta === pregunta.textoPregunta) {
            indicePregunta = j;
          }
        }
        pregunta.cantidadPorRespuesta[i].cantidad += 1;
        this.preguntas.splice(indicePregunta, 1, pregunta);
      }
    }
    this.guardar();
    this.preguntaVotada.notificar();
  },

  obtenerPregunta: function(valor){
    var identificador;
    if(typeof valor == 'number'){
      identificador = 'id';
    }
    else{
      identificador = 'textoPregunta'
    }
    for(var i=0;i<this.preguntas.length;++i){
      if(this.preguntas[i][identificador] === valor){
        return this.preguntas[i];
      }
    }
    throw new Error("La pregunta no está definida");
  },

  editarPregunta: function (identificador, texto) {
    question = this.preguntas.find(pregunta => pregunta.id == identificador)
    question.textoPregunta = texto;
    this.guardar();
    this.preguntaEditada.notificar()
  },

  checkLocalStorage: function () {
    if (localStorage.getItem('preguntas') !== null) {
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    }
  },

  resetLocalStorage: function () {
    localStorage.setItem('preguntas', JSON.stringify([]));
  },
};



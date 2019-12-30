/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
};

Controlador.prototype.borrarPregunta = function(id){
  if( isNaN(id)==false){
  this.modelo.borrarPregunta(id);
  }
};

Controlador.prototype.agregarVotos = function(nombrePregunta, respuestaSeleccionada){
  this.modelo.agregarVotos(nombrePregunta, respuestaSeleccionada)
};

Controlador.prototype.editarPregunta = function(id){
  if( isNaN(id)==false){
  var texto = prompt("Escriba su pregunta");
    if((texto !== NaN) && (texto !== undefined)&&(texto !== null)&& (texto.length>0)){
      this.modelo.editarPregunta(id, texto);
    }
  }
};

Controlador.prototype.borrarTodo = function(){
  this.modelo.borrarTodasLasPreguntas();
};


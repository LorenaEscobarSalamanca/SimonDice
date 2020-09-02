const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 10;

class Juego {

  constructor() {
    this.inicializar();
    this.generarSecuencia();
    setTimeout (()=> this.nextLevel(), 500);
    this.inicializar = this.inicializar.bind(this);
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.toogleBtnEmpezar();
    this.nivel = 1;
    this.colores = {
        celeste, 
        violeta,
        naranja,
        verde
    }   
  }

  toogleBtnEmpezar(){
      if (btnEmpezar.classList.contains('hide')){
        btnEmpezar.classList.remove('hide');
      } else {
        btnEmpezar.classList.add('hide');
      }
    
  }

  generarSecuencia(){
      this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map( n => Math.floor(Math.random()*4));
      console.log (this.secuencia);
  }

  nextLevel(){
    this.subNivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
 }

  transformarNumeroaColor(numero){
    switch (numero){
        case 0:
            return "celeste";

        case 1:
            return "violeta";
        
        case 2:
            return "naranja";

        case 3:
            return "verde";
    }
  }

  transformarColoraNumero(color){
    switch (color){
        case "celeste":
            return 0;

        case "violeta":
            return 1;
        
        case "naranja":
            return 2;

        case "verde":
            return 3;
    }
  }

  iluminarSecuencia(){
      for(let i = 0; i < this.nivel; i++ ){
        const color = this.transformarNumeroaColor(this.secuencia[i]);
        console.log (color);
        setTimeout(() => this.iluminarColor(color) , 1000*i );
      }
  }

  
  iluminarColor(color){
      this.colores[color].classList.add('light');
      setTimeout(()=> this.apagarColor(color),500);
  }

  apagarColor(color){
    this.colores[color].classList.remove('light');
  }

  agregarEventosClick(){
      this.colores.celeste.addEventListener('click', this.elegirColor);
      this.colores.violeta.addEventListener('click', this.elegirColor);
      this.colores.naranja.addEventListener('click', this.elegirColor);
      this.colores.verde.addEventListener('click', this.elegirColor);
  }

  eliminarEventosClic(){
      this.colores.celeste.removeEventListener('click', this.elegirColor);
      this.colores.violeta.removeEventListener('click', this.elegirColor);
      this.colores.naranja.removeEventListener('click', this.elegirColor);
      this.colores.verde.removeEventListener('click', this.elegirColor);
  }

  elegirColor(evt){
      const nombreColor = evt.target.dataset.color;
      const numeroColor = this.transformarColoraNumero(nombreColor);
      this.iluminarColor(nombreColor);

      if (numeroColor === this.secuencia[this.subNivel]){
          this.subNivel ++;
          if (this.subNivel === this.nivel){
              this.nivel ++;
              this.eliminarEventosClic();
              if (this.nivel === (ULTIMO_NIVEL+1)){
                this.ganoJuego();
              } else {
                  setTimeout(this.nextLevel , 2000 );
              }
          } 
      } else {
          this.perdioJuego();
      }
  }

  ganoJuego(){
    swal("Simon Dice:",'Felicitaciones, GANASTE!!!', 'success')
    .then(this.inicializar());
  }

  perdioJuego(){
    swal("Simon Dice:",'Lo siento, PERDISTE =( ', 'error')
    .then(()=>{
        this.eliminarEventosClic();
        this.inicializar();
    })
  }

}

function empezarJuego() {
  window.juego = new Juego()
}



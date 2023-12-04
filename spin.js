import {listados, listaactual, selectRecordBasedOnProbability, padLeft} from './listados.js';
import { tableganador } from './tabla.js';



const slotSymbols = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
  ];
  export function createSymbolElement(symbol) {
    const div = document.createElement("div");
    div.classList.add("symbol");
    div.textContent = symbol;
  
    return div;
  }
  
  export function spin() {
  
    const slots = document.querySelectorAll(".slot");
    let completedSlots = 0;
  
    slots.forEach((slot, index) => {
      const symbols = slot.querySelector(".symbols");
      const symbolHeight = symbols.querySelector(".symbol")?.clientHeight;
      const symbolCount = symbols.childElementCount;
      //const symbolHeight = symbols.querySelector(".symbol")?.clientHeight;
      //const symbolCount = symbols.childElementCount;
  
      symbols.innerHTML = "";
  
      symbols.appendChild(createSymbolElement("❓"));
  
  
      for (let i = 0; i < 5; i++) {
        slotSymbols[index].forEach((symbol) => {
          symbols.appendChild(createSymbolElement(symbol));
        });
      }
  
      const totalDistance = symbolCount * symbolHeight;
      /*  const totalDistance = symbolCount * symbolHeight;
         const randomOffset =
           -Math.floor(Math.random() * (symbolCount - 1) + 1) *
           symbolHeight;
         symbols.style.top = `${randomOffset}px`;*/
  
    });
  
  
  }
  
  
  
  /*function reset() {
    const slots = document.querySelectorAll(".slot");
    slots.forEach((slot) => {
      const symbols = slot.querySelector(".symbols");
      symbols.style.transition = "none";
      symbols.style.top = "0";
      symbols.offsetHeight;
      symbols.style.transition = "";
    });
  }*/
  
  spin();
  
  let spun = false;
  
  
  
  
  export function stopAtSymbols(desiredSymbols, id, nombre) {
    if (spun) {
      reset();
    }
    const slots = document.querySelectorAll(".slot");
    let completedSlots = 0;
  
    slots.forEach((slot, index) => {
      const symbols = slot.querySelector(".symbols");
      const symbolHeight = symbols.querySelector(".symbol")?.clientHeight;
      const symbolCount = symbols.childElementCount;
  
      // Iniciar la animación suave
      const symbol = symbols.querySelector(".symbol");
  
  
      const stopSymbolIndex = slotSymbols[index].indexOf(desiredSymbols[index]);
  
  
      // Calculate the number of symbols to show before stopping
      const symbolsToShow = symbolCount * 2 + stopSymbolIndex;
      const finalPosition = stopSymbolIndex * symbolHeight * -1;
      symbols.innerHTML = "";
      animateSymbols(symbols, finalPosition);
      for (let i = 0; i < symbolsToShow; i++) {
        symbols.appendChild(
          createSymbolElement(
            slotSymbols[index][i % symbolCount]
          )
        );
      }
  
      let exploding = false;
      const defaults = {
        particleCount: 500,
        spread: 80,
        angle: 50,
      };
      const fire = (particleRatio, opts) => {
        confetti(
          Object.assign({}, defaults, opts, {
            particleCount: Math.floor(defaults.particleCount * particleRatio),
          })
        );
      };
      symbols.addEventListener("transitionend", () => {
        if (exploding) {
          return;
        }
        exploding = true;
        symbols.classList.add("animate__rubberBand");
        window.setTimeout(() => {
          fire(0.25, {
            spread: 260,
            startVelocity: 55,
          });
          fire(0.2, {
            spread: 260,
          });
          fire(0.35, {
            spread: 260,
            decay: 0.91,
            scalar: 0.8,
          });
          fire(0.1, {
            spread: 260,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
          });
          fire(0.1, {
            spread: 2600,
            startVelocity: 45,
          });
          window.setTimeout(() => {
            symbols.classList.remove("animate__rubberBand");
            //  exploding = false;
            Swal.fire('EL GANADOR ES:', id.toString() + ' -- ' + nombre.toString())
          }, 300);
        }, 300);
        //  Swal.fire('SOCIO NRO:', id.toString() + ' -- ' + nombre.toString())
      });
      symbols.style.transition = "top 1s easy";
      symbols.style.top = `${finalPosition}px`;
    });
    spun = true;
  }
  export function animateSymbols(symbols, finalPosition) {
    let startTimestamp;
    const duration = 0.1; // Duración de la animación en milisegundos
  
    function step(timestamp) {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }
      const progress = (timestamp - startTimestamp) / duration;
      if (progress < 1) {
        const newPosition = finalPosition * progress;
        symbols.style.top = newPosition + 'px';
        requestAnimationFrame(step);
      } else {
        // La animación ha terminado
        symbols.style.top = finalPosition + 'px';
      }
    }
  
    requestAnimationFrame(step);
  }
  
  export const spinner = {
    intervalId: null,
    startSpinning: function () {
      const hayRegistros = listados();
  
      if (hayRegistros != null) {
        const slots = document.querySelectorAll(".slot");
        this.intervalId = setInterval(() => {
          slots.forEach((slot, index) => {
            const symbols = slot.querySelector(".symbols");
  
            const symbolHeight = symbols.querySelector(".symbol")?.clientHeight;
            const symbolCount = symbols.childElementCount;
  
            symbols.innerHTML = "";
            symbols.appendChild(createSymbolElement("❓"));
  
            for (let i = 0; i < 50; i++) {
              slotSymbols[index].forEach((symbol) => {
                symbols.appendChild(createSymbolElement(symbol));
              });
            }
  
            const totalDistance = symbolCount * symbolHeight;
  
  
            const randomOffset =
              -Math.floor(Math.random() * (symbolCount - 1) + 1) * symbolHeight;
            // symbols.style.transition = "top 0.5s ease-in-out"; // Añade transición suave
            //symbols.style.transition = "top 0.5s ease-in-out";
  
            symbols.style.top = `${randomOffset}px`;
  
          });
        }, 200); // Cambia el valor según la velocidad deseada
  
      }
    },
    stopSpinning: function () {
      setTimeout(() => {
        clearInterval(this.intervalId); // Detener el giro después de cierto tiempo
      }, 0.52);
      resettombola();
      console.log(1)
      stopAtDesiredSymbols();
    },
  
  };

function resettombola() {
  const slots = document.querySelectorAll(".slot");
  slots.forEach((slot) => {
    const symbols = slot.querySelector(".symbols");
    symbols.style.transition = "none";
    symbols.style.top = "0";
    symbols.offsetHeight;
    symbols.style.transition = "";

  });

}

  export function stopAtDesiredSymbols() {

    const hayRegistros = listados();
  
    if (hayRegistros != null) {
      let valoractual = listaactual();
  
      const values = selectRecordBasedOnProbability(valoractual);
  
      const Listado_Actual = valoractual.filter((actual) => actual.ID !== values.ID);
      valoractual = Listado_Actual;
      localStorage.setItem('Listado_Actual', JSON.stringify(valoractual));
  
  
      let Listado_Sorteado = JSON.parse(localStorage.getItem('Listado_Sorteado'));
  
      Listado_Sorteado.push(values);
  
      // Store the updated Listado_Sorteado back in localStorage
      localStorage.setItem('Listado_Sorteado', JSON.stringify(Listado_Sorteado));
  
      let ganadores = Listado_Sorteado;
  
      console.log(Listado_Actual);
      console.log(ganadores);
  
  
      var str = values.ID.toString();
      let res = [];
  
      for (var i = 0, len = str.length; i < len; i += 1) {
        res.push(str.charAt(i));
      }
      console.log("[" + res + "]");
  
  
      const formattedValue = padLeft(values.ID, 6, '0');
      console.log(formattedValue)
      //  console.log("[" + symb + "]");
      stopAtSymbols(formattedValue, values.ID, values.NAME);
  
      //document.getElementById("arm").removeAttribute("disabled");
      tableganador(values)
  
    }
  
  }
  
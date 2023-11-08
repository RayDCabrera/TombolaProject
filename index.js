const slotSymbols = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
];
function createSymbolElement(symbol) {
  const div = document.createElement("div");
  div.classList.add("symbol");
  div.textContent = symbol;

  return div;
}

let spinning = false
function spin() {
  const slots = document.querySelectorAll(".slot");
  let completedSlots = 0;

  slots.forEach((slot, index) => {
    const symbols = slot.querySelector(".symbols");
    // const symbolHeight = symbols.querySelector(".symbol")?.clientHeight;
    // const symbolCount = symbols.childElementCount;

    symbols.innerHTML = "";

    symbols.appendChild(createSymbolElement("❓"));


    for (let i = 0; i < 5; i++) {
      slotSymbols[index].forEach((symbol) => {
        symbols.appendChild(createSymbolElement(symbol));
      });
    }




    /*   const totalDistance = symbolCount * symbolHeight;
       const randomOffset =
-Math.floor(Math.random() * (symbolCount - 1) + 1) *
         symbolHeight;
       symbols.style.top = `${randomOffset}px`;
 */
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
function stopAtSymbols(desiredSymbols, id, nombre) {
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
          Swal.fire('SOCIO NRO:', id.toString() + ' -- ' + nombre.toString())
        }, 300);
      }, 300);
      //  Swal.fire('SOCIO NRO:', id.toString() + ' -- ' + nombre.toString())
    });
    symbols.style.transition = "top 2s easy";
    symbols.style.top = `${finalPosition}px`;
  });
  spun = true;
}



function listados() {
  localStorage.setItem('Listado_Participantes', JSON.stringify(records));
  if (records == false) {
    // console.log("ola",records)
    document.getElementById("arm").disabled = true;
    // alert("POR FAVOR SELECCIONE PRIMERO EL ARCHIVO CSV");
    Swal.fire('POR FAVOR SELECCIONE EL ARCHIVO')
    return null;

  } else {
    let participantes = JSON.parse(localStorage.getItem('Listado_Participantes'));
    return participantes;
  }
}

function listaactual() {
  // localStorage.setItem('Listado_Actual', JSON.stringify(listados(participantes)));
  let actual = JSON.parse(localStorage.getItem('Listado_Actual'));
  return actual;
}

function resetlistados() {
  let participantes = []
  document.getElementById("reset").addEventListener('click', () => {
    localStorage.setItem('Listado_Actual', JSON.stringify(listados(participantes)));
    localStorage.removeItem('Listado_Sorteado');

    let Listado_Sorteado = []
    localStorage.setItem('Listado_Sorteado', JSON.stringify(Listado_Sorteado));
    const slots = document.querySelectorAll(".slot");
    slots.forEach((slot) => {
      const symbols = slot.querySelector(".symbols");
      symbols.style.transition = "none";
      symbols.style.top = "0";
      symbols.offsetHeight;
      symbols.style.transition = "";
      spin();
    });
  });
}

function reset() {
  const slots = document.querySelectorAll(".slot");
  slots.forEach((slot) => {
    const symbols = slot.querySelector(".symbols");
    symbols.style.transition = "none";
    symbols.style.top = "0";
    symbols.offsetHeight;
    symbols.style.transition = "";
    spin();
  });
}
document.getElementById("reset").addEventListener('click', resetlistados);

function animateSymbols(symbols, finalPosition) {
  let startTimestamp;
  const duration = 1000; // Duración de la animación en milisegundos

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
let animationFrameId = null; // Variable para almacenar el ID del frame de animación

/*function startAnimation() {
  const slots = document.querySelectorAll(".slot");

  slots.forEach((slot, index) => {
    const symbols = slot.querySelector(".symbols");
    const initialTop = symbols.getBoundingClientRect().top;
    animate();
    function animate() {
      if (!spinning) {
        const randomOffset = -Math.floor(Math.random() * (slotSymbols[index].length - 1) + 1) * (symbols.clientHeight / 20);
        symbols.style.transform = `translateY(${initialTop + randomOffset}px)`;
        animationFrameId = requestAnimationFrame(animate); // Almacenar el ID del frame de animación
      }
      else{
        stopAnimation() 
        reset();
      }
    }

    //animate();
  });
}*/
function startAnimation() {
  const slots = document.querySelectorAll(".slot");
  let animationFrameIds = [];

  slots.forEach((slot, index) => {
    const symbols = slot.querySelector(".symbols");
    const initialTop = symbols.getBoundingClientRect().top;

    function animate() {
      if (!spinning) {
        const randomOffset = -Math.floor(Math.random() * (slotSymbols[index].length - 1) + 1) * (symbols.clientHeight / 20);
        symbols.style.transform = `translateY(${initialTop + randomOffset}px`;
        animationFrameIds[index] = requestAnimationFrame(animate);
     }
    }

    animate();

  });

  return animationFrameIds; // Devuelve un arreglo de identificadores de animación
}
let animationFrameIds = [];

// Para detener la animación:
function stopAnimation() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId); // Cancelar la animación
    animationFrameId = null; // Restablecer el ID del frame de animación
  }
}


function parar() {
  spinning = true;
if (animationFrameIds.length > 0) {
    for (const animationFrameId of animationFrameIds) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameIds = [];
  }
 reset()
}

function resetearbusqueda(){
  const slots = document.querySelectorAll(".slot");
  slots.forEach((slot) => {
    const symbols = slot.querySelector(".symbols");
    symbols.style.transition = "none";
    symbols.style.top = "0";
    symbols.offsetHeight;
    symbols.style.transition = "";
    //stopAtDesiredSymbols()
    spin()
  });
}
document.getElementById("Stop").addEventListener('click', parar);

function stopAtDesiredSymbols() {
  const hayRegistros = listados();
 /* if (spinning === false) {
    startAnimation()
  }*/
  if (spinning === true) {


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

      /*const value = res;
      const symb = [];
      
      if (value.length === 1) {
        for (var i = 0; i < 5; i++) {
          symb.push("0");
        }
        for (var i = 0; i < value.length; i++) {
          symb.push(value[i].toString());
        }
      } else if (value.length === 2) {
        for (var i = 0; i < 4; i++) {
          symb.push("0");
        }
        for (var i = 0; i < value.length; i++) {
          symb.push(value[i].toString());
        }
      } else if (value.length === 3) {
        for (var i = 0; i < 3; i++) {
          symb.push("0");
        }
        for (var i = 0; i < value.length; i++) {
          symb.push(value[i].toString());
        }
      } else if (value.length === 4) {
        for (var i = 0; i < 2; i++) {
          symb.push("0");
        }
        for (var i = 0; i < value.length; i++) {
          symb.push(value[i].toString());
        }
      } else if (value.length === 5) {
        symb.push("0");
        for (var i = 0; i < value.length; i++) {
          symb.push(value[i].toString());
        }
      } else if (value.length === 6) {
        for (var i = 0; i < value.length; i++) {
          symb.push(value[i].toString());
        }
      }*/

      const formattedValue = padLeft(values.ID, 6, '0');
      console.log(formattedValue)
      //  console.log("[" + symb + "]");
      stopAtSymbols(formattedValue, values.ID, values.NAME);

      document.getElementById("arm").removeAttribute("disabled");
    }
  }
}

function padLeft(value, length, padChar) {
  const strValue = value.toString();
  if (strValue.length >= length) {
    return strValue;
  }
  const padding = padChar.repeat(length - strValue.length);
  return padding + strValue;
}


function validacion(value) {

}

function ListadoSorteados() {
  // Obtener los sorteos almacenados en localStorage
  const sorteados = JSON.parse(localStorage.getItem('Listado_Sorteado'));

  // Asegurarse de que haya un elemento en el HTML para mostrar la información
  const resultContainer = document.getElementById('listado');

  // Verificar si hay sorteos almacenados
  if (sorteados && sorteados.length > 0) {
    // Limpiar el contenido actual del contenedor si es necesario
    resultContainer.innerHTML = '';

    // Iterar a través de los sorteos y mostrar la información
    sorteados.forEach((sorteado) => {
      const info = document.createElement('div');
      info.textContent = `Socio Nro: ${sorteado.ID}`;
      resultContainer.appendChild(info);
    });
    $('#miModal').modal('show');
  } else {
    resultContainer.textContent = 'No hay sorteos almacenados.';
  }

}

document.getElementById('Sorteados').addEventListener('click', ListadoSorteados);


let records = [];
document.getElementById('csvFileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      records = parseCSV(contents);

    };
    reader.readAsText(file);
  }
});
function parseCSV(csvText) {
  const rows = csvText.split('\n');
  const parsedRecords = [];

  for (let i = 1; i < rows.length; i++) {
    const columns = rows[i].split(',');
    if (columns.length === 3) { // Ensure there are three columns
      const record = {
        'ID': parseInt(columns[0]),
        'NAME': columns[1],
        'COUPONS': parseInt(columns[2])
      };
      parsedRecords.push(record);

    }
  }
  return parsedRecords;
}

function selectRecordBasedOnProbability(records) {
  const totalCouponCount = records.reduce((total, record) => total + record.COUPONS, 0);
  const randomValue = Math.random() * totalCouponCount;
  let cumulativeProbability = 0;

  for (const record of records) {
    cumulativeProbability += record.COUPONS;
    if (cumulativeProbability >= randomValue) {
      return record;
    }

  }
  // If no record is selected (unlikely but possible due to rounding errors), return the last record
  return records[records.length - 1];
}

$(document).ready(function () {
  $('#arm').click(function (e) {
    var arm = $(this).addClass('clicked');
    //    delay = setTimeout(function () { arm.removeClass('clicked') }, 500);
    $(this).attr("disabled", true);
    e.preventDefault();
    //stopAtDesiredSymbols();
    startAnimation()


    // Habilitar el botón nuevamente después de 2 segundos
    setTimeout(function () {
      arm.removeClass('clicked');
      $('#arm').removeAttr("disabled");
    }, 4000); // 4 segundos
  });
});

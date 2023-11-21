
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

function spin() {

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
      //spin();
    });
  });
}

function reset() {
  const slots = document.querySelectorAll(".slot");
  slots.forEach((slot) => {
    const symbols = slot.querySelector(".symbols");
    symbols.innerHTML =
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

const spinner = {
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
      }, 1000); // Cambia el valor según la velocidad deseada

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
;

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

document.getElementById('Stop').addEventListener('click', function () {
  spinner.stopSpinning();
});
let currentDatosIndex = 0; // Variable para realizar un seguimiento del índice actual en listaDatos
function stopAtDesiredSymbols() {

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

    document.getElementById("arm").removeAttribute("disabled");
     tableganador(values)

  }

}


function tableganador(values) {
  // Obtener el dato actual de listaDatos según el índice actual
  const currentDato = listaDatos[currentDatosIndex];

  // Concatenar la información del ganador con los datos del dato actual
  const ganadorConDatos = {
    ...values,
    ...currentDato
  };


  // Create a new row for the winner
  const newRow = document.createElement("tr");

  // Add columns for each piece of data (adjust the properties accordingly)
  const idColumn = document.createElement("td");
  idColumn.textContent = ganadorConDatos.ID;
  newRow.appendChild(idColumn);

  const nameColumn = document.createElement("td");
  nameColumn.textContent = ganadorConDatos.NAME;
  newRow.appendChild(nameColumn);

  const PremioColumn = document.createElement("td");
  PremioColumn.textContent = ganadorConDatos["Descripción"];
  newRow.appendChild(PremioColumn);

  setTimeout(function() {
    const tableBody = document.querySelector("#tablaganador");
    tableBody.appendChild(newRow);

    currentDatosIndex = (currentDatosIndex + 1) % listaDatos.length;
  }, 3000); 

  currentDatosIndex = (currentDatosIndex + 1) % listaDatos.length;
}

function padLeft(value, length, padChar) {
  const strValue = value.toString();
  if (strValue.length >= length) {
    return strValue;
  }
  const padding = padChar.repeat(length - strValue.length);
  return padding + strValue;
}



/*document.getElementById("Stop").addEventListener("click", stoptombo)

function stoptombo() {
  reset();
  stopAtDesiredSymbols()

}*/



function ListadoSorteados() {
  // Obtener los sorteos almacenados en localStorage
  const sorteados = JSON.parse(localStorage.getItem('Listado_Sorteado'));

  // Asegurarse de que haya un elemento en el HTML para mostrar la información
  const resultContainer = document.getElementById('listado');

  // Verificar si hay sorteos almacenados
  if (sorteados && sorteados.length > 0) {
    // Limpiar el contenido actual del contenedor si es necesario
    resultContainer.innerHTML = '';

    // Crear una matriz para almacenar los datos a exportar
    const dataToExport = [['NRO SOCIO', 'NOMBRE']];

    // Iterar a través de los sorteos y mostrar la información
    sorteados.forEach((sorteado) => {
      const info = document.createElement('div');
      info.textContent = `Socio Nro: ${sorteado.ID}, ${sorteado.NAME}`;
      resultContainer.appendChild(info);
      // Agregar datos a la matriz
      dataToExport.push([sorteado.ID, sorteado.NAME]);

    });
    // Crear un objeto de trabajo de Excel
    const ws = XLSX.utils.aoa_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sorteados');

    // Descargar el archivo Excel
    document.getElementById("descarga").addEventListener("click", () => { XLSX.writeFile(wb, 'sorteados.xlsx'); })




    $('#miModal').modal('show');
    document.getElementById('cerrar').addEventListener('click', () => { $('#miModal').modal('hide'); })
  } else {
    $('#miModal').modal('show');
    resultContainer.textContent = 'No hay sorteos almacenados.';
    console.log('asd');
    document.getElementById('cerrar').addEventListener('click', () => { $('#miModal').modal('hide'); })
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
    //spin();
    //stopAtDesiredSymbols();
    spinner.startSpinning();

    // Habilitar el botón nuevamente después de 2 segundos
    setTimeout(function () {
      arm.removeClass('clicked');
      $('#arm').removeAttr("disabled");
    }, 800); // 4 segundos
  });
});

//<--------------Archivo de Premios-----------------//
/*Papa.parse('premios.csv', {
  download: true,
  header: true,
  complete: function(results) {
      var tabla = document.getElementById('tablaDatos');
      var datos = results.data;

      // Encabezados de la tabla
      var encabezados = Object.keys(datos[0]);
      var encabezadoRow = tabla.insertRow();
      encabezados.forEach(function(encabezado) {
          var th = document.createElement('th');
          th.textContent = encabezado;
          encabezadoRow.appendChild(th);
      });

      // Datos de la tabla
      datos.forEach(function(fila) {
          var tr = tabla.insertRow();
          encabezados.forEach(function(encabezado) {
              var td = tr.insertCell();
              td.textContent = fila[encabezado];
          });
      });
  }
});*/


let listaDatos = [];
parsePremios()
function parsePremios() {

  Papa.parse('premios.csv', {
    download: true,
    header: true,
    complete: function (results) {
      var datos = results.data;

      // Lista para almacenar los datos


      // Agregar datos a la lista
      datos.forEach(function (fila) {
        var objetoFila = {};
        for (var key in fila) {
          objetoFila[key] = fila[key];
        }
        listaDatos.push(objetoFila);
      });
    }
  });
}

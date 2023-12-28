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

    slots.forEach((slot, index) => {
        const symbols = slot.querySelector(".symbols");
        symbols.innerHTML = "";
        symbols.appendChild(createSymbolElement("❓"));
    });
}
spin()

function stopAtSymbols(desiredSymbols, id, nombre) {
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
      symbols.style.transition = "top 1s easy";
      symbols.style.top = `${finalPosition}px`;
    })
}

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

        symbols.style.top = finalPosition + 'px';
      }
    }
  
    requestAnimationFrame(step);
}

const spinner = {
    intervalId: null,
    startSpinning: function () {
        const slots = document.querySelectorAll(".slot");
        this.intervalId = setInterval(() => {
          slots.forEach((slot, index) => {
            const symbols = slot.querySelector(".symbols");
  
            const symbolHeight = symbols.querySelector(".symbol")?.clientHeight;
            const symbolCount = symbols.childElementCount;
  
            symbols.innerHTML = "";
           // symbols.appendChild(createSymbolElement("❓"));
  
            for (let i = 0; i < 50; i++) {
              slotSymbols[index].forEach((symbol) => {
                symbols.appendChild(createSymbolElement(symbol));
              });
            }
  
            const totalDistance = symbolCount * symbolHeight;
  
            const randomOffset =
              -Math.floor(Math.random() * (symbolCount - 1) + 1) * symbolHeight;

            symbols.style.top = `${randomOffset}px`;
  
          });
        }, 200); // Cambia el valor según la velocidad deseada
  
    },
    stopSpinning: function (registro_seleccionado) {
      setTimeout(() => {
        clearInterval(this.intervalId); // Detener el giro después de cierto tiempo
      }, 0.52);
      resettombola();
      console.log(1)
      stopAtDesiredSymbols(registro_seleccionado);
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


function stopAtDesiredSymbols(registro_seleccionado) {
  
    const values = registro_seleccionado
        console.log(values);
      var str = values.matricula.toString();
      let res = [];
  
      for (var i = 0, len = str.length; i < len; i += 1) {
        res.push(str.charAt(i));
      }
      console.log("[" + res + "]");
  
      const formattedValue = padLeft(values.matricula, 6, '0');
      console.log(formattedValue)
      stopAtSymbols(formattedValue, values.matricula, values.NAME);

  }

  function padLeft(value, length, padChar) {
    const strValue = value.toString();
    if (strValue.length >= length) {
      return strValue;
    }
    const padding = padChar.repeat(length - strValue.length);
    return padding + strValue;
  }
let TABLA_SORTEADOS;
$(document).ready(function() {
 TABLA_SORTEADOS = new DataTable('#tablaSorteados', {
        buttons:[ 
            'excel'
        ],
    "lengthMenu": [5, 10, 15, 100],
    "language": {
        "emptyTable": "No hay datos para mostrar",
        "info": "Mostrando página _PAGE_ de _PAGES_",
        "infoEmpty": "Mostrando 0 a 0 de 0 registros",
        "lengthMenu": "Mostrar _MENU_ registros",
        "loadingRecords": "Cargando...",
        "search": "Buscar:",
        "zeroRecords": "No coincide ningún registro",
        "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
        },
        "aria": {
            "sortAscending": ": ordenar la columna ascendentemente",
            "sortDescending": ": ordenar la columna descendentemente"
        }
    },
    "columns": [
        { "title": "#", "data": "numero", className: 'numero'}, 
        { "title": "Nro. Socio", "data": "matricula", className: 'nrosocio'},
        { "title": "Nombre", "data": "nombre" },
        { "title": "Cedula", "data": "ci" },
        { "title": "Premio", "data": "premio" }
    ],
    data: []

    
});
// Agregamos un evento de clic al nuevo botón
$('.botonDescargarListado').on('click', function() {
    // Ejecutamos la acción de exportar a Excel
    TABLA_SORTEADOS.button('.buttons-excel').trigger();
});
iniciar()

});

let modoSortear = () => {
    $('.botonSortearSiguiente').prop('hidden', false);
    $('.botonDetener').prop('hidden', true);
    $('.botonDescargarListado').prop('hidden', true);
}

let modoElegirSorteado = () => {
    $('.botonSortearSiguiente').prop('hidden', true);
    $('.botonDetener').prop('hidden', false);
    $('.botonDescargarListado').prop('hidden', true);
}

let modoDescargarArchivo = () => {
    $('.botonSortearSiguiente').prop('hidden', true);
    $('.botonDetener').prop('hidden', true);
    $('.botonDescargarListado').prop('hidden', false);
    Swal.fire({
        title: "Fin del sorteo",
        html: "Ya no hay registros por sortear. Puede descargar el listado de sorteados",
        icon: "error"
    });
}

let modoSinDatos = () => {
    $('.botonSortearSiguiente').prop('hidden', true);
    $('.botonDetener').prop('hidden', true);
    $('.botonDescargarListado').prop('hidden', true);
}

let limpiarDatos = () => {
    localStorage.removeItem('lista_original');
    localStorage.removeItem('lista_actual');
    localStorage.removeItem('lista_sorteados');
    localStorage.removeItem('lista_premios');
    var newInput = document.createElement("input");
    newInput.id = "archivoSorteo";
    newInput.type = "file";
    newInput.setAttribute('hidden', true);
    var oldInput = document.getElementById("archivoSorteo");
    oldInput.parentNode.replaceChild(newInput, oldInput);
    $('#archivoSorteo').change(procesarArchivoCSV);
    TABLA_SORTEADOS.rows().remove().draw(false);
}

let parseCSV = (csvText) => {
    const rows = csvText.split('\n');
    const parsedRecords = [];
    let formatoIncorrecto = false;

    for (let i = 1; i < rows.length - 1; i++) {
        const columns = rows[i].split(';');
        if (columns.length === 4) {
            const record = {
                'matricula': parseInt(columns[0]),
                'nombre': columns[1],
                'ci': columns[2],
                'cupones': parseInt(columns[3])
            };
            parsedRecords.push(record);
        } else {
            let lineaIncorrecta = i + 1;
            console.log("línea con formato incorrecto: " + lineaIncorrecta);
            formatoIncorrecto = true;
        }
    }

    if (parsedRecords.length === 0 || formatoIncorrecto) {
        Swal.fire({
            title: "Formato de archivo incorrecto",
            html: "Asegúrese que el archivo tiene registros y el formato sea correcto: Número de socio, Nombre y Cantidad de cupones separados por coma.",
            icon: "question"
        });
        return [];
    }

    modoSortear();  
    Swal.fire({
        icon: "success",
        title: "Cupones leídos correctamente!",
        showConfirmButton: false,
        timer: 1500
    });
    return parsedRecords;
}

let parsearArchivoCSV = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target.result;
            let listaParaSortear = parseCSV(contents);
            localStorage.setItem('lista_original', JSON.stringify(listaParaSortear));
            localStorage.setItem('lista_actual', JSON.stringify(listaParaSortear));
            localStorage.setItem('lista_sorteados', JSON.stringify([]));
            localStorage.setItem('lista_premios', JSON.stringify(PREMIOS));
        };
        reader.readAsText(file);
    }
}

let seleccionarNuevoArchivo = () => {
    $('#archivoSorteo').click();
}

let esconderBotonSeleccionArchivo = () => {
    $('.botonArchivoSorteo').prop('hidden', true);
    $('.botonReiniciarSorteo').prop('hidden', false);
}

let mostrarBotonSeleccionArchivo = () => {
    $('.botonArchivoSorteo').prop('hidden', false);
    $('.botonReiniciarSorteo').prop('hidden', true);
}

let procesarArchivoCSV = (event) => {
    esconderBotonSeleccionArchivo();
    parsearArchivoCSV(event);
}

let reiniciarSorteo = () => {
    Swal.fire({
        title: "Está seguro?",
        text: "Todos los sorteos se perderán!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, continuar!",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            limpiarDatos();
            mostrarBotonSeleccionArchivo();
            modoSinDatos();
        }
    });
}

let selectRecordBasedOnProbability = (records) => {
    const totalCouponCount = records.reduce((total, record) => total + record.cupones, 0);
    const randomValue = Math.random() * totalCouponCount;
    let cumulativeProbability = 0;

    for (const record of records) {
        cumulativeProbability += record.cupones;
        if (cumulativeProbability >= randomValue) {
            return record;
        }
    }
    return records[records.length - 1];
}

let iniciarAnimacion = () => {
    spinner.startSpinning();
    modoElegirSorteado();
}

let seleccionarRegistroDelListado = () => {
    
    let lista_sorteados = JSON.parse(localStorage.getItem('lista_sorteados'));
    let lista_actual = JSON.parse(localStorage.getItem('lista_actual'));
    let lista_premios = JSON.parse(localStorage.getItem('lista_premios'));

    let registro_seleccionado = selectRecordBasedOnProbability(lista_actual);
    let premio_seleccionado = lista_premios.shift();
    lista_actual = lista_actual.filter((registro) => registro.matricula !== registro_seleccionado.matricula);
    let registro_premio = { ...registro_seleccionado, ...premio_seleccionado };
    lista_sorteados.push(registro_premio);
    TABLA_SORTEADOS.row.add(registro_premio).draw(false);
    
    localStorage.setItem('lista_actual', JSON.stringify(lista_actual));
    localStorage.setItem('lista_sorteados', JSON.stringify(lista_sorteados));
    localStorage.setItem('lista_premios', JSON.stringify(lista_premios));
    setTimeout(() => {
    Swal.fire({
        title: "Ganador seleccionado",
        html: "Nombre: " + registro_premio.nombre + "<br>Nro. Socio: " + registro_premio.matricula + "<br>Premio: " + registro_premio.premio,
        icon: "success"
    }).then(() => {
        if (lista_premios.length === 0 || lista_actual.length === 0) {
            modoDescargarArchivo();
        } else {
            modoSortear();
        }
    });
}, 2700);
   spinner.stopSpinning(registro_seleccionado)
}

let descargarListado = () => {

}
function iniciar(){

let cargarDatosDeSorteoEnTabla = () => {
    let lista_sorteados = JSON.parse(localStorage.getItem('lista_sorteados'));
    if (lista_sorteados) {
        lista_sorteados.forEach(e => TABLA_SORTEADOS.row.add(e).draw(false))
    }
}

$('#archivoSorteo').change(procesarArchivoCSV);
$('.botonArchivoSorteo').on('click', seleccionarNuevoArchivo);
$('.botonReiniciarSorteo').on('click', reiniciarSorteo);
$('.botonSortearSiguiente').on('click', iniciarAnimacion);
$('.botonDetener').on('click', seleccionarRegistroDelListado);
$('.botonDescargarListado').on('click', descargarListado);

let checkListaActual = JSON.parse(localStorage.getItem('lista_actual'));
let checkListaPremios = JSON.parse(localStorage.getItem('lista_premios'));

if (checkListaActual) {
    esconderBotonSeleccionArchivo();
    cargarDatosDeSorteoEnTabla();

    if (checkListaPremios.length === 0 || checkListaActual.length === 0) {
        modoDescargarArchivo();
    } else {
        modoSortear();
        Swal.fire({
            icon: "success",
            title: "Cupones ya cargados!",
            showConfirmButton: false,
            timer: 1500
        });
    }
} else {
    mostrarBotonSeleccionArchivo();
};}

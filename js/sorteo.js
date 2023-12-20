const TABLA_SORTEADOS = new DataTable('#tablaSorteados', {
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
        { "title": "#", "data": "numero" },
        { "title": "Nro. Socio", "data": "matricula" },
        { "title": "Nombre", "data": "nombre" },
        { "title": "Premio", "data": "premio" }
    ],
    data: []
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
        const columns = rows[i].split(',');
        if (columns.length === 3) {
            const record = {
                'matricula': parseInt(columns[0]),
                'nombre': columns[1],
                'cupones': parseInt(columns[2])
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
    modoElegirSorteado();
}

let seleccionarRegistroDelListado = () => {
    let lista_sorteados = JSON.parse(localStorage.getItem('lista_sorteados'));
    let lista_actual = JSON.parse(localStorage.getItem('lista_actual'));
    let lista_premios = JSON.parse(localStorage.getItem('lista_premios'));

    let registro_seleccionado = selectRecordBasedOnProbability(lista_actual);
    let premio_seleccionado = lista_premios.pop();
    lista_actual = lista_actual.filter((registro) => registro.matricula !== registro_seleccionado.matricula);
    let registro_premio = { ...registro_seleccionado, ...premio_seleccionado };
    lista_sorteados.push(registro_premio);
    TABLA_SORTEADOS.row.add(registro_premio).draw(false);

    localStorage.setItem('lista_actual', JSON.stringify(lista_actual));
    localStorage.setItem('lista_sorteados', JSON.stringify(lista_sorteados));
    localStorage.setItem('lista_premios', JSON.stringify(lista_premios));

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
}

let descargarListado = () => {

}

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
};

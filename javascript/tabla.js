import {listaDatos} from "./premios.js";
import './listados.js';
import { listadoGanadores} from "./listados.js";

// Inicializar datosTabla con los datos guardados
let currentDatosIndex = 0; 
let datosTabla;
$(document).ready(function () {


const table = $('#tablaDatos').DataTable({
    "bStateSave": true,
    "columns": [
      { "data": "ID" },
      { "data": "NAME" },
      { "data": "[Descripción]" } //quitar corchete
    ]
    });
// Solo inicializa datosTabla si localStorage tiene datos
if (localStorage.getItem("datosTabla")) {
  datosTabla = JSON.parse(localStorage.getItem("datosTabla"));

  // Agregar datos a la tabla y dibujarla
  table.rows.add(datosTabla).draw();
} else {
  datosTabla = [];
}
});
export function tableganador(values) {

    let valoractual = listadoGanadores();

    const table = $('#tablaDatos').DataTable();
    const currentDato = listaDatos[currentDatosIndex];
  
    const listaDatosActual = valoractual.filter((actual)=>actual.Ord !== currentDato.Ord)
    valoractual = listaDatosActual;
    localStorage.setItem('datosActual', JSON.stringify(valoractual));
    let listadopremio = JSON.parse(localStorage.getItem('datosActual'));

    console.log(listadopremio);

    const ganadorConDatos = {
      ...values,
      ...listadopremio
    };

    datosTabla.push({ 
      ID: ganadorConDatos.ID,
      NAME: ganadorConDatos.NAME,
      Descripción: ganadorConDatos["Descripción"]
    })
    table.clear();
    // Add the winner data to the DataTable
    table.rows.add(datosTabla).draw();

    currentDatosIndex = (currentDatosIndex + 1) % listaDatos.length;
  
  
  localStorage.setItem("datosActual", JSON.stringify(datosTabla));
  const datosGuardados = localStorage.getItem("datosTabla");

  console.log(datosGuardados);
  

}



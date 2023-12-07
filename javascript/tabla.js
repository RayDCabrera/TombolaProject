import {listaDatos} from "./premios.js";
import './listados.js';


let datosTabla = JSON.parse(localStorage.getItem("datosTabla")) || []; // Inicializar datosTabla con los datos guardados

let currentDatosIndex = 0; 

export function tableganador(values) {
  const tableBody = document.querySelector("#tablaganador");
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
    setTimeout(function () {
      const firstRow = tableBody.firstChild; // Obtener el primer elemento actual
      if (firstRow) {
        tableBody.insertBefore(newRow, firstRow); // Insertar antes del primer elemento actual
      } else {
        tableBody.appendChild(newRow); // Si no hay elementos, simplemente añadir
      }
      currentDatosIndex = (currentDatosIndex + 1) % listaDatos.length;
    }, 3000);
  datosTabla.push({
    ID: ganadorConDatos.ID,
    NAME: ganadorConDatos.NAME,
    Descripción: ganadorConDatos["Descripción"]
  })
  localStorage.setItem("datosTabla", JSON.stringify(datosTabla));

  console.log(localStorage.getItem("datosTabla"));
}


export function cargarTabla() {
  const tableBody = document.querySelector("#tablaganador");
  tableBody.innerHTML = ''; // Limpiar el contenido actual de la tabla

  // Obtener los datos guardados en localStorage
  const datosGuardados = JSON.parse(localStorage.getItem("datosTabla"));
  if (datosGuardados) {
    datosGuardados.forEach((dato) => {
      // Crear una nueva fila para cada dato guardado
      const newRow = document.createElement("tr");

      // Crear celdas para cada propiedad de los datos
      const idColumn = document.createElement("td");
      idColumn.textContent = dato.ID;
      newRow.appendChild(idColumn);

      const nameColumn = document.createElement("td");
      nameColumn.textContent = dato.NAME;
      newRow.appendChild(nameColumn);

      const descripcionColumn = document.createElement("td");
      descripcionColumn.textContent = dato.Descripción;
      newRow.appendChild(descripcionColumn);

      // Agregar la nueva fila a la tabla
      tableBody.appendChild(newRow);
    });
  }
}


  
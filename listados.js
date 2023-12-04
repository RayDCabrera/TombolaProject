export function listados() {
    localStorage.setItem('Listado_Participantes', JSON.stringify(records));
    if (records == false) {
      // console.log("ola",records)
      //document.getElementById("arm").disabled = true;
      // alert("POR FAVOR SELECCIONE PRIMERO EL ARCHIVO CSV");
      Swal.fire('POR FAVOR SELECCIONE EL ARCHIVO')
      return null;
  
    } else {
      let participantes = JSON.parse(localStorage.getItem('Listado_Participantes'));
      return participantes;
    }
  }
  
  export function listaactual() {
    // localStorage.setItem('Listado_Actual', JSON.stringify(listados(participantes)));
    let actual = JSON.parse(localStorage.getItem('Listado_Actual'));
    return actual;
  }
  
  export function resetlistados() {
    let participantes = []
    document.getElementById("reset").addEventListener('click', () => {
      localStorage.setItem('Listado_Actual', JSON.stringify(listados(participantes)));
      localStorage.removeItem('Listado_Sorteado');
  
      localStorage.removeItem('datosTabla');
  
  
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
  export function padLeft(value, length, padChar) {
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
  
  
  
  export function ListadoSorteados() {
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
  
  //document.getElementById('Sorteados').addEventListener('click', ListadoSorteados);
  
  
  export function ocultarCSV() {
    document.getElementById('csvFileInput').addEventListener('change', (event) => {
      var elemento = document.getElementById('csvFileInput');
      elemento.style.display = 'none';
    });
  }
  ocultarCSV();
  
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
  export function parseCSV(csvText) {
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
  
  export function selectRecordBasedOnProbability(records) {
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
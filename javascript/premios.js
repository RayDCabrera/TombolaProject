export let listaDatos = [];
if (localStorage.getItem('listaDatos')) {
  listaDatos = JSON.parse(localStorage.getItem('listaDatos'));
} else {
  parsePremios()
}
export function parsePremios() {

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
      localStorage.setItem('listaDatos', JSON.stringify(listaDatos));
    }
  });

}
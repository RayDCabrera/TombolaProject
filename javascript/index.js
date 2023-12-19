import {spinner} from './spin.js';

//import { cargarTabla } from './tabla.js';

import { resetlistados } from './listados.js';

document.getElementById('Parar').addEventListener('click', function () {
  spinner.stopSpinning();
});

document.getElementById('Sortear').addEventListener('click', function () {
  spinner.startSpinning();
});

document.getElementById("reset").addEventListener('click', resetlistados);

//cargarTabla();
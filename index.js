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
  
  let spun = true;

  function spin() {
    if (spun === false){
      //reset();
      //spun = true;
    } if (spun) {
      const slots = document.querySelectorAll(".slot");
    let completedSlots = 0;
  
    slots.forEach((slot, index) => {
      const symbols = slot.querySelector(".symbols");
      const symbolHeight = symbols.querySelector(".symbol")?.clientHeight;
      const symbolCount = symbols.childElementCount;
    
      symbols.innerHTML = "";

      symbols.appendChild(createSymbolElement("❓"));
     
  
      for (let i = 0; i < 5; i++) {
        slotSymbols[index].forEach((symbol) => {
          symbols.appendChild(createSymbolElement(symbol));
        });
      }
  
      const totalDistance = symbolCount * symbolHeight;
      const randomOffset =
        -Math.floor(Math.random() * (symbolCount - 1) + 1) *
        symbolHeight;
      symbols.style.top = `${randomOffset}px`;
  
     /* symbols.addEventListener(
        "transitionend",
        () => {
          completedSlots++;
          if (completedSlots < 2) {
           spin();
          }
        },
        { once: true }
      );*/
    });
  
    spun = true;
    }
    
  }
  
  function reset() {
    const slots = document.querySelectorAll(".slot");
  
    slots.forEach((slot) => {
      const symbols = slot.querySelector(".symbols");
      symbols.style.transition = "none";
      symbols.style.top = "0";
      symbols.offsetHeight;
      symbols.style.transition = "";
    });
  }
  
  /*function logDisplayedSymbols() {
    const slots = document.querySelectorAll(".slot");
    const displayedSymbols = [];
  
    slots.forEach((slot, index) => {
      const symbols = slot.querySelector(".symbols");
      const symbolIndex =
        Math.floor(
          Math.abs(parseInt(symbols.style.top, 10)) / slot.clientHeight
        ) % slotSymbols[index].length;
      const displayedSymbol = slotSymbols[index][symbolIndex];
      displayedSymbols.push(displayedSymbol);
    });
  }
  */
  spin();
  
  /*function getSlotValue(slotIndex) {
    const slots = document.querySelectorAll(".slot");
    const slot = slots[slotIndex];
  
    const symbols = slot.querySelector(".symbols");
    const symbolIndex =
      Math.floor(
        Math.abs(parseInt(symbols.style.top, 10)) / slot.clientHeight
      ) % slotSymbols[slotIndex].length;
  
    const displayedSymbol = slotSymbols[slotIndex][symbolIndex];
    return displayedSymbol;
  }*/
  


  function stopAtSymbols(desiredSymbols, id) {
    if (spun) {
      const slots = document.querySelectorAll(".slot");
      let completedSlots = 0;

       
  
      slots.forEach((slot, index) => {
        const symbols = slot.querySelector(".symbols");
        const symbolHeight = symbols.querySelector(".symbol")?.clientHeight;
        const symbolCount = symbols.childElementCount;
        
        //console.log(symbolIndex, symbolsToShow, symbolCount)
       
        symbols.innerHTML = "";
        
        const stopSymbolIndex = slotSymbols[index].indexOf(desiredSymbols[index]);
    
        // Calculate the number of symbols to show before stopping
        const symbolsToShow = symbolCount * 2 + stopSymbolIndex;
    
        for (let i = 0; i < symbolsToShow; i++) {
          symbols.appendChild(
            createSymbolElement(
              slotSymbols[index][i % symbolCount]
            )
          );
        }
    
       symbols.addEventListener(
          "transitionend",
          () => {
           // console.log("Transición completada en", event.target);
            completedSlots++;
           // if (completedSlots === slots.length) {
              //alert("EL GANADOR ES:" + id  );
            //}
          },
          { once: true }
        );
    
          const finalPosition = stopSymbolIndex * symbolHeight * -1;
          symbols.style.transition = "top 2s easy";
          symbols.style.top = `${finalPosition}px`;
      });
  
      spun = true;

    }

  }
  function stopAtDesiredSymbols() {
    let valoractual = JSON.parse(localStorage.getItem('Listado_Actual'));
      const values = selectRecordBasedOnProbability(valoractual);
      console.log(values);
      console.log(values.ID);
      const Listado_Actual = valoractual.filter((actual) => actual.ID !== values.ID);
      valoractual = Listado_Actual;
      localStorage.setItem('Listado_Actual',JSON.stringify(valoractual));
    

      let Listado_Sorteado = JSON.parse(localStorage.getItem('Listado_Sorteado'));

      Listado_Sorteado.push(values);
    
      // Store the updated Listado_Sorteado back in localStorage
      localStorage.setItem('Listado_Sorteado', JSON.stringify(Listado_Sorteado));
    
      let ganadores = Listado_Sorteado;

   
        
      console.log(Listado_Actual);
      console.log(ganadores);

      var str = values.ID.toString();
      console.log(str);
      let res = [];
      
      for (var i = 0, len = str.length; i < len; i += 1) {
          res.push(str.charAt(i));
      }
        console.log("[" + res + "]");
        
        const value = res;
        const symb = [];
      if (value.length === 1) {
        for (var i = 0; i < 5; i++) {
          symb.push("0");   
        }
        for (var i = 0; i < value.length; i++) {
          symb.push(value[i].toString());
        }
      }else if (value.length === 2) {
        for (var i = 0; i < 4; i++) {
          symb.push("0");   
        }
        for (var i = 0; i < value.length; i++) {
          symb.push(value[i].toString());
        }
      }else if (value.length === 3) {
        for (var i = 0; i < 3; i++) {
          symb.push("0");   
        }
        for (var i = 0; i < value.length; i++) {
          symb.push(value[i].toString());
        }
      }else if (value.length === 4) {
        for (var i = 0; i < 2; i++) {
          symb.push("0");   
        }
        for (var i = 0; i < value.length; i++) {
          symb.push(value[i].toString());
        }
      }else if (value.length === 5) {
          symb.push("0");
          for (var i = 0; i < value.length; i++) {
          symb.push(value[i].toString());
        }
      }else if (value.length === 6){
        for (var i = 0; i < value.length; i++) {
          symb.push(value[i].toString());
        }
      }
        console.log("[" + symb + "]");
        stopAtSymbols(symb, values.ID);

        
      /*  const selectedRecord = values;

        const indexToRemove = Listado_Actual.findIndex(record => record.ID === selectedRecord.ID);
        if (indexToRemove !== -1) {
            Listado_Actual.splice(indexToRemove, 1); // Eliminar el número sorteado
            Listado_Sorteado.push(selectedRecord); // Agregarlo a Listado_Sorteado
        }
    
        // Actualizar localStorage
        localStorage.setItem('Listado_Actual', JSON.stringify(Listado_Actual));
        localStorage.setItem('Listado_Sorteado', JSON.stringify(Listado_Sorteado));

        console.log(localStorage.getItem("Listado_Actual"));
        console.log(localStorage.getItem("Listado_Sorteado"));
        */


  }
    
        let records = [];
        let Listado_Participantes = []; 
   
      
        document.getElementById('csvFileInput').addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const contents = e.target.result;
                    records = parseCSV(contents);
                    localStorage.setItem('Listado_Participantes', JSON.stringify(records));
                    //localStorage.setItem('Listado_Actual', JSON.stringify(records));  //Resetear el listado+
                    
                };
                reader.readAsText(file);
            }
        });
        /*function selectAndMoveNumberFromList() {
          // Sortear un número de Listado_Actual
         
          
          // Mover el número aaaasorteado de Listado_Actual a Listado_Sorteado
         
      }*/

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
    
      document.getElementById('select').addEventListener('click', () => {

            const selectedRecord = selectRecordBasedOnProbability(records);      
            const outputDiv = document.getElementById('output');
            /*outputDiv.innerHTML = JSON.stringify(selectedRecord, null, 2);*/
        });

        function selectRecordBasedOnProbability(records) {
            const totalCouponCount = records.reduce((total, record) => total + record.COUPONS, 0);
            const randomValue = Math.random() * totalCouponCount;
            let cumulativeProbability = 0;
          
            for (const record of records) {
                cumulativeProbability += record.COUPONS;
                if (cumulativeProbability >= randomValue) {
                
                // localStorage.setItem('Listado_Actual',JSON.stringify(records));
                 
                 return record;
                }
              
            
            }

            // If no record is selected (unlikely but possible due to rounding errors), return the last record
            return records[records.length - 1];
        }

        $(document).ready(function() {
          $('#arm').click(function(e) {
            var arm = $(this).addClass('clicked'),
              delay = setTimeout(function() { arm.removeClass('clicked') }, 500);
            e.preventDefault();
            stopAtDesiredSymbols();
          });
        });


        ///condfetti
        //import confetti from "canvas-confetti";
        const symbols = document.querySelector(".symbols");
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
              spread: 2600,
              startVelocity: 55,
            });
            fire(0.2, {
              spread: 60,
            });
            fire(0.35, {
              spread: 2600,
              decay: 0.91,
              scalar: 0.8,
            });
            fire(0.1, {
              spread: 2600,
              startVelocity: 25,
              decay: 0.92,
              scalar: 1.2,
            });
            fire(0.1, {
              spread: 2600,
              startVelocity: 45,
            });
            window.setTimeout(() => {
              simbols.classList.remove("animate__rubberBand");
              exploding = false;
            }, 300);
          }, 300);
        });
    

const scheduleData = {
    "A": [
      {
        nombre: "ALGEBRA I",
        docentes: [
          {
            grupo: "G: 10",
            nombre: "RODRIGUEZ SEJAS JUAN ANTONIO",
            horarios: [
              { dia: "Martes", hora: "09:45-11:15", aula: "693B", aux: false },
              { dia: "Miercoles", hora: "08:15-09:45", aula: "692E", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "692F", aux: false }
            ]
          },
          {
            grupo: "G: 14",
            nombre: "LEON ROMERO GUALBERTO",
            horarios: [
              { dia: "Martes", hora: "15:45-17:15", aula: "692E", aux: false },
              { dia: "Jueves", hora: "11:15-12:45", aula: "692E", aux: false },
              { dia: "Sabado", hora: "08:15-09:45", aula: "691E", aux: true }
            ]
          },
          {
            grupo: "G: 5",
            nombre: "TABORGA ACHA FIDEL",
            horarios: [
              { dia: "Miercoles", hora: "14:15-15:45", aula: "617", aux: false },
              { dia: "Viernes", hora: "08:15-09:45", aula: "617C", aux: false },
              { dia: "Sabado", hora: "08:15-09:45", aula: "692B", aux: true }
            ]
          },
          {
            grupo: "G: 6",
            nombre: "PATINO TITO RONALD EDGAR",
            horarios: [
              { dia: "Lunes", hora: "20:15-21:45", aula: "622", aux: false },
              { dia: "Martes", hora: "20:15-21:45", aula: "692C", aux: false },
              { dia: "Miercoles", hora: "20:15-21:45", aula: "623", aux: false }
            ]
          },
          {
            grupo: "G: 8",
            nombre: "LEON ROMERO GUALBERTO",
            horarios: [
              { dia: "Miercoles", hora: "11:15-12:45", aula: "691C", aux: false },
              { dia: "Viernes", hora: "06:45-08:15", aula: "692F", aux: false },
              { dia: "Jueves", hora: "06:45-08:15", aula: "625D", aux: true }
            ]
          },
          {
            grupo: "G: 9",
            nombre: "POR DESIGNAR DOCENTE",
            horarios: [
              { dia: "Lunes", hora: "14:15-15:45", aula: "693A", aux: false },
              { dia: "Martes", hora: "15:45-17:15", aula: "660", aux: false },
              { dia: "Jueves", hora: "12:45-14:15", aula: "661", aux: true }
            ]
          }
          
        ]
      },
      {
        nombre: "CALCULO I",
        docentes: [
          {
            grupo: "G: 10",
            nombre: "POR DESIGNAR DOCENTE",
            horarios: [
              { dia: "Miercoles", hora: "20:15-21:45", aula: "693B", aux: false },
              { dia: "Viernes", hora: "20:15-21:45", aula: "623", aux: false },
              { dia: "Sabado", hora: "09:45-11:15", aula: "617C", aux: false }
            ]
          },
          {
            grupo: "G: 11",
            nombre: "ROJAS ZURITA RAMIRO",
            horarios: [
              { dia: "Lunes", hora: "06:45-08:15", aula: "622", aux: false },
              { dia: "Martes", hora: "08:15-09:45", aula: "692B", aux: false },
              { dia: "Jueves", hora: "08:15-09:45", aula: "692E", aux: false }
            ]
          },
          {
            grupo: "G: 12",
            nombre: "DELGADILLO COSSIO DAVID ALFREDO",
            horarios: [
              { dia: "Lunes", hora: "18:45-20:15", aula: "690B", aux: false },
              { dia: "Martes", hora: "18:45-20:15", aula: "625D", aux: false },
              { dia: "Miercoles", hora: "18:45-20:15", aula: "691D", aux: false }
            ]
          },
          {
            grupo: "G: 17",
            nombre: "OMONTE OJALVO JOSE ROBERTO",
            horarios: [
              { dia: "Martes", hora: "11:15-12:45", aula: "642", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "691C", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "692H", aux: true }
            ]
          },
          {
            grupo: "G: 7",
            nombre: "RODRIGUEZ SEJAS JUAN ANTONIO",
            horarios: [
              { dia: "Lunes", hora: "12:45-14:15", aula: "612", aux: false },
              { dia: "Miercoles", hora: "12:45-14:15", aula: "661", aux: false },
              { dia: "Jueves", hora: "09:45-11:15", aula: "692B", aux: false }
            ]
          },
          {
            grupo: "G: 8",
            nombre: "OMONTE OJALVO JOSE GIL",
            horarios: [
              { dia: "Martes", hora: "18:45-20:15", aula: "612", aux: false },
              { dia: "Miercoles", hora: "06:45-08:15", aula: "617C", aux: false },
              { dia: "Sabado", hora: "11:15-12:45", aula: "692E", aux: true }
            ]
          },
          {
            grupo: "G: 9",
            nombre: "JUCHANI BAZUALDO DEMETRIO",
            horarios: [
              { dia: "Lunes", hora: "12:45-14:15", aula: "651", aux: true },
              { dia: "Miercoles", hora: "12:45-14:15", aula: "690D", aux: false },
              { dia: "Jueves", hora: "11:15-12:45", aula: "622", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "FISICA GENERAL",
        docentes: [
          {
            grupo: "G: C",
            nombre: "FLORES FLORES FREDDY",
            horarios: [
              { dia: "Lunes", hora: "14:15-15:45", aula: "617", aux: false },
              { dia: "Viernes", hora: "17:15-18:45", aula: "693B", aux: false }
            ]
          },
          {
            grupo: "G: C1",
            nombre: "[P] SHITIKOV GAGARINA GALINA",
            horarios: [
              { dia: "Martes", hora: "11:15-12:45", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: C2",
            nombre: "[P] TERRAZAS VARGAS JUAN CARLOS",
            horarios: [
              { dia: "Viernes", hora: "08:15-09:45", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: C3",
            nombre: "[P] MOREIRA CALIZAYA RENE",
            horarios: [
              { dia: "Martes", hora: "11:15-12:45", aula: "621", aux: false }
            ]
          },
          {
            grupo: "G: C4",
            nombre: "[P] CASTRO LAZARTE CECILIA BEATRIZ",
            horarios: [
              { dia: "Lunes", hora: "14:15-15:45", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: C5",
            nombre: "[P] CASTRO LAZARTE CECILIA BEATRIZ",
            horarios: [
              { dia: "Jueves", hora: "17:15-18:45", aula: "684L8", aux: false }
            ]
          },
          {
            grupo: "G: C6",
            nombre: "[P] ZAMURIANO CARBAJAL JUAN MARCELO",
            horarios: [
              { dia: "Lunes", hora: "17:15-18:45", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: C7",
            nombre: "[P] FLORES FLORES FREDDY",
            horarios: [
              { dia: "Martes", hora: "14:15-15:45", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: D",
            nombre: "FUENTES MIRANDA IVAN",
            horarios: [
              { dia: "Miercoles", hora: "06:45-08:15", aula: "691B", aux: false },
              { dia: "Viernes", hora: "12:45-14:15", aula: "612", aux: false }
            ]
          },
          {
            grupo: "G: D1",
            nombre: "[P] UGARTE CEJAS FELIX",
            horarios: [
              { dia: "Martes", hora: "15:45-17:15", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: D2",
            nombre: "[P] ZAMURIANO CARBAJAL JUAN MARCELO",
            horarios: [
              { dia: "Jueves", hora: "14:15-15:45", aula: "621", aux: false }
            ]
          },
          {
            grupo: "G: D3",
            nombre: "[P] ZAMURIANO CARBAJAL JUAN MARCELO",
            horarios: [
              { dia: "Jueves", hora: "15:45-17:15", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: D4",
            nombre: "[P] FLORES FLORES FREDDY",
            horarios: [
              { dia: "Viernes", hora: "15:45-17:15", aula: "618", aux: false }
            ]
          },
          {
            grupo: "G: D5",
            nombre: "[P] GUZMAN SAAVEDRA ROCIO",
            horarios: [
              { dia: "Martes", hora: "14:15-15:45", aula: "618", aux: false }
            ]
          },
          {
            grupo: "G: D6",
            nombre: "[P] POR DESIGNAR DOCENTE",
            horarios: [
              { dia: "Jueves", hora: "08:15-09:45", aula: "621", aux: false }
            ]
          },
          {
            grupo: "G: D7",
            nombre: "[P] SHITIKOV GAGARINA GALINA",
            horarios: [
              { dia: "Martes", hora: "08:15-09:45", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: E",
            nombre: "MOREIRA CALIZAYA RENE",
            horarios: [
              { dia: "Miercoles", hora: "11:15-12:45", aula: "622", aux: false },
              { dia: "Viernes", hora: "08:15-09:45", aula: "607", aux: false }
            ]
          },
          {
            grupo: "G: E1",
            nombre: "[P] SHITIKOV GAGARINA GALINA",
            horarios: [
              { dia: "Martes", hora: "09:45-11:15", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: E2",
            nombre: "[P] DAVALOS BROZOVIC JORGE",
            horarios: [
              { dia: "Miercoles", hora: "09:45-11:15", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: E3",
            nombre: "[P] ORDONEZ SALVATIERRA MIGUEL ANGEL",
            horarios: [
              { dia: "Lunes", hora: "08:15-09:45", aula: "684L6", aux: false }
            ]
          },
          {
            grupo: "G: E4",
            nombre: "[P] VASQUEZ CARRILLO MICHAEL HUASCAR",
            horarios: [
              { dia: "Martes", hora: "15:45-17:15", aula: "621", aux: false }
            ]
          },
          {
            grupo: "G: E5",
            nombre: "[P] GUZMAN SAAVEDRA ROCIO",
            horarios: [
              { dia: "Jueves", hora: "09:45-11:15", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: E6",
            nombre: "[P] DAVALOS BROZOVIC JORGE",
            horarios: [
              { dia: "Viernes", hora: "15:45-17:15", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: E7",
            nombre: "[P] DAVALOS BROZOVIC JORGE",
            horarios: [
              { dia: "Viernes", hora: "17:15-18:45", aula: "620", aux: false }
            ]
          },
          {
            grupo: "G: E8",
            nombre: "[P] VASQUEZ CARRILLO MICHAEL HUASCAR",
            horarios: [
              { dia: "Viernes", hora: "09:45-11:15", aula: "618", aux: false }
            ]
          }
          
        ]
      },
      {
        nombre: "INGLES I",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "CESPEDES GUIZADA MARIA BENITA",
            horarios: [
              { dia: "Martes", hora: "08:15-09:45", aula: "693B", aux: false },
              { dia: "Viernes", hora: "08:15-09:45", aula: "691D", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "CESPEDES GUIZADA MARIA BENITA",
            horarios: [
              { dia: "Martes", hora: "11:15-12:45", aula: "692F", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "693A", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "PEETERS ILONAA MAGDA LENA",
            horarios: [
              { dia: "Lunes", hora: "06:45-08:15", aula: "691B", aux: false },
              { dia: "Miercoles", hora: "06:45-08:15", aula: "692H", aux: false }
            ]
          },
          {
            grupo: "G: 4",
            nombre: "GRILO SALVATIERRA MARIA ESTELA",
            horarios: [
              { dia: "Martes", hora: "15:45-17:15", aula: "692G", aux: false },
              { dia: "Viernes", hora: "14:15-15:45", aula: "692E", aux: false }
            ]
          },
          {
            grupo: "G: 5",
            nombre: "CESPEDES GUIZADA MARIA BENITA",
            horarios: [
              { dia: "Jueves", hora: "09:45-11:15", aula: "692F", aux: false },
              { dia: "Viernes", hora: "11:15-12:45", aula: "691B", aux: false }
            ]
          }
          
        ]
      },
      {
        nombre: "INTRODUCCION A LA PROGRAMACION",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "SALAZAR SERRUDO CARLA",
            horarios: [
              { dia: "Jueves", hora: "11:15-12:45", aula: "691A", aux: false },
              { dia: "Viernes", hora: "11:15-12:45", aula: "691E", aux: false },
              { dia: "Viernes", hora: "17:15-18:45", aula: "623", aux: true },
            ]
          },
          {
            grupo: "G: 10",
            nombre: "COSTAS JAUREGUI VLADIMIR ABEL",
            horarios: [
              { dia: "Martes", hora: "09:45-11:15", aula: "693D", aux: false },
              { dia: "Jueves", hora: "09:45-11:15", aula: "691A", aux: false },
              { dia: "Jueves", hora: "14:15-15:45", aula: "691B", aux: true }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "BLANCO COCA LETICIA",
            horarios: [
              { dia: "Martes", hora: "17:15-18:45", aula: "617", aux: false },
              { dia: "Miercoles", hora: "17:15-18:45", aula: "691B", aux: true },
              { dia: "Jueves", hora: "15:45-17:15", aula: "624", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "USTARIZ VARGAS HERNAN",
            horarios: [
              { dia: "Lunes", hora: "12:45-14:15", aula: "607", aux: false },
              { dia: "Miercoles", hora: "12:45-14:15", aula: "612", aux: false },
              { dia: "Viernes", hora: "12:45-14:15", aula: "624", aux: true }
            ]
          },
          {
            grupo: "G: 4",
            nombre: "VILLARROEL TAPIA HENRY FRANK",
            horarios: [
              { dia: "Martes", hora: "15:45-17:15", aula: "623", aux: false },
              { dia: "Miercoles", hora: "15:45-17:15", aula: "693C", aux: false },
              { dia: "Viernes", hora: "17:15-18:45", aula: "691E", aux: true }
            ]
          },
          {
            grupo: "G: 5",
            nombre: "MONTANO QUIROGA VICTOR HUGO",
            horarios: [
              { dia: "Miercoles", hora: "09:45-11:15", aula: "690B", aux: false },
              { dia: "Jueves", hora: "09:45-11:15", aula: "623", aux: false },
              { dia: "Sabado", hora: "09:45-11:15", aula: "691C", aux: true }
            ]
          },
          {
            grupo: "G: 6",
            nombre: "SALAZAR SERRUDO CARLA",
            horarios: [
              { dia: "Miercoles", hora: "17:15-18:45", aula: "692D", aux: false },
              { dia: "Jueves", hora: "17:15-18:45", aula: "691E", aux: false },
              { dia: "Sabado", hora: "08:15-09:45", aula: "661", aux: true }
            ]
          },
          {
            grupo: "G: 7",
            nombre: "POR DESIGNAR DOCENTE",
            horarios: [
              { dia: "Lunes", hora: "18:45-20:15", aula: "612", aux: true },
              { dia: "Martes", hora: "12:45-14:15", aula: "690C", aux: true },
              { dia: "Viernes", hora: "18:45-20:15", aula: "691E", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "METODOLOGIA",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "ROMERO RODRIGUEZ PATRICIA",
            horarios: [
              { dia: "Lunes", hora: "08:15-09:45", aula: "691C", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "691B", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "FLORES VILLARROEL CORINA",
            horarios: [
              { dia: "Lunes", hora: "08:15-09:45", aula: "691D", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "617B", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "LAIME ZAPATA VALENTIN",
            horarios: [
              { dia: "Jueves", hora: "18:45-20:15", aula: "692G", aux: false },
              { dia: "Viernes", hora: "18:45-20:15", aula: "692H", aux: false }
            ]
          },
          {
            grupo: "G: 4",
            nombre: "VILLARROEL NOVILLO JIMMY",
            horarios: [
              { dia: "Lunes", hora: "08:15-09:45", aula: "642", aux: false },
              { dia: "Miercoles", hora: "14:15-15:45", aula: "693C", aux: false }
            ]
          }
          
        ]
      }
    ],
    "B": [
      {
        nombre: "ALGEBRA II",
        docentes: [
          {
            grupo: "G: 5",
            nombre: "TAYLOR TERRAZAS DARLONG HOWARD",
            horarios: [
              { dia: "Jueves", hora: "08:15-09:45", aula: "622", aux: false },
              { dia: "Viernes", hora: "08:15-09:45", aula: "660", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "661", aux: true }
            ]
          },
          {
            grupo: "G: 6",
            nombre: "MEDINA GAMBOA JULIO",
            horarios: [
              { dia: "Jueves", hora: "15:45-17:15", aula: "660", aux: false },
              { dia: "Viernes", hora: "12:45-14:15", aula: "691A", aux: false },
              { dia: "Sabado", hora: "08:15-09:45", aula: "692A", aux: true }
            ]
          },
          {
            grupo: "G: 8",
            nombre: "OMONTE OJALVO JOSE ROBERTO",
            horarios: [
              { dia: "Lunes", hora: "11:15-12:45", aula: "624", aux: false },
              { dia: "Jueves", hora: "14:15-15:45", aula: "692B", aux: false },
              { dia: "Martes", hora: "14:15-15:45", aula: "692D", aux: true }
            ]
          }

        ]
      },
      {
        nombre: "ARQUITECTURA DE COMPUTADORAS I",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "ACHA PEREZ SAMUEL",
            horarios: [
              { dia: "Viernes", hora: "06:45-08:15", aula: "691C", aux: false },
              { dia: "Sabado", hora: "06:45-08:15", aula: "691B", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "BLANCO COCA LETICIA",
            horarios: [
              { dia: "Lunes", hora: "14:15-15:45", aula: "691B", aux: false },
              { dia: "Jueves", hora: "14:15-15:45", aula: "624", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "AGREDA CORRALES LUIS ROBERTO",
            horarios: [
              { dia: "Lunes", hora: "11:15-12:45", aula: "692A", aux: false },
              { dia: "Miercoles", hora: "12:45-14:15", aula: "617", aux: false }
            ]
          }

        ]
      },
      {
        nombre: "CALCULO II",
        docentes: [
          {
            grupo: "G: 6",
            nombre: "TERRAZAS LOBO JUAN",
            horarios: [
              { dia: "Miercoles", hora: "09:45-11:15", aula: "691D", aux: false },
              { dia: "Miercoles", hora: "14:15-15:45", aula: "625C", aux: true },
              { dia: "Jueves", hora: "14:15-15:45", aula: "693A", aux: false }
            ]
          },
          {
            grupo: "G: 6A",
            nombre: "BUSTILLOS VARGAS ALEX ISRRAEL",
            horarios: [
              { dia: "Lunes", hora: "12:45-14:15", aula: "693D", aux: false },
              { dia: "Martes", hora: "09:45-11:15", aula: "692D", aux: false },
              { dia: "Jueves", hora: "08:15-09:45", aula: "691B", aux: false }
            ]
          },
          {
            grupo: "G: 7",
            nombre: "CATARI RIOS RAUL",
            horarios: [
              { dia: "Lunes", hora: "08:15-09:45", aula: "622", aux: false },
              { dia: "Martes", hora: "09:45-11:15", aula: "607", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "693B", aux: false }
            ]
          },
          {
            grupo: "G: 7A",
            nombre: "VALLEJO CAMACHO MARCO ANTONIO",
            horarios: [
              { dia: "Lunes", hora: "09:45-11:15", aula: "693D", aux: false },
              { dia: "Miercoles", hora: "11:15-12:45", aula: "692C", aux: false },
              { dia: "Viernes", hora: "11:15-12:45", aula: "692H", aux: true }
            ]
          }
        ]
      },
      {
        nombre: "ELEM. DE PROGRAMACION Y ESTRUC. DE DATOS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "TORRICO BASCOPE ROSEMARY",
            horarios: [
              { dia: "Martes", hora: "08:15-09:45", aula: "617C", aux: false },
              { dia: "Miercoles", hora: "11:15-12:45", aula: "651", aux: true },
              { dia: "Viernes", hora: "08:15-09:45", aula: "690C", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "BLANCO COCA LETICIA",
            horarios: [
              { dia: "Lunes", hora: "12:45-14:15", aula: "623", aux: false },
              { dia: "Miercoles", hora: "15:45-17:15", aula: "623", aux: true },
              { dia: "Jueves", hora: "12:45-14:15", aula: "624", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "BLANCO COCA LETICIA",
            horarios: [
              { dia: "Martes", hora: "18:45-20:15", aula: "622", aux: false },
              { dia: "Miercoles", hora: "06:45-08:15", aula: "691C", aux: false },
              { dia: "Jueves", hora: "12:45-14:15", aula: "690C", aux: true }
            ]
          },
          {
            grupo: "G: 5",
            nombre: "POR DESIGNAR DOCENTE",
            horarios: [
              { dia: "Martes", hora: "14:15-15:45", aula: "INFLAB", aux: false },
              { dia: "Jueves", hora: "14:15-15:45", aula: "651", aux: false },
              { dia: "Viernes", hora: "14:15-15:45", aula: "617", aux: true }
            ]
          }
        ]
      },
      {
        nombre: "MATEMATICA DISCRETA",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "FERNANDEZ RAMOS DAVID",
            horarios: [
              { dia: "Miercoles", hora: "17:15-18:45", aula: "623", aux: false },
              { dia: "Jueves", hora: "17:15-18:45", aula: "622", aux: false },
              { dia: "Viernes", hora: "17:15-18:45", aula: "691D", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "DELGADILLO COSSIO DAVID ALFREDO",
            horarios: [
              { dia: "Lunes", hora: "20:15-21:45", aula: "623", aux: false },
              { dia: "Martes", hora: "20:15-21:45", aula: "612", aux: false },
              { dia: "Miercoles", hora: "20:15-21:45", aula: "624", aux: false }
            ]
          }
        ]
      }
    ],
    "C": [
      {
        nombre: "BASE DE DATOS I",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "POR DESIGNAR DOCENTE",
            horarios: [
              { dia: "Martes", hora: "12:45-14:15", aula: "691B", aux: false },
              { dia: "Miercoles", hora: "12:45-14:15", aula: "691B", aux: false },
              { dia: "Jueves", hora: "12:45-14:15", aula: "693D", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "CALANCHA NAVIA BORIS",
            horarios: [
              { dia: "Lunes", hora: "06:45-08:15", aula: "692H", aux: false },
              { dia: "Martes", hora: "06:45-08:15", aula: "693B", aux: false },
              { dia: "Viernes", hora: "06:45-08:15", aula: "692D", aux: false }
            ]
          }

        ]
      },
      {
        nombre: "CALCULO NUMERICO",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "JUCHANI BAZUALDO DEMETRIO",
            horarios: [
              { dia: "Lunes", hora: "14:15-15:45", aula: "622", aux: false },
              { dia: "Martes", hora: "11:15-12:45", aula: "693A", aux: false },
              { dia: "Jueves", hora: "06:45-08:15", aula: "693D", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "ZABALAGA MONTANO OSCAR A.",
            horarios: [
              { dia: "Lunes", hora: "08:15-09:45", aula: "617", aux: false },
              { dia: "Martes", hora: "15:45-17:15", aula: "692H", aux: false },
              { dia: "Miercoles", hora: "15:45-17:15", aula: "690D", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "CIRCUITOS ELECTRONICOS",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "ZAMBRANA BURGOS JHOMIL EFRAIN",
            horarios: [
              { dia: "Lunes", hora: "20:15-21:45", aula: "691A", aux: false },
              { dia: "Sabado", hora: "11:15-12:45", aula: "692A", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "ECUACIONES DIFERENCIALES",
        docentes: [
          {
            grupo: "G: 3A",
            nombre: "CATARI RIOS RAUL",
            horarios: [
              { dia: "Miercoles", hora: "12:45-14:15", aula: "693C", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "623", aux: false },
              { dia: "Sabado", hora: "09:45-11:15", aula: "617", aux: false }
            ]
          },
          {
            grupo: "G: 4",
            nombre: "TAYLOR TERRAZAS DARLONG HOWARD",
            horarios: [
              { dia: "Lunes", hora: "09:45-11:15", aula: "651", aux: false },
              { dia: "Martes", hora: "08:15-09:45", aula: "692C", aux: false },
              { dia: "Viernes", hora: "18:45-20:15", aula: "691A", aux: true }
            ]
          }
        ]
      },
      {
        nombre: "ESTADISTICA I",
        docentes: [
          {
            grupo: "G: 3",
            nombre: "REVOLLO TERAN LUZ MAYA",
            horarios: [
              { dia: "Martes", hora: "09:45-11:15", aula: "692G", aux: false },
              { dia: "Martes", hora: "11:15-12:45", aula: "617B", aux: true },
              { dia: "Jueves", hora: "14:15-15:45", aula: "690C", aux: false }
            ]
          },
          {
            grupo: "G: 4",
            nombre: "SORUCO MAITA JOSE ANTONIO",
            horarios: [
              { dia: "Lunes", hora: "11:15-12:45", aula: "642", aux: true },
              { dia: "Martes", hora: "15:45-17:15", aula: "AULVIR", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "AULVIR", aux: false }
            ]
          },
          {
            grupo: "G: 5",
            nombre: "OMONTE OJALVO JOSE GIL",
            horarios: [
              { dia: "Lunes", hora: "20:15-21:45", aula: "624", aux: false },
              { dia: "Martes", hora: "17:15-18:45", aula: "692C", aux: false },
              { dia: "Jueves", hora: "08:15-09:45", aula: "690B", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "METODOS TECNICAS Y TALLER DE PROGRAMACION",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "FLORES VILLARROEL CORINA",
            horarios: [
              { dia: "Lunes", hora: "11:15-12:45", aula: "652", aux: false },
              { dia: "Martes", hora: "08:15-09:45", aula: "625D", aux: false },
              { dia: "Miercoles", hora: "08:15-09:45", aula: "652", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "MANZUR SORIA CARLOS B.",
            horarios: [
              { dia: "Lunes", hora: "06:45-08:15", aula: "INFLAB", aux: false },
              { dia: "Viernes", hora: "06:45-08:15", aula: "651", aux: false },
              { dia: "Sabado", hora: "06:45-08:15", aula: "651", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "POR DESIGNAR DOCENTE",
            horarios: [
              { dia: "Lunes", hora: "06:45-08:15", aula: "INFLAB", aux: false },
              { dia: "Jueves", hora: "06:45-08:15", aula: "INFLAB", aux: false },
              { dia: "Viernes", hora: "06:45-08:15", aula: "INFLAB", aux: false }
            ]
          },
          {
            grupo: "G: 5",
            nombre: "MONTOYA BURGOS YONY RICHARD",
            horarios: [
              { dia: "Lunes", hora: "09:45-11:15", aula: "INFLAB", aux: false },
              { dia: "Martes", hora: "09:45-11:15", aula: "INFLAB", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "690E", aux: false }
            ]
          },
          {
            grupo: "G: 6",
            nombre: "VILLARROEL NOVILLO JIMMY",
            horarios: [
              { dia: "Lunes", hora: "09:45-11:15", aula: "INFLAB", aux: false },
              { dia: "Martes", hora: "09:45-11:15", aula: "INFLAB", aux: false },
              { dia: "Miercoles", hora: "08:15-09:45", aula: "INFLAB", aux: false }
            ]
          }
        ]
      }
    ],
    "D": [
      {
        nombre: "BASE DE DATOS II",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "APARICIO YUJA TATIANA",
            horarios: [
              { dia: "Lunes", hora: "06:45-08:15", aula: "617B", aux: false },
              { dia: "Martes", hora: "06:45-08:15", aula: "691F", aux: false },
              { dia: "Miercoles", hora: "08:15-09:45", aula: "617B", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "APARICIO YUJA TATIANA",
            horarios: [
              { dia: "Lunes", hora: "12:45-14:15", aula: "692B", aux: false },
              { dia: "Martes", hora: "08:15-09:45", aula: "INFLAB", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "612", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "CONTABILIDAD BASICA",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "MEJIA URQUIETA VICTOR RAMIRO",
            horarios: [
              { dia: "Jueves", hora: "09:45-11:15", aula: "625C", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "693D", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "ARANIBAR LA FUENTE LIGIA JACQUELINE",
            horarios: [
              { dia: "Lunes", hora: "11:15-12:45", aula: "691F", aux: false },
              { dia: "Miercoles", hora: "18:45-20:15", aula: "692A", aux: false },
              { dia: "Viernes", hora: "11:15-12:45", aula: "692C", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "ESTADISTICA II",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "SORUCO MAITA JOSE ANTONIO",
            horarios: [
              { dia: "Lunes", hora: "09:45-11:15", aula: "AULVIR", aux: false },
              { dia: "Jueves", hora: "11:15-12:45", aula: "692A", aux: true },
              { dia: "Jueves", hora: "15:45-17:15", aula: "690MAT", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "OMONTE OJALVO JOSE ROBERTO",
            horarios: [
              { dia: "Lunes", hora: "08:15-09:45", aula: "692B", aux: false },
              { dia: "Jueves", hora: "18:45-20:15", aula: "660", aux: true },
              { dia: "Viernes", hora: "14:15-15:45", aula: "691E", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "INVESTIGACION OPERATIVA I",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "PERICON BALDERRAMA ALFREDO",
            horarios: [
              { dia: "Lunes", hora: "11:15-12:45", aula: "682L8IN", aux: false },
              { dia: "Martes", hora: "06:45-08:15", aula: "682L8IN", aux: false },
              { dia: "Miercoles", hora: "08:15-09:45", aula: "682L7IN", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "QUIROZ CHAVEZ ABDON",
            horarios: [
              { dia: "Martes", hora: "11:15-12:45", aula: "AULVIR", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "AULVIR", aux: false },
              { dia: "Jueves", hora: "12:45-14:15", aula: "AULVIR", aux: false }
            ]
          },
          {
            grupo: "G: 4",
            nombre: "REVOLLO TERAN LUZ MAYA",
            horarios: [
              { dia: "Lunes", hora: "08:15-09:45", aula: "682L8IN", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "617C", aux: false },
              { dia: "Jueves", hora: "09:45-11:15", aula: "625D", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "SISTEMAS DE INFORMACION I",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "SALAZAR SERRUDO CARLA",
            horarios: [
              { dia: "Miercoles", hora: "15:45-17:15", aula: "692B", aux: false },
              { dia: "Jueves", hora: "09:45-11:15", aula: "607", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "691E", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "SALAZAR SERRUDO CARLA",
            horarios: [
              { dia: "Lunes", hora: "17:15-18:45", aula: "691B", aux: false },
              { dia: "Martes", hora: "17:15-18:45", aula: "617B", aux: false },
              { dia: "Miercoles", hora: "18:45-20:15", aula: "617", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "TALLER DE SISTEMAS OPERATIVOS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "ORELLANA ARAOZ JORGE WALTER",
            horarios: [
              { dia: "Lunes", hora: "15:45-17:15", aula: "692C", aux: false },
              { dia: "Miercoles", hora: "14:15-15:45", aula: "691A", aux: false },
              { dia: "Viernes", hora: "14:15-15:45", aula: "691C", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "ORELLANA ARAOZ JORGE WALTER",
            horarios: [
              { dia: "Lunes", hora: "08:15-09:45", aula: "623", aux: false },
              { dia: "Jueves", hora: "08:15-09:45", aula: "691F", aux: false },
              { dia: "Viernes", hora: "08:15-09:45", aula: "624", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "CUSSI NICOLAS GROVER HUMBERTO",
            horarios: [
              { dia: "Martes", hora: "18:45-20:15", aula: "691E", aux: false },
              { dia: "Jueves", hora: "20:15-21:45", aula: "691A", aux: false },
              { dia: "Sabado", hora: "08:15-09:45", aula: "INFLAB", aux: false }
            ]
          }
        ]
      }
    ],
    "E": [
      {
        nombre: "APLICACION DE SISTEMAS OPERATIVOS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "CUSSI NICOLAS GROVER HUMBERTO",
            horarios: [
              { dia: "Viernes", hora: "18:45-20:15", aula: "693D", aux: false },
              { dia: "Sabado", hora: "09:45-11:15", aula: "691B", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "CUSSI NICOLAS GROVER HUMBERTO",
            horarios: [
              { dia: "Lunes", hora: "12:45-14:15", aula: "693B", aux: false },
              { dia: "Jueves", hora: "18:45-20:15", aula: "690B", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "AYOROA CARDOZO JOSE RICHARD",
            horarios: [
              { dia: "Lunes", hora: "09:45-11:15", aula: "INFLAB", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "INFLAB", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "INGLES II",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "PEETERS ILONAA MAGDA LENA",
            horarios: [
              { dia: "Martes", hora: "09:45-11:15", aula: "691B", aux: false },
              { dia: "Jueves", hora: "06:45-08:15", aula: "661", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "PEETERS ILONAA MAGDA LENA",
            horarios: [
              { dia: "Jueves", hora: "09:45-11:15", aula: "691B", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "691C", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "PEETERS ILONAA MAGDA LENA",
            horarios: [
              { dia: "Martes", hora: "06:45-08:15", aula: "692G", aux: false },
              { dia: "Viernes", hora: "06:45-08:15", aula: "692H", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "INVESTIGACION OPERATIVA II",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "MANCHEGO CASTELLON ROBERTO JUAN",
            horarios: [
              { dia: "Miercoles", hora: "17:15-18:45", aula: "692C", aux: false },
              { dia: "Jueves", hora: "17:15-18:45", aula: "607", aux: false },
              { dia: "Sabado", hora: "08:15-09:45", aula: "623", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "MERCADOTECNIA",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "GUTIERREZ ANDRADE OSVALDO WALTER",
            horarios: [
              { dia: "Lunes", hora: "15:45-17:15", aula: "661", aux: false },
              { dia: "Viernes", hora: "15:45-17:15", aula: "693D", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "SARMIENTO FRANCO ARIEL ANTONIO",
            horarios: [
              { dia: "Martes", hora: "18:45-20:15", aula: "623", aux: false },
              { dia: "Miercoles", hora: "18:45-20:15", aula: "690D", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "SISTEMAS DE INFORMACION II",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "FLORES SOLIZ JUAN MARCELO",
            horarios: [
              { dia: "Martes", hora: "06:45-08:15", aula: "690E", aux: false },
              { dia: "Miercoles", hora: "06:45-08:15", aula: "690D", aux: false },
              { dia: "Viernes", hora: "06:45-08:15", aula: "AUDMEMI", aux: false }
            ]
          },
          {
            grupo: "G: 1A",
            nombre: "SALAZAR SERRUDO CARLA",
            horarios: [
              { dia: "Lunes", hora: "15:45-17:15", aula: "617B", aux: false },
              { dia: "Martes", hora: "15:45-17:15", aula: "625C", aux: false },
              { dia: "Jueves", hora: "15:45-17:15", aula: "692F", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "JALDIN ROSALES K. ROLANDO",
            horarios: [
              { dia: "Miercoles", hora: "08:15-09:45", aula: "690E", aux: false },
              { dia: "Jueves", hora: "09:45-11:15", aula: "690E", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "690E", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "SISTEMAS I",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "FIORILO LOZADA AMERICO",
            horarios: [
              { dia: "Lunes", hora: "18:45-20:15", aula: "693A", aux: false },
              { dia: "Viernes", hora: "18:45-20:15", aula: "692C", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "TALLER DE BASE DE DATOS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "CALANCHA NAVIA BORIS",
            horarios: [
              { dia: "Jueves", hora: "17:15-18:45", aula: "693C", aux: false },
              { dia: "Sabado", hora: "09:45-11:15", aula: "691D", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "CALANCHA NAVIA BORIS",
            horarios: [
              { dia: "Miercoles", hora: "18:45-20:15", aula: "INFLAB", aux: false },
              { dia: "Jueves", hora: "18:45-20:15", aula: "693B", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "FLORES SOLIZ JUAN MARCELO",
            horarios: [
              { dia: "Lunes", hora: "06:45-08:15", aula: "690B", aux: false },
              { dia: "Jueves", hora: "06:45-08:15", aula: "690B", aux: false }
            ]
          },
          {
            grupo: "G: 4",
            nombre: "CALANCHA NAVIA BORIS",
            horarios: [
              { dia: "Miercoles", hora: "12:45-14:15", aula: "INFLAB", aux: false },
              { dia: "Jueves", hora: "12:45-14:15", aula: "INFLAB", aux: false }
            ]
          }
        ]
      }
    ],
    "F": [
      {
        nombre: "INGENIERIA DE SOFTWARE",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "CAMACHO DEL CASTILLO INDIRA",
            horarios: [
              { dia: "Martes", hora: "06:45-08:15", aula: "651", aux: false },
              { dia: "Miercoles", hora: "06:45-08:15", aula: "652", aux: false },
              { dia: "Jueves", hora: "06:45-08:15", aula: "692D", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "TORRICO BASCOPE ROSEMARY",
            horarios: [
              { dia: "Martes", hora: "11:15-12:45", aula: "690B", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "INFLAB", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "691D", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "INTELIGENCIA ARTIFICIAL",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "GARCIA PEREZ CARMEN ROSA",
            horarios: [
              { dia: "Martes", hora: "11:15-12:45", aula: "692D", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "692A", aux: false },
              { dia: "Jueves", hora: "11:15-12:45", aula: "692D", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "RODRIGUEZ BILBAO ERIKA PATRICIA",
            horarios: [
              { dia: "Lunes", hora: "12:45-14:15", aula: "691C", aux: false },
              { dia: "Martes", hora: "12:45-14:15", aula: "690B", aux: false },
              { dia: "Miercoles", hora: "12:45-14:15", aula: "692C", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "REDES DE COMPUTADORAS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "ORELLANA ARAOZ JORGE WALTER",
            horarios: [
              { dia: "Lunes", hora: "14:15-15:45", aula: "692B", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "693A", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "692C", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "ORELLANA ARAOZ JORGE WALTER",
            horarios: [
              { dia: "Lunes", hora: "09:45-11:15", aula: "691B", aux: false },
              { dia: "Martes", hora: "09:45-11:15", aula: "693A", aux: false },
              { dia: "Jueves", hora: "09:45-11:15", aula: "691C", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "SIMULACION DE SISTEMAS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "VILLARROEL TAPIA HENRY FRANK",
            horarios: [
              { dia: "Lunes", hora: "14:15-15:45", aula: "692G", aux: false },
              { dia: "Miercoles", hora: "06:45-08:15", aula: "690E", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "VILLARROEL TAPIA HENRY FRANK",
            horarios: [
              { dia: "Lunes", hora: "06:45-08:15", aula: "625D", aux: false },
              { dia: "Martes", hora: "06:45-08:15", aula: "617C", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "SISTEMAS ECONOMICOS",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "VARGAS PEREDO EMIR FELIX",
            horarios: [
              { dia: "Lunes", hora: "12:45-14:15", aula: "625D", aux: false },
              { dia: "Martes", hora: "14:15-15:45", aula: "660", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "SISTEMAS II",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "GARCIA MOLINA JUAN RUBEN",
            horarios: [
              { dia: "Miercoles", hora: "11:15-12:45", aula: "693A", aux: false },
              { dia: "Jueves", hora: "11:15-12:45", aula: "693D", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "TELEFONIA IP",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "MONTOYA BURGOS YONY RICHARD",
            horarios: [
              { dia: "Lunes", hora: "11:15-12:45", aula: "690E", aux: false },
              { dia: "Miercoles", hora: "08:15-09:45", aula: "INFLAB", aux: false }
            ]
          }
        ]
      }
    ],
    "G": [
      {
        nombre: "DINAMICA DE SISTEMAS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "ORELLANA ARAOZ JORGE WALTER",
            horarios: [
              { dia: "Martes", hora: "14:15-15:45", aula: "690C", aux: false },
              { dia: "Jueves", hora: "14:15-15:45", aula: "690E", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "ELECTROTECNIA INDUSTRIAL",
        docentes: [
          {
            grupo: "G: 5",
            nombre: "ACHA PEREZ SAMUEL",
            horarios: [
              { dia: "Lunes", hora: "06:45-08:15", aula: "692E", aux: false },
              { dia: "Martes", hora: "06:45-08:15", aula: "692D", aux: true },
              { dia: "Martes", hora: "08:15-09:45", aula: "682L3", aux: true },
              { dia: "Miercoles", hora: "06:45-08:15", aula: "693B", aux: false },
              { dia: "Viernes", hora: "06:45-08:15", aula: "660", aux: true }
            ]
          }
        ]
      },
      {
        nombre: "GESTION DE CALIDAD DE SOFTWARE",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "TORRICO BASCOPE ROSEMARY",
            horarios: [
              { dia: "Martes", hora: "09:45-11:15", aula: "690D", aux: false },
              { dia: "Jueves", hora: "08:15-09:45", aula: "691C", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "PLANIFICACION Y EVALUACION DE PROYECTOS",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "VARGAS ANTEZANA ADEMAR MARCELO",
            horarios: [
              { dia: "Martes", hora: "17:15-18:45", aula: "660", aux: false },
              { dia: "Miercoles", hora: "06:45-08:15", aula: "692C", aux: false },
              { dia: "Jueves", hora: "09:45-11:15", aula: "690B", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "REDES AVANZADAS DE COMPUTADORAS",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "MONTECINOS CHOQUE MARCO ANTONIO",
            horarios: [
              { dia: "Martes", hora: "12:45-14:15", aula: "607", aux: false },
              { dia: "Jueves", hora: "12:45-14:15", aula: "692A", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "TALLER DE INGENIERIA DE SOFTWARE",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "FLORES VILLARROEL CORINA",
            horarios: [
              { dia: "Lunes", hora: "09:45-11:15", aula: "690D", aux: false },
              { dia: "Martes", hora: "09:45-11:15", aula: "690E", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "BLANCO COCA LETICIA",
            horarios: [
              { dia: "Martes", hora: "08:15-09:45", aula: "651", aux: false },
              { dia: "Miercoles", hora: "08:15-09:45", aula: "INFLAB", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "ESCALERA FERNANDEZ DAVID",
            horarios: [
              { dia: "Lunes", hora: "06:45-08:15", aula: "INFLAB", aux: false },
              { dia: "Jueves", hora: "06:45-08:15", aula: "INFLAB", aux: false }
            ]
          },
          {
            grupo: "G: 4",
            nombre: "RODRIGUEZ BILBAO ERIKA PATRICIA",
            horarios: [
              { dia: "Lunes", hora: "14:15-15:45", aula: "690E", aux: false },
              { dia: "Martes", hora: "14:15-15:45", aula: "690E", aux: false }
            ]
          }
        ]
      }
    ],
    "H": [
      {
        nombre: "EVALUACION Y AUDITORIA DE SISTEMAS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "ROMERO RODRIGUEZ PATRICIA",
            horarios: [
              { dia: "Martes", hora: "11:15-12:45", aula: "691F", aux: false },
              { dia: "Miercoles", hora: "08:15-09:45", aula: "690B", aux: false },
              { dia: "Jueves", hora: "08:15-09:45", aula: "690C", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "VILLARROEL NOVILLO JIMMY",
            horarios: [
              { dia: "Lunes", hora: "15:45-17:15", aula: "692F", aux: false },
              { dia: "Martes", hora: "08:15-09:45", aula: "691D", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "661", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "GESTION ESTRATEGICA DE EMPRESAS",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "GUZMAN ORELLANA GONZALO ENRIQUE ANTONIO",
            horarios: [
              { dia: "Martes", hora: "06:45-08:15", aula: "682L6IN", aux: false },
              { dia: "Martes", hora: "08:15-09:45", aula: "682L6IN", aux: false },
              { dia: "Miercoles", hora: "08:15-09:45", aula: "682L6IN", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "INGLES III",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "GRILO SALVATIERRA MARIA ESTELA",
            horarios: [
              { dia: "Martes", hora: "14:15-15:45", aula: "693A", aux: false },
              { dia: "Viernes", hora: "15:45-17:15", aula: "693B", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "METODOL. Y PLANIF. DE PROYECTO DE GRADO",
        docentes: [
          {
            grupo: "G: 3",
            nombre: "JALDIN ROSALES K. ROLANDO",
            horarios: [
              { dia: "Miercoles", hora: "09:45-11:15", aula: "690E", aux: false },
              { dia: "Jueves", hora: "15:45-17:15", aula: "690E", aux: false },
              { dia: "Viernes", hora: "08:15-09:45", aula: "690E", aux: false },
            ]
          },
          {
            grupo: "G: 4",
            nombre: "FIORILO LOZADA AMERICO",
            horarios: [
              { dia: "Lunes", hora: "20:15-21:45", aula: "692D", aux: false },
              { dia: "Martes", hora: "18:45-20:15", aula: "642", aux: false },
              { dia: "Miercoles", hora: "06:45-08:15", aula: "690C", aux: false },
            ]
          },
          {
            grupo: "G: 5",
            nombre: "VILLARROEL TAPIA HENRY FRANK",
            horarios: [
              { dia: "Lunes", hora: "15:45-17:15", aula: "625C", aux: false },
              { dia: "Martes", hora: "17:15-18:45", aula: "625C", aux: false },
              { dia: "Miercoles", hora: "17:15-18:45", aula: "690B", aux: false },
            ]
          }
        ]
      },
      {
        nombre: "SEGURIDAD DE SISTEMAS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "ANTEZANA CAMACHO MARCELO",
            horarios: [
              { dia: "Lunes", hora: "11:15-12:45", aula: "INFLAB", aux: false },
              { dia: "Martes", hora: "11:15-12:45", aula: "INFLAB", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "SISTEMAS COLABORATIVOS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "ANTEZANA CAMACHO MARCELO",
            horarios: [
              { dia: "Lunes", hora: "08:15-09:45", aula: "INFLAB", aux: false },
              { dia: "Martes", hora: "09:45-11:15", aula: "INFLAB", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "TALLER DE SIMULACION DE SISTEMAS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "VILLARROEL TAPIA HENRY FRANK",
            horarios: [
              { dia: "Lunes", hora: "18:45-20:15", aula: "690E", aux: false },
              { dia: "Miercoles", hora: "14:15-15:45", aula: "690E", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "AYOROA CARDOZO JOSE RICHARD",
            horarios: [
              { dia: "Lunes", hora: "08:15-09:45", aula: "INFLAB", aux: false },
              { dia: "Miercoles", hora: "08:15-09:45", aula: "INFLAB", aux: false }
            ]
          }
        ]
      }
    ],
    "G": [
      {
        nombre: "DINAMICA DE SISTEMAS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "ORELLANA ARAOZ JORGE WALTER",
            horarios: [
              { dia: "Martes", hora: "14:15-15:45", aula: "690C", aux: false },
              { dia: "Jueves", hora: "14:15-15:45", aula: "690E", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "ELECTROTECNIA INDUSTRIAL",
        docentes: [
          {
            grupo: "G: 5",
            nombre: "ACHA PEREZ SAMUEL",
            horarios: [
              { dia: "Lunes", hora: "06:45-08:15", aula: "692E", aux: false },
              { dia: "Martes", hora: "06:45-08:15", aula: "692D", aux: true },
              { dia: "Martes", hora: "08:15-09:45", aula: "682L3", aux: true },
              { dia: "Miercoles", hora: "06:45-08:15", aula: "693B", aux: false },
              { dia: "Viernes", hora: "06:45-08:15", aula: "660", aux: true }
            ]
          }
        ]
      },
      {
        nombre: "GESTION DE CALIDAD DE SOFTWARE",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "TORRICO BASCOPE ROSEMARY",
            horarios: [
              { dia: "Martes", hora: "09:45-11:15", aula: "690D", aux: false },
              { dia: "Jueves", hora: "08:15-09:45", aula: "691C", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "PLANIFICACION Y EVALUACION DE PROYECTOS",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "VARGAS ANTEZANA ADEMAR MARCELO",
            horarios: [
              { dia: "Martes", hora: "17:15-18:45", aula: "660", aux: false },
              { dia: "Miercoles", hora: "06:45-08:15", aula: "692C", aux: false },
              { dia: "Jueves", hora: "09:45-11:15", aula: "690B", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "REDES AVANZADAS DE COMPUTADORAS",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "MONTECINOS CHOQUE MARCO ANTONIO",
            horarios: [
              { dia: "Martes", hora: "12:45-14:15", aula: "607", aux: false },
              { dia: "Jueves", hora: "12:45-14:15", aula: "692A", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "TALLER DE INGENIERIA DE SOFTWARE",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "FLORES VILLARROEL CORINA",
            horarios: [
              { dia: "Lunes", hora: "09:45-11:15", aula: "690D", aux: false },
              { dia: "Martes", hora: "09:45-11:15", aula: "690E", aux: false }
            ]
          },
          {
            grupo: "G: 2",
            nombre: "BLANCO COCA LETICIA",
            horarios: [
              { dia: "Martes", hora: "08:15-09:45", aula: "651", aux: false },
              { dia: "Miercoles", hora: "08:15-09:45", aula: "INFLAB", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "ESCALERA FERNANDEZ DAVID",
            horarios: [
              { dia: "Lunes", hora: "06:45-08:15", aula: "INFLAB", aux: false },
              { dia: "Jueves", hora: "06:45-08:15", aula: "INFLAB", aux: false }
            ]
          },
          {
            grupo: "G: 4",
            nombre: "RODRIGUEZ BILBAO ERIKA PATRICIA",
            horarios: [
              { dia: "Lunes", hora: "14:15-15:45", aula: "690E", aux: false },
              { dia: "Martes", hora: "14:15-15:45", aula: "690E", aux: false }
            ]
          }
        ]
      }
    ],
    "I": [
      {
        nombre: "BUSINESS INTELLIGENCE Y BIG DATA",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "POR DESIGNAR DOCENTE",
            horarios: [
              { dia: "Miercoles", hora: "06:45-08:15", aula: "INFLAB", aux: false },
              { dia: "Viernes", hora: "06:45-08:15", aula: "691F", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "COSTOS INDUSTRIALES",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "LIMA VACAFLOR TITO ANIBAL",
            horarios: [
              { dia: "Lunes", hora: "18:45-20:15", aula: "617", aux: false },
              { dia: "Miercoles", hora: "20:15-21:45", aula: "612", aux: false },
              { dia: "Sabado", hora: "11:15-12:45", aula: "617", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "LIMA VACAFLOR TITO ANIBAL",
            horarios: [
              { dia: "Lunes", hora: "20:15-21:45", aula: "692E", aux: false },
              { dia: "Miercoles", hora: "18:45-20:15", aula: "682L0IN", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "INGENIERIA DE METODOS Y REINGENIERIA",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "COSIO PAPADOPOLIS CARLOS JAVIER ALFREDO",
            horarios: [
              { dia: "Martes", hora: "06:45-08:15", aula: "691B", aux: false },
              { dia: "Miercoles", hora: "08:15-09:45", aula: "691C", aux: false },
              { dia: "Jueves", hora: "08:15-09:45", aula: "617C", aux: true },
              { dia: "Viernes", hora: "06:45-08:15", aula: "692A", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "INGENIERIA ECONOMICA",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "ARANIBAR LA FUENTE LIGIA JACQUELINE",
            horarios: [
              { dia: "Martes", hora: "08:15-09:45", aula: "682L8IN", aux: false },
              { dia: "Jueves", hora: "08:15-09:45", aula: "652", aux: false },
              { dia: "Viernes", hora: "08:15-09:45", aula: "692B", aux: false },
            ]
          },
          {
            grupo: "G: 3",
            nombre: "ARANIBAR LA FUENTE LIGIA JACQUELINE",
            horarios: [
              { dia: "Lunes", hora: "09:45-11:15", aula: "690C", aux: false },
              { dia: "Miercoles", hora: "17:15-18:45", aula: "693B", aux: false },
              { dia: "Viernes", hora: "09:45-11:15", aula: "690B", aux: false },
            ]
          }
        ]
      },
      {
        nombre: "PLANIF. Y CONTROL DE LA PRODUCCION I",
        docentes: [
          {
            grupo: "G: 3",
            nombre: "QUIROZ CHAVEZ ABDON",
            horarios: [
              { dia: "Martes", hora: "08:15-09:45", aula: "AULVIR", aux: false },
              { dia: "Miercoles", hora: "11:15-12:45", aula: "AULVIR", aux: false },
              { dia: "Jueves", hora: "09:45-11:15", aula: "AULVIR", aux: false },
            ]
          }
        ]
      },
      {
        nombre: "PLANIF. Y CONTROL DE LA PRODUCCION II",
        docentes: [
          {
            grupo: "G: 3",
            nombre: "CHOQUE FLORES ALEX D'ANCHGELO",
            horarios: [
              { dia: "Martes", hora: "18:45-20:15", aula: "690B", aux: false },
              { dia: "Jueves", hora: "18:45-20:15", aula: "625D", aux: false },
              { dia: "Sabado", hora: "09:45-11:15", aula: "691F", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "PRACTICA EMPRESARIAL",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "ANTEZANA CAMACHO MARCELO",
            horarios: [
              { dia: "Lunes", hora: "09:45-11:15", aula: "690E", aux: false },
              { dia: "Martes", hora: "08:15-09:45", aula: "INFLAB", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "PROGRAMACION MOVIL",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "FIORILO LOZADA AMERICO",
            horarios: [
              { dia: "Martes", hora: "20:15-21:45", aula: "691C", aux: false },
              { dia: "Viernes", hora: "20:15-21:45", aula: "691E", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "PROYECTO FINAL",
        docentes: [
          {
            grupo: "G: 2",
            nombre: "MONTANO QUIROGA VICTOR HUGO",
            horarios: [
              { dia: "Martes", hora: "11:15-12:45", aula: "INFLAB", aux: false },
              { dia: "Jueves", hora: "08:15-09:45", aula: "INFDEP", aux: false }
            ]
          },
          {
            grupo: "G: 3",
            nombre: "GARCIA PEREZ CARMEN ROSA",
            horarios: [
              { dia: "Miercoles", hora: "12:45-14:15", aula: "690E", aux: false },
              { dia: "Jueves", hora: "08:15-09:45", aula: "690E", aux: false }
            ]
          },
          {
            grupo: "G: 4",
            nombre: "ROMERO RODRIGUEZ PATRICIA",
            horarios: [
              { dia: "Martes", hora: "09:45-11:15", aula: "625C", aux: false },
              { dia: "Miercoles", hora: "14:15-15:45", aula: "617C", aux: false }
            ]
          },
          {
            grupo: "G: 5",
            nombre: "VILLARROEL NOVILLO JIMMY",
            horarios: [
              { dia: "Lunes", hora: "14:15-15:45", aula: "INFDEP", aux: false },
              { dia: "Martes", hora: "14:15-15:45", aula: "INFDEP", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "ROBOTICA",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "GARCIA PEREZ CARMEN ROSA",
            horarios: [
              { dia: "Martes", hora: "09:45-11:15", aula: "692F", aux: false },
              { dia: "Jueves", hora: "09:45-11:15", aula: "692G", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "WEB SEMANTICAS",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "RODRIGUEZ BILBAO ERIKA PATRICIA",
            horarios: [
              { dia: "Lunes", hora: "11:15-12:45", aula: "691C", aux: false },
              { dia: "Miercoles", hora: "14:15-15:45", aula: "681B", aux: false }
            ]
          }
        ]
      }
    ],
    "J": [
      {
        nombre: "GENERACION DE SOFTWARE",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "COSTAS JAUREGUI VLADIMIR ABEL",
            horarios: [
              { dia: "Martes", hora: "14:15-15:45", aula: "607", aux: false },
              { dia: "Miercoles", hora: "09:45-11:15", aula: "692C", aux: false }
            ]
          }
        ]
      },
      {
        nombre: "TECNICAS DE RUTEO AVANZADA",
        docentes: [
          {
            grupo: "G: 1",
            nombre: "MONTOYA BURGOS YONY RICHARD",
            horarios: [
              { dia: "Martes", hora: "11:15-12:45", aula: "690E", aux: false },
              { dia: "Miercoles", hora: "11:15-12:45", aula: "INFLAB", aux: false }
            ]
          }
        ]
      }
    ]
  };
  
  export default scheduleData;         

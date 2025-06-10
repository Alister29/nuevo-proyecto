const castDay = (day) => {
  const days = {
    LU: "Lunes",
    MA: "Martes",
    MI: "Miércoles",
    JU: "Jueves",
    VI: "Viernes",
    SA: "Sabado",
  };
  if (days.hasOwnProperty(day)) return days[day];

  return day;
};

const newEntry = (entry, type) => {
  const horario = {
    dia: entry.dia,
    hora: entry.hora,
    aula: entry.aula,
    aux: entry.tipo === "[TP]",
  };

  const grupo = {
    grupo: entry.grupo,
    nombre: entry.docente,
    horarios: [],
  };

  const materia = {
    id_mat: entry.id_mat,
    nombre: entry.nombre_mat,
    docentes: [],
  };

  const builder = {
    materia: () => {
      grupo.horarios.push(horario);
      materia.docentes.push(grupo);
      return materia;
    },
    grupo: () => {
      grupo.horarios.push(horario);
      return grupo;
    },
    horario: () => horario,
  };

  return builder[type]();
};

const addEntry = (entries, t1, t2, t3) => {
  console.log("add entry", t1, t2);

  /* const entry = {
    nivel: t1[0],
    id_mat: t1[1],
    nombre_mat: t1[2],
    grupo: "G: " + t2[0],
    tipo: t2[1] || "",
    docente: t2[2] || "POR DESIGNAR DOCENTE",
    dia: castDay(t3[0]),
    hora: t3[1]
      .replace(" ", "")
      .padStart(9, "0")
      .replace(/(\d{2})(\d{2})-(\d{2})(\d{2})/, "$1:$2-$3:$4"),
    aula: t3[2],
  }; */

  const entry = {
    nivel: t1[0],
    id_mat: t1[1],
    nombre_mat: t1[2],
    grupo: "G: " + t2[0],
    tipo: t2[1] || "",
    docente: t2[2] || "POR DESIGNAR DOCENTE",
    dia: castDay(t2[3]),
    hora: t2[4]
      .replace(" ", "")
      .padStart(9, "0")
      .replace(/(\d{2})(\d{2})-(\d{2})(\d{2})/, "$1:$2-$3:$4"),
    aula: t2[5],
  };

  if (entries.hasOwnProperty(entry.nivel)) {
    const mat = entries[entry.nivel].find(
      (item) => item.id_mat === entry.id_mat
    );
    if (mat) {
      const grupo = mat.docentes.find((item) => item.grupo === entry.grupo);

      if (grupo) {
        grupo.horarios.push(newEntry(entry, "horario"));
      } else {
        mat.docentes.push(newEntry(entry, "grupo"));
      }
    } else {
      entries[entry.nivel].push(newEntry(entry, "materia"));
    }
  } else {
    entries[entry.nivel] = [newEntry(entry, "materia")];
  }
};

//Modulo pdfjs-dist inservible
/*
export const readLines = async (file_buffer) => {
  const pdf = await pdfjs.getDocument({ data: file_buffer }).promise;
  const lines = [];
  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const content = await page.getTextContent();
    const pageLines = content.items.map((i) => i.str);
    lines.push(...pageLines);
  }
  return lines.map((line) => line.trim()).filter((line) => line !== "");
}; */

export const parse = (textArray) => {
  console.log(textArray);

  const lines = textArray
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const regexMateria = /^([A-Z])\s+(\d+)\s+(.*)$/;
  const regexGrupoDocente = /^(\d+|[A-Z]\d*)\s*(\[[A-Z]+\])?\s*(.*)$/;
  const regexNameOnly = /^([A-Z]+)$/;
  const regexDiaHoraAula = /^([A-Z]{2})\s+(\d{3,4}\s?\-\d{4})(.*)$/;

  const regexGrHr =
    /^(\w+\d*)\s(?:\[(\w+)\]\s)?((?:[A-ZÁÉÍÓÚÑ]+(?:\s|$))+)\s(LU|MA|MI|JU|VI)\s(\d{3,4}-\d{4})\s(.+)$/


  let parse = false;
  let newGrupo = false;

  const horarios = {};

  let token1 = [];
  let token2 = [];
  let token3 = [];

  for (const line of lines) {
    // La linea contiene NIVEL indica que comienzan las lineas de horarios
    if (line.includes("NIVEL") && line.includes("MATERIA")) {
      parse = true;
      continue;
    }
    // La linea contiene Procesado CPD indica que es el final de la pagina
    if (line.includes("Procesado CPD")) {
      parse = false;
    }
    if (parse) {
      //Si la linea es una materia Nivel - COD - MATERIA
      console.log(line);
      const materia = line.match(regexMateria);
      if (materia) {
        newGrupo = true;
        token1 = materia.slice(1);
      } else if (newGrupo) {
        //Si se sigue en el ultimo grupo de materia leida
        //Si la linea es GRUPO TIPO DOCENTE
        //const grupoDocente = line.match(regexGrupoDocente);
        //token2 = grupoDocente.slice(1);
        newGrupo = false;

        //GRUPO TIPO DOCENTE DIA HORA AULA
        const grupoHora = line.match(regexGrHr);
        console.log("GR TP", line, grupoHora);

        token2 = grupoHora.slice(1);
        addEntry(horarios, token1, token2, token3);
      } /* else if (line.match(regexNameOnly)) {
        //Algun nombre que es muy largo aparece solo en una linea
        token2[2] += " " + line;
      } */
      /* else {
        newGrupo = true;
        //La linea es un DIA HORA AULA
        const diaHoraAula = line.match(regexDiaHoraAula);
        token3 = diaHoraAula.slice(1);
        //Agregar una linea con los datos leidos
        addEntry(horarios, token1, token2, token3);
      } */
      
    }
  }
  return horarios;
};

import React, { useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";

import { TarjetaMateria, BarraProgreso } from "../components";

const { width, height } = Dimensions.get("window");

const countSubjects = (subjects) => {
  let total = 0;
  let normales = 0;
  let electivas = 0;

  for (const values of Object.values(subjects)) {
    values.forEach((v) => {
      if (v.tipo === "Regular") normales++;
      if (v.tipo === "Electiva") electivas++;
      total++;
    });
  }
  return { total, normales, electivas };
};

const data = {
  A: [
    {
      codigo: "1803001",
      materia: "Ingles I",
      tipo: "Regular",
      electiva: "No",
      prereq: "-",
    },
    {
      codigo: "2010010",
      materia: "Introduccion a la Programación",
      tipo: "Regular",
      electiva: "No",
      prereq: "-",
    },
    {
      codigo: "2010140",
      materia: "Metodologia Invertigacion y Tec Comunicación",
      tipo: "Regular",
      electiva: "No",
      prereq: "-",
    },
  ],
  B: [
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 1",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 2",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 3 ",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 4",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
  ],
  C: [
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 10",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 20",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 30",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 4",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
  ],
  D: [
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 100",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 200",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 300",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 400",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
  ],
  E: [
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 01",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 02",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 03 ",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
    {
      codigo: "1803001",
      materia: "Elem. de Programación y Estruc. de Datos 04",
      tipo: "Regular",
      electiva: "No",
      prereq: "2010010, 2010140",
    },
  ],
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  career: {
    marginBottom: 5,
  },
  viewer: {
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 2,
    borderWidth: 1,
  },
  list: {
    flex: 1,
    padding: 2,
    gap: 10,
  },
  entry: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  details: {
    flexDirection: "row",
    marginBottom: 5,
  },
  column: {
    width: "50%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 40,
  },
});

export const ProgresoScreen = () => {
  const { total, normales, electivas } = countSubjects(data);

  return (
    <View style={styles.page}>
      <Text style={styles.career}>Carrera: {"Ing. de Sistemas"}</Text>
      <BarraProgreso progreso={2} total={total} />
      <ScrollView
        horizontal
        style={[styles.viewer, { width: width - 20, height: height - 265 }]}
      >
        <ScrollView>
          <View style={styles.list}>
            {Object.entries(data).map(([nivel, materias]) => {
              return (
                <View style={styles.entry} key={`nivel${nivel}`}>
                  <Text>Nivel {nivel}</Text>
                  {materias.map((m) => {
                    return (
                      <TarjetaMateria
                        data={m}
                        key={`${nivel}-${m.materia}`}
                        onLongPress={() => {
                          console.log("pipipi");
                        }}
                      />
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </ScrollView>

      <View>
        <Text>Numero total de Materias: {total}</Text>
        <View style={styles.details}>
          <View style={styles.column}>
            <View style={styles.row}>
              <Text>Normales:</Text>
              <Text>{normales}</Text>
            </View>
            <View style={styles.row}>
              <Text>Aprobadas:</Text>
              <Text>{`2/${total}`}</Text>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.row}>
              <Text>Electivas:</Text>
              <Text>{electivas}</Text>
            </View>
            <View style={styles.row}>
              <Text>Aprobadas:</Text>
              <Text>{`0/6`}</Text>
            </View>
          </View>
        </View>
        <Button title="Actualizar"></Button>
      </View>
    </View>
  );
};

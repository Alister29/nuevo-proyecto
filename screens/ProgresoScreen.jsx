import React, { useContext, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";

import { TarjetaMateria, BarraProgreso, Modal } from "../components";
import * as pensumSrv from "../services/pensumService";

const { width, height } = Dimensions.get("window");

const countProgress = (subjects = {}, approved = []) => {
  let total = 0;
  let normales = 0;
  let normAprobadas = 0;
  let electivas = 0;
  let electAprobadas = 0;

  for (const values of Object.values(subjects)) {
    values.forEach((v) => {
      if (v.tipo === "Regular") normales++;
      if (v.tipo === "Electiva") electivas++;
      total++;
      if (approved.includes(v.codigo)) {
        if (v.tipo === "Regular") {
          normAprobadas++;
        } else {
          electAprobadas++;
        }
      }
    });
  }
  return { total, normales, electivas, normAprobadas, electAprobadas };
};

const findPrereq = (materias, code) => {
  for (const nivel of Object.values(materias)) {
    const filter = nivel.filter((m) => m.codigo === code);
    if (filter.length) {
      return filter[0].materia;
    }
  }
  return "No encontrado";
};

export const ProgresoScreen = () => {
  const [viewInfo, setViewInfo] = useState(false);
  const [info, setInfo] = useState({});
  const [materias, setMaterias] = useState({});
  const [aprobadas, setAprobadas] = useState(["2010140"]);
  const [progreso, setProgreso] = useState({
    total: 0,
    normales: 0,
    normAprobadas: 0,
    electivas: 0,
    electAprobadas: 0,
  });

  const cargarMaterias = () => {
    pensumSrv.leerPensum("sistemas").then((data) => {
      setMaterias(data);
      setProgreso(countProgress(data, aprobadas));
    });
  };

  useEffect(cargarMaterias, []);

  const toggleInfo = (materia) => {
    setInfo(materia);
    setViewInfo(!viewInfo);
  };

  return (
    <View style={styles.page}>
      <Modal
        isVisible={viewInfo}
        closeFn={() => {
          setViewInfo(false);
        }}
      >
        <Text style={styles.modalTitle}>Detalles de Materia</Text>
        <Text>Nivel: {info.nivel}</Text>
        <Text>Nombre: {info.materia}</Text>
        <Text>Código: {info.codigo}</Text>
        <Text>Tipo: {info.tipo}</Text>
        <Text>Electiva: {info.electiva}</Text>
        <Text>Pre-Requisitos: {info.prereq?.replace('"', "")}</Text>
        {info.prereq
          ?.replace('"', "")
          .split(",")
          .map((p, i) => {
            return (
              <Text
                style={styles.prereq}
                key={`${info.materia}-${info.electiva}-${i}`}
              >
                {findPrereq(materias, p.trim())}
              </Text>
            );
          })}
      </Modal>

      <Text style={styles.career}>Carrera: {"Ing. de Sistemas"}</Text>
      <BarraProgreso progreso={2} total={progreso.total} />
      <ScrollView
        horizontal
        style={[styles.viewer, { width: width - 20, height: height - 265 }]}
      >
        <ScrollView>
          <View style={styles.list}>
            {Object.entries(materias).map(([nivel, materias]) => {
              return (
                <View style={styles.entry} key={`nivel${nivel}`}>
                  <Text>Nivel {nivel}</Text>
                  {materias.map((m) => {
                    return (
                      <TarjetaMateria
                        data={m}
                        done={aprobadas.includes(m.codigo)}
                        key={`${nivel}-${m.materia}`}
                        onLongPress={() => {
                          toggleInfo({ ...m, nivel });
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
        <Text>Numero total de Materias: {progreso.total}</Text>
        <View style={styles.details}>
          <View style={styles.column}>
            <View style={styles.row}>
              <Text>Normales:</Text>
              <Text>{progreso.normales}</Text>
            </View>
            <View style={styles.row}>
              <Text>Aprobadas:</Text>
              <Text>{`${progreso.normAprobadas}/${progreso.total}`}</Text>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.row}>
              <Text>Electivas:</Text>
              <Text>{progreso.electivas}</Text>
            </View>
            <View style={styles.row}>
              <Text>Aprobadas:</Text>
              <Text>{`${progreso.electAprobadas}/6`}</Text>
            </View>
          </View>
        </View>
        <Button title="Actualizar"></Button>
      </View>
    </View>
  );
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
  modalTitle: {
    textAlign: "center",
  },
  prereq: {
    paddingLeft: 20,
  },
});

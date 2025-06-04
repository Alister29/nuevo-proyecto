import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Modal, ViewPDF } from "../components";
import { COLLECTIONS } from "../database";
import { searchDocuments } from "../services";

const SearchTab = (props) => {
  const {
    subjectList,
    subject,
    setSubject,
    category,
    setCategory,
    title,
    setTitle,
  } = props;

  return (
    <View style={styles.tabContainer}>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Materia</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={subject}
            onValueChange={(val) => setSubject(val)}
            mode="dialog"
          >
            <Picker.Item
              label="Seleccionar (Requerido)"
              value=""
              enabled={false}
            />
            {subjectList.map((s) => (
              <Picker.Item label={s} value={s} key={s} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Categoria</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={category}
            onValueChange={(val) => setCategory(val)}
            mode="dialog"
          >
            <Picker.Item label="Todas" value="none" />
            {COLLECTIONS.DOCUMENT_CATEGORIES.map((c) => (
              <Picker.Item label={c} value={c} key={c} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Titulo</Text>
        <TextInput
          style={styles.input}
          placeholder="Titulo (Opcional)"
          placeholderTextColor="#CCC"
          onChangeText={(v) => setTitle(v)}
          value={title}
        />
      </View>
    </View>
  );
};

const normalize = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const titleFilter = (title, data) => {
  if (!title.trim()) return data;

  const words = title.toLowerCase().split(/\s+/).filter(Boolean).map(normalize);

  return data.filter((item) => {
    const itemTitle = normalize(item.titulo || "");
    return words.some((palabra) => itemTitle.includes(palabra));
  });
};

const DetailsTab = ({ entry }) => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Materia</Text>
        <Text>{entry?.materia}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Categoria</Text>
        <Text>{entry?.categoria}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Titulo </Text>
        <Text>{entry?.titulo}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Subido por </Text>
        <Text>{entry?.usuario}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Fecha </Text>
        <Text>{entry?.fecha}</Text>
      </View>
    </View>
  );
};

const ResultsSection = ({ rows, entry, action }) => {
  const releaseHeaders = ["Titulo", "Publicado por", "Mostrar"];
  const fileHeaders = ["Archivo", "Peso", "Ver"];

  const { height } = Dimensions.get("window");

  const heightStyle = height - 345;

  const headers = entry ? fileHeaders : releaseHeaders;

  return (
    <ScrollView style={[styles.resultsContainer, { height: heightStyle }]}>
      <View style={styles.row}>
        <Text style={styles.col1}>{headers[0]}</Text>
        <Text style={styles.col2}>{headers[1]}</Text>
        <Text style={styles.col3}>{headers[2]}</Text>
      </View>
      {!entry &&
        rows?.map((r, i) => {
          return (
            <TouchableOpacity
              style={styles.row}
              key={`results${i}`}
              onPress={() => {
                action(r);
              }}
            >
              <Text style={styles.col1}>{r.titulo}</Text>
              <Text style={styles.col2}>{r.usuario}</Text>
              <Text style={styles.col3}>▶</Text>
            </TouchableOpacity>
          );
        })}
      {entry &&
        rows?.archivos?.map((r, i) => {
          return (
            <TouchableOpacity
              style={styles.row}
              key={`result-files${i}`}
              onPress={() => {
                action(r);
              }}
            >
              <Text style={styles.col1}>{r.nombre}</Text>
              <Text style={styles.col2}>{r.peso}</Text>
              <Text style={styles.col3}>🔍</Text>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
};

export const VerDocScreen = () => {
  const [viewEntry, setViewEntry] = useState(false);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showPDF, setShowPDF] = useState(false);
  const [pdfFile, setPdfFile] = useState("");

  const [entry, setEntry] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const buscar = async () => {
    if (!subject) {
      showMessage("Selecciona una materia");
      return;
    }

    setSearching(true);
    
    try {
      let newSearchResults = await searchDocuments(subject, category);

      if(title){
        newSearchResults = titleFilter(title, newSearchResults);
      }

      setSearchResults(newSearchResults);
    } catch (error) {
      console.error(error.message);
    }

    setSearching(false);
  };

  const showMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      {viewEntry && <DetailsTab entry={entry} />}

      {!viewEntry && (
        <SearchTab
          subjectList={COLLECTIONS.DOCUMENT_SUBJECTS}
          subject={subject}
          setSubject={setSubject}
          category={category}
          setCategory={setCategory}
          title={title}
          setTitle={setTitle}
        />
      )}

      <Button
        title={viewEntry ? "Volver a los resultados" : "Buscar"}
        onPress={viewEntry ? () => setViewEntry(false) : buscar}
        disabled={searching}
      ></Button>

      <Text style={styles.resultsLabel}>
        {viewEntry ? "Archivos" : "Resultados de la Busqueda"}
      </Text>

      <ResultsSection
        rows={viewEntry ? entry : searchResults}
        entry={viewEntry}
        action={
          viewEntry
            ? (row) => {
                setPdfFile(row.uri);
                setShowPDF(true);
              }
            : (row) => {
                setEntry(row);
                setViewEntry(true);
              }
        }
      />
      <Modal isVisible={showModal} closeFn={() => setShowModal(false)}>
        <Text style={styles.centerText}>{modalMessage}</Text>
      </Modal>
      <ViewPDF
        isVisible={showPDF}
        onClose={() => setShowPDF(false)}
        file={pdfFile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  centerText: {
    textAlign: "center",
  },
  tabContainer: {
    height: 180,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
  },
  fieldLabel: {
    paddingVertical: 4,
    width: 75,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingLeft: 10,
    marginVertical: 4,
    backgroundColor: "white",
  },
  resultsLabel: {
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 2,
    paddingLeft: 2,
  },
  resultsContainer: {
    borderWidth: 1,
    borderColor: "#606060",
  },
  row: {
    flexDirection: "row",
  },
  col1: {
    width: "50%",
    paddingLeft: 4,
  },
  col2: {
    width: "30%",
    paddingLeft: 4,
  },
  col3: {
    width: "20%",
    paddingLeft: 4,
    textAlign: "center",
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage, db, auth } from '../../database/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const SubirEventoScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [imagen, setImagen] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  const seleccionarImagen = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.cancelled) {
      setImagen(resultado.uri);
    }
  };

  const subirEvento = async () => {
    if (!titulo || !descripcion || !fecha || !imagen) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    setSubiendo(true);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();
      const nombreImagen = `${Date.now()}.jpg`;
      const referenciaImagen = ref(storage, `eventos/${nombreImagen}`);
      await uploadBytes(referenciaImagen, blob);
      const urlImagen = await getDownloadURL(referenciaImagen);

      await addDoc(collection(db, 'eventos'), {
        titulo,
        descripcion,
        fecha: Timestamp.fromDate(new Date(fecha)),
        imagenURL: urlImagen,
        creadoPor: auth.currentUser.uid,
        creadoEn: Timestamp.now(),
      });

      Alert.alert('Éxito', 'Evento subido correctamente.');
      setTitulo('');
      setDescripcion('');
      setFecha('');
      setImagen(null);
    } catch (error) {
      console.error('Error al subir el evento:', error);
      Alert.alert('Error', 'Hubo un problema al subir el evento.');
    }

    setSubiendo(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Subir Nuevo Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />
      <Button title="Seleccionar Imagen" onPress={seleccionarImagen} />
      {imagen && <Image source={{ uri: imagen }} style={styles.imagen} />}
      <Button title={subiendo ? 'Subiendo...' : 'Subir Evento'} onPress={subirEvento} disabled={subiendo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  imagen: { width: '100%', height: 200, marginTop: 10, marginBottom: 10 },
});


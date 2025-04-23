import React, { useState } from "react"
import { View, Button, TextInput, ScrollView, StyleSheet} from "react-native"
import { db } from '../database/firebase';
import { collection, addDoc } from "firebase/firestore";

const Usuarios = ({ navigation }) => {

    const [state, setState]=useState({
        name: "",
        contraseña: "",
    });
    const handleChangeText = (name, value) => {
      setState({...state, [name]: value })
    }
    const saveNewUser = async () => {
      if (state.name === '' || state.contraseña === '') {
          alert('No te olvides de rellenar todos los datos');
      } else {
          try {
              await addDoc(collection(db, "usuarios"), {
                  name: state.name,
                  contraseña: state.contraseña
              });
              alert("Guardado correctamente");
              navigation.replace('Main');
          } catch (error) {
              alert("Error al guardar: " + error.message);
          }
      }
  };
    return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
         <TextInput 
         placeholder="Usuario"
         onChangeText={(value) => handleChangeText("name", value)}
         />
      </View>
      <View style={styles.inputGroup}>
         <TextInput 
         placeholder="Contraseña"
         onChangeText={(value) => handleChangeText("contraseña", value)}
         />
      </View>
      <View>
         <Button title="Ingresar" onPress={() => saveNewUser()}/>
      </View>
    </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
  });
  
export default Usuarios
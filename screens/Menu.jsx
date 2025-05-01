import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { UserContext } from '../context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuList: {
    marginTop: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 18,
  },
});

export const Menu = ({ navigation }) => {
  const { username } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/th.jpg')} // Imagen de perfil de ejemplo
          style={styles.profileImage} 
        />
        <Text style={styles.username}>
          {username} {/* Mostrar el nombre de usuario */}
        </Text> 
      </View>
      <View style={styles.menuList}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.menuText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {/* Acción Ajustes */}}>
          <Text style={styles.menuText}>Crear Horario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { /* Acción Ajustes */ }}>
          <Text style={styles.menuText}>Ver Horario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { /* Acción Ajustes */ }}>
          <Text style={styles.menuText}>Progreso Academico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { /* Acción Ajustes */ }}>
          <Text style={styles.menuText}>Subir Documentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { /* Acción Ajustes */ }}>
          <Text style={styles.menuText}>Consultar Documentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { /* Acción Ajustes */ }}>
          <Text style={styles.menuText}>Mapa de la Universidad</Text>
        </TouchableOpacity>
        {/* Agrega más ítems según sea necesario */}
      </View>
    </View>
  );
};
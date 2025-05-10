import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { ROUTES } from "./routes";
import { UserContext, ThemeContext } from "../context";
import { getAuth, signOut } from "firebase/auth";

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "gray",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 20,
  },
  headerDetails: {
    paddingLeft: 10,
  },
  sesion: {
    fontWeight: "bold",
  },
  label: {
    paddingTop: 10,
  },
});

const Separator = () => <View style={styles.separator} />;

export const DrawerContentAdmin = ({ navigation, ...props }) => {
  const { routeNames, index } = props.state;
  const focused = routeNames[index];
  const { theme } = useContext(ThemeContext);
  const { username, setUsername } = useContext(UserContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={40} color="black" />
        <View style={styles.headerDetails}>
          <Text style={styles.sesion}>{username}</Text>
          {username === "Usuario" && (
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
              <Text style={{ ...styles.sesion, color: theme.primary }}>
                Iniciar Sesion
              </Text>
            </TouchableOpacity>
          )}
          {username !== "Usuario" && (
            <TouchableOpacity
              onPress={async () => {
                const auth = getAuth();
                try {
                  await signOut(auth);
                  setUsername("Usuario");
                  navigation.navigate(ROUTES.LOGIN);
                } catch (error) {
                  console.error("Error al cerrar sesión:", error);
                }
              }}
            >
              <Text style={{ ...styles.sesion, color: theme.primary }}>
                Cerrar Sesion
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <DrawerItem
        label="Home"
        onPress={() => {
          navigation.navigate(ROUTES.ADMIN_HOME);
        }}
        focused={focused === ROUTES.ADMIN_HOME}
        activeBackgroundColor={theme.secondary}
        icon={({ focused, color, size }) => (
          <Ionicons
            name={focused ? "home" : "home-outline"}
            size={size}
            color={color}
          />
        )}
      />
      <Separator />

      <View>
        <Text style={styles.label}>Carreras</Text>
      </View>
      <DrawerItem
        label="Subir malla curricular"
        onPress={() => {navigation.navigate(ROUTES.ADMIN_MALLA)}}
        focused={focused === ROUTES.ADMIN_MALLA}
        activeBackgroundColor={theme.secondary}
        icon={({ focused, color, size }) => (
          <Ionicons
            name={focused ? "cloud-upload" : "cloud-upload-outline"}
            size={size}
            color={color}
          />
        )}
      />
      <DrawerItem
        label="Subir horarios"
        onPress={() => {navigation.navigate(ROUTES.ADMIN_HORARIO)}}
        focused={focused === ROUTES.ADMIN_HORARIO}
        activeBackgroundColor={theme.secondary}
        icon={({ focused, color, size }) => (
          <Ionicons
            name={focused ? "time" : "time-outline"}
            size={size}
            color={color}
          />
        )}
      />
      <Separator />

      <View>
        <Text style={styles.label}>Universidad</Text>
      </View>
      <DrawerItem
        label="Subir eventos"
        onPress={() => {navigation.navigate(ROUTES.ADMIN_EVENTOS)}}
        focused={focused === ROUTES.ADMIN_EVENTOS}
        activeBackgroundColor={theme.secondary}
        icon={({ focused, color, size }) => (
          <Ionicons
            name={focused ? "calendar-clear" : "calendar-clear-outline"}
            size={size}
            color={color}
          />
        )}
      />
      <DrawerItem
        label="Actualizar mapa"
        onPress={() => {navigation.navigate(ROUTES.ADMIN_MAPA)}}
        focused={focused === ROUTES.ADMIN_MAPA}
        activeBackgroundColor={theme.secondary}
        icon={({ focused, color, size }) => (
          <Ionicons
            name={focused ? "location" : "location-outline"}
            size={size}
            color={color}
          />
        )}
      />
      <Separator />

      <View>
        <Text style={styles.label}>Usuarios</Text>
      </View>
      <DrawerItem
        label="Aprobar documentos"
        onPress={() => {navigation.navigate(ROUTES.ADMIN_DOCUMENTOS)}}
        focused={focused === ROUTES.ADMIN_DOCUMENTOS}
        activeBackgroundColor={theme.secondary}
        icon={({ focused, color, size }) => (
          <Ionicons
            name={focused ? "cloud-upload" : "cloud-upload-outline"}
            size={size}
            color={color}
          />
        )}
      />
      
    </DrawerContentScrollView>
  );
};

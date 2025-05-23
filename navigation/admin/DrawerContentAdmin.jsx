import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { ROUTES } from "../routes";
import { AuthContext, ThemeContext } from "../../context";

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
  const { user, logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={40} color="black" />
        <View style={styles.headerDetails}>
          <Text style={styles.sesion}>{user.username}</Text>
          <Text style={styles.sesion}>Administrador</Text>
          <TouchableOpacity
              onPress={async () => {
                try {
                  logout();
                } catch (error) {
                  console.error("Error al cerrar sesión:", error);
                }
              }}
            >
              <Text style={{ ...styles.sesion, color: theme.primary }}>
                Cerrar Sesion
              </Text>
            </TouchableOpacity>
        </View>
      </View>

      <DrawerItem
        label={ROUTES.ADMIN_HOME}
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
        label={ROUTES.ADMIN_SUBIR_MALLA}
        onPress={() => {
          navigation.navigate(ROUTES.ADMIN_SUBIR_MALLA);
        }}
        focused={focused === ROUTES.ADMIN_SUBIR_MALLA}
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
        label={ROUTES.ADMIN_SUBIR_HORARIOS}
        onPress={() => {
          navigation.navigate(ROUTES.ADMIN_SUBIR_HORARIOS);
        }}
        focused={focused === ROUTES.ADMIN_SUBIR_HORARIOS}
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
        label={ROUTES.ADMIN_SUBIR_EVENTOS}
        onPress={() => {
          navigation.navigate(ROUTES.ADMIN_SUBIR_EVENTOS);
        }}
        focused={focused === ROUTES.ADMIN_SUBIR_EVENTOS}
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
        label={ROUTES.ADMIN_ACTUALIZAR_MAPA}
        onPress={() => {
          navigation.navigate(ROUTES.ADMIN_ACTUALIZAR_MAPA);
        }}
        focused={focused === ROUTES.ADMIN_ACTUALIZAR_MAPA}
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
        label={ROUTES.ADMIN_APROBAR_DOCUMENTOS}
        onPress={() => {
          navigation.navigate(ROUTES.ADMIN_APROBAR_DOCUMENTOS);
        }}
        focused={focused === ROUTES.ADMIN_APROBAR_DOCUMENTOS}
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

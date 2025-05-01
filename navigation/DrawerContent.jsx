import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { ROUTES } from "./routes";
import { UserContext, ThemeContext } from "../context";

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

export const DrawerContent = ({ navigation, ...props }) => {
  const { routeNames, index } = props.state;
  const focused = routeNames[index];
  const { theme } = useContext(ThemeContext);
  const { username } = useContext(UserContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={40} color="black" />
        <View style={styles.headerDetails}>
          <Text style={styles.sesion}>{username}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            <Text style={{ ...styles.sesion, color: theme.primary }}>
              Iniciar Sesion
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <DrawerItem
        label={ROUTES.INICIO}
        onPress={() => {navigation.navigate(ROUTES.INICIO)}}
        focused={focused === ROUTES.INICIO}
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
        <Text style={styles.label}>Academico</Text>
      </View>
      <DrawerItem
        label={ROUTES.HORARIO}
        onPress={() => {}}
        focused={focused === ROUTES.HORARIO}
        activeBackgroundColor={theme.secondary}
        icon={({ focused, color, size }) => (
          <Ionicons
            name={focused ? "time" : "time-outline"}
            size={size}
            color={color}
          />
        )}
      />
      <DrawerItem
        label={ROUTES.PROGRESO_ACADEMICO}
        onPress={() => {}}
        focused={focused === ROUTES.PROGRESO_ACADEMICO}
        activeBackgroundColor={theme.secondary}
        icon={({ focused, color, size }) => (
          <Ionicons
            name={focused ? "bookmark" : "bookmark-outline"}
            size={size}
            color={color}
          />
        )}
      />
      <Separator />

      <View>
        <Text style={styles.label}>Explorar</Text>
      </View>
      <DrawerItem
        label={ROUTES.EVENTOS}
        onPress={() => {}}
        focused={focused === ROUTES.EVENTOS}
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
        label={ROUTES.MAPA}
        onPress={() => {}}
        focused={focused === ROUTES.MAPA}
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
        <Text style={styles.label}>Documentos</Text>
      </View>
      <DrawerItem
        label={ROUTES.SUBIR_DOCUMENTOS}
        onPress={() => {}}
        focused={focused === ROUTES.SUBIR_DOCUMENTOS}
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
        label={ROUTES.VER_DOCUMENTOS}
        onPress={() => {}}
        focused={focused === ROUTES.VER_DOCUMENTOS}
        activeBackgroundColor={theme.secondary}
        icon={({ focused, color, size }) => (
          <Ionicons
            name={focused ? "folder" : "folder-outline"}
            size={size}
            color={color}
          />
        )}
      />
    </DrawerContentScrollView>
  );
};

import { View, ActivityIndicator, StyleSheet } from "react-native";

export const LoadingCircle = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={"large"} color={"#00f"} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

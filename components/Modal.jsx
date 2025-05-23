import React from "react";
import { View, StyleSheet } from "react-native";
import { default as NativeModal } from "react-native-modal";

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  content: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "white",
    height: 200,
    paddingVertical: 10,
    paddingHorizontal: 5,
    elevation: 4,
  },
});

export const Modal = ({ isVisible, closeFn, style, children, ...props }) => {
  return (
    <NativeModal
      style={styles.modal}
      isVisible={isVisible}
      coverScreen={false}
      swipeDirection={"down"}
      backdropOpacity={0.3}
      onSwipeComplete={closeFn}
      onBackdropPress={closeFn}
      onBackButtonPress={closeFn}
      backdropTransitionOutTiming={20}
      hideModalContentWhileAnimating={true}
    >
      <View style={[styles.content, style]} {...props}>
        {children}
      </View>
    </NativeModal>
  );
};

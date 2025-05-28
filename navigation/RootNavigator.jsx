import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "../context";
import { DrawerMenu } from "./DrawerMenu";
import { DrawerMenuAdmin } from "./admin";

export const RootNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!user || !user.isAdmin ? <DrawerMenu /> : <DrawerMenuAdmin />}
    </NavigationContainer>
  );
};

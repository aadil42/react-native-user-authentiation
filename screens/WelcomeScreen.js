import { useEffect, useContext, useState } from "react";

import { StyleSheet, Text, View } from 'react-native';

import { AuthContext } from "../store/AuthContextProvider";


import { getProtectedContent } from "../utils/auth";

function WelcomeScreen() {

  const authCtx = useContext(AuthContext);
  const { token } = authCtx;

  const [protectedContent, setProtectedContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProtectedContent(token);
        const content = (response && response.data) || "";
        setProtectedContent(content);
      } catch {
        setProtectedContent(":( no Content");
      }
    }

    fetchData();
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{protectedContent}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

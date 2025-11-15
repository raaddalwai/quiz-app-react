import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 4,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
});

export default function Account() {



  return (
    // <SafeAreaView style={styles.container} >
  <View style={styles.topContainer}> 
    <Text>Account Page</Text>

  </View>
    // </SafeAreaView>
 );
}

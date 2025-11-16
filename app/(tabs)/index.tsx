import { clearQuizHistory, getQuizHistory, QuizHistory } from "@/storage/manageQuizStorage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topContainer: {
    flex: 2,
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 25,
    paddingBottom: 50,
  },
  middleContainer: {
    flex: 3,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
});

export default function Index() {



  const [quizTopic, setQuizTopic] = useState("React Native");
  const [quizHistoryList, setQuizHistoryList] = useState<QuizHistory[]>([]);

  useEffect(() => {
    getQuizHistory().then((data) => {
      setQuizHistoryList(data);
    })
  }, [])
  return (
    // <SafeAreaView style={styles.container} >
    <View style={styles.container}>
  <View style={styles.topContainer}> 
    <Text
    style={{fontSize: 20, fontWeight: 'bold', marginBottom: 30}}
    >Join or Start a Quiz</Text>
    <TextInput
    placeholder="Topic..."
    value={quizTopic}
    onChangeText={setQuizTopic}
    style={{height: 40, backgroundColor: "white", borderRadius: 16, paddingHorizontal: 15, width: '80%'}}
    ></TextInput>

    <View style={{flexDirection: 'row', width: '80%', gap: 25}}>
    <Pressable style={{flex: 1,padding: 10, backgroundColor: '#41cdbfff', borderRadius: 16}} onPress={() => {
      if (quizTopic.trim() === "") {
        alert("Please enter a valid quiz topic");
        return;
      }

      clearQuizHistory()
      
      }}>
      <Text style={{color: '#ffffff', fontWeight: 'bold', textAlign: 'center'}}>Join Quiz</Text>
    </Pressable>

        <Pressable style={{flex:1,  padding: 10, backgroundColor: '#1aad9f', borderRadius: 16}} onPress={() => {
      if (quizTopic.trim() === "") {
        alert("Please enter a valid quiz topic");
        return;
      }
      router.push({pathname:"/quiz", params: {topic: quizTopic}})
      
      }}>
      <Text style={{color: '#ffffff', fontWeight: 'bold', textAlign: 'center'}}>Start Quiz</Text>
    </Pressable>
    </View>

  </View>
  <View style={styles.middleContainer}>
    <Text style={{padding: 28, textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>Past Quizzes</Text>

    <FlatList
    data={quizHistoryList}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <View style={{flexDirection: "row", padding: 20, backgroundColor: '#ffffff', marginHorizontal: 28, marginVertical: 8, borderRadius: 8, elevation: 1}}>
        <View style={{flex:6, flexDirection: "column", gap: 10}}>
        <Text style={{fontSize: 16, fontWeight: "bold"}}>Quiz {item.id} - {item.topic}</Text>
        <View style={{flexDirection:"row"}}>
          <Text>
            {new Date(item.timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Text>

        </View>

        </View>
      </View>
    )}
    />

  </View>
  </View>
    // </SafeAreaView>
 );
}

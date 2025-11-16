import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// AIzaSyDZh6bH0xQI8oRbrPb2Wn-Ss6agRJMJkAI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "#fcfcfcff",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  questionContainer: {
    backgroundColor: "#ffffffff",
    padding: 28,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  optionsContainer: {
    paddingHorizontal: 28,
    paddingTop: 16,
    backgroundColor: "#fbfbfbff",
  },
  optionItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#ffffffff",
    borderRadius: 8,
  },
  nextButton: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#1aad9f",
    borderRadius: 5,
    marginHorizontal: 40,
    width: '100%',
    elevation: 2,
  },
  progressBar: {
    width: "100%",
    height: 3,
    backgroundColor: "#e0e0e0",
  },

  commentContainer: {
    width: "100%",
    paddingVertical: 30,
    height: 80,
    backgroundColor: "#fcfcfcff",
    justifyContent: "center",
    alignItems: "center",
  },

  comment: {
    fontSize: 18,
    fontWeight: "bold",
    width: "80%",
  },
});

export default function Index() {
  const correctColor = "#aaffbeff";
  const wrongColor = "#ffe7e6ff";
  type QuestionType = {
    question: string;
    options: string[];
    correct: string;
  };
  const [questionSet, setQuestionSet] = useState<Number>(0);
  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState<QuestionType[]>([]);
  const [question, setQuestion] = useState("What is the capital of France?");
  const [comment, setComment] = useState("");
  const [options, setOptions] = useState([
    "A. Berlin",
    "B. Madrid",
    "C. Paris",
    "D. Rome",
  ]);
  const [correctOption, setCorrectOption] = useState(2);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const fetchQuestions = () => {
      if (Number(questionSet) > 3) {
        router.replace("/");

      } 
      setLoading(true);
      fetch("https://raaddalwai.github.io/json-testing/myapi.json")
        .then((res) => res.json())
        .then((data) => {

          console.log(data.questions)
          setQuestionData(data.questions);
          console.log(questionData);
          setQuestion(data.questions[0].question);
          setOptions(data.questions[0].options); 
          setCorrectOption(Number(data.questions[0].correct));
          setTimeout(() => {
            setLoading(false)
            setQuestionSet(Number(questionSet) + 1);
          }, 1000);

        })
  }


  useEffect(() => {

  fetchQuestions();
  }, []);



  


  const [attempted, setAttempted] = useState(false);

  const [firstOptionBackground, setFirstOptionBackground] = useState("#ffffff");
  const [secondOptionBackground, setSecondOptionBackground] = useState("#ffffff");
  const [thirdOptionBackground, setThirdOptionBackground] = useState("#ffffff");
  const [fourthOptionBackground, setFourthOptionBackground] = useState("#ffffff");

  if (loading) {
    setInterval(() => {
      
    }, 1000);
    
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading questions...</Text>
      </SafeAreaView>
    );

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer} />
        <View style={styles.progressBar}>
          <View
            style={{
              height: 3,
              width: attempted ? `${((currentQuestionIndex + 1) / questionData.length) * 100}%` : `${((currentQuestionIndex) / questionData.length) * 100}%`,
              backgroundColor: "#1aad9f",
            }}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              
              {question}
            </Text>
          </View>

          <View style={styles.optionsContainer}>
                <Pressable
                  onPress={() => {
                    if (!attempted){
                    setAttempted(true);
                    if (options[0] === options[correctOption]) {
                      setFirstOptionBackground(correctColor);
                      setComment("That's Correct")
                    } else {
                      setFirstOptionBackground(wrongColor);
                      setComment("Ohh nooo!")



                    }
                  }
                  }}
                  style={({ pressed }) => [
                    styles.optionItem,
                    {
                      backgroundColor: attempted ? pressed ?  firstOptionBackground: firstOptionBackground : "#fff",
                    },
                  ]}
                >
                  <Text>{options[0]}</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    if (!attempted){
                    setAttempted(true);
                    if (options[1] === options[correctOption]) {
                      setSecondOptionBackground(correctColor);
                      setComment("That's Correct")
                    } else {
                      setSecondOptionBackground(wrongColor);
                      setComment("Ohh nooo!")
                    }
                  }
                  }}
                  style={({ pressed }) => [
                    styles.optionItem,
                    {
                      backgroundColor: attempted ? pressed ?  secondOptionBackground: secondOptionBackground : "#fff",
                    },
                  ]}
                >
                  <Text>{options[1]}</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    if (!attempted){
                    setAttempted(true);
                    if (options[2] === options[correctOption]) {
                      setThirdOptionBackground(correctColor);
                      setComment("That's Correct")
                    } else {
                      setThirdOptionBackground(wrongColor);
                      setComment("Ohh nooo!")
                    }
                  }
                  }}
                  style={({ pressed }) => [
                    styles.optionItem,
                    {
                      backgroundColor: attempted ? pressed ?  thirdOptionBackground: thirdOptionBackground : "#fff",
                    },
                  ]}
                >
                  <Text>{options[2]}</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    if (!attempted){  
                    setAttempted(true);
                    if (options[3] === options[correctOption]) {
                      setFourthOptionBackground(correctColor);
                      setComment("That's Correct")
                    } else {
                      setFourthOptionBackground(wrongColor);
                      setComment("Ohh nooo!")
                    }
                  }
                  }}
                  style={({ pressed }) => [
                    styles.optionItem,
                    {
                      backgroundColor: attempted ? pressed ?  fourthOptionBackground: fourthOptionBackground : "#fff",
                    },
                  ]}
                >
                  <Text>{options[3]}</Text>
                </Pressable>





          </View>




          <View style={{ paddingHorizontal: 28, paddingTop: 16, backgroundColor: "#fbfbfbff", alignItems: 'center', justifyContent: 'center' }}> 
            <Pressable style={({ pressed }) =>[styles.nextButton, {elevation: pressed ? attempted ? 1 : 2 : 2, backgroundColor: attempted ? "#34bba9ff" : "#c0e9e9ff" }]}
              onPress={() => {
                if (attempted) {
                if (currentQuestionIndex + 1 < questionData.length) {
                  const nextIndex = currentQuestionIndex + 1;
                  setCurrentQuestionIndex(nextIndex);
                  setQuestion(questionData[nextIndex].question);
                  setOptions(questionData[nextIndex].options);
                  setCorrectOption(Number(questionData[nextIndex].correct));
                  setAttempted(false);
                } else {
                  setCurrentQuestionIndex(0);


                  fetchQuestions();                  
                  setAttempted(false);

                }
                console.log(questionData[0])
                setFirstOptionBackground("#ffffff");
                setSecondOptionBackground("#ffffff");
                setThirdOptionBackground("#ffffff");
                setFourthOptionBackground("#ffffff");
              }}}
            >
              <Text style={{ textAlign: "center", fontSize: 18, fontWeight : "bold", color: "#ffffffff" }}>Next</Text>
            </Pressable>
          </View>


          {
            attempted && (
          <View style={styles.commentContainer}>
            <Text style={styles.comment}>
              
              {/* {comment} */}
            </Text>
          </View>              
            )
          }


                     
        </View>
      </View>
    </SafeAreaView>
  );
}

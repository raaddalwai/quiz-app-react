import { addQuizHistory, getQuizHistory, QuizQuestions } from "@/storage/manageQuizStorage";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  headerContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "#fcfcfcff",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
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
  const { topic } = useLocalSearchParams<{ topic: string }>();

  const [result, setResult] = useState(false);


  const [timer, setTimer] = useState(30);

  useEffect(() => {
  const interval = setInterval(() => {
    setTimer(prev => {
      if (prev <= 0){
        setResult(true);
        clearInterval(interval);
        return 0;
      };
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval); // cleanup
}, []);




  const [score, setScore] = useState(0);

  const correctColor = "#aaffbeff";
  const wrongColor = "#ffaca9ff";
  type QuestionType = {
    question: string;
    options: string[];
    correct: number;
  };
  const [questionSet, setQuestionSet] = useState<number[]>([0]);
  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState<QuizQuestions[]>([]);
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
  const [forwardQuizList, setForwardQuizList] = useState<QuizQuestions[]>([]);

  const fetchQuestions = () => {
      setLoading(true);
      fetch("https://raaddalwai.github.io/json-testing/myapi.json")
        .then((res) => res.json())
        .then((data) => {

          setQuestionData(data.questions);
          setQuestion(data.questions[0].question);
          setOptions(data.questions[0].options); 
          setCorrectOption(Number(data.questions[0].correct));
          setForwardQuizList([...forwardQuizList, data.questions[0]]);

          setTimeout(() => {
            setLoading(false)
            setQuestionSet([questionSet.length, ...questionSet]);
            
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

    useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Exit Quiz?",
          "Are you sure you want to go back? Your progress will be lost.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => router.back() } // or router.replace("/")
          ]
        );
        return true; // prevent default back
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>{
        
      }    }, [])
  );

  if (result) {

    getQuizHistory()
    .then((history) => {
      addQuizHistory({
        id: history.length + 1,
        topic: String(topic),
        questions: forwardQuizList,
        score: score,
        timestamp: Date.now(),
      })

    })




    setTimeout(() => {
        router.replace("/quiz/result/index")

    
    }, 3000);







    
      return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Generating result...</Text>
        </SafeAreaView>
      );  





  }

  if (loading) {


    
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading questions...</Text>
      </SafeAreaView>
    );

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer} >
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{}}> {"Score: " + score} </Text>
          </View>
          <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>

            <FlatList
            data={questionSet}
            contentContainerStyle={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '100%', height: '100%'}}
            horizontal
            renderItem={({item, index}) => 
              
              index >= questionSet.length - 3 ?
              (


              
            
              <View style={{width: index===questionSet.length - 2 ? 20 : 20, marginHorizontal: 5, height: index===questionSet.length - 2 ? 20 : 20, borderWidth: index===questionSet.length - 2 ? 2 : 0, borderRadius: 30, borderColor: '#1aad9f', backgroundColor: index===questionSet.length - 2 ? '#ffffffff' : index===questionSet.length - 1 ? '#edededff' : '#1aad9f', justifyContent: 'center', alignItems: 'center', padding: 10}} >
                <Text style={{flex: 1, color: index===questionSet.length - 2 ? '#1aad9f' : 'black', fontWeight: index===questionSet.length - 2 ? 'bold' : 'normal', fontSize: 12}}>{index + 1}</Text>
              
              
              </View>
            ): null
            }
            />          
          </View>
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{Math.floor(timer / 60)} : {String(timer % 60).padStart(2, "0")}</Text>
          </View>



          </View>
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
                      setScore(score + 1);

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
                      setScore(score + 1);
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
                      setScore(score + 1);

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
                      setScore(score + 1);

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

                  setForwardQuizList([...forwardQuizList, questionData[nextIndex]]);

                  setAttempted(false);
                } else {
                  setCurrentQuestionIndex(0);


                  fetchQuestions();                  
                  setAttempted(false);

                }
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

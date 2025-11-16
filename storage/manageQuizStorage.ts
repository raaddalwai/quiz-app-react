import AsyncStorage from "@react-native-async-storage/async-storage";


const QUIZ_HISTORY_KEY = "quiz-history";


type QuizQuestions = {
    question: string;
    options: string[];
    correct: number;
}

export type QuizHistory = {
    id: number;
    topic: string;
    questions: QuizQuestions[];
    score: number;
    timestamp: number;

};


export async function addQuizHistory(newResult: QuizHistory) {
    try {
        const existing = await AsyncStorage.getItem(QUIZ_HISTORY_KEY);
        const parsed: QuizHistory[] = existing ? JSON.parse(existing) : [];
        const history = [newResult, ...parsed];
        await AsyncStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
        
    } catch (e) {
        console.log(e);
    }
    
}

export async function getQuizHistory(): Promise<QuizHistory[]> {
    try {
        const existing = await AsyncStorage.getItem(QUIZ_HISTORY_KEY);
        return existing ? JSON.parse(existing) : [];        
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function clearQuizHistory() {
    try {
        await AsyncStorage.removeItem(QUIZ_HISTORY_KEY);
    } catch (error) {
        console.log(error);
        
    }
}
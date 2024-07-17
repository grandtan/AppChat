import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Question } from "../models/Question";
import { shuffleArray } from "../utils/shuffle";

const questions: Question[] = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the capital of Germany?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Berlin",
  },
  {
    question: "What is the capital of Spain?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Madrid",
  },
  {
    question: "What is the capital of Italy?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Rome",
  },
  {
    question: "What is the largest ocean?",
    answers: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correctAnswer: "Pacific",
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Earth", "Jupiter", "Mars", "Saturn"],
    correctAnswer: "Jupiter",
  },
  {
    question: "What is the fastest land animal?",
    answers: ["Cheetah", "Lion", "Tiger", "Elephant"],
    correctAnswer: "Cheetah",
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: ["K2", "Everest", "Kangchenjunga", "Lhotse"],
    correctAnswer: "Everest",
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: ["Shakespeare", "Hemingway", "Tolstoy", "Dickens"],
    correctAnswer: "Shakespeare",
  },
  {
    question: "What is the smallest country in the world?",
    answers: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
    correctAnswer: "Vatican City",
  },
  {
    question: "What is the largest desert in the world?",
    answers: ["Sahara", "Gobi", "Kalahari", "Arctic"],
    correctAnswer: "Sahara",
  },
  {
    question: "What is the longest river in the world?",
    answers: ["Nile", "Amazon", "Yangtze", "Mississippi"],
    correctAnswer: "Nile",
  },
  {
    question: "Who was the first President of the United States?",
    answers: ["Lincoln", "Washington", "Jefferson", "Adams"],
    correctAnswer: "Washington",
  },
  {
    question: "What is the capital of Japan?",
    answers: ["Tokyo", "Osaka", "Kyoto", "Nagoya"],
    correctAnswer: "Tokyo",
  },
  {
    question: "What is the primary language spoken in Brazil?",
    answers: ["Spanish", "Portuguese", "French", "English"],
    correctAnswer: "Portuguese",
  },
  {
    question: "What is the largest mammal in the world?",
    answers: ["Elephant", "Blue Whale", "Giraffe", "Orca"],
    correctAnswer: "Blue Whale",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: "Diamond",
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    correctAnswer: "Da Vinci",
  },
  {
    question: "What is the capital of Canada?",
    answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    correctAnswer: "Ottawa",
  },
  {
    question: "Who discovered penicillin?",
    answers: ["Newton", "Einstein", "Fleming", "Darwin"],
    correctAnswer: "Fleming",
  },
];

const Quiz: React.FC = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [showResults, setShowResults] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswerPress = (questionIndex: number, answer: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answer });
    setShowResults({ ...showResults, [questionIndex]: true });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {shuffledQuestions.map((q, questionIndex) => (
            <View key={questionIndex} style={styles.questionContainer}>
              <Text style={styles.questionText}>{q.question}</Text>
              {shuffleArray(q.answers).map((answer, i) => {
                const isSelected = selectedAnswers[questionIndex] === answer;
                const isCorrect =
                  showResults[questionIndex] && answer === q.correctAnswer;
                const isWrong =
                  showResults[questionIndex] &&
                  isSelected &&
                  answer !== q.correctAnswer;

                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.answerButton,
                      isSelected && styles.selectedAnswerButton,
                      isCorrect && styles.correctAnswerButton,
                      isWrong && styles.wrongAnswerButton,
                    ]}
                    onPress={() => handleAnswerPress(questionIndex, answer)}
                    disabled={showResults[questionIndex]}
                  >
                    <Text
                      style={[
                        styles.answerText,
                        isSelected && styles.selectedAnswerText,
                        isCorrect && styles.correctAnswerText,
                        isWrong && styles.wrongAnswerText,
                      ]}
                    >
                      {answer}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
    width: "100%",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  answerButton: {
    borderWidth: 1,
    borderColor: "#800080",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  selectedAnswerButton: {
    borderColor: "#800080",
  },
  correctAnswerButton: {
    borderColor: "#00FF00",
    backgroundColor: "#d4edda",
  },
  wrongAnswerButton: {
    borderColor: "#FF0000",
    backgroundColor: "#f8d7da",
  },
  answerText: {
    fontSize: 16,
  },
  selectedAnswerText: {
    color: "#800080",
  },
  correctAnswerText: {
    color: "#00FF00",
  },
  wrongAnswerText: {
    color: "#FF0000",
  },
});

export default Quiz;

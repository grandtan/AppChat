import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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

  useEffect(() => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled);
  }, []);

  return (
    <View style={styles.container}>
      {shuffledQuestions.map((q, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{q.question}</Text>
          {shuffleArray(q.answers).map((answer, i) => (
            <Button key={i} title={answer} onPress={() => {}} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Quiz;

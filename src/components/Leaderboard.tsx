import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Leaderboard: React.FC = () => {
  // Mock leaderboard data
  const leaderboardData = [
    { name: "Alice", score: 90 },
    { name: "Bob", score: 80 },
    { name: "Charlie", score: 70 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      {leaderboardData.map((entry, index) => (
        <Text key={index} style={styles.entry}>
          {index + 1}. {entry.name}: {entry.score}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  entry: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Leaderboard;

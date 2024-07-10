import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import io from "socket.io-client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/chat";
import Icon from "react-native-vector-icons/AntDesign";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/ChatScreenStyles";

const socket = io("http://localhost:3000");

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

interface Message {
  username: string;
  text: string;
}

const ChatScreen: React.FC<Props> = ({ route, navigation }) => {
  const { username, profileIcon } = route.params;
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit(
      "loadUserData",
      username,
      (userData: any, chatMessages: Message[]) => {
        if (userData) {
          // Handle userData if needed
        }
        if (chatMessages) {
          setMessages(chatMessages);
        }
      }
    );

    socket.on("message", (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [username]);

  const sendMessage = () => {
    const msg = { username, text: message };
    console.log("Sending message", msg);
    socket.emit("message", msg);
    setMessages((prevMessages) => [...prevMessages, msg]);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD700", "#F5E45A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrowleft" size={30} color="#000" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <View style={styles.userIconContainer}>
                <Icon name={profileIcon || "meho"} size={40} color="#000" />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.username}>{username}</Text>
                <View style={styles.statusContainer}>
                  <Icon
                    name="circledowno"
                    size={10}
                    color="green"
                    style={styles.statusIcon}
                  />
                  <Text style={styles.status}>Online</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity>
              <Icon name="ellipsis1" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={styles.bottomContainer}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              paddingTop: 10,
              fontWeight: "700",
            }}
          >
            Today
          </Text>
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <View
                  style={[
                    styles.messageContainer,
                    item.username === username
                      ? styles.myMessage
                      : styles.otherMessage,
                  ]}
                >
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
                <Text style={styles.messageTime}>07.39 AM</Text>
              </View>
            )}
            style={styles.messagesList}
          />
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.addButton}>
              <IconFontAwesome name="plus" size={20} color="#fff" />
            </TouchableOpacity>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message"
              style={styles.input}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <IconFontAwesome name="paper-plane" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ChatScreen;

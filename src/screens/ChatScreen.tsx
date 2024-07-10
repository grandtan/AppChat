import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/chat";
import Icon from "react-native-vector-icons/AntDesign";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/ChatScreenStyles";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

interface Message {
  username: string;
  text: string;
  timestamp: string;
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ChatScreen: React.FC<Props> = ({ route, navigation }) => {
  const { username, profileIcon } = route.params;
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.1.73:3000/ws");

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (event) => {
      const msg: Message = JSON.parse(event.data);
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.current?.close();
    };
  }, [username]);

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const msg: Message = {
        username,
        text: message,
        timestamp: new Date().toISOString(),
      };
      ws.current.send(JSON.stringify(msg));
      setMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
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
                <View
                  style={[
                    styles.messageContainer,
                    item.username === username
                      ? styles.myMessageContainer
                      : styles.otherMessageContainer,
                  ]}
                >
                  {item.username !== username && (
                    <View style={{ paddingRight: 10 }}>
                      <Icon
                        name={profileIcon || "meho"}
                        size={40}
                        color="#000"
                      />
                    </View>
                  )}
                  <View>
                    <View
                      style={[
                        styles.messageBubble,
                        item.username === username
                          ? styles.myMessageBubble
                          : styles.otherMessageBubble,
                      ]}
                    >
                      <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                    <Text style={styles.messageTime}>
                      {formatTime(item.timestamp)}
                    </Text>
                  </View>
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
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

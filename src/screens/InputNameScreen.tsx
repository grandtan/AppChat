import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import { RootStackParamList } from "../types/chat";
import styles from "../styles/InputNameScreenStyles";

type Props = NativeStackScreenProps<RootStackParamList, "InputName">;

const icons = ["meho", "shoppingcart", "setting", "camera"];

const InputNameScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [profileIcon, setProfileIcon] = useState<string>("meho");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleIconPick = (iconName: string) => {
    setProfileIcon(iconName);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.form}>
          <Text style={styles.title}>Input Your Name</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.imagePickerButton}
          >
            <Text style={styles.imagePickerText}>
              {profileIcon ? "Change Profile Icon" : "Pick Profile Icon"}
            </Text>
          </TouchableOpacity>
          {profileIcon && (
            <Icon
              name={profileIcon}
              size={100}
              color="#8A8984"
              style={styles.profileIcon}
            />
          )}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Chat", { username, profileIcon })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Profile Icon</Text>
            <View style={styles.modalIconsContainer}>
              {icons.map((iconName) => (
                <TouchableOpacity
                  key={iconName}
                  onPress={() => handleIconPick(iconName)}
                >
                  <Icon
                    name={iconName}
                    size={50}
                    color="#8A8984"
                    style={styles.modalIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InputNameScreen;

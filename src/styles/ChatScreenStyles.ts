import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  safeArea: {
    // backgroundColor: "#FFD700",
  },
  container: {
    flex: 1,
    // backgroundColor: "#FFD700",
    // backgroundColor: "red",
  },
  topContainer: {
    backgroundColor: "#FFD700",
  },
  bottomContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#F8F5DF",
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 25,
    paddingHorizontal: 25,
    // backgroundColor: "#FFD700",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 10,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    marginRight: 5,
  },
  status: {
    color: "black",
    fontWeight: "700",
  },
  userIconContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0B3961",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  messageText: {
    color: "#fff",
    fontSize: 14,
  },
  messageTime: {
    fontSize: 10,
    color: "#888",
    marginTop: 5,
    marginRight: 14,
    alignSelf: "flex-end",
  },
  inputContainer: {
    marginBottom: 30,
    marginHorizontal: 20,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderColor: "#ddd",
  },
  addButton: {
    backgroundColor: "#FF6F61",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#FF6F61",
    borderRadius: 20,
    padding: 10,
  },
});

export default styles;

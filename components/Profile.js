import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";

const settingsData = [
  {
    category: "Account",
    options: [
      { title: "Account", icon: "person-outline", screen: "Account" },
      { title: "Address", icon: "home-outline", screen: "Address" },
      { title: "Notification", icon: "notifications-outline", screen: "Notification" },
      { title: "Payment Method", icon: "card-outline", screen: "PaymentMethod" },
      { title: "Privacy", icon: "information-circle-outline", screen: "Privacy" },
      { title: "Security", icon: "lock-closed-outline", screen: "Security" },
    ],
  },
  {
    category: "Help",
    options: [
      { title: "Contact Us", icon: "call-outline", screen: "ContactUs" },
      { title: "FAQ", icon: "document-text-outline", screen: "FAQ" },
    ],
  },
];

const Settings = ({ navigation }) => {
  const handleOptionPress = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        onPress: async () => {
          const auth = getAuth();
          try {
            await signOut(auth);
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }], // Navigate to the Login screen after logout
            });
          } catch (error) {
            Alert.alert("Error", "Could not log out. Please try again.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings Page</Text>
      </View>

      {/* Settings List */}
      <FlatList
        data={settingsData}
        keyExtractor={(item, index) => `${item.category}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.category}</Text>
            {item.options.map((option) => (
              <TouchableOpacity
                key={option.title}
                style={styles.option}
                onPress={() => handleOptionPress(option.screen)}
              >
                <View style={styles.optionContent}>
                  <Ionicons name={option.icon} size={24} color="#FF6F00" style={styles.optionIcon} />
                  <Text style={styles.optionText}>{option.title}</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#FFF3E0",
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF6F00",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#FF6F00",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Settings;

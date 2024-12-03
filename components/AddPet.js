import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const AddPet = ({ navigation, route }) => {
  const { onAddPet } = route.params; // Extract the onAddPet function
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");

  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleAddPet = async () => {
    if (!name || !type || !age) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    try {
      const newPet = {
        name,
        type,
        age,
        userId: user.uid,
      };

      const docRef = await addDoc(collection(db, "pets"), newPet);

      onAddPet({ id: docRef.id, ...newPet }); // Add the pet to the list in Home
      Alert.alert("Success", "Pet added successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding pet:", error);
      Alert.alert("Error", "An error occurred while adding the pet.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Pet</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Pet Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Pet Type (e.g., Dog, Cat)"
          value={type}
          onChangeText={setType}
        />
        <TextInput
          style={styles.input}
          placeholder="Pet Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddPet}>
          <Text style={styles.buttonText}>Add Pet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#FF6F00",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddPet;

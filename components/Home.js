import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons"; // For the delete icon
import { useNavigation } from "@react-navigation/native";
import FeaturedContent from "./FeaturedContent"; // Import the FeaturedContent component

const Home = () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "pets"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const petList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPets(petList);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleDeletePet = async (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this pet?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "pets", id));
              setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
              Alert.alert("Success", "Pet deleted successfully!");
            } catch (error) {
              Alert.alert("Error", "Could not delete pet.");
            }
          },
        },
      ]
    );
  };

  const filteredPets =
    filter === "All" ? pets : pets.filter((pet) => pet.type === filter);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {user?.email}!</Text>
          <Text style={styles.subheading}>Here are your pets and tasks:</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pets.length}</Text>
            <Text style={styles.statLabel}>Total Pets</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Reminders</Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {["All", "Dog", "Cat", "Bird"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterButton,
                filter === type && styles.activeFilterButton,
              ]}
              onPress={() => setFilter(type)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === type && styles.activeFilterText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pet List */}
        <View style={styles.petList}>
          {filteredPets.map((pet) => (
            <View key={pet.id} style={styles.petCard}>
              <View>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petDetails}>Type: {pet.type}</Text>
                <Text style={styles.petDetails}>Age: {pet.age}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => handleDeletePet(pet.id)}
              >
                <Ionicons name="trash-outline" size={24} color="#FF6F61" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Featured Content */}
        <FeaturedContent />
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("AddPet")
        }
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  statCard: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6F00",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  filterButton: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  activeFilterButton: {
    backgroundColor: "#FF6F00",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  petList: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  petCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  petName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  petDetails: {
    fontSize: 14,
    color: "#666",
  },
  deleteIcon: {
    marginLeft: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF6F00",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Home;

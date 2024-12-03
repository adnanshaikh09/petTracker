import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  Linking 
} from "react-native";
import axios from "axios";

const FeaturedContent = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      try {
        const response = await axios.get(
          "https://674e709c635bad45618e9d0b.mockapi.io/pettracker/pets"
        );
        setFeaturedItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured content:", error);
        setLoading(false);
      }
    };

    fetchFeaturedContent();
  }, []);

  const handleLearnMore = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF6F00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Featured Content</Text>
      <FlatList
        data={featuredItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() => handleLearnMore(item.link)} // Use the item's link
            >
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    width: 250,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  learnMoreButton: {
    backgroundColor: "#FF6F00",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  learnMoreText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FeaturedContent;

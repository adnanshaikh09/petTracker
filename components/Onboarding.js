import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";

const onboardingData = [
  {
    title: "Meet your animal needs here",
    description: "Get interesting promos here, register your account immediately so you can meet your animal needs.",
    image: require("../assets/onboarding3.png"),
  },
  {
    title: "Caring for pets made easy",
    description: "Discover tips and promos tailored for your pets.",
    image: require("../assets/onboarding3.png"),
  },
  {
    title: "Join our pet-loving community",
    description: "Get access to pet care resources and share experiences.",
    image: require("../assets/onboarding3.png"),
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Onboarding = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigation = useNavigation();

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={onboardingData}
        renderItem={renderSlide}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeSlide === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      {activeSlide === onboardingData.length - 1 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: "#777",
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#FF6F00",
  },
  inactiveDot: {
    backgroundColor: "#E0E0E0",
  },
  button: {
    backgroundColor: "#FF6F00",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Onboarding;

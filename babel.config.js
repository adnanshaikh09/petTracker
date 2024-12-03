module.exports = function(api) {
    api.cache(true);
    return {
      presets: ["babel-preset-expo"],
      plugins: ["react-native-reanimated/plugin"], // Only needed if using react-native-reanimated
    };
  };
  
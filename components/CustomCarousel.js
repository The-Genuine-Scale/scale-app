import React, { useRef, useState } from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, useWindowDimensions } from "react-native";

const CustomCarousel = ({ data }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowWidth = useWindowDimensions().width;

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / windowWidth);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      const offsetX = index * windowWidth;
      scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
      setCurrentIndex(index);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={200}
      >
        {data.map((item, index) => (
          <Image key={index} source={{ uri: item }} style={[styles.image, { width: windowWidth-40 }]} />
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && styles.activeIndicator,
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginBottom: 10,
    margin: 20,
  },
  image: {
    height: 300,
    borderRadius:10
  },
  indicatorContainer: {
    position: "absolute",
    bottom: -20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#39C61C40",
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    backgroundColor: "#39C61C",
  },
});

export default CustomCarousel;

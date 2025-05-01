import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, Dimensions, Image, StyleSheet } from 'react-native';

const images = [
  require('../assets/pais2.jpg'),
  require('../assets/paisj1.jpg'),
  require('../assets/th.jpg'),
];

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    height: 250,
    resizeMode: 'cover',
  },
});

export const HomeScreen = () => {
  const scrollViewRef = useRef();
  const { width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
      }
      setCurrentIndex(nextIndex);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      ref={scrollViewRef}
      style={styles.carousel}
      onMomentumScrollEnd={(event) => {
        const index = Math.floor(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
      }}
    >
      {images.map((img, index) => (
        <Image key={index} source={img} style={[styles.image, { width }]} />
      ))}
    </ScrollView>
  );
};
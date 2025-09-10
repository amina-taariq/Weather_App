import { StyleSheet, View, StatusBar, ImageBackground } from 'react-native';
import Search from './Search';
import ForecastSection from './ForecastSection';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
        blurRadius={70}
      >
        <Search />
        <ForecastSection/>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});

export default Home;

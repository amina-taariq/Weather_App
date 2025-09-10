import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors } from '../../constant/Colors';

const ForecastSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>
        London,
        <Text style={styles.subLocationText}> United Kingdom</Text>
      </Text>
      <View style={styles.imageSection}>
        <Image
          source={require('../../assets/images/partlycloudy.png')}
          style={styles.imagestyle}
        />
      </View>
      <View style={styles.Section2}>
        <Text style={styles.degreeText}>23&#176;</Text>
        <Text style={styles.weatherText}>Partly Cloudy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginBottom: 12,
    alignItems: 'center',
  },
  locationText: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: 500,
  },
  subLocationText: {
    color: Colors.grey,
    fontSize: 20,
    fontWeight: 300,
  },
  imagestyle: {
    width: 200,
    height: 200,
  },
  imageSection: {
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical:60
  },
  degreeText: {
    color: Colors.white,
    fontSize: 42,
    fontWeight: 500,
  },
  weatherText: {
    color: Colors.grey,
    fontSize: 18,
    fontWeight: 200,
  },
  Section2: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ForecastSection;

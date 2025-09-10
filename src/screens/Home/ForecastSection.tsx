import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors } from '../../constant/Colors';
import { weatherImages } from '../../constant/Images';
interface ForecastSectionProps {
  weather: any;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ weather }) => {
  const { current, location } = weather;
  const condition = current?.condition?.text?.toLowerCase().trim() || 'other';
  
  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>
        {location?.name},
        <Text style={styles.subLocationText}> {' ' + location?.country}</Text>
      </Text>
      <View style={styles.imageSection}>
        <Image source={weatherImages[condition]} style={styles.imagestyle} />
      </View>
      <View style={styles.Section2}>
        <Text style={styles.degreeText}>{current?.temp_c}&#176;</Text>
        <Text style={styles.weatherText}>{current?.condition?.text}</Text>
      </View>
      <View style={styles.detailSection}>
        <View style={styles.detail}>
          <Image
            source={require('../../assets/icons/wind.png')}
            style={styles.iconsize}
          />
          <Text style={styles.text}>{current?.wind_kph} km</Text>
        </View>
        <View style={styles.detail}>
          <Image
            source={require('../../assets/icons/drop.png')}
            style={styles.iconsize}
          />
          <Text style={styles.text}>{current?.humidity} %</Text>
        </View>
        <View style={styles.detail}>
          <Image
            source={require('../../assets/icons/sun.png')}
            style={styles.iconsize}
          />
          <Text style={styles.text}>6:05 AM</Text>
        </View>
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
    marginVertical: 50,
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
    marginBottom:40,
  },
  detailSection: {
    marginVertical:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
  },
  iconsize: {
    width: 22,
    height: 22,
  },
  detail: {
    flexDirection: 'row',
    gap: 6,
  },
  text: {
    fontSize: 14,
    color: Colors.white,
  },
});

export default ForecastSection;

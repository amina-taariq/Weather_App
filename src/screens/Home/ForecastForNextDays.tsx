import { Image, StyleSheet, Text, View } from 'react-native';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import { Colors } from '../../constant/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { weatherImages } from '../../constant/Images';
interface ForecastForNextDaysProps {
  weather: any;
}

const ForecastForNextDays: React.FC<ForecastForNextDaysProps> = ({
  weather,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <CalendarDaysIcon size={22} color="white" />
        <Text style={styles.text}>Daily forecast</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ padding: 15, gap: 12 }}
        showsHorizontalScrollIndicator={false}
      >
        {weather?.forecast?.forecastday?.map((item, index) => {
          let date = new Date(item.date);
          let options = { weekday: 'long' };
          let dayName = date.toLocaleDateString('en-US', options);
          let condition =
            item?.day?.condition?.text?.toLowerCase().trim() || 'other';

          return (
            <View style={styles.dayweather} key={index}>
              <Image
                style={styles.IconSize}
                source={weatherImages[condition] ?? weatherImages['other']}
              />
              <Text style={styles.dayText}>{dayName}</Text>
              <Text style={styles.degreeText}>
                {item?.day?.avgtemp_c}&#176;
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  calendar: {
    flexDirection: 'row',
    marginLeft: 15,
    gap: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: Colors.white,
  },
  dayweather: {
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 12,
    minWidth: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    gap: 2,
  },
  IconSize: {
    width: 50,
    height: 50,
  },
  degreeText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 600,
  },
  dayText: {
    fontSize: 12,
    color: Colors.white,
  },
});

export default ForecastForNextDays;

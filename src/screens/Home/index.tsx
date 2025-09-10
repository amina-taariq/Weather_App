import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Search from './Search';
import ForecastSection from './ForecastSection';
import ForecastForNextDays from './ForecastForNextDays';
import { fetchLocation, fetchWeatherForecast } from '../../../Api/weather';
import { debounce } from 'lodash';

const Home: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  // fetch default city weather on mount
  useEffect(() => {
    fetchWeather('Islamabad');
  }, []);

  const fetchWeather = (city: string) => {
    fetchWeatherForecast({ cityName: city, days: '7' })
      .then(data => setWeather(data))
  };

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      fetchLocation({ cityName: value })
        .then(data => setLocations(data))
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const handleLocationSelect = (loc: any) => {
    setLocations([]);
    setShowSearch(false);
    fetchWeather(loc.name);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
        blurRadius={70}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.innerContainer}>
              <Search
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                onSearch={handleTextDebounce}
                locations={locations}
                onLocationSelect={handleLocationSelect}
              />
              {weather && (
                <>
                  <ForecastSection weather={weather} />
                  <ForecastForNextDays weather={weather} />
                </>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
  },
});

export default Home;

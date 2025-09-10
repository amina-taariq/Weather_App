import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { Colors } from '../../constant/Colors';
import { debounce } from 'lodash';
import { fetchLocation, fetchWeatherForecast } from '../../../Api/weather';

interface SearchProps {
  onWeatherUpdate: (weather: any) => void;
}

const Search: React.FC<SearchProps> = ({ onWeatherUpdate }) => {
  const [showSearch, toggleSearch] = useState(false);
  const [location, setLocation] = useState([]);
  
   useEffect(() => {
     fetchMyWeatherData();
   }, []);

   const fetchMyWeatherData = async () => {
     fetchWeatherForecast({
       cityName: 'Islambad',
       days: '7',
     }).then(data => {
       onWeatherUpdate(data);
     });
   };



  const handleLocation = loc => {
    console.log('location:', loc);
    setLocation([]);
    toggleSearch(false); 
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    })
      .then(data => {
        // Pass weather data to parent component
        onWeatherUpdate(data);
      })
      .catch(error => {
        console.error('Weather fetch error:', error);
      });
  };

  const handleSearch = (value: any) => {
    if (value.length > 2) {
      fetchLocation({ cityName: value })
        .then(data => {
          setLocation(data);
        })
        .catch(error => {
          console.error('Location fetch error:', error);
        });
    } else {
      setLocation([]);
    }
  };


  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: showSearch
              ? 'rgba(255, 255, 255, 0.2)'
              : 'transparent',
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          {showSearch ? (
            <TextInput
              onChangeText={handleTextDebounce}
              placeholder="Search city"
              placeholderTextColor="#ddd"
              style={styles.searchInput}
            />
          ) : null}
        </View>
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => toggleSearch(!showSearch)}
        >
          <MagnifyingGlassIcon size={25} color="white" />
        </TouchableOpacity>
      </View>
      {location.length > 0 && showSearch ? (
        <View style={styles.locationContainer}>
          {location.map((loc, index) => {
            let showBorder = index + 1 != location.length;
            return (
              <TouchableOpacity
                onPress={() => handleLocation(loc)}
                key={index}
                style={[
                  styles.locationBox,
                  showBorder && styles.locationBoxBorder,
                ]}
              >
                <View style={styles.location}>
                  <MapPinIcon size={20} color="gray" />
                  <Text style={styles.locationText}>
                    {loc?.name}, {loc?.country}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  searchContainer: {
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 28,
    marginVertical: 8,
    paddingLeft: 16,
    paddingRight: 0,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    overflow: 'hidden',
  },
  searchIcon: {
    height: 52,
    width: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 0,
  },
  searchInput: {
    width: '80%',
    fontSize: 16,
    color: 'white',
  },
  locationContainer: {
    zIndex: 999,
    position: 'absolute',
    width: '100%',
    marginHorizontal: 10,
    top: 65,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  locationBox: {
    paddingVertical: 10,
  },
  locationBoxBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e0',
  },
  locationText: {
    fontSize: 16,
    color: Colors.black,
  },
  location: {
    flexDirection: 'row',
    marginHorizontal: 12,
    gap: 6,
    alignContent: 'center',
  },
});

export default Search;

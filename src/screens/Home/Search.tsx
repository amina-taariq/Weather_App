import React, { useState } from 'react';
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

const Search: React.FC = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [location, setLocation] = useState([1, 2, 3]);
  const handleLocation = (loc: number) => {
    console.log('location:', loc);
  };
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
                    London , United Kindom
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
    width: '93%',
    marginBottom:60
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
  },
  locationContainer: {
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  locationBox: {
    paddingVertical: 10,
  },

  locationBoxBorder: {
    borderBottomWidth: 1,
    borderBottomColor: ' #cbd5e0',
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

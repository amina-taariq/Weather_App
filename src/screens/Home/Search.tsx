import React from 'react';
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

interface SearchProps {
  showSearch: boolean;
  setShowSearch: (val: boolean) => void;
  onSearch: (value: string) => void;
  locations: any[];
  onLocationSelect: (loc: any) => void;
}

const Search: React.FC<SearchProps> = ({
  showSearch,
  setShowSearch,
  onSearch,
  locations,
  onLocationSelect,
}) => {
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
              onChangeText={onSearch}
              placeholder="Search city"
              placeholderTextColor="#ddd"
              style={styles.searchInput}
            />
          ) : null}
        </View>
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => setShowSearch(!showSearch)}
        >
          <MagnifyingGlassIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {locations.length > 0 && showSearch ? (
        <View style={styles.locationContainer}>
          {locations.map((loc, index) => {
            let showBorder = index + 1 !== locations.length;
            return (
              <TouchableOpacity
                onPress={() => onLocationSelect(loc)}
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
  container: { width: '100%', marginBottom: 60, paddingHorizontal: 10 },
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
  searchInput: { width: '80%', fontSize: 16, color: 'white' },
  locationContainer: {
    zIndex: 999,
    position: 'absolute',
    width: '100%',
    marginHorizontal: 10,
    top: 70,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  locationBox: { paddingVertical: 10 },
  locationBoxBorder: { borderBottomWidth: 1, borderBottomColor: '#cbd5e0' },
  locationText: { fontSize: 16, color: Colors.black },
  location: {
    flexDirection: 'row',
    marginHorizontal: 12,
    gap: 6,
    alignContent: 'center',
  },
});
export default Search;

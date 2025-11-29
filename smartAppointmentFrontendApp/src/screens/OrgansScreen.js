// src/screens/OrgansScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const organs = [
  { id: 1, name: 'Nephrology', icon: require('../../assets/icons/nephrology.png') },
  { id: 2, name: 'Anesthesiology', icon: require('../../assets/icons/anesthesia.jpg') },
  { id: 3, name: 'Orthopedics', icon: require('../../assets/icons/knee.jpg') },
  { id: 4, name: 'Ophthalmology', icon: require('../../assets/icons/eye.jpg') },
  { id: 5, name: 'Pediatrics', icon: require('../../assets/icons/child.jpg') },
  { id: 6, name: 'Oncology', icon: require('../../assets/icons/oncology.jpg') },
  { id: 7, name: 'Dermatology', icon: require('../../assets/icons/skin.jpg') },
  { id: 8, name: 'Pathology', icon: require('../../assets/icons/test-tube.jpg') },
  { id: 9, name: 'Psychiatry', icon: require('../../assets/icons/psych.jpg') },
  { id: 10, name: 'General surgery', icon: require('../../assets/icons/surgery.jpg') },
  { id: 11, name: 'Endocrinology', icon: require('../../assets/icons/endocrine.jpg') },
  { id: 12, name: 'Radiology', icon: require('../../assets/icons/rediology.jpg') },
  { id: 13, name: 'Surgery', icon: require('../../assets/icons/scalpel.jpg') },
  { id: 14, name: 'Cardiology', icon: require('../../assets/icons/heart.jpg') },
  { id: 15, name: 'Geriatrics', icon: require('../../assets/icons/geriatrics.jpg') },
];

const OrgansScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      {/* Top Bar with back and search */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.goBack()}>
          <Text style={styles.iconText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Find Your Doctor</Text>
        <TouchableOpacity style={styles.iconCircle}>
          <Image source={require('../../assets/icons/search.jpg')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Organs Grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {organs.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.circle}>
              <Image source={item.icon} style={styles.icon} />
            </View>
            <Text style={styles.label}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 20,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 30,
    color: '#333',
    bottom:7,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  item: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 25,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e5f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 55,
    height: 60,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OrgansScreen;

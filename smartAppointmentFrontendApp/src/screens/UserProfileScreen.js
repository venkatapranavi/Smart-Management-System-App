import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getUserId } from '../utils/storage';
import api from '../services/Api';
import { getDefaultProfileImage } from './HomeScreen';

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const id = await getUserId();
        if (!id) return;

        const res = await api.get(`/user/profile/${id}`);
        setUserData(res.data);
      } catch (err) {
        console.error("Failed to load user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.circleIcon}
            onPress={() => {
              navigation.navigate('Home');
            }}
          >
            <Ionicons name="chevron-back" size={22} color="#008080" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity style={styles.circleIcon}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#008080" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={
                userData?.gender
                  ? getDefaultProfileImage(userData.gender)
                  : require('../../assets/images/user.jpg')
              }
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Feather name="edit" size={16} color="#008080" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>
            {userData?.fullName || 'User'}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Premium Member ⭐</Text>
          </View>

          {/* Info Boxes - dynamic */}
          <View style={styles.infoRow}>
            {[
              {
                icon: require('../../assets/icons/height.jpg'),
                label: 'Height',
                value: userData?.height || 'N/A',
              },
              {
                icon: require('../../assets/icons/weight.jpg'),
                label: 'Weight',
                value: userData?.weight || 'N/A',
              },
              {
                icon: require('../../assets/icons/age.jpg'),
                label: 'Age',
                value: userData?.age || 'N/A',
              },
              {
                icon: require('../../assets/icons/blood.jpg'),
                label: 'Blood',
                value: userData?.bloodGroup || 'N/A',
              },
            ].map((item, index) => (
              <View key={index} style={styles.infoBox}>
                <View style={styles.iconCircle}>
                  <Image source={item.icon} style={styles.icon} />
                </View>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* About Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutHeading}>About Me</Text>
            <Text style={styles.aboutText}>
              {userData?.aboutMe ||
                'Tell us more about yourself to personalize your experience.'}
            </Text>
          </View>
        </View>

        {/* Family Section - Static */}
        <View style={styles.familySection}>
          <Text style={styles.sectionTitle}>Family Member</Text>
          <View style={styles.familyRow}>
            {[
              { image: require('../../assets/images/doc0.jpg'), name: 'Siddhartha K.' },
              { image: require('../../assets/images/doc1.jpg'), name: 'Naresh E.' },
              { image: require('../../assets/images/doc2.jpg'), name: ' Surbhi A.' },
            ].map((item, index) => (
              <View key={index} style={styles.familyItem}>
                <Image source={item.image} style={styles.familyAvatar} />
                <Text style={styles.familyName}>{item.name}</Text>
              </View>
            ))}
            {/* Add New Button */}
            <View style={styles.familyItem}>
              <TouchableOpacity style={styles.addBtn}>
                <Ionicons name="add" size={24} color="#008080" />
              </TouchableOpacity>
              <Text style={styles.familyName}>Add New</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  safeArea: {
    paddingTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },

  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    color: '#008080',
  },

  circleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5f3f3',
  },

  scrollContent: {
    paddingBottom: 30,
  },

  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 24,
    zIndex: 1,
  },

  avatarWrapper: {
    position: 'relative',
    zIndex: 2,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },

  editIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#e5f3f3',
    borderRadius: 12,
    padding: 4,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 10,
  },

  badge: {
    marginTop: 6,
    backgroundColor: '#FFE6C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    color: '#E78D00',
    fontSize: 12,
    fontWeight: '600',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    width: '100%',
  },

  infoBox: {
    alignItems: 'center',
    flex: 1,
  },

  iconCircle: {
    backgroundColor: '#e5f3f3',
    padding: 12,
    borderRadius: 40,
    marginBottom: 6,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 45,
    height: 50,
    resizeMode: 'contain',
  },

  infoLabel: {
    fontSize: 15,
    color: '#999',
  },

  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: -3,
  },

  aboutSection: {
    marginTop: 24,
    width: '100%',
  },

  aboutHeading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    left: 10,
  },

  aboutText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#999',
    textAlign: 'left',
    left: 10,
  },

  familySection: {
    marginTop: 20,
    paddingHorizontal: 24,
    left: 10,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },

  familyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  familyItem: {
    alignItems: 'center',
    marginRight: 16,
  },

  familyAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 4,
  },

  familyName: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },

  addBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e5f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
});


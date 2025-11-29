import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDefaultProfileImage } from '../utils/helpers'; 
import { getDoctorProfileImage } from '../utils/helpers';
import api from '../services/Api';

const VideoCallScreen = ({ route, navigation }) => {
  const { doctor, patient } = route.params;

  const [callTime, setCallTime] = useState(0); // in seconds

  const handleEndCall = async () => {
    try {
      await api.put(`/appointments/complete/${patient.appointmentId}`);
      navigation.goBack(); 
    } catch (error) {
      console.error('Error completing appointment:', error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCallTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, []);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <View style={styles.container}>
      {/* Background Doctor Image */}
      
      <Image
        source={getDoctorProfileImage(doctor?.gender)}
        style={styles.backgroundImage}
      />
      

      <SafeAreaView style={styles.safeAreaFull} edges={['bottom', 'left', 'right']}>
        {/* ==== Header ==== */}
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircle}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.doctorName}>{doctor?.fullName}</Text>

            <View style={styles.iconCircle}>
              <Text style={styles.callTimeText}>{formatTime(callTime)}</Text>
            </View>
          </View>
        </View>

        {/* ==== Patient Section ==== */}
        <View style={styles.patientContainer}>
          <TouchableOpacity style={styles.addNewBtn}>
            <Feather name="user-plus" size={16} color="#fff" />
            <Text style={styles.addNewText}>Add New</Text>
          </TouchableOpacity>

          <Image
            source={getDefaultProfileImage(patient?.gender)}
            style={styles.patientImage}
          />
        </View>

        {/* ==== Bottom Controls ==== */}
        <View style={styles.bottomWrapper}>
          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.controlBtn}>
              <Ionicons name="videocam" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.endCallBtn} onPress={handleEndCall}>
              <Ionicons name="call" size={22} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlBtn}>
              <Ionicons name="mic" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default VideoCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  safeAreaFull: {
    flex: 1,
    justifyContent: 'space-between',
  },

  // ==== Top Section ====
  headerWrapper: {
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconCircle: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 30,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  callTimeText: {
    color: '#fff',
    fontSize: 13,
  },

  // ==== Patient Section ====
  patientContainer: {
    position: 'absolute',
    bottom: 130,
    right: 20,
    alignItems: 'center',
  },
  addNewBtn: {
    flexDirection: 'row',
    backgroundColor: '#008080',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 6,
  },
  addNewText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 15,
  },
  patientImage: {
    width: 90,
    height: 110,
    borderRadius: 12,
  },

  // ==== Bottom Section ====
  bottomWrapper: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'android' ? 50 : 50,
    paddingTop: 12,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlBtn: {
    backgroundColor: '#008080',
    padding: 14,
    borderRadius: 50,
  },
  endCallBtn: {
    backgroundColor: '#E53935',
    padding: 14,
    borderRadius: 50,
  },
});

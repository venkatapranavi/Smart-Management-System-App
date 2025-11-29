import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { FontAwesome5, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { registerUser } from '../services/UserServices';
import { storeUserId } from '../utils/storage';

const COMMON_TEAL = '#008080';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    bloodGroup: '',
    aboutMe: '',
  });

  const [hidePassword, setHidePassword] = useState(true); // 👁 password visibility toggle

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#011E1E" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground
            source={require('../../assets/images/hospital_bg.jpg')}
            style={styles.imageBackground}
          >
            <View style={styles.overlay}>
              <View style={styles.logoContainer}>
                <FontAwesome5 name="user-plus" size={25} color={COMMON_TEAL} />
              </View>
              <Text style={styles.title}>Join our{'\n'}care network today!</Text>
            </View>
          </ImageBackground>

          <View style={styles.registerCard}>
            <View style={styles.stickyHeader}>
              <Text style={styles.registerTitle}>Create Account</Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              keyboardShouldPersistTaps="handled"
            >
              {[
                { key: 'fullName', placeholder: 'Full Name', icon: <Feather name="user" size={20} color={COMMON_TEAL} /> },
                { key: 'email', placeholder: 'Email', icon: <MaterialIcons name="email" size={20} color={COMMON_TEAL} /> },
              ].map(({ key, placeholder, icon }) => (
                <View key={key} style={styles.inputContainer}>
                  {icon}
                  <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#aaa"
                    value={formData[key]}
                    onChangeText={(text) => handleChange(key, text)}
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    autoCapitalize="none"
                  />
                </View>
              ))}

              {/* Password Field with Toggle 👁 */}
              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color={COMMON_TEAL} />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Password"
                  placeholderTextColor="#aaa"
                  value={formData.password}
                  onChangeText={(text) => handleChange('password', text)}
                  secureTextEntry={hidePassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                  <Ionicons
                    name={hidePassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={COMMON_TEAL}
                    style={{ marginRight: 5 }}
                  />
                </TouchableOpacity>
              </View>

              {/* Remaining Fields */}
              {[
                { key: 'phone', placeholder: 'Phone', icon: <Feather name="phone" size={20} color={COMMON_TEAL} /> },
                { key: 'gender', placeholder: 'Gender (male/female)', icon: <Ionicons name="male-female-outline" size={20} color={COMMON_TEAL} /> },
                { key: 'age', placeholder: 'Age', icon: <FontAwesome5 name="birthday-cake" size={18} color={COMMON_TEAL} />, keyboardType: 'numeric' },
                { key: 'height', placeholder: 'Height (in cm)', icon: <Feather name="activity" size={20} color={COMMON_TEAL} />, keyboardType: 'numeric' },
                { key: 'weight', placeholder: 'Weight (in kg)', icon: <Feather name="bar-chart-2" size={20} color={COMMON_TEAL} />, keyboardType: 'numeric' },
                { key: 'bloodGroup', placeholder: 'Blood Group', icon: <FontAwesome5 name="tint" size={18} color={COMMON_TEAL} /> },
                { key: 'aboutMe', placeholder: 'About You', icon: <Feather name="info" size={20} color={COMMON_TEAL} /> },
              ].map(({ key, placeholder, icon, keyboardType }) => (
                <View key={key} style={styles.inputContainer}>
                  {icon}
                  <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#aaa"
                    value={formData[key]}
                    onChangeText={(text) => handleChange(key, text)}
                    keyboardType={keyboardType || 'default'}
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    autoCapitalize="none"
                  />
                </View>
              ))}

              <TouchableOpacity
                style={styles.registerButton}
                onPress={async () => {
                  try {
                    const genderLower = formData.gender.toLowerCase();
                    
                    const defaultImageUrl = genderLower === 'female'
                      ? 'https://yourcdn.com/femaleuser.jpg'
                      : 'https://yourcdn.com/maleuser.jpg';

                    const payload = {
                      ...formData,
                      profileImageUrl: defaultImageUrl,
                    };

                    const response = await registerUser(payload);
                    console.log('Registration successful:', response);

                    const userId = response?.id;
                    if (userId) {
                      await storeUserId(userId);
                      navigation.navigate('MainTabs');
                    } else {
                      alert('No userId returned from server.');
                    }
                  } catch (error) {
                    const message = error?.response?.data?.message || 'Registration failed. Try again.';
                    alert(message);
                  }
                }}   
              >
                <Text style={styles.registerButtonText}>Create Account</Text>
              </TouchableOpacity>


              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                  Log In
                </Text>
              </Text>
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011E1E',
  },
  imageBackground: {
    flex: 1.3,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    paddingLeft: 24,
    justifyContent: 'center',
    paddingTop: 85,
  },
  logoContainer: {
    backgroundColor: '#e5f3f3',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    color: '#fff',
    fontWeight: '600',
  },
  registerCard: {
    flex: 2.7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 8,
    elevation: 10,
  },
  stickyHeader: {
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 8,
  },
  registerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#045D5D',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 6,
    marginTop: 18,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  registerButton: {
    backgroundColor: COMMON_TEAL,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 18,
    marginBottom: 30,
    color: '#444',
  },
  loginLink: {
    color: '#045D5D',
    fontWeight: '600',
  },
});

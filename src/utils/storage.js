import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserId = async (userId) => {
  try {
    await AsyncStorage.setItem('userId', String(userId));
  } catch (e) {
    console.error('Error saving userId:', e);
  }
};

export const getUserId = async () => {
  try {
    const id = await AsyncStorage.getItem('userId');
    return id;
  } catch (e) {
    console.error('Error getting userId:', e);
    return null;
  }
};

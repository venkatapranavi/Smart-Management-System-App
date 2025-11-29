export const getDefaultProfileImage = (gender) => {
  if (gender?.toLowerCase() === 'female') {
    return require('../../assets/images/femaleuser.jpg');
  }
  return require('../../assets/images/maleuser.jpg');
};

export const getDoctorProfileImage = (gender) => {
  if (gender?.toLowerCase() === 'female') {
    return require('../../assets/images/femaledoctor.jpg');
  }
  return require('../../assets/images/maledoctor.jpg');
};
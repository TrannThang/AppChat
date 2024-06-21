const generateRandomUserKey = () => {
  return "user_" + Math.random().toString(36).substr(2, 9);
};

export default generateRandomUserKey;

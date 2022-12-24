const isUserLogedIn = () => {
  return false;
};

const setToken = (token) => {
  localStorage.setItem("token", token);
  //localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};

const getToken = () => {
  return localStorage.getItem("token");

  // const now = new Date(Date.now()).getTime();
  // const timeAllowed = 1000 * 60 * 30;
  // const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
  // if (timeSinceLastLogin < timeAllowed) {
  //   return localStorage.getItem("token");
  // }
};

const deleteToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("lastLoginTime");
};
const getTokenHeader = () => {
  return {
    authorization: `Bearer ${getToken()}`,
  };
};

const formatComment = (time) => {
  return new Date(time * 1000).toLocaleTimeString();
};

const isObjectEmpty = (obj) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};


const restForm = (formProps, reset = true) => {
  formProps.setSubmitting(false);
  if (reset) formProps.resetForm();
  
};


module.exports = {
  isUserLogedIn,
  formatComment,
  setToken,
  getToken,
  deleteToken,
  getTokenHeader,
  isObjectEmpty,
  restForm,
};

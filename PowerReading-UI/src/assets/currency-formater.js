const formatINR = (amount) => {
  return `Rs. ${Math.round(amount).toLocaleString("en-IN")}`;
};

export default formatINR;
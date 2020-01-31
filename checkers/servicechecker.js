const ServiceChecker = (path) => { 
  let result = null;
  if (typeof path !== "object") {
      result = "Please make your service parameter into "
  }
  return result;
}

module.exports = ServiceChecker;
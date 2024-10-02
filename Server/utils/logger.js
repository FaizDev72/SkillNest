function inProduction() {
    return process.env.NODE_ENV === "production";
  }
  
  module.exports = inProduction;
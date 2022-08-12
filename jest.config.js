module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.{js,jsx}"],
  moduleFileExtensions: ["js", "jsx"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
  transformIgnorePatterns: ["./node_modules/"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};
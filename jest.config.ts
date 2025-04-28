import type { Config } from "jest";

const config: Config = {
  rootDir: './',
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleNameMapper: {
    "\\.(svg|png|css|less|sass|scss)$": "<rootDir>/test/mocks/fileMocks.js", 
    // "^@/(.*)$": "<rootDir>/src/$1",
    // "^.+\\.svg$": "jest-transformer-svg",
  },

};

module.exports = config;

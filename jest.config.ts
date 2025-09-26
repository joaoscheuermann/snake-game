import type { Config } from "jest";

const config: Config = {
  // A preset that is used as a base for Jest's configuration.
  // 'ts-jest' is a great choice for TypeScript projects.
  preset: "ts-jest",

  // The test environment that will be used for testing.
  // 'jsdom' is a must for testing React components as it simulates a browser DOM.
  testEnvironment: "jsdom",

  // Automatically clear mock calls and instances between every test.
  // This is a good default to prevent test pollution.
  clearMocks: true,

  // A list of paths to modules that run some code to configure or set up the testing
  // framework before each test file in the suite is executed.
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // The directory where Jest should output its coverage files.
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage.
  // 'v8' is modern and efficient.
  coverageProvider: "v8",

  // A map from regular expressions to module names or to arrays of module names that allow
  // to stub out resources with a single module.
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#handling-static-assets
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    // Handle image imports
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",

    // Handle module path aliases
    // This needs to be configured in sync with tsconfig.json
    // Example: '^@/components/(.*)$': '<rootDir>/src/components/$1',
  },

  // The glob patterns Jest uses to detect test files.
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  // A list of paths to directories that Jest should use to search for files in.
  // Setting this to 'src' can slightly improve performance.
  roots: ["<rootDir>/src"],

  // An array of regexp pattern strings that are matched against all source file paths,
  // matched files will skip transformation.
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],

  // Indicates whether each individual test should be reported during the run.
  verbose: true,
};

export default config;

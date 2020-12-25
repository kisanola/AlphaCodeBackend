module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
    },
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
  preset: 'ts-jest',
  verbose: true,
  coverageThreshold: {
    global: {
      functions: 80,
      lines: 80,
      statements: -40,
    },
  },
};

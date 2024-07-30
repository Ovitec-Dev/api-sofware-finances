/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  testMatch: ['**/tests/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@server(.*)$': '<rootDir>/src/server/$1',
    '^@shared(.*)$': '<rootDir>/src/shared/$1',
    '^@authenticate(.*)$': '<rootDir>/src/authenticate/$1',
    '^@finance(.*)$': '<rootDir>/src/finance/$1',
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/config/', '.*/index.ts$', '.*/app.ts$', '/models/', '/routes/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  resetMocks: false,
};

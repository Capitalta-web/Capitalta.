const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['javascript_uikit_2\\.0\\.0-uexbfy', 'javascript_admin_2\\.0\\.0'],
  watchPathIgnorePatterns: ['javascript_uikit_2\\.0\\.0-uexbfy', 'javascript_admin_2\\.0\\.0'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
  }
}

module.exports = createJestConfig(customJestConfig)

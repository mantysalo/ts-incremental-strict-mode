module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: [".d.ts", ".js", "<rootDir>/src/__tests__/testfiles"]
};
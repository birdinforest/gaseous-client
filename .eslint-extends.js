module.exports = {
  extends: [
    // Ensure that package 'eslint-config-react-app' is installed by package 'react-scripts'
    // Otherwise, find the correct path.
    require.resolve('react-scripts/node_modules/eslint-config-react-app'),

    // Other extends here, if any
    // require.resolve('react-scripts/node_modules/eslint-config-react-app/jest')
  ],
  rules: {
    // Custom rules here, if any
  },
};

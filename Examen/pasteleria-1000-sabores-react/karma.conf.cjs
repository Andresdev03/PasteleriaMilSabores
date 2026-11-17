module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['tests/**/*.spec.js'],
    preprocessors: {
      'tests/**/*.spec.js': ['webpack'],
      'src/**/*.js': ['webpack'],
      'src/**/*.jsx': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' }
        ]
      },
      resolve: { extensions: ['.js', '.jsx'] }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    autoWatch: false
  });
};

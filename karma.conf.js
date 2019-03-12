module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      { pattern: "src/**/*.ts" },
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript"],
      '**/*.pug': ['pug']
    },
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json",
    },
    browsers: ["Chrome"]
  });
};

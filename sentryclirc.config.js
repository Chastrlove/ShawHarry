module.exports = (env) => {
  const sentryConfig = {
    production: {
      baseSentryURL: "http://localhost:9000/api/0",
      organization: "sentry",
      project: "yhxk",
      apiKey: "2394c75d6f2a4dbc85f20edab18ae9a43427538d4a014678b30fef5ede4ea671",
    },
    qa: {
      // baseSentryURL: "https://sentry.io/api/0",
      organization: "ruiwin",
      project: "yhxk",
      apiKey: "d708783148b34213b4d57f5de4215f884115d80cc4d84f3b9f230d02c46744a8",
    },
    development: {
      // baseSentryURL: "https://sentry.io/api/0",
      organization: "ruiwin",
      project: "yhxk",
      apiKey: "d708783148b34213b4d57f5de4215f884115d80cc4d84f3b9f230d02c46744a8",
    },
  };
  return sentryConfig[env.NODE_ENV];
};

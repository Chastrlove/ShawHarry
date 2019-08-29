module.exports = {
  production: {
    dsn: "http://e0337a5cd7b54631b22e6cce5012e489@localhost:9000/2",
    host: "//rcgl.yrz.cn", // 生产域名{{ //rcgl.yrz.cn }}
    port: 443,
    get api() {
      return `${this.host}/api`;
    },
  },

  qa: {
    dsn: "https://f523cf2a7d1e4c178b68a0df21fa4723@sentry.io/1508677",
    host: "//rcgl-test2.yrz.cn",
    port: 80,
    get api() {
      return `${this.host}/api`;
    },
  },

  development: {
    dsn: "https://f523cf2a7d1e4c178b68a0df21fa4723@sentry.io/1508677",
    host: "//0.0.0.0",
    port: 8001,
    get api() {
      return `/api`;
    },
  },
};

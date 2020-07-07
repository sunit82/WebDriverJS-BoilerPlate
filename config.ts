import { Browsers } from "./lib";

export const rootDir = __dirname;

const config = {
    googleUrl: 'https://www.google.com',
    env: {
      browser: Browsers.Chrome,
      runHeadLess: "false"
    }
  };

export default config;
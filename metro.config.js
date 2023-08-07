// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts.push('jsx', 'js', 'ts', 'tsx', 'mjs', 'cjs');

module.exports = defaultConfig;

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const defaultcConfig = getDefaultConfig(__dirname);
defaultcConfig.resolver.assetExts.push("cjs");

module.exports = defaultcConfig;

// Metro config for an npm-workspaces monorepo.
// Without watchFolders + nodeModulesPaths, Metro cannot see dependencies
// hoisted to the workspace root. disableHierarchicalLookup keeps Metro from
// walking up and finding a second copy of React.
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
config.resolver.disableHierarchicalLookup = true;

module.exports = config;

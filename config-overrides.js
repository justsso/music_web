const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
// var color = window.localStorage.color || 'rgb(238,79,113)';
module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions({
        modifyVars: { "@primary-color": 'rgb(238,79,113)'},
    })(config, env);
    return config;
};
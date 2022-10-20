const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#F59337',
                            '@error-color': '#f25b5b',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};

module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.[tj]sx?$': [
            'babel-jest',
            {
                configFile: './tests/babel.test.config.js',
            },
        ],
    },
}

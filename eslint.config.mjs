import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.js'],
        ignores: ['node_modules/', 'dist/', 'coverage/'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: globals.node,
        },
        plugins: {
            prettier: pluginPrettier,
        },
        rules: {
            ...pluginPrettier.configs.recommended.rules,
            'prettier/prettier': 'error',
        },
    },
    pluginJs.configs.recommended,
    prettier,
];

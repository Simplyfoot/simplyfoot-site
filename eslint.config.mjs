import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'coverage/**',
            'next-env.d.ts',
        ],
    },

    ...compat.extends(
        'next/core-web-vitals',
        'next/typescript',
        'plugin:jsx-a11y/recommended',
        'prettier',
    ),

    eslintPluginPrettierRecommended,

    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            // Prettier
            'prettier/prettier': ['error', { endOfLine: 'auto' }],

            // Import sorting
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^\\u0000'],
                        ['^node:'],
                        ['^@?\\w'],
                        ['^@(/.*|$)'],
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        ['^.+\\.s?css$'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',

            // Import hygiene
            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',

            // General
            curly: ['error', 'all'],
            'no-console': ['warn', { allow: ['warn', 'error'] }],

            // TypeScript
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/ban-ts-comment': ['error', { 'ts-nocheck': false }],

            // React
            'react/self-closing-comp': 'error',

            // Accessibility
            'jsx-a11y/label-has-associated-control': [
                'error',
                { assert: 'either', controlComponents: ['Input', 'Select', 'Textarea'] },
            ],

            // Forcer @/* pour les imports internes
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [
                                '../components/*',
                                '../../components/*',
                                '../../../components/*',
                            ],
                            message: "Utilise '@/components/*' au lieu d'un import relatif.",
                        },
                        {
                            group: ['../lib/*', '../../lib/*', '../../../lib/*'],
                            message: "Utilise '@/lib/*' au lieu d'un import relatif.",
                        },
                        {
                            group: ['../config/*', '../../config/*', '../../../config/*'],
                            message: "Utilise '@/config/*' au lieu d'un import relatif.",
                        },
                        {
                            group: ['../content/*', '../../content/*', '../../../content/*'],
                            message: "Utilise '@/content/*' au lieu d'un import relatif.",
                        },
                        {
                            group: ['../types/*', '../../types/*', '../../../types/*'],
                            message: "Utilise '@/types/*' au lieu d'un import relatif.",
                        },
                        {
                            group: ['../messages/*', '../../messages/*', '../../../messages/*'],
                            message: "Utilise '@/messages/*' au lieu d'un import relatif.",
                        },
                    ],
                },
            ],
        },
    },

    {
        files: ['src/components/ui/**/*.tsx'],
        rules: {
            'jsx-a11y/label-has-associated-control': 'off',
            'jsx-a11y/heading-has-content': 'off',
        },
    },
];

export default eslintConfig;

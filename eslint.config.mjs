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
            'scripts/**',
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

            // Enforce @/* for internal imports
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
                            message: "Use '@/components/*' alias instead of relative imports.",
                        },
                        {
                            group: ['../lib/*', '../../lib/*', '../../../lib/*'],
                            message: "Use '@/lib/*' alias instead of relative imports.",
                        },
                        {
                            group: ['../config/*', '../../config/*', '../../../config/*'],
                            message: "Use '@/config/*' alias instead of relative imports.",
                        },
                        {
                            group: [
                                '../shadcn/*',
                                '../../shadcn/*',
                                '../../../shadcn/*',
                                '../../components/shadcn/*',
                                '../../../components/shadcn/*',
                                '@/components/shadcn/*',
                            ],
                            message:
                                "Use '@/shadcn/*' alias instead of relative imports or '@/components/shadcn/*'.",
                        },
                    ],
                },
            ],
        },
    },

    // shadcn/ui: vendored code from the registry, skip strict enforcement
    {
        files: ['src/shadcn/**/*.{ts,tsx}'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',
            'jsx-a11y/no-noninteractive-element-interactions': 'off',
            'jsx-a11y/anchor-has-content': 'off',
        },
    },
];

export default eslintConfig;

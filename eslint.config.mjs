import {defineConfig, globalIgnores} from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import tailwind from 'eslint-plugin-tailwindcss'
import {plugin as shadcn} from '@shadcn/lint'
import eslintConfigPrettier from 'eslint-config-prettier'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ...tailwind.configs.recommended,
    settings: {
      tailwindcss: {
        cssConfigPath: 'styles/global.css',
        callees: ['cn', 'cva', 'clsx', 'twMerge'],
      },
    },
    rules: {
      ...tailwind.configs.recommended.rules,
      // Delegate class sorting to prettier-plugin-tailwindcss to prevent conflicts
      'tailwindcss/classnames-order': 'off',
      // Allow custom theme tokens defined in styles/global.css
      'tailwindcss/no-custom-classname': 'off',
      // Catch contradictory classes like p-2 p-4
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/enforces-shorthand': 'warn',
    },
  },
  {
    plugins: {
      shadcn,
    },
    rules: {
      'shadcn/no-restyle': 'warn',
      'shadcn/no-raw-colors': 'warn',
    },
  },
  eslintConfigPrettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    '.vercel/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig

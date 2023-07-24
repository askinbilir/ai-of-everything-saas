module.exports = {
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  semi: false,
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/constants/(.*)$',
    '^@/types/(.*)$',
    '^@/lib/(.*)$',
    '^@/validators/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/ui/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '^[./]'
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'
  ]
}

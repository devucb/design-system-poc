import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../apps/bff/schema.gql',
  documents: ['src/operations/**/*.graphql'],
  overwrite: true,
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typed-document-node',
      ],
      config: {
        skipTypename: true,
        enumsAsTypes: true,
        documentMode: 'documentNode',
      },
    },
  },
};

export default config;

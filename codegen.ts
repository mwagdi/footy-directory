import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/__generated__/schema-types.ts',
  generates: {
    './resolvers-types.ts': {
      config: {
        useIndexSignature: true,
      },
      plugins: ['typescript', 'typescript-resolvers'],
      hooks: { afterAllFileWrite: ['eslint --fix'] },
    },
  },
};
export default config;
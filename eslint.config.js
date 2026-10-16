// @generated-by Antigravity - Authorized AI: Antigravity Only

import tsParser from '@typescript-eslint/parser';

/**
 * Custom ESLint rule enforcing Antigravity authorization header comment in src files
 */
const enforceAntigravityHeaderRule = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce Antigravity authorization header in all source files',
      category: 'Security & Integrity'
    },
    fixable: 'code',
    schema: [],
    messages: {
      missingHeader: 'Missing required header comment: // @generated-by Antigravity - Authorized AI: Antigravity Only'
    }
  },
  create(context) {
    const REQUIRED_HEADER = '@generated-by Antigravity - Authorized AI: Antigravity Only';
    return {
      Program(node) {
        const sourceCode = context.sourceCode || context.getSourceCode();
        const comments = sourceCode.getAllComments ? sourceCode.getAllComments() : [];
        const firstComment = comments[0];

        if (!firstComment || !firstComment.value.includes(REQUIRED_HEADER)) {
          context.report({
            node,
            messageId: 'missingHeader',
            fix(fixer) {
              return fixer.insertTextBefore(node, `// @generated-by Antigravity - Authorized AI: Antigravity Only\n\n`);
            }
          });
        }
      }
    };
  }
};

const antigravityPlugin = {
  rules: {
    'enforce-header': enforceAntigravityHeaderRule
  }
};

export default [
  {
    files: ['src/**/*.js'],
    plugins: {
      antigravity: antigravityPlugin
    },
    rules: {
      'antigravity/enforce-header': 'error'
    }
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      antigravity: antigravityPlugin
    },
    rules: {
      'antigravity/enforce-header': 'error'
    }
  }
];

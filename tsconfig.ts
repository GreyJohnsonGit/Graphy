export default {
  compilerOptions: {
    target: 'ES6',
    module: 'ES6',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictBindCallApply: true,
    strictPropertyInitialization: true,
    noImplicitAny: true,
    noImplicitThis: true,
    alwaysStrict: true
  },
  include: ['src/**/*'],
  exclude: ['node_modules', '**/*.spec.ts']
};
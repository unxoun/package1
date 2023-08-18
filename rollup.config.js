import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

// ??? why "require" rather than "import"?
// const packageJson = require('./package.json');
import packageJson from './package.json' assert {type: 'json'};

export default [
  {
    input: 'src/index.ts',
    output: [
      // output "commonJS Modules":
      // (defined by "main" property in package.json file)
      {
        file: packageJson.main,
        format: 'cjs', // CommonJS Modules
        sourcemap: true,
      },
      // output "ES6 Modules":
      // (defined by "module" property in package.json file)
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({tsconfig: './tsconfig.json'}), // should specify the location of "tsconfig.json" file
      dts(),
    ],
  },
  // handling "type" files:
  {
    // file: tsconfig.json > "declarationDir" = "types" &_
    // in package.json (??? or tsconfig.json) we specified the output is "dist" so_
    // it it goes like "dist/esm/types" (??? but what is "esm")
    input: 'dist/esm/types/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'esm'}],
    plugins: [dts()],
  },
];

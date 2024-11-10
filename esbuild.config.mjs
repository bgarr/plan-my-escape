import { context } from 'esbuild';
import * as pkg from './package.json' with { type: 'json' };
import rails from "esbuild-rails";
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dependencies = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
  ...pkg.peerDependencies,
};
const ctx = await context({
  bundle: true,
  entryPoints: [path.resolve(__dirname,'app/javascript/src/entrypoints/*.*')],
  external: Object.keys(dependencies),
  format: 'esm',
  loader: {
    '.js': 'jsx',
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.json': 'json',
    '.DS_Store': 'binary',
  },
  minify: process.env.NODE_ENV === 'production',
  outdir: path.resolve(__dirname,'app/assets/builds'),
  platform: 'browser',
  plugins: [rails()],
  publicPath: '/assets',
  resolveExtensions: ['.js', '.ts', '.tsx', '.json'],
  sourcemap: process.env.RAILS_ENV !== "production",
  target: ['chrome125', 'firefox100', 'safari15'],
})

if (process.argv.includes('--watch')) {
  ctx.watch().then(() => {
    console.log('Watching...');
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  ctx.rebuild().then(() => {
    console.log('Build complete');
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
  process.exit(0);
}

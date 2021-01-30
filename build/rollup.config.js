import path from "path";
import alias from "@rollup/plugin-alias";
import auto from "@rollup/plugin-auto-install";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";

import pkg from "../package.json";

const projectRoot = path.resolve(__dirname, "..");

const deps = Object.keys(pkg.dependencies);

const external = function(id) {
  return /^vue/.test(id) || deps.some(k => new RegExp("^" + k).test(id));
};

export default [
  {
    input: path.resolve(projectRoot, "packages/index.ts"),
    external,
    output: {
      file: pkg.module,
      format: "esm",
      exports: "named"
    },
    plugins: [
      auto(),
      alias({
        resolve: [".js", ".jsx", ".ts", ".tsx", ".vue"],
        entries: {
          "body-scroll-lock": path.resolve(
            projectRoot,
            "node_modules/body-scroll-lock/lib/bodyScrollLock.es6"
          ),
          clipboard: path.resolve(
            projectRoot,
            "node_modules/clipboard/dist/clipboard.js"
          )
        }
      }),
      nodeResolve(),
      typescript({ clean: true }),
      babel({
        presets: [["@babel/preset-env"], ["@babel/preset-typescript"]],
        babelHelpers: "runtime",
        include: ["node_modules/clipboard", "node_modules/body-scroll-lock"],
        exclude: ["node_modules/**"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
        comments: false,
        sourceMap: false
      }),
      commonjs(),
      terser()
    ]
  }
];

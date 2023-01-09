import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'graph-control-demo-application',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [
        { src: '../node_modules/@thermo/ux-property-panel', dest: './packages/ux-property-panel', warn: true },
        { src: '../node_modules/@thermo/uxlib-assets', dest: './packages/uxlib-assets', warn: true },
        { src: '../node_modules/@thermo/uxlib-core-komodo', dest: './packages/uxlib-core-komodo', warn: true },
        { src: './js', dest: './packages/js', warn: true },
      ],
      serviceWorker: null, // disable service workers
    },
  ],
};

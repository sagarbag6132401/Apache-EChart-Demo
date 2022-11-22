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
        { src: './js', dest: './packages/js', warn: true },
      ],
      serviceWorker: null, // disable service workers
    },
  ],
};

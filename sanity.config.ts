import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes';
import { projectId, dataset } from './sanity/env';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Kabola Digital Hub Studio',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schema.types,
  },
});

import { z } from 'zod';

export const ContentFieldTypeSchema = z.enum([
  'text',
  'longtext',
  'number',
  'image',
  'boolean',
  'color',
  'animation-profile'
]);

export const ValidationRuleSchema = z.object({
  required: z.boolean().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  regex: z.string().optional(),
  allowedFormats: z.array(z.string()).optional(),
});

export const ContentFieldDefinitionSchema = z.object({
  id: z.union([z.string().uuid(), z.string().regex(/^[a-zA-Z0-9_\-]+$/)]),
  key: z.string(),
  label: z.string(),
  type: ContentFieldTypeSchema,
  defaultValue: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]).optional(),
  validations: ValidationRuleSchema.optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const ContentFieldsConfigSchema = z.object({
  version: z.string(),
  namespace: z.string(),
  fields: z.array(ContentFieldDefinitionSchema),
});

export type ContentFieldType = z.infer<typeof ContentFieldTypeSchema>;
export type ValidationRule = z.infer<typeof ValidationRuleSchema>;
export type ContentFieldDefinition = z.infer<typeof ContentFieldDefinitionSchema>;
export type ContentFieldsConfig = z.infer<typeof ContentFieldsConfigSchema>;

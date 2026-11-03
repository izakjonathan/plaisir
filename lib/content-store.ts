import fs from 'fs';
import path from 'path';
import { ContentFieldsConfigSchema, ContentFieldsConfig } from './content-schema';

export class ContentConfigurationStore {
  private config!: ContentFieldsConfig;
  private readonly configPath = path.join(process.cwd(), 'lib', 'content-fields.json');

  constructor() {
    this.initializeStore();
  }

  private initializeStore(): void {
    try {
      const rawJson = fs.readFileSync(this.configPath, 'utf-8');
      const parsedJson = JSON.parse(rawJson);
      this.config = ContentFieldsConfigSchema.parse(parsedJson);
    } catch (error) {
      console.error('Critical Configuration Parsing Failure inside lib/content-fields.json:', error);
      throw new Error('Content metadata engine failed safety check boundaries.');
    }
  }

  public getFields() {
    return this.config.fields;
  }

  public getFieldByKey(key: string) {
    return this.config.fields.find(field => field.key === key) || null;
  }
}

import type { NextConfig } from 'next';
import path from 'node:path';
const config: NextConfig = { poweredByHeader: false, outputFileTracingRoot: path.resolve(process.cwd()), devIndicators: false, allowedDevOrigins: ['terminal.local'] };
export default config;

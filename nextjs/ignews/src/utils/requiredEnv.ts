interface EnvOptions {
  public?: boolean;
}

export default function requiredEnv(
  key: string,
  options: EnvOptions = {}
): string {
  const value = options?.public ? key : process.env[key];
  if (!value) {
    throw new Error(`The environment variable ${key} is required but missing.`);
  }
  return value;
}

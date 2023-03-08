export default function requiredEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`The environment variable ${key} is required but missing.`)
  }
  return value
}
export function isValidToken(tokenOrUsername: string) {
  return tokenOrUsername.startsWith("ghp_");
}

export function getDomainEmail(): string {
  const hostname = window.location.hostname;
  return `support@${hostname}`;
}

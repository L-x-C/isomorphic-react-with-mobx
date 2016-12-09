export function isClient() {
  return !!((typeof window !== 'undefined') && window.document);
}

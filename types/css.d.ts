// Tells TypeScript that importing a .css file is a valid side-effect import.
// Next.js handles CSS bundling at build time — TypeScript only needs to know
// the import won't cause a compile error.
declare module "*.css" {
  const stylesheet: Record<string, string>;
  export default stylesheet;
}

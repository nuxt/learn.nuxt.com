export const templates = {
  basic: () => import('./basic').then(m => m.default()),
}

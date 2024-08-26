export const navbarRoutes: { name: string; path: string }[] = [
  { name: 'Meals', path: '/meals' },
  { name: 'Cuisines', path: '/cuisines' },
  { name: 'Ingredients', path: '/ingredients' },
]

export const profileRoutes: { name: string }[] = [
  { name: 'Personal Info' },
  { name: 'Saved Items & Collections' },
  { name: 'My Recipes' },
]

export const adminRoutes: { name: string, path: string }[] = [
  { name: 'Admin Panel', path: '/admin-panel' },
  { name: 'Manage Recipes', path: '/manage/recipes' },
  { name: 'Manage Users', path: '/manage/users' },
]
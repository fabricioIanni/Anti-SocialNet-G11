export function sortByDate<T extends { createdAt: string }>(items: T[]): T[] {
  return items.toSorted((a, b) => b.createdAt.localeCompare(a.createdAt))
}

/**
 * Reconciles a controlled `value` label list with previous entries so stable ids are reused
 * when labels match in order (React Aria tag list pattern).
 */
export function reconcileTagEntries<T extends { label: string }>(
  value: string[],
  oldEntries: T[],
  createNew: (label: string) => T,
): T[] {
  const used = new Set<number>();
  const next: T[] = [];
  for (const lbl of value) {
    const oldIndex = oldEntries.findIndex((e, i) => e.label === lbl && !used.has(i));
    if (oldIndex !== -1) {
      used.add(oldIndex);
      next.push(oldEntries[oldIndex]!);
    } else {
      next.push(createNew(lbl));
    }
  }
  return next;
}

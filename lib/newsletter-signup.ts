/** Add the contact to every requested list before reporting success. */
export async function subscribeToLists(
  input: {email: string; earlyList: boolean},
  segments: {newsletter?: string; early?: string},
  contacts: {
    create: (email: string) => Promise<{error: unknown}>;
    add: (email: string, segmentId: string) => Promise<{error: unknown}>;
  },
): Promise<'ok' | 'configuration' | 'contact' | 'segment'> {
  const ids = [segments.newsletter, ...(input.earlyList ? [segments.early] : [])];
  if (ids.some(id => !id)) return 'configuration';
  if ((await contacts.create(input.email)).error) return 'contact';
  for (const id of new Set(ids)) {
    if ((await contacts.add(input.email, id!)).error) return 'segment';
  }
  return 'ok';
}

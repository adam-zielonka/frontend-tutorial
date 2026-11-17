/** Resolve documentation file labels without making unrelated code blocks interactive. */
export function lessonFile(title: string, files: string[]): string | undefined {
  const path = title.trim().split(/\s+[—–]/)[0].replace(/^\.?\/?src\//, '/');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return files.includes(normalized) ? normalized : undefined;
}

/** Locate existing context, even when the example includes code the student has yet to add. */
export function snippetSelection(code: string, snippet = ''): {anchor: number; head: number} | undefined {
  const lines = snippet.split('\n').map(line => line.trim()).filter(line =>
    line.length > 8 && !/^(\/\/|import\b|[{}<>;]+$)/.test(line));
  for (const line of lines) {
    const offset = code.indexOf(line);
    if (offset !== -1) return {anchor: offset, head: offset + line.length};
  }
  // A changed declaration still points at the same named function/method.
  for (const line of lines) {
    const name = /(?:function\s+|(?:const|let)\s+)([A-Za-z_$][\w$]*)/.exec(line)?.[1]
      ?? /^(?:get\s+)?([A-Za-z_$][\w$]*)\s*\(/.exec(line)?.[1];
    if (!name) continue;
    const match = new RegExp(`\\b${name.replace(/\$/g, '\\$')}\\b`).exec(code);
    if (match) return {anchor: match.index, head: match.index + name.length};
  }
  return undefined;
}

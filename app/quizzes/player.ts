export type Player = { id: string; name: string };
const activeKey = 'quiz-atlas:active-player:v2';
const playersKey = 'quiz-atlas:players:v2';
export function readPlayers(): Player[] {
  try { const value = JSON.parse(localStorage.getItem(playersKey) || '[]'); return Array.isArray(value) ? value.filter((p: Player) => typeof p.id === 'string' && typeof p.name === 'string') : []; } catch { return []; }
}
export function readPlayer(): Player | null {
  try { const id = localStorage.getItem(activeKey); return readPlayers().find(p => p.id === id) ?? null; } catch { return null; }
}
export function selectPlayer(id: string) {
  if (!readPlayers().some(p => p.id === id)) throw new Error('Unknown profile');
  localStorage.setItem(activeKey, id);
}
export function createPlayer(name: string): Player {
  const players = readPlayers();
  const player = { id: crypto.randomUUID(), name: name.trim() };
  localStorage.setItem(playersKey, JSON.stringify([...players, player]));
  selectPlayer(player.id);
  return player;
}
export function scoreKey(kind: string, id: string, playerId: string) { return `quiz-atlas:v2:${playerId}:${kind}:${id}`; }

export function renamePlayer(id: string, name: string): Player {
  const clean = name.trim();
  if (clean.length < 2 || clean.length > 40) throw new Error('Enter a name between 2 and 40 characters.');
  const players = readPlayers();
  const current = players.find(p => p.id === id);
  if (!current) throw new Error('Unknown profile.');
  if (players.some(p => p.id !== id && p.name.toLowerCase() === clean.toLowerCase())) throw new Error('This name already exists.');
  const updated = { ...current, name: clean };
  localStorage.setItem(playersKey, JSON.stringify(players.map(p => p.id === id ? updated : p)));
  return updated;
}

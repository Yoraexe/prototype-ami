export type Role = 'BPM' | 'Auditor' | 'Auditee';

export const auth = $state({
  user: null as { name: string, role: Role } | null
});

export function login(role: Role) {
  if (role === 'BPM') auth.user = { name: 'Prof. Budi (Kepala BPM)', role: 'BPM' };
  if (role === 'Auditor') auth.user = { name: 'Dr. Andi Suryadi (Auditor)', role: 'Auditor' };
  if (role === 'Auditee') auth.user = { name: 'Kaprodi Sistem Informasi (Auditee)', role: 'Auditee' };
}

export function logout() {
  auth.user = null;
}

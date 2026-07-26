import type { SupabaseClient } from '@supabase/supabase-js';

export const GOOGLE_WORKSPACE_DOMAIN =
  process.env.NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN ?? 'theirmemory.org';

export type VolunteerWorkspaceMember = {
  user_id: string | null;
  status: string | null;
  gworkspace_status: string | null;
  gworkspace_email: string | null;
  personal_email: string | null;
};

export function isWorkspaceDomainEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const domain = GOOGLE_WORKSPACE_DOMAIN.trim().toLowerCase();
  return normalized.endsWith(`@${domain}`);
}

export async function findVolunteerByWorkspaceEmail(
  supabase: SupabaseClient,
  email: string
): Promise<VolunteerWorkspaceMember | null> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;

  const { data } = await supabase
    .from('team_members')
    .select('user_id, status, gworkspace_status, gworkspace_email, personal_email')
    .ilike('gworkspace_email', normalized)
    .maybeSingle();

  return (data as VolunteerWorkspaceMember | null) ?? null;
}

export function isVolunteerWorkspaceEligible(member: VolunteerWorkspaceMember): boolean {
  if (member.status === 'ancien membre') return false;
  if (member.gworkspace_status && member.gworkspace_status !== 'active') return false;
  return true;
}

export async function assertVolunteerWorkspaceLoginAllowed(
  supabase: SupabaseClient,
  user: { id: string; email?: string | null }
): Promise<{ ok: true; member: VolunteerWorkspaceMember } | { ok: false; message: string }> {
  const email = user.email?.trim().toLowerCase() ?? '';

  if (!email || !isWorkspaceDomainEmail(email)) {
    return {
      ok: false,
      message:
        'La connexion Google est réservée aux bénévoles disposant d’un compte Google Workspace Their memory.',
    };
  }

  const member = await findVolunteerByWorkspaceEmail(supabase, email);
  if (!member) {
    return {
      ok: false,
      message:
        'Aucun compte bénévole Google Workspace trouvé pour cette adresse. Utilisez votre e-mail et mot de passe.',
    };
  }

  if (!isVolunteerWorkspaceEligible(member)) {
    return {
      ok: false,
      message: 'Ce compte Google Workspace n’est pas actif pour le moment.',
    };
  }

  if (member.user_id && member.user_id !== user.id) {
    return {
      ok: false,
      message:
        'Ce compte Workspace est déjà rattaché à un autre profil. Connectez-vous avec votre e-mail et mot de passe.',
    };
  }

  return { ok: true, member };
}

export async function linkVolunteerWorkspaceAccount(
  supabase: SupabaseClient,
  userId: string,
  member: VolunteerWorkspaceMember
): Promise<void> {
  if (member.user_id) return;

  await supabase
    .from('team_members')
    .update({ user_id: userId })
    .ilike('gworkspace_email', member.gworkspace_email ?? '');
}

export function userSignedInWithGoogle(user: {
  identities?: Array<{ provider?: string }> | null;
  app_metadata?: Record<string, unknown>;
}): boolean {
  if (user.identities?.some((identity) => identity.provider === 'google')) {
    return true;
  }

  const provider = user.app_metadata?.provider;
  return provider === 'google';
}

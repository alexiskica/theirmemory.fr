/**
 * Après signUp, Supabase peut :
 * - renvoyer une erreur explicite (« User already registered »)
 * - ou un user sans identities (anti-énumération) quand l’e-mail existe déjà
 */
export function getExistingAccountSignUpMessage(
  error: { message?: string } | null | undefined,
  user: { identities?: Array<unknown> | null } | null | undefined
): string | null {
  const existingAccountMessage =
    'Un compte existe déjà avec cette adresse e-mail. Connectez-vous ou utilisez « Mot de passe oublié ».';

  if (error?.message) {
    const msg = error.message.toLowerCase();
    if (
      msg.includes('already registered') ||
      msg.includes('already been registered') ||
      msg.includes('user already exists') ||
      msg.includes('email address is already') ||
      msg.includes('already been taken')
    ) {
      return existingAccountMessage;
    }
  }

  if (user && Array.isArray(user.identities) && user.identities.length === 0) {
    return existingAccountMessage;
  }

  return null;
}

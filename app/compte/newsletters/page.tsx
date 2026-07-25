import { redirect } from 'next/navigation';

/** Ancienne URL — redirige vers les préférences de communication. */
export default function NewslettersRedirectPage() {
  redirect('/compte/parametres/communications');
}

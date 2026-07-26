import type { Metadata } from 'next';
import LegalDocument, {
  LegalHeading,
  LegalList,
  LegalParagraph,
} from '@/components/legal/LegalDocument';
import { buildPageMetadata } from '@/lib/seo';
import { INSTITUTIONAL_SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  ...buildPageMetadata({
    pageDescription: 'Mentions légales',
    description:
      'Mentions légales du site média Their memory : éditeur, directeur de la publication, hébergement et propriété intellectuelle.',
    path: '/mentions-legales',
  }),
};

export default function MentionsLegalesPage() {
  return (
    <LegalDocument title="Mentions légales" updatedAt="26 juillet 2026">
      <LegalHeading>1. Éditeur du site</LegalHeading>
      <LegalParagraph>
        Le présent site internet, accessible à l&apos;adresse{' '}
        <strong className="text-white">theirmemory.fr</strong>, est édité par l&apos;association{' '}
        <strong className="text-white">Their memory</strong>, association déclarée et régie par la
        loi du 1er juillet 1901. Son siège social est situé au 107 Rue Réaumur, 75002 Paris, en
        France. Elle est enregistrée sous le numéro SIREN 904 957 610 et le numéro RNA W372018697.
      </LegalParagraph>
      <LegalParagraph>
        Their memory.fr est le site média de l&apos;association. Il propose des articles, des
        vidéos, des podcasts et le magazine <em>In memoriam</em>. Le site institutionnel de
        l&apos;association est accessible à l&apos;adresse{' '}
        <a
          href={INSTITUTIONAL_SITE_URL}
          className="text-[#FFCC00] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          theirmemory.org
        </a>
        .
      </LegalParagraph>
      <LegalParagraph>
        Vous pouvez contacter l&apos;association par téléphone au 09 80 80 21 00 ou par courrier
        électronique à l&apos;adresse{' '}
        <a href="mailto:info@theirmemory.org" className="text-[#FFCC00] hover:underline">
          info@theirmemory.org
        </a>
        .
      </LegalParagraph>

      <LegalHeading>2. Directeur de la publication</LegalHeading>
      <LegalParagraph>
        Le directeur de la publication est Monsieur Alexis KICA, en sa qualité de Président de
        l&apos;association Their memory.
      </LegalParagraph>

      <LegalHeading>3. Hébergement et infrastructure technique</LegalHeading>
      <LegalParagraph>
        L&apos;hébergement du site internet est assuré par la société Vercel Inc., dont le siège
        social est situé 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Vous pouvez les
        contacter par courrier électronique à l&apos;adresse privacy@vercel.com.
      </LegalParagraph>
      <LegalParagraph>
        Les contenus éditoriaux et médias (articles, vidéos, podcasts, magazine) sont stockés via
        l&apos;infrastructure Supabase Inc. (228 Park Avenue South, New York, NY 10003,
        États-Unis), configurée pour un hébergement des données au sein de centres de données
        situés dans l&apos;Union européenne (Irlande).
      </LegalParagraph>
      <LegalParagraph>
        Les fonctionnalités de compte utilisateur partagées avec le site institutionnel
        (authentification, profil, contenus épinglés, préférences de newsletter) reposent sur le
        même sous-traitant technique Supabase, également hébergé dans l&apos;Union européenne.
      </LegalParagraph>

      <LegalHeading>4. Propriété intellectuelle</LegalHeading>
      <LegalParagraph>
        L&apos;ensemble des éléments composant le site, incluant sa structure, ses textes, ses
        bases de données, ses éléments graphiques, ses logos, son architecture, ainsi que les
        contenus éditoriaux et audiovisuels publiés (articles, vidéos, podcasts, pages du magazine),
        est protégé par le droit de la propriété intellectuelle. Sauf mention contraire, ces
        éléments demeurent la propriété exclusive de l&apos;association Their memory ou de leurs
        auteurs respectifs.
      </LegalParagraph>
      <LegalParagraph>
        Toute reproduction, représentation, modification, publication, adaptation ou exploitation,
        qu&apos;elle soit totale ou partielle, des éléments du site sans l&apos;autorisation écrite
        et préalable de l&apos;association est strictement interdite.
      </LegalParagraph>

      <LegalHeading>5. Crédits et contenus tiers</LegalHeading>
      <LegalList>
        <li>
          Certaines vidéos peuvent être hébergées ou diffusées via des plateformes tierces (notamment
          YouTube). Les conditions d&apos;utilisation de ces plateformes s&apos;appliquent en
          complément des présentes mentions.
        </li>
        <li>
          Les marques, logos et noms de produits cités appartiennent à leurs détenteurs respectifs.
        </li>
      </LegalList>
    </LegalDocument>
  );
}

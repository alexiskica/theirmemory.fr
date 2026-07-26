import type { Metadata } from 'next';
import Link from 'next/link';
import LegalDocument, {
  LegalHeading,
  LegalList,
  LegalParagraph,
} from '@/components/legal/LegalDocument';
import { buildPageMetadata } from '@/lib/seo';
import { INSTITUTIONAL_SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  ...buildPageMetadata({
    pageDescription: 'Politique de confidentialité',
    description:
      'Politique de confidentialité de Their memory.fr : données collectées, finalités, cookies, durée de conservation et exercice de vos droits RGPD.',
    path: '/politique-de-confidentialite',
  }),
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalDocument title="Politique de confidentialité" updatedAt="26 juillet 2026">
      <LegalHeading>1. Introduction et responsable du traitement</LegalHeading>
      <LegalParagraph>
        L&apos;association Their memory accorde une importance capitale au respect de votre vie
        privée. La présente politique a pour but de vous informer de manière claire sur la façon
        dont nous traitons vos données personnelles lors de votre utilisation du site média{' '}
        <strong className="text-white">theirmemory.fr</strong>, conformément au Règlement Général
        sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
      </LegalParagraph>
      <LegalParagraph>
        Le responsable du traitement des données est l&apos;association Their memory, siège social
        situé 107 Rue Réaumur, 75002 Paris (SIREN 904 957 610).
      </LegalParagraph>
      <LegalParagraph>
        Le compte utilisateur Their memory est commun au site média (theirmemory.fr) et au site
        institutionnel (
        <a
          href={INSTITUTIONAL_SITE_URL}
          className="text-[#FFCC00] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          theirmemory.org
        </a>
        ). Les traitements liés à ce compte sont décrits ci-dessous et peuvent également être
        consultés dans la politique de confidentialité du site institutionnel.
      </LegalParagraph>

      <LegalHeading>2. Données collectées et finalités</LegalHeading>
      <LegalParagraph>
        Le site média propose des fonctionnalités susceptibles de nécessiter le traitement de
        données personnelles :
      </LegalParagraph>
      <LegalList>
        <li>
          <strong className="text-white">Compte utilisateur :</strong> lors de la création ou de
          l&apos;utilisation d&apos;un compte, nous traitons notamment votre adresse e-mail, votre
          prénom et votre nom afin de vous authentifier et de personnaliser votre espace.
        </li>
        <li>
          <strong className="text-white">Contenus épinglés :</strong> lorsque vous épinglez un
          article, une vidéo ou un podcast, nous enregistrons l&apos;identifiant du contenu et votre
          identifiant utilisateur afin de vous permettre de les retrouver dans votre espace.
        </li>
        <li>
          <strong className="text-white">Newsletter « À la une » :</strong> si vous activez cette
          option dans vos paramètres, nous utilisons votre adresse e-mail pour vous envoyer des
          communications éditoriales liées au site média. Vous pouvez modifier ce choix à tout
          moment depuis votre compte.
        </li>
        <li>
          <strong className="text-white">Connexion Google Workspace (bénévoles) :</strong> si vous
          utilisez la connexion réservée aux bénévoles disposant d&apos;un compte Google Workspace
          Their memory, nous traitons les informations nécessaires à l&apos;authentification et au
          rattachement de votre compte bénévole.
        </li>
        <li>
          <strong className="text-white">Statistiques de navigation :</strong> avec votre
          consentement, nous utilisons Google Analytics pour mesurer l&apos;audience du site et
          améliorer nos contenus.
        </li>
        <li>
          <strong className="text-white">Lecteurs multimédias :</strong> le visionnage de certaines
          vidéos via des plateformes tierces (notamment YouTube) peut entraîner le dépôt de cookies
          ou de traceurs par ces services, selon vos préférences et la configuration du lecteur.
        </li>
      </LegalList>

      <LegalHeading>3. Bases légales</LegalHeading>
      <LegalList>
        <li>
          <strong className="text-white">Exécution du contrat / mesures précontractuelles :</strong>{' '}
          gestion du compte, authentification et fonctionnalités associées (épingles,
          préférences).
        </li>
        <li>
          <strong className="text-white">Consentement :</strong> cookies analytiques / marketing et,
          le cas échéant, inscription à la newsletter « À la une ».
        </li>
        <li>
          <strong className="text-white">Intérêt légitime :</strong> sécurité du site, prévention
          des abus et amélioration de l&apos;expérience de lecture, dans le respect de vos droits.
        </li>
      </LegalList>

      <LegalHeading>4. Destinataires et hébergement des données</LegalHeading>
      <LegalParagraph>
        Vos données ne sont jamais vendues ou cédées à des tiers à des fins commerciales. Les
        destinataires sont limitées aux personnes habilitées au sein de l&apos;association et à nos
        sous-traitants techniques nécessaires au fonctionnement du service, notamment :
      </LegalParagraph>
      <LegalList>
        <li>
          <strong className="text-white">Vercel</strong> — hébergement et diffusion du site ;
        </li>
        <li>
          <strong className="text-white">Supabase</strong> — authentification, base de données et
          fonctionnalités interactives, avec hébergement configuré dans l&apos;Union européenne
          (Irlande) ;
        </li>
        <li>
          <strong className="text-white">Google</strong> — Analytics (si consentement) et, le cas
          échéant, authentification Google Workspace pour les bénévoles éligibles.
        </li>
      </LegalList>

      <LegalHeading>5. Durée de conservation</LegalHeading>
      <LegalParagraph>
        Vos données sont conservées uniquement pour la durée nécessaire aux finalités pour
        lesquelles elles ont été collectées :
      </LegalParagraph>
      <LegalList>
        <li>
          <strong className="text-white">Compte et épingles :</strong> pendant la durée
          d&apos;existence du compte ; les données d&apos;un compte inactif peuvent être
          supprimées après <strong className="text-white">3 ans</strong> d&apos;inactivité
          (recommandation CNIL), sauf obligation légale contraire.
        </li>
        <li>
          <strong className="text-white">Newsletter :</strong> jusqu&apos;au retrait de votre
          consentement ou à la suppression de votre compte.
        </li>
        <li>
          <strong className="text-white">Statistiques (Google Analytics) :</strong> durée maximale
          de 14 mois.
        </li>
        <li>
          <strong className="text-white">Cookies :</strong> selon les durées indiquées dans notre
          outil de gestion du consentement, et au plus selon les recommandations applicables.
        </li>
      </LegalList>

      <LegalHeading>6. Vos droits et modalités d&apos;exercice</LegalHeading>
      <LegalParagraph>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
        limitation, d&apos;opposition et de portabilité, dans les conditions prévues par la
        réglementation. Vous pouvez également retirer votre consentement à tout moment, sans
        remettre en cause la licéité du traitement effectué avant ce retrait.
      </LegalParagraph>
      <LegalParagraph>
        Vous pouvez paramétrer vos choix concernant les cookies via l&apos;outil « Gestion des
        cookies » accessible en bas de chaque page. Les préférences liées à la newsletter sont
        disponibles dans{' '}
        <Link href="/compte/parametres/communications" className="text-[#FFCC00] hover:underline">
          votre espace compte
        </Link>
        .
      </LegalParagraph>
      <LegalParagraph>
        Pour toute question ou demande concernant vos données, contactez notre Délégué à la
        Protection des Données (DPO) à l&apos;adresse{' '}
        <a href="mailto:rgpd@theirmemory.org" className="text-[#FFCC00] hover:underline">
          rgpd@theirmemory.org
        </a>
        . Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une
        réclamation à la Commission Nationale de l&apos;Informatique et des Libertés (CNIL).
      </LegalParagraph>
    </LegalDocument>
  );
}

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
    pageDescription: 'Conditions générales d’utilisation',
    description:
      'Conditions générales d’utilisation du site média Their memory.fr : accès aux contenus, compte utilisateur, propriété intellectuelle et responsabilité.',
    path: '/cgu',
  }),
};

export default function CGUPage() {
  return (
    <LegalDocument title="Conditions générales d'utilisation" updatedAt="26 juillet 2026">
      <LegalHeading>1. Objet et champ d&apos;application</LegalHeading>
      <LegalParagraph>
        Les présentes Conditions générales d&apos;utilisation (CGU) ont pour objet de définir les
        modalités dans lesquelles l&apos;association Their memory met à disposition du public le
        site média accessible à l&apos;adresse{' '}
        <strong className="text-white">theirmemory.fr</strong>. Ce site propose notamment des
        articles, des vidéos, des podcasts et le magazine <em>In memoriam</em>.
      </LegalParagraph>
      <LegalParagraph>
        La navigation sur le site, ainsi que la création ou l&apos;utilisation d&apos;un compte,
        impliquent l&apos;acceptation pleine et entière des présentes conditions. Le site
        institutionnel de l&apos;association (
        <a
          href={INSTITUTIONAL_SITE_URL}
          className="text-[#FFCC00] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          theirmemory.org
        </a>
        ) fait l&apos;objet de conditions propres, sans préjudice des règles communes liées au
        compte utilisateur partagé.
      </LegalParagraph>

      <LegalHeading>2. Accès aux services et compte utilisateur</LegalHeading>
      <LegalParagraph>
        L&apos;accès aux contenus éditoriaux publiés sur le site est gratuit. Certaines
        fonctionnalités (espace personnel, contenus épinglés, préférences de newsletter)
        nécessitent la création d&apos;un compte Their memory.
      </LegalParagraph>
      <LegalParagraph>
        Ce compte est commun au site média et au site institutionnel. L&apos;utilisateur s&apos;engage
        à fournir des informations exactes lors de l&apos;inscription et à préserver la
        confidentialité de ses identifiants. L&apos;association se réserve le droit de suspendre
        ou de supprimer un compte en cas de violation des présentes CGU, d&apos;usurpation
        d&apos;identité ou d&apos;utilisation abusive de la plateforme.
      </LegalParagraph>
      <LegalParagraph>
        La connexion via Google Workspace est réservée aux bénévoles disposant d&apos;un compte
        professionnel Their memory actif. Son usage abusif ou non autorisé est interdit.
      </LegalParagraph>

      <LegalHeading>3. Contenu éditorial et bonne utilisation</LegalHeading>
      <LegalParagraph>
        Les contenus publiés sur theirmemory.fr ont une vocation informative et mémorielle. Sans
        préjudice des droits de propriété intellectuelle, l&apos;utilisateur s&apos;engage à :
      </LegalParagraph>
      <LegalList>
        <li>ne pas détourner le site à des fins illicites, diffamatoires ou contraires à l&apos;ordre public ;</li>
        <li>ne pas porter atteinte au fonctionnement du site (scraping abusif, attaques, surcharge) ;</li>
        <li>
          ne pas reproduire ou redistribuer les contenus protégés hors des usages autorisés par la
          loi ou par l&apos;association.
        </li>
      </LegalList>

      <LegalHeading>4. Propriété intellectuelle</LegalHeading>
      <LegalParagraph>
        L&apos;association Their memory est titulaire, ou détentrice des droits nécessaires,
        portant sur le site et sur les contenus éditoriaux et audiovisuels qui y sont diffusés
        (architecture, design, textes, images, vidéos, podcasts, éléments du magazine), sauf
        mention contraire.
      </LegalParagraph>
      <LegalParagraph>
        Toute reproduction, représentation, extraction ou réutilisation du contenu du site,
        totale ou partielle, réalisée sans autorisation écrite et préalable de l&apos;association
        est strictement interdite et susceptible de constituer un délit de contrefaçon.
      </LegalParagraph>

      <LegalHeading>5. Limitation de responsabilité</LegalHeading>
      <LegalParagraph>
        L&apos;association déploie tous les efforts nécessaires pour fournir des informations
        précises et actualisées. Elle ne saurait toutefois être tenue responsable en cas
        d&apos;omission, d&apos;inexactitude ou de modification ultérieure des contenus publiés.
      </LegalParagraph>
      <LegalParagraph>
        Le site est fourni « en l&apos;état ». Son fonctionnement peut être momentanément
        interrompu pour maintenance, mise à jour ou indisponibilité d&apos;un prestataire
        technique (hébergeur, base de données, lecteurs multimédias tiers).
      </LegalParagraph>
      <LegalParagraph>
        Les liens vers des sites ou services tiers (par exemple lecteurs vidéo) sont fournis à
        titre informatif ; l&apos;association n&apos;exerce pas de contrôle sur leurs contenus ni
        sur leurs pratiques.
      </LegalParagraph>

      <LegalHeading>6. Données personnelles</LegalHeading>
      <LegalParagraph>
        Le traitement des données personnelles est décrit dans la{' '}
        <Link href="/politique-de-confidentialite" className="text-[#FFCC00] hover:underline">
          politique de confidentialité
        </Link>
        . L&apos;utilisation des cookies est gérée via l&apos;outil de consentement accessible en
        bas de page.
      </LegalParagraph>

      <LegalHeading>7. Droit applicable et règlement des litiges</LegalHeading>
      <LegalParagraph>
        Les présentes CGU sont soumises au droit français. En cas de litige relatif à leur
        interprétation ou à leur exécution, l&apos;utilisateur et l&apos;association s&apos;engagent
        à rechercher en priorité une solution amiable. À défaut, les tribunaux français seront
        seuls compétents.
      </LegalParagraph>
    </LegalDocument>
  );
}

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DossierAssets = join( dirname( fileURLToPath( import.meta.url ) ), '..', 'assets' );
export const Largeur = 1000;
const RatioMono = 0.6;
const PoliceSans = "'Segoe UI Variable Display','Segoe UI',Inter,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif";
const PoliceMono = "'JetBrains Mono','Cascadia Code','SF Mono',Consolas,'Liberation Mono',Menlo,monospace";

export const Themes =
{
	sombre:
	{
		Surface: '#12161D',
		SurfaceHaute: '#1A2029',
		Bordure: '#2A313C',
		Texte: '#E8ECF1',
		TexteDoux: '#9BA5B3',
		TexteFaible: '#5F6977',
		Accent: '#FF3B30',
		Succes: '#3FB950',
		Attention: '#D29922',
		Points: '#FFFFFF',
		Syntaxe:
		{
			MotCle: '#FF7B72',
			Type: '#FFA657',
			Propriete: '#79C0FF',
			Methode: '#D2A8FF',
			Chaine: '#A5D6FF',
			Valeur: '#79C0FF',
			Ponctuation: '#8B949E',
			Defaut: '#E8ECF1'
		}
	},
	clair:
	{
		Surface: '#FFFFFF',
		SurfaceHaute: '#F4F6F8',
		Bordure: '#D9DEE4',
		Texte: '#16191D',
		TexteDoux: '#57606A',
		TexteFaible: '#8C959F',
		Accent: '#D7261C',
		Succes: '#1A7F37',
		Attention: '#9A6700',
		Points: '#16191D',
		Syntaxe:
		{
			MotCle: '#CF222E',
			Type: '#953800',
			Propriete: '#0550AE',
			Methode: '#8250DF',
			Chaine: '#0A3069',
			Valeur: '#0550AE',
			Ponctuation: '#6E7781',
			Defaut: '#16191D'
		}
	}
};

const LignesPresentation =
[
	'Alternant développeur chez Études et Applications Informatiques',
	'Étudiant en BUT Informatique, 3e année, au Havre',
	'C# · .NET · Angular · Java · SQL Server',
	'Co-créateur de MateZone, un chat temps réel',
	"Curieux de l'IA appliquée au dev : agents et MCP"
];

const Titres =
[
	{ Numero: '01', Texte: 'À propos' },
	{ Numero: '02', Texte: 'Parcours' },
	{ Numero: '03', Texte: 'Projets phares' },
	{ Numero: '04', Texte: 'Autres projets' },
	{ Numero: '05', Texte: 'Stack technique' },
	{ Numero: '06', Texte: 'Statistiques' },
	{ Numero: '07', Texte: 'Contact' }
];

const RouteParcours =
[
	[ 40, 250, 67, 250, 93, 250, 120, 250 ],
	[ 120, 250, 210, 250, 215, 170, 305, 170 ],
	[ 305, 170, 400, 170, 405, 270, 500, 270 ],
	[ 500, 270, 595, 270, 600, 170, 695, 170 ],
	[ 695, 170, 785, 170, 790, 250, 880, 250 ],
	[ 880, 250, 907, 250, 933, 250, 960, 250 ]
];

const EtapesParcours =
[
	{ Etiquette: 'BUT 1', Titre: 'Les fondations', Description: 'Java, algo, SQL et Docker' },
	{ Etiquette: 'PREMIÈRE APP', Titre: 'MateZone', Description: 'Chat temps réel en Java' },
	{ Etiquette: 'BUT 2', Titre: 'Stage .NET', Description: 'Architecture MVC, UML, puis premier stage en .NET' },
	{ Etiquette: 'CDD', Titre: 'Analyste développeur', Description: 'Du stage au contrat' },
	{ Etiquette: 'BUT 3', Titre: 'Alternance', Description: 'Développeur full stack .NET' }
];

const SoleilsParcours =
[
	{ Segment: 1, Position: 0.5 },
	{ Segment: 2, Position: 0.5 }
];

const VitesseParcours = 120;
const PausesParcours = [ 1.2, 1.2, 1.2, 1.2, 2.6 ];
const AttenteDepartParcours = 0.6;
const AttenteFinParcours = 0.8;

const IndentationCode = '    ';

const LignesCode =
[
	[ [ 'MotCle', 'namespace ' ], [ 'Defaut', 'LeHavre.Informatique' ] ],
	[ [ 'Ponctuation', '{' ] ],
	[ [ 'Defaut', IndentationCode ], [ 'MotCle', 'public sealed class ' ], [ 'Type', 'Joshua' ], [ 'Ponctuation', ' : ' ], [ 'Type', 'Developpeur' ] ],
	[ [ 'Defaut', IndentationCode ], [ 'Ponctuation', '{' ] ],
	ProprieteCode( 'string', 'Formation', ChaineCode( 'BUT Informatique · 3e année' ) ),
	ProprieteCode( 'string', 'Alternance', ChaineCode( 'Études et Applications Informatiques' ) ),
	ProprieteCode( 'string[]', 'Stack', TableauCode( [ 'C#', '.NET', 'Angular', 'Java', 'SQL' ] ) ),
	ProprieteCode( 'string', 'EnCeMoment', ChaineCode( "L'IA appliquée au dev : agents, MCP" ) ),
	ProprieteCode( 'string[]', 'Passions', TableauCode( [ 'Formule 1', 'Jeu vidéo' ] ) ),
	[],
	[ [ 'Defaut', IndentationCode.repeat( 2 ) ], [ 'MotCle', 'public bool ' ], [ 'Methode', 'AimeLeCodePropre' ], [ 'Ponctuation', '() => ' ], [ 'Valeur', 'true' ], [ 'Ponctuation', ';' ] ],
	[ [ 'Defaut', IndentationCode ], [ 'Ponctuation', '}' ] ],
	[ [ 'Ponctuation', '}' ] ]
];

const Projets =
[
	{
		Fichier: 'projet-matezone',
		Surtitre: 'PROJET PERSO · CO-CRÉATEUR',
		Titre: 'MateZone',
		Statut: { Texte: 'En ligne', Couleur: 'Succes' },
		Description: 'Chat en temps réel développé en Java : client-serveur par WebSockets, architecture hexagonale et persistance MySQL. Release V1.0 disponible.',
		Technos: [ [ 'Java', '#F89820' ], [ 'WebSockets', '#8B5CF6' ], [ 'MySQL', '#4479A1' ], [ 'Architecture hexagonale', 'Accent' ] ],
		Illustration: IllustrationMateZone
	},
	{
		Fichier: 'projet-paddock',
		Surtitre: 'PROJET PERSO',
		Titre: 'Paddock',
		Statut: { Texte: 'En développement', Couleur: 'Attention' },
		Description: "Suivi des statistiques de Formule 1 : API ASP.NET en Clean Architecture, worker synchronisé sur l'API Jolpica et client Angular.",
		Technos: [ [ 'C#', '#9B4F96' ], [ 'ASP.NET', '#7C5CFA' ], [ 'Angular', '#DD0031' ], [ 'SQL Server', '#CC2927' ], [ 'Clean Architecture', 'Accent' ] ],
		Illustration: IllustrationPaddock
	},
	{
		Fichier: 'projet-matespace',
		Surtitre: "PROJET D'ÉQUIPE · ANDROID",
		Titre: 'MateSpace',
		Statut: { Texte: 'Équipe de 3', Couleur: 'TexteDoux' },
		Description: "Jeu de tir spatial d'arcade sur Android : piloter un chasseur et survivre à des vagues infinies d'ennemis, sur un moteur de jeu maison.",
		Technos: [ [ 'Java', '#F89820' ], [ 'Android', '#3DDC84' ], [ 'Moteur de jeu maison', 'Accent' ] ],
		Illustration: IllustrationMateSpace
	},
	{
		Fichier: 'projet-parcoursup',
		Surtitre: 'SAE 4.01 · ÉQUIPE DE 4',
		Titre: 'Profilage Parcoursup',
		Statut: { Texte: 'Application web', Couleur: 'TexteDoux' },
		Description: 'Suivi et filtrage des dossiers Parcoursup : filtres multicritères, groupes de candidats, import et export, carte interactive des candidatures.',
		Technos: [ [ 'PHP', '#777BB4' ], [ 'Twig', '#BACF29' ], [ 'PostgreSQL', '#336791' ], [ 'JavaScript', '#F7DF1E' ], [ 'Leaflet', '#199900' ], [ 'MVC', 'Accent' ] ],
		Illustration: IllustrationParcoursup
	}
];

const Stack =
[
	{ Libelle: 'BACK-END', Technos: [ [ 'C#', '#9B4F96' ], [ '.NET', '#512BD4' ], [ 'ASP.NET', '#7C5CFA' ], [ 'WPF', '#2F7DE1' ], [ 'Java', '#F89820' ], [ 'PHP', '#777BB4' ], [ 'Symfony', 'Texte' ] ] },
	{ Libelle: 'FRONT-END', Technos: [ [ 'Angular', '#DD0031' ], [ 'TypeScript', '#3178C6' ], [ 'JavaScript', '#F7DF1E' ], [ 'HTML5', '#E34F26' ], [ 'CSS3', '#1572B6' ], [ 'Bootstrap', '#7952B3' ] ] },
	{ Libelle: 'DONNÉES', Technos: [ [ 'SQL Server', '#CC2927' ], [ 'PostgreSQL', '#336791' ], [ 'MySQL', '#4479A1' ] ] },
	{ Libelle: 'MOBILE & SYSTÈME', Technos: [ [ 'Android', '#3DDC84' ], [ 'C', '#A8B9CC' ], [ 'C++', '#00599C' ] ] },
	{ Libelle: 'OUTILS', Technos: [ [ 'Git', '#F05032' ], [ 'Docker', '#2496ED' ], [ 'Linux', '#FCC624' ], [ 'Visual Studio', '#5C2D91' ], [ 'IntelliJ IDEA', '#FE315D' ], [ 'VS Code', '#007ACC' ] ] }
];

const RangsDefilement =
[
	{ Categories: [ 'BACK-END', 'OUTILS' ], Sens: 1 },
	{ Categories: [ 'FRONT-END', 'DONNÉES', 'MOBILE & SYSTÈME' ], Sens: -1 }
];

const Boutons =
[
	{ Fichier: 'bouton-code', Icone: 'Code', Libelle: 'Code source' },
	{ Fichier: 'bouton-site', Icone: 'Site', Libelle: 'Voir le site' },
	{ Fichier: 'bouton-release', Icone: 'Release', Libelle: 'Release V1.0' },
	{ Fichier: 'bouton-email', Icone: 'Email', Libelle: "M'écrire", Principal: true },
	{ Fichier: 'bouton-portfolio', Icone: 'Portfolio', Libelle: 'Portfolio' }
];

const Icones =
{
	Code: "<path d='M6.5 5 L2 10 L6.5 15 M13.5 5 L18 10 L13.5 15 M11.5 3.5 L8.5 16.5'/>",
	Site: "<circle cx='10' cy='10' r='8'/><ellipse cx='10' cy='10' rx='3.4' ry='8'/><path d='M2 10 H18'/>",
	Release: "<path d='M10 3 V13 M5.5 8.5 L10 13 L14.5 8.5 M3.5 17 H16.5'/>",
	Email: "<rect x='2' y='4' width='16' height='12' rx='2.5'/><path d='M3 5.5 L10 11 L17 5.5'/>",
	Portfolio: "<rect x='2' y='6' width='16' height='11' rx='2.5'/><path d='M7 6 V4.5 Q7 3 8.5 3 H11.5 Q13 3 13 4.5 V6 M2 11 H18'/>"
};

const LargeursCaracteres =
[
	{ Caracteres: " .,:;'!|ijlI()[]{}", Largeur: 0.3 },
	{ Caracteres: 'frt-/', Largeur: 0.4 },
	{ Caracteres: 'mwMW@%', Largeur: 0.88 }
];

const StylesCommuns = `
.sans{font-family:${ PoliceSans }}
.mono{font-family:${ PoliceMono }}
@keyframes apparaitre{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.ap{animation:apparaitre .8s cubic-bezier(.2,.8,.2,1) both}
@keyframes glisser{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}
.gl{animation:glisser .7s cubic-bezier(.2,.8,.2,1) both}
@keyframes clignoter{0%,49%{opacity:1}50%,100%{opacity:0}}
.cl{animation:clignoter 1.1s step-end infinite}
@keyframes tracer{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.tr{stroke-dasharray:1;animation:tracer 1.4s cubic-bezier(.6,0,.2,1) both}
@keyframes pulser{0%,100%{opacity:1}50%{opacity:.3}}
.pu{animation:pulser 2.4s ease-in-out infinite}
@keyframes tourner{to{transform:rotate(360deg)}}
.pivot{transform-box:fill-box;transform-origin:center}
`;

const StylesIllustrations = `
.saut{animation:pulser 1.2s ease-in-out infinite}
@keyframes tour{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}
.circuit{animation:tour 3.2s linear infinite}
@keyframes flamme{from{transform:scaleY(.72)}to{transform:scaleY(1.12)}}
.flamme{transform-box:fill-box;transform-origin:50% 0;animation:flamme .16s ease-in-out infinite alternate}
@keyframes laser{from{stroke-dashoffset:22}to{stroke-dashoffset:-100}}
.laser{animation:laser 1.1s linear infinite}
@keyframes onde{from{transform:scale(1);opacity:.8}to{transform:scale(2.6);opacity:0}}
.onde{transform-box:fill-box;transform-origin:center;animation:onde 2.4s ease-out infinite}
@keyframes scintiller{0%,100%{opacity:.9}50%{opacity:.2}}
.etoile{animation:scintiller 3s ease-in-out infinite}
`;

function ProprieteCode( type, nom, valeur )
{
	const declaration = `public ${ type } ${ nom }`;
	const alignement = ' '.repeat( Math.max( 1, 25 - declaration.length ) );
	const jetonsType = type.endsWith( '[]' )
		? [ [ 'MotCle', type.slice( 0, -2 ) ], [ 'Ponctuation', '[]' ] ]
		: [ [ 'MotCle', type ] ];
	return [
		[ 'Defaut', IndentationCode.repeat( 2 ) ],
		[ 'MotCle', 'public ' ],
		...jetonsType,
		[ 'Defaut', ' ' ],
		[ 'Propriete', nom ],
		[ 'Defaut', alignement ],
		[ 'Ponctuation', '=> ' ],
		...valeur,
		[ 'Ponctuation', ';' ]
	];
}

function ChaineCode( texte )
{
	return [ [ 'Chaine', `"${ texte }"` ] ];
}

function TableauCode( elements )
{
	const jetons = [ [ 'Ponctuation', '[ ' ] ];
	elements.forEach( ( element, index ) =>
	{
		if ( index > 0 )
		{
			jetons.push( [ 'Ponctuation', ', ' ] );
		}
		jetons.push( [ 'Chaine', `"${ element }"` ] );
	} );
	jetons.push( [ 'Ponctuation', ' ]' ] );
	return jetons;
}

export function Echapper( texte )
{
	return String( texte )
		.replace( /&/g, '&amp;' )
		.replace( /</g, '&lt;' )
		.replace( />/g, '&gt;' )
		.replace( /"/g, '&quot;' )
		.replace( /'/g, '&#39;' )
		.replace( /[^\x00-\x7F]/gu, ( caractere ) => `&#${ caractere.codePointAt( 0 ) };` );
}

export function Arrondir( nombre )
{
	return Math.round( nombre * 100 ) / 100;
}

export function Delai( secondes )
{
	return ` style='animation-delay:${ Arrondir( secondes ) }s'`;
}

function CouleurTheme( theme, valeur )
{
	return theme[ valeur ] ?? valeur;
}

function LargeurCaractere( caractere )
{
	const categorie = LargeursCaracteres.find( ( element ) => element.Caracteres.includes( caractere ) );
	if ( categorie )
	{
		return categorie.Largeur;
	}
	return /\p{Lu}/u.test( caractere ) ? 0.68 : 0.55;
}

export function LargeurTexte( texte, taille, gras = false )
{
	let total = 0;
	for ( const caractere of texte )
	{
		total += LargeurCaractere( caractere );
	}
	return total * taille * ( gras ? 1.03 : 1 );
}

export function LargeurMono( texte, taille )
{
	return [ ...texte ].length * taille * RatioMono;
}

function DecouperLignes( texte, taille, largeurMax )
{
	const lignes = [];
	let ligne = '';
	for ( const mot of texte.split( ' ' ) )
	{
		const essai = ligne ? `${ ligne } ${ mot }` : mot;
		if ( ligne && LargeurTexte( essai, taille ) > largeurMax )
		{
			lignes.push( ligne );
			ligne = mot;
		}
		else
		{
			ligne = essai;
		}
	}
	if ( ligne )
	{
		lignes.push( ligne );
	}
	return lignes;
}

export function Svg( hauteur, titre, styles, contenu, largeur = Largeur )
{
	return `<svg xmlns='http://www.w3.org/2000/svg' width='${ largeur }' height='${ hauteur }' viewBox='0 0 ${ largeur } ${ hauteur }' role='img' aria-label='${ Echapper( titre ) }'>
<style>${ StylesCommuns }${ styles }
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
${ contenu }
</svg>
`;
}

export function Carte( theme, hauteur, rayon = 16 )
{
	return `<rect x='1' y='1' width='${ Largeur - 2 }' height='${ hauteur - 2 }' rx='${ rayon }' fill='${ theme.Surface }' stroke='${ theme.Bordure }' stroke-width='1.5'/>`;
}

export function FormeCarte( id, hauteur, rayon = 16 )
{
	return `<clipPath id='${ id }'><rect x='1' y='1' width='${ Largeur - 2 }' height='${ hauteur - 2 }' rx='${ rayon }'/></clipPath>`;
}

export function Feux( x, y )
{
	return [ '#FF5F57', '#FEBC2E', '#28C840' ]
		.map( ( couleur, index ) => `<circle cx='${ x + index * 20 }' cy='${ y }' r='6' fill='${ couleur }'/>` )
		.join( '' );
}

function MesurerPuce( nom, taille, hauteurPuce )
{
	return Arrondir( hauteurPuce * 0.9 + LargeurMono( nom, taille ) + 14 );
}

function DessinerPuce( theme, x, y, nom, couleur, taille, hauteurPuce )
{
	const milieu = y + hauteurPuce / 2;
	return `<rect x='${ Arrondir( x ) }' y='${ y }' width='${ MesurerPuce( nom, taille, hauteurPuce ) }' height='${ hauteurPuce }' rx='${ hauteurPuce / 2 }' fill='${ theme.SurfaceHaute }' stroke='${ theme.Bordure }'/>
<circle cx='${ Arrondir( x + hauteurPuce * 0.5 ) }' cy='${ milieu }' r='${ Arrondir( hauteurPuce * 0.15 ) }' fill='${ CouleurTheme( theme, couleur ) }'/>
<text class='mono' x='${ Arrondir( x + hauteurPuce * 0.9 ) }' y='${ Arrondir( milieu + taille * 0.35 ) }' font-size='${ taille }' fill='${ theme.Texte }' textLength='${ Arrondir( LargeurMono( nom, taille ) ) }' lengthAdjust='spacing'>${ Echapper( nom ) }</text>`;
}

function GenererEntete( theme )
{
	const hauteur = 340;
	const tailleNom = 78;
	const largeurPrenom = Arrondir( LargeurTexte( 'Joshua', tailleNom, true ) );
	const largeurNom = Arrondir( LargeurTexte( 'Hermilly', tailleNom, true ) );
	const styles = `
.rl{animation:tourner 90s linear infinite}
.rr{animation:tourner 10s linear infinite}
.rm{animation:tourner 24s linear infinite reverse}
`;
	const contenu = `<defs>
${ FormeCarte( 'forme', hauteur ) }
<pattern id='points' width='22' height='22' patternUnits='userSpaceOnUse'><circle cx='2' cy='2' r='1.1' fill='${ theme.Points }' fill-opacity='.09'/></pattern>
<radialGradient id='halo' cx='830' cy='192' r='330' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='${ theme.Accent }' stop-opacity='.22'/><stop offset='1' stop-color='${ theme.Accent }' stop-opacity='0'/></radialGradient>
</defs>
${ Carte( theme, hauteur ) }
<g clip-path='url(#forme)'>
<rect width='${ Largeur }' height='${ hauteur }' fill='url(#points)'/>
<rect width='${ Largeur }' height='${ hauteur }' fill='url(#halo)'/>
<rect width='${ Largeur }' height='44' fill='${ theme.SurfaceHaute }'/>
<path d='M0 44 H${ Largeur }' stroke='${ theme.Bordure }' stroke-width='1.5'/>
</g>
${ Feux( 28, 22 ) }
<text class='mono' x='500' y='27' font-size='13' fill='${ theme.TexteDoux }' text-anchor='middle'>${ Echapper( 'joshua-hermilly — README.md' ) }</text>
<text class='mono' x='972' y='27' font-size='12' fill='${ theme.TexteFaible }' text-anchor='end'>Le Havre, FR</text>
<g class='gl'${ Delai( 0.1 ) }><text class='mono' x='58' y='106' font-size='17' font-weight='700'><tspan fill='${ theme.Accent }'>&gt;</tspan><tspan fill='${ theme.TexteDoux }'> whoami</tspan></text></g>
<g class='gl'${ Delai( 0.25 ) }><text class='sans' x='54' y='188' font-size='${ tailleNom }' font-weight='800' fill='${ theme.Texte }' textLength='${ largeurPrenom }' lengthAdjust='spacingAndGlyphs'>Joshua</text></g>
<g class='gl'${ Delai( 0.4 ) }><text class='sans' x='54' y='268' font-size='${ tailleNom }' font-weight='800' fill='${ theme.Texte }' textLength='${ largeurNom }' lengthAdjust='spacingAndGlyphs'>Hermilly</text></g>
<rect class='cl' x='${ Arrondir( 54 + largeurNom + 12 ) }' y='212' width='16' height='60' fill='${ theme.Accent }'/>
<g class='ap'${ Delai( 0.7 ) }><text class='sans' x='56' y='312' font-size='19' fill='${ theme.TexteDoux }'>${ Echapper( 'Étudiant en BUT Informatique ' ) }<tspan fill='${ theme.Accent }'>${ Echapper( '·' ) }</tspan>${ Echapper( ' Alternant développeur .NET' ) }</text></g>
<g class='ap'${ Delai( 0.5 ) }>
<circle cx='830' cy='192' r='80' fill='${ theme.Accent }' fill-opacity='.07'/>
<circle class='pivot rl' cx='830' cy='192' r='114' fill='none' stroke='${ theme.TexteFaible }' stroke-opacity='.6' stroke-width='2.2' stroke-dasharray='0.1 10' stroke-linecap='round'/>
<circle cx='830' cy='192' r='96' fill='none' stroke='${ theme.Bordure }' stroke-width='1.5'/>
<circle class='pivot rr' cx='830' cy='192' r='96' fill='none' stroke='${ theme.Accent }' stroke-width='3' stroke-linecap='round' pathLength='100' stroke-dasharray='16 84'/>
<g class='pivot rm'><circle cx='830' cy='192' r='114' fill='none'/><circle cx='830' cy='78' r='5' fill='${ theme.Accent }'/></g>
<rect x='764' y='126' width='132' height='132' rx='32' fill='${ theme.Surface }' stroke='${ theme.Bordure }' stroke-width='1.5'/>
<text class='mono' x='830' y='207' font-size='42' font-weight='700' text-anchor='middle' textLength='101' lengthAdjust='spacing'><tspan fill='${ theme.Accent }'>{</tspan><tspan fill='${ theme.Texte }'>JH</tspan><tspan fill='${ theme.Accent }'>}</tspan></text>
</g>`;
	return Svg( hauteur, 'Joshua Hermilly — Étudiant en BUT Informatique, alternant développeur .NET, Le Havre', styles, contenu );
}

function GenererPresentation( theme )
{
	const hauteur = 76;
	const taille = 21;
	const xDepart = 64;
	const creneaux = [];
	let temps = 0;
	for ( const ligne of LignesPresentation )
	{
		const nombre = [ ...ligne ].length;
		const frappe = Math.max( 1.2, nombre * 0.045 );
		creneaux.push( { Ligne: ligne, Nombre: nombre, Largeur: Arrondir( LargeurMono( ligne, taille ) ), Debut: temps, Frappe: frappe } );
		temps += frappe + 3.5;
	}
	const total = Arrondir( temps );
	const Pourcent = ( secondes ) => Arrondir( secondes / temps * 100 );
	let styles = '';
	let calques = '';
	creneaux.forEach( ( creneau, index ) =>
	{
		const debut = Pourcent( creneau.Debut );
		const tape = Pourcent( creneau.Debut + creneau.Frappe );
		const tenu = Pourcent( creneau.Debut + creneau.Frappe + 2.6 );
		const efface = Pourcent( creneau.Debut + creneau.Frappe + 3.1 );
		styles += `@keyframes ty${ index }{0%,${ debut }%{transform:translateX(0)}${ tape }%,${ tenu }%{transform:translateX(${ creneau.Largeur }px)}${ efface }%,100%{transform:translateX(0)}}
.ty${ index }{animation:ty${ index } ${ total }s steps(${ creneau.Nombre }) infinite}
.cu${ index }{animation:ty${ index } ${ total }s steps(${ creneau.Nombre }) infinite,clignoter 1.1s step-end infinite}
@keyframes vi${ index }{0%{opacity:0}${ debut }%{opacity:1}${ efface }%{opacity:0}}
.vi${ index }{opacity:0;animation:vi${ index } ${ total }s step-end infinite}
`;
		calques += `<clipPath id='c${ index }'><rect class='ty${ index }' x='${ Arrondir( xDepart - creneau.Largeur ) }' y='0' width='${ creneau.Largeur }' height='${ hauteur }'/></clipPath>
<text class='mono' x='${ xDepart }' y='46' font-size='${ taille }' font-weight='600' fill='${ theme.Texte }' textLength='${ creneau.Largeur }' lengthAdjust='spacing' clip-path='url(#c${ index })'>${ Echapper( creneau.Ligne ) }</text>
<g class='vi${ index }'><rect class='cu${ index }' x='${ xDepart + 2 }' y='24' width='11' height='28' rx='1.5' fill='${ theme.Accent }'/></g>
`;
	} );
	styles += `@media (prefers-reduced-motion:reduce){.ty0,.cu0{transform:translateX(${ creneaux[ 0 ].Largeur }px)}.vi0{opacity:1}}`;
	const contenu = `${ Carte( theme, hauteur, 14 ) }
<text class='mono' x='32' y='46' font-size='${ taille }' font-weight='700' fill='${ theme.Accent }'>&gt;</text>
${ calques }`;
	return Svg( hauteur, LignesPresentation.join( ' · ' ), styles, contenu );
}

function GenererTitre( theme, numero, titre )
{
	const hauteur = 64;
	const debutLigne = Arrondir( 62 + LargeurTexte( titre, 28, true ) + 26 );
	const contenu = `<g class='ap'>
<rect x='2' y='19' width='44' height='28' rx='14' fill='${ theme.Accent }' fill-opacity='.12' stroke='${ theme.Accent }' stroke-opacity='.45' stroke-width='1.2'/>
<text class='mono' x='24' y='38' font-size='13' font-weight='700' fill='${ theme.Accent }' text-anchor='middle'>${ numero }</text>
<text class='sans' x='62' y='43' font-size='28' font-weight='700' fill='${ theme.Texte }'>${ Echapper( titre ) }</text>
</g>
<path class='tr' pathLength='1' d='M${ debutLigne } 33 H982' fill='none' stroke='${ theme.Bordure }' stroke-width='1.5'${ Delai( 0.2 ) }/>
<circle class='ap' cx='990' cy='33' r='4' fill='${ theme.Accent }'${ Delai( 1.2 ) }/>`;
	return Svg( hauteur, `${ numero } — ${ titre }`, '', contenu );
}

function DessinerOnglets( theme, hauteurBarre )
{
	const onglets =
	[
		{ Nom: 'Joshua.cs', Couleur: '#9B4F96' },
		{ Nom: 'MateZone.java', Couleur: '#F89820' },
		{ Nom: 'Paddock.sln', Couleur: '#7C5CFA' }
	];
	let x = 96;
	let rendu = '';
	onglets.forEach( ( onglet, index ) =>
	{
		const largeurOnglet = Arrondir( 47 + LargeurMono( onglet.Nom, 13 ) );
		const actif = index === 0;
		if ( actif )
		{
			rendu += `<rect x='${ x }' y='9' width='${ largeurOnglet }' height='${ hauteurBarre }' rx='8' fill='${ theme.Surface }'/>`;
			rendu += `<rect x='${ x + 10 }' y='9' width='${ Arrondir( largeurOnglet - 20 ) }' height='2.5' rx='1.25' fill='${ theme.Accent }'/>`;
		}
		rendu += `<circle cx='${ Arrondir( x + 17 ) }' cy='28' r='4' fill='${ onglet.Couleur }'/>`;
		rendu += `<text class='mono' x='${ Arrondir( x + 29 ) }' y='32.5' font-size='13' fill='${ actif ? theme.Texte : theme.TexteFaible }'>${ Echapper( onglet.Nom ) }</text>`;
		x += largeurOnglet + 6;
	} );
	return rendu;
}

function GenererFiche( theme )
{
	const hauteurBarre = 46;
	const hauteurLigne = 28;
	const tailleCode = 16;
	const largeurCaractere = tailleCode * RatioMono;
	const xCode = 86;
	const yCode = hauteurBarre + 24;
	const ligneActive = 10;
	const hauteur = yCode + LignesCode.length * hauteurLigne + 14 + 32;
	const yStatut = hauteur - 32;
	let lignes = '';
	let minimap = '';
	let colonneActive = 0;
	LignesCode.forEach( ( jetons, index ) =>
	{
		const texte = jetons.map( ( jeton ) => jeton[ 1 ] ).join( '' );
		const nombre = [ ...texte ].length;
		const yLigne = yCode + index * hauteurLigne;
		const tspans = jetons
			.map( ( [ genre, valeur ] ) => `<tspan fill='${ theme.Syntaxe[ genre ] }'>${ Echapper( valeur ) }</tspan>` )
			.join( '' );
		const code = nombre > 0
			? `<text class='mono' x='${ xCode }' y='${ yLigne + 19 }' font-size='${ tailleCode }' xml:space='preserve' textLength='${ Arrondir( nombre * largeurCaractere ) }' lengthAdjust='spacing'>${ tspans }</text>`
			: '';
		lignes += `<g class='gl'${ Delai( 0.3 + index * 0.08 ) }><text class='mono' x='58' y='${ yLigne + 19 }' font-size='14' fill='${ index === ligneActive ? theme.Texte : theme.TexteFaible }' text-anchor='end'>${ index + 1 }</text>${ code }</g>\n`;
		if ( nombre > 0 )
		{
			const indentation = nombre - texte.trimStart().length;
			minimap += `<rect x='${ Arrondir( 906 + indentation * 0.9 ) }' y='${ 78 + index * 5 }' width='${ Arrondir( ( nombre - indentation ) * 0.9 ) }' height='2.5' rx='1' fill='${ theme.TexteDoux }' fill-opacity='.35'/>`;
		}
		if ( index === ligneActive )
		{
			colonneActive = nombre;
		}
	} );
	const yActive = yCode + ligneActive * hauteurLigne;
	const elementsStatut = [ 'C#', 'UTF-8', 'Tabulations', 'Allman' ];
	let xStatut = 96;
	let statut = '';
	for ( const element of elementsStatut )
	{
		statut += `<text class='mono' x='${ Arrondir( xStatut ) }' y='${ yStatut + 20 }' font-size='12' fill='${ theme.TexteFaible }'>${ Echapper( element ) }</text>`;
		xStatut += LargeurMono( element, 12 ) + 24;
	}
	const contenu = `<defs>${ FormeCarte( 'forme', hauteur, 14 ) }</defs>
${ Carte( theme, hauteur, 14 ) }
<g clip-path='url(#forme)'>
<rect width='${ Largeur }' height='${ hauteurBarre }' fill='${ theme.SurfaceHaute }'/>
<path d='M0 ${ hauteurBarre } H${ Largeur }' stroke='${ theme.Bordure }' stroke-width='1.5'/>
<rect x='0' y='${ yActive }' width='${ Largeur }' height='${ hauteurLigne }' fill='${ theme.Accent }' fill-opacity='.07'/>
<rect x='0' y='${ yActive }' width='4' height='${ hauteurLigne }' fill='${ theme.Accent }'/>
<rect x='0' y='${ yStatut }' width='${ Largeur }' height='32' fill='${ theme.SurfaceHaute }'/>
<path d='M0 ${ yStatut } H${ Largeur }' stroke='${ theme.Bordure }' stroke-width='1.5'/>
</g>
${ Feux( 28, 23 ) }
${ DessinerOnglets( theme, hauteurBarre ) }
${ lignes }<rect class='cl' x='${ Arrondir( xCode + colonneActive * largeurCaractere + 3 ) }' y='${ yActive + 4 }' width='2.5' height='21' fill='${ theme.Accent }'/>
<rect x='898' y='72' width='80' height='70' rx='4' fill='${ theme.Texte }' fill-opacity='.04'/>
${ minimap }
<circle class='pu' cx='26' cy='${ yStatut + 16 }' r='4' fill='${ theme.Accent }'/>
<text class='mono' x='38' y='${ yStatut + 20 }' font-size='12' font-weight='700' fill='${ theme.TexteDoux }'>main</text>
${ statut }
<text class='mono' x='976' y='${ yStatut + 20 }' font-size='12' fill='${ theme.TexteFaible }' text-anchor='end'>Ln ${ ligneActive + 1 }, Col ${ colonneActive + 1 }</text>`;
	return Svg( hauteur, "Fiche : Joshua Hermilly, BUT Informatique 3e année, alternant chez Études et Applications Informatiques. Stack : C#, .NET, Angular, Java, SQL. En ce moment : l'IA appliquée au dev (agents, MCP). Passions : Formule 1, jeu vidéo.", '', contenu );
}

function IllustrationMateZone()
{
	return `<defs>
<radialGradient id='mzHalo' cx='.5' cy='.42' r='.6'><stop offset='0' stop-color='#E8261B' stop-opacity='.55'/><stop offset='1' stop-color='#E8261B' stop-opacity='0'/></radialGradient>
<filter id='mzFlou' x='-50%' y='-50%' width='200%' height='200%'><feGaussianBlur stdDeviation='10'/></filter>
</defs>
<rect x='0' y='-60' width='204' height='324' fill='#110605'/>
<rect width='204' height='204' fill='url(#mzHalo)'/>
<rect x='42' y='34' width='120' height='120' rx='28' fill='#E8261B' opacity='.85' filter='url(#mzFlou)'/>
<rect x='42' y='34' width='120' height='120' rx='28' fill='#E8261B'/>
<g transform='skewX(-8) translate(14 0)'><rect x='56' y='60' width='92' height='56' rx='16' fill='#111111'/></g>
<path d='M118 112 L128 136 L136 112 Z' fill='#111111'/>
<text class='sans' x='102' y='101' font-size='36' font-weight='900' font-style='italic' fill='#FFFFFF' text-anchor='middle' textLength='62' lengthAdjust='spacingAndGlyphs'>MZ</text>
<text class='sans' x='102' y='184' font-size='17' font-weight='900' fill='#FFFFFF' text-anchor='middle' textLength='118' lengthAdjust='spacingAndGlyphs'>MATEZONE</text>
<g class='ap'${ Delai( 1 ) }>
<rect x='136' y='14' width='50' height='26' rx='13' fill='#FFFFFF'/>
<circle class='saut' cx='150' cy='27' r='3.2' fill='#E8261B'/>
<circle class='saut' cx='161' cy='27' r='3.2' fill='#E8261B'${ Delai( 0.2 ) }/>
<circle class='saut' cx='172' cy='27' r='3.2' fill='#E8261B'${ Delai( 0.4 ) }/>
</g>`;
}

function IllustrationPaddock()
{
	const trace = 'M60 164 H150 C176 164 182 144 172 128 L156 102 C148 88 162 70 176 64 C188 58 182 42 166 44 L84 56 C66 59 62 76 74 86 C86 96 70 110 52 108 C30 106 26 128 30 144 C34 160 44 164 60 164 Z';
	return `<defs>
<pattern id='pdGrille' width='17' height='17' patternUnits='userSpaceOnUse'><path d='M17 0 H0 V17' fill='none' stroke='#FFFFFF' stroke-opacity='.05'/></pattern>
<pattern id='pdDamier' width='6' height='6' patternUnits='userSpaceOnUse'><rect width='6' height='6' fill='#0C0F13'/><rect width='3' height='3' fill='#F2F4F7'/><rect x='3' y='3' width='3' height='3' fill='#F2F4F7'/></pattern>
<filter id='pdFlou' x='-20%' y='-20%' width='140%' height='140%'><feGaussianBlur stdDeviation='3'/></filter>
</defs>
<rect x='0' y='-60' width='204' height='324' fill='#0C0F13'/>
<rect width='204' height='204' fill='url(#pdGrille)'/>
<path d='${ trace }' fill='none' stroke='#262C35' stroke-width='16' stroke-linejoin='round'/>
<path d='${ trace }' fill='none' stroke='#3A424E' stroke-width='1.2' stroke-dasharray='5 6'/>
<rect x='106' y='153' width='9' height='22' fill='url(#pdDamier)'/>
<path class='circuit' d='${ trace }' pathLength='100' fill='none' stroke='#E8261B' stroke-width='7' stroke-linecap='round' stroke-dasharray='7 93' filter='url(#pdFlou)'/>
<path class='circuit' d='${ trace }' pathLength='100' fill='none' stroke='#FF5A4E' stroke-width='3.5' stroke-linecap='round' stroke-dasharray='7 93'/>
<text class='mono' x='14' y='26' font-size='10.5' font-weight='700' fill='#8B949E' letter-spacing='1'>TOUR 23/57</text>
<rect x='158' y='12' width='32' height='20' rx='5' fill='#E8261B'/>
<text class='mono' x='174' y='26.5' font-size='12' font-weight='700' fill='#FFFFFF' text-anchor='middle'>P1</text>
<text class='mono' x='14' y='191' font-size='15' font-weight='700' fill='#F2F4F7'>1:31.447</text>
<circle class='pu' cx='98' cy='186' r='3.5' fill='#A855F7'/>
<text class='mono' x='106' y='190' font-size='9.5' font-weight='700' fill='#A855F7'>MEILLEUR TOUR</text>`;
}

function IllustrationMateSpace()
{
	const etoiles =
	[
		[ 18, 22, 1.2 ], [ 44, 12, 0.8 ], [ 70, 34, 1 ], [ 120, 16, 1.4 ], [ 150, 58, 0.9 ], [ 188, 70, 1.1 ],
		[ 26, 74, 0.9 ], [ 12, 128, 1.3 ], [ 40, 168, 0.8 ], [ 76, 190, 1.2 ], [ 132, 186, 0.9 ], [ 178, 160, 1.3 ],
		[ 190, 116, 0.8 ], [ 160, 100, 1 ], [ 58, 108, 0.7 ], [ 98, 60, 0.8 ]
	];
	const rendusEtoiles = etoiles
		.map( ( [ x, y, rayon ], index ) => `<circle class='etoile' cx='${ x }' cy='${ y }' r='${ rayon }' fill='#FFFFFF'${ Delai( ( index * 0.37 ) % 3 ) }/>` )
		.join( '' );
	return `<defs>
<linearGradient id='msFond' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#070A1C'/><stop offset='1' stop-color='#1A0F45'/></linearGradient>
<radialGradient id='msNebuleuseA' cx='.82' cy='.18' r='.55'><stop offset='0' stop-color='#7C3AED' stop-opacity='.55'/><stop offset='1' stop-color='#7C3AED' stop-opacity='0'/></radialGradient>
<radialGradient id='msNebuleuseB' cx='.12' cy='.88' r='.5'><stop offset='0' stop-color='#06B6D4' stop-opacity='.35'/><stop offset='1' stop-color='#06B6D4' stop-opacity='0'/></radialGradient>
</defs>
<rect x='0' y='-60' width='204' height='324' fill='url(#msFond)'/>
<rect width='204' height='204' fill='url(#msNebuleuseA)'/>
<rect width='204' height='204' fill='url(#msNebuleuseB)'/>
${ rendusEtoiles }
<path class='laser' d='M118 130 L198 16' pathLength='100' fill='none' stroke='#FB923C' stroke-width='2.5' stroke-linecap='round' stroke-dasharray='22 200'/>
<path class='laser' d='M79 103 L159 -11' pathLength='100' fill='none' stroke='#FB923C' stroke-width='2.5' stroke-linecap='round' stroke-dasharray='22 200'${ Delai( 0.55 ) }/>
<g transform='translate(170 34)'><g class='pu'><path d='M0 -14 L4 -4 L14 -4 L6 3 L9 13 L0 7 L-9 13 L-6 3 L-14 -4 L-4 -4 Z' fill='#FDE047'/></g><path d='M0 9 L11 -7 L0 -3 L-11 -7 Z' fill='#EF4444'/></g>
<g transform='translate(98 120) rotate(35)'>
<path class='flamme' d='M-9 28 L0 56 L9 28 Z' fill='#60A5FA'/>
<path class='flamme' d='M-4 28 L0 44 L4 28 Z' fill='#E0F2FE'/>
<path d='M-12 2 L-40 30 L-38 38 L-12 24 Z' fill='#2563EB'/>
<path d='M12 2 L40 30 L38 38 L12 24 Z' fill='#1D4ED8'/>
<rect x='-26' y='-6' width='4' height='18' rx='2' fill='#94A3B8'/>
<rect x='22' y='-6' width='4' height='18' rx='2' fill='#94A3B8'/>
<path d='M0 -46 L13 -12 L13 22 L0 30 L-13 22 L-13 -12 Z' fill='#F59E0B'/>
<path d='M0 -46 L13 -12 L13 22 L0 30 Z' fill='#D97706'/>
<ellipse cx='0' cy='-10' rx='5' ry='10' fill='#38BDF8'/>
</g>`;
}

function IllustrationParcoursup()
{
	let filtres = '';
	for ( let index = 0; index < 7; index++ )
	{
		filtres += `<rect x='16' y='${ 44 + index * 18 }' width='16' height='2.5' rx='1' fill='#3B82F6'/><rect x='16' y='${ 49 + index * 18 }' width='34' height='7' rx='2' fill='#2A2D35'/>`;
	}
	let lignes = '';
	for ( let index = 0; index < 8; index++ )
	{
		const y = 56 + index * 15;
		lignes += `<g class='ap'${ Delai( 0.4 + index * 0.08 ) }><rect x='66' y='${ y }' width='68' height='11' rx='2' fill='#E5E7EB'/><rect x='69' y='${ y + 4 }' width='9' height='3' rx='1' fill='#6B7280'/><rect x='83' y='${ y + 4 }' width='24' height='3' rx='1' fill='#9CA3AF'/><rect x='112' y='${ y + 4 }' width='16' height='3' rx='1' fill='#9CA3AF'/></g>`;
	}
	const marqueurs =
	[
		[ 160, 70, '#F59E0B', 5 ], [ 177, 94, '#EAB308', 4 ], [ 157, 118, '#84CC16', 4.5 ], [ 178, 140, '#F97316', 5.5 ], [ 164, 158, '#84CC16', 3.5 ]
	];
	const rendusMarqueurs = marqueurs
		.map( ( [ x, y, couleur, rayon ], index ) => `<circle class='onde' cx='${ x }' cy='${ y }' r='${ rayon }' fill='${ couleur }'${ Delai( index * 0.45 ) }/><circle cx='${ x }' cy='${ y }' r='${ rayon }' fill='${ couleur }' stroke='#17191E' stroke-width='1'/>` )
		.join( '' );
	return `<defs>
<linearGradient id='psFond' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#1E3A8A'/><stop offset='1' stop-color='#2563EB'/></linearGradient>
<linearGradient id='psCarte' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#1F4D3A'/><stop offset='1' stop-color='#3F5A2E'/></linearGradient>
</defs>
<rect x='0' y='-60' width='204' height='324' fill='url(#psFond)'/>
<rect x='10' y='10' width='184' height='20' rx='6' fill='#17191E'/>
<text class='mono' x='18' y='23.5' font-size='7.5' fill='#E5E7EB'>Profilage Parcoursup</text>
<rect x='148' y='14' width='19' height='12' rx='6' fill='#E5E7EB'/>
<rect x='170' y='14' width='19' height='12' rx='6' fill='#2A2D35'/>
<rect x='10' y='36' width='46' height='158' rx='6' fill='#17191E'/>
${ filtres }
<rect x='16' y='176' width='34' height='10' rx='3' fill='#2563EB'/>
<rect x='62' y='36' width='76' height='158' rx='6' fill='#17191E'/>
<rect x='66' y='41' width='68' height='10' rx='2' fill='#2A2D35'/>
${ lignes }
<rect x='144' y='36' width='50' height='158' rx='6' fill='#17191E'/>
<rect x='148' y='41' width='42' height='130' rx='3' fill='url(#psCarte)'/>
${ rendusMarqueurs }
<rect x='148' y='177' width='42' height='10' rx='3' fill='#2563EB'/>`;
}

function DessinerStatut( theme, statut )
{
	const couleur = CouleurTheme( theme, statut.Couleur );
	const largeurTexte = Arrondir( LargeurMono( statut.Texte, 12 ) );
	const largeurStatut = Arrondir( 42 + largeurTexte );
	const x = Arrondir( 976 - largeurStatut );
	return `<rect x='${ x }' y='38' width='${ largeurStatut }' height='28' rx='14' fill='${ couleur }' fill-opacity='.12' stroke='${ couleur }' stroke-opacity='.4'/>
<circle class='pu' cx='${ Arrondir( x + 16 ) }' cy='52' r='4' fill='${ couleur }'/>
<text class='mono' x='${ Arrondir( x + 28 ) }' y='56' font-size='12' font-weight='600' fill='${ couleur }' textLength='${ largeurTexte }' lengthAdjust='spacing'>${ Echapper( statut.Texte ) }</text>`;
}

function DessinerPuces( theme, technos, x, y )
{
	let rendu = '';
	let curseur = x;
	technos.forEach( ( [ nom, couleur ], rang ) =>
	{
		rendu += `<g class='ap'${ Delai( 0.35 + rang * 0.06 ) }>${ DessinerPuce( theme, curseur, y, nom, couleur, 13, 30 ) }</g>\n`;
		curseur += MesurerPuce( nom, 13, 30 ) + 10;
	} );
	return rendu;
}

function HauteurProjet( projet )
{
	const nombreLignes = DecouperLignes( projet.Description, 16, 700 ).length;
	return Math.max( 252, 146 + ( nombreLignes - 1 ) * 24 + 24 + 30 + 26 );
}

function GenererProjet( theme, projet, index, hauteur )
{
	const lignesDescription = DecouperLignes( projet.Description, 16, 700 );
	const yPuces = 146 + ( lignesDescription.length - 1 ) * 24 + 24;
	const hauteurIllustration = hauteur - 48;
	const numero = String( index + 1 ).padStart( 2, '0' );
	const description = lignesDescription
		.map( ( ligne, rang ) => `<text class='sans' x='256' y='${ 146 + rang * 24 }' font-size='16' fill='${ theme.TexteDoux }'>${ Echapper( ligne ) }</text>` )
		.join( '' );
	const contenu = `<defs><clipPath id='cadre'><rect x='24' y='24' width='204' height='${ hauteurIllustration }' rx='14'/></clipPath></defs>
${ Carte( theme, hauteur ) }
<text class='sans' x='976' y='${ hauteur - 18 }' font-size='150' font-weight='800' fill='${ theme.Texte }' fill-opacity='.035' text-anchor='end'>${ numero }</text>
<g clip-path='url(#cadre)'><g transform='translate(24 ${ Arrondir( 24 + ( hauteurIllustration - 204 ) / 2 ) })'>${ projet.Illustration() }</g></g>
<rect x='24' y='24' width='204' height='${ hauteurIllustration }' rx='14' fill='none' stroke='${ theme.Bordure }'/>
<g class='ap'${ Delai( 0.1 ) }>
<text class='mono' x='256' y='60' font-size='12.5' font-weight='700' fill='${ theme.Accent }' letter-spacing='1.4'>${ Echapper( projet.Surtitre ) }</text>
${ DessinerStatut( theme, projet.Statut ) }
<text class='sans' x='254' y='108' font-size='36' font-weight='700' fill='${ theme.Texte }'>${ Echapper( projet.Titre ) }</text>
</g>
<g class='ap'${ Delai( 0.25 ) }>${ description }</g>
${ DessinerPuces( theme, projet.Technos, 256, yPuces ) }`;
	return Svg( hauteur, `${ projet.Titre } — ${ projet.Description }`, StylesIllustrations, contenu );
}

function GenererStack( theme )
{
	const xPuces = 220;
	const xMax = 968;
	const hauteurPuce = 34;
	const taille = 14;
	let y = 22;
	let rendu = '';
	Stack.forEach( ( categorie, rangCategorie ) =>
	{
		const placements = [];
		let x = xPuces;
		let ligne = 0;
		for ( const [ nom, couleur ] of categorie.Technos )
		{
			const largeurPuce = MesurerPuce( nom, taille, hauteurPuce );
			if ( x > xPuces && x + largeurPuce > xMax )
			{
				x = xPuces;
				ligne++;
			}
			placements.push( { Nom: nom, Couleur: couleur, X: x, Ligne: ligne } );
			x += largeurPuce + 10;
		}
		const hauteurCategorie = ( ligne + 1 ) * hauteurPuce + ligne * 10 + 28;
		if ( rangCategorie > 0 )
		{
			rendu += `<path d='M32 ${ y } H968' stroke='${ theme.Bordure }' stroke-opacity='.7'/>\n`;
		}
		rendu += `<text class='mono' x='32' y='${ Arrondir( y + hauteurCategorie / 2 + 4.5 ) }' font-size='12' font-weight='700' fill='${ theme.TexteFaible }' letter-spacing='1.2'>${ Echapper( categorie.Libelle ) }</text>\n`;
		placements.forEach( ( placement, rang ) =>
		{
			const yPuce = y + 14 + placement.Ligne * ( hauteurPuce + 10 );
			rendu += `<g class='ap'${ Delai( 0.1 + rangCategorie * 0.12 + rang * 0.04 ) }>${ DessinerPuce( theme, placement.X, yPuce, placement.Nom, placement.Couleur, taille, hauteurPuce ) }</g>\n`;
		} );
		y += hauteurCategorie;
	} );
	const hauteur = y + 22;
	const resume = Stack.map( ( categorie ) => `${ categorie.Libelle } : ${ categorie.Technos.map( ( techno ) => techno[ 0 ] ).join( ', ' ) }` ).join( '. ' );
	return Svg( hauteur, resume, '', `${ Carte( theme, hauteur ) }\n${ rendu }` );
}

export function Arrondir4( nombre )
{
	return Math.round( nombre * 10000 ) / 10000;
}

function PointBezier( segment, position )
{
	const [ x0, y0, x1, y1, x2, y2, x3, y3 ] = segment;
	const reste = 1 - position;
	const poids = [ reste ** 3, 3 * reste ** 2 * position, 3 * reste * position ** 2, position ** 3 ];
	return [
		poids[ 0 ] * x0 + poids[ 1 ] * x1 + poids[ 2 ] * x2 + poids[ 3 ] * x3,
		poids[ 0 ] * y0 + poids[ 1 ] * y1 + poids[ 2 ] * y2 + poids[ 3 ] * y3
	];
}

function LongueurSegment( segment )
{
	const nombrePas = 120;
	let longueur = 0;
	let precedent = PointBezier( segment, 0 );
	for ( let pas = 1; pas <= nombrePas; pas++ )
	{
		const courant = PointBezier( segment, pas / nombrePas );
		longueur += Math.hypot( courant[ 0 ] - precedent[ 0 ], courant[ 1 ] - precedent[ 1 ] );
		precedent = courant;
	}
	return longueur;
}

function CheminRoute()
{
	const [ xDepart, yDepart ] = RouteParcours[ 0 ];
	const courbes = RouteParcours.map( ( segment ) => `C${ segment.slice( 2 ).join( ' ' ) }` );
	return `M${ xDepart } ${ yDepart } ${ courbes.join( ' ' ) }`;
}

function CalculerChronologie()
{
	const longueurs = RouteParcours.map( LongueurSegment );
	const total = longueurs.reduce( ( somme, longueur ) => somme + longueur, 0 );
	let temps = AttenteDepartParcours;
	let distance = 0;
	let tempsDepartFin = 0;
	const points = [ { Fraction: 0, Temps: 0 }, { Fraction: 0, Temps: temps } ];
	const arrivees = [];
	RouteParcours.forEach( ( segment, index ) =>
	{
		distance += longueurs[ index ];
		temps += longueurs[ index ] / VitesseParcours;
		points.push( { Fraction: distance / total, Temps: temps } );
		if ( index < EtapesParcours.length )
		{
			arrivees.push( temps );
			temps += PausesParcours[ index ];
			points.push( { Fraction: distance / total, Temps: temps } );
			tempsDepartFin = temps;
		}
	} );
	temps += AttenteFinParcours;
	points.push( { Fraction: 1, Temps: temps } );
	return { Points: points, Arrivees: arrivees, Duree: temps, TempsDepartFin: tempsDepartFin };
}

function AnimerBascule( attribut, avant, apres, arrivee, duree )
{
	return `<animate attributeName='${ attribut }' values='${ avant };${ apres }' keyTimes='0;${ Arrondir4( arrivee / duree ) }' calcMode='discrete' dur='${ Arrondir( duree ) }s' repeatCount='indefinite'/>`;
}

function DessinerVoiture( theme )
{
	const metal = '#0C0F13';
	return `<g transform='scale(1.15)'>
<rect x='-21' y='-8.5' width='4.5' height='17' rx='1' fill='${ metal }' stroke='${ theme.TexteFaible }' stroke-width='.6'/>
<rect x='15' y='-8' width='4' height='16' rx='1' fill='${ metal }' stroke='${ theme.TexteFaible }' stroke-width='.6'/>
<rect x='-14' y='-11.5' width='10' height='5.5' rx='1.6' fill='${ metal }' stroke='${ theme.TexteFaible }' stroke-width='.6'/>
<rect x='-14' y='6' width='10' height='5.5' rx='1.6' fill='${ metal }' stroke='${ theme.TexteFaible }' stroke-width='.6'/>
<rect x='6' y='-10.5' width='7.5' height='4.5' rx='1.4' fill='${ metal }' stroke='${ theme.TexteFaible }' stroke-width='.6'/>
<rect x='6' y='6' width='7.5' height='4.5' rx='1.4' fill='${ metal }' stroke='${ theme.TexteFaible }' stroke-width='.6'/>
<path d='M-18 -4.5 L-3 -5.5 L7 -2.4 L19 -1.2 L19 1.2 L7 2.4 L-3 5.5 L-18 4.5 Z' fill='${ theme.Accent }'/>
<path d='M-18 -.9 H19 V.9 H-18 Z' fill='#FFFFFF' fill-opacity='.85'/>
<ellipse cx='1' cy='0' rx='4.2' ry='2.6' fill='${ metal }'/>
<circle cx='1.6' cy='0' r='1.7' fill='#FFD23F'/>
</g>`;
}

function DessinerSoleil( theme, x, y, rang )
{
	const texte = "JOB D'ÉTÉ";
	const largeurTexte = Arrondir( LargeurMono( texte, 11 ) );
	const largeurPastille = Arrondir( 38 + largeurTexte );
	const gauche = Arrondir( x - largeurPastille / 2 );
	let rayons = '';
	for ( let rayon = 0; rayon < 8; rayon++ )
	{
		const angle = rayon * Math.PI / 4;
		rayons += `<line x1='${ Arrondir( Math.cos( angle ) * 7.5 ) }' y1='${ Arrondir( Math.sin( angle ) * 7.5 ) }' x2='${ Arrondir( Math.cos( angle ) * 10 ) }' y2='${ Arrondir( Math.sin( angle ) * 10 ) }'/>`;
	}
	return `<g class='ap'${ Delai( 0.6 + rang * 0.2 ) }>
<rect x='${ gauche }' y='${ Arrondir( y - 15 ) }' width='${ largeurPastille }' height='30' rx='15' fill='${ theme.Surface }' stroke='${ theme.Attention }' stroke-opacity='.6' stroke-width='1.5'/>
<g transform='translate(${ Arrondir( gauche + 19 ) } ${ y })'><circle r='4.6' fill='#F5A623'/><g stroke='#F5A623' stroke-width='1.6' stroke-linecap='round'>${ rayons }</g></g>
<text class='mono' x='${ Arrondir( gauche + 34 ) }' y='${ Arrondir( y + 4 ) }' font-size='11' font-weight='700' fill='${ theme.TexteDoux }' textLength='${ largeurTexte }' lengthAdjust='spacing'>${ Echapper( texte ) }</text>
</g>`;
}

function DessinerEtape( theme, etape, index, chronologie )
{
	const [ x, y ] = RouteParcours[ index ].slice( 6 );
	const dessus = index % 2 === 1;
	const lignes = DecouperLignes( etape.Description, 13.5, 215 );
	const yEtiquette = dessus ? 46 : 340;
	const yConnexion = dessus ? [ 122, y - 19 ] : [ y + 19, 318 ];
	const arrivee = chronologie.Arrivees[ index ];
	const description = lignes
		.map( ( ligne, rang ) => `<text class='sans' x='${ x }' y='${ yEtiquette + 46 + rang * 18 }' font-size='13.5' fill='${ theme.TexteDoux }' text-anchor='middle'>${ Echapper( ligne ) }</text>` )
		.join( '' );
	return `<g class='ap'${ Delai( 0.3 + index * 0.15 ) }>
<path d='M${ x } ${ yConnexion[ 0 ] } V${ yConnexion[ 1 ] }' stroke='${ theme.Bordure }' stroke-width='1.5' stroke-dasharray='3 4'/>
<text class='mono' x='${ x }' y='${ yEtiquette }' font-size='12' font-weight='700' fill='${ theme.Accent }' letter-spacing='1.4' text-anchor='middle'>${ Echapper( etape.Etiquette ) }</text>
<text class='sans' x='${ x }' y='${ yEtiquette + 24 }' font-size='19' font-weight='700' fill='${ theme.Texte }' text-anchor='middle'>${ Echapper( etape.Titre ) }</text>
${ description }
</g>
<g class='ap'${ Delai( 0.3 + index * 0.15 ) }>
<circle cx='${ x }' cy='${ y }' r='15' fill='${ theme.Surface }' stroke='${ theme.TexteFaible }' stroke-width='2.5'>${ AnimerBascule( 'fill', theme.Surface, theme.Accent, arrivee, chronologie.Duree ) }${ AnimerBascule( 'stroke', theme.TexteFaible, theme.Accent, arrivee, chronologie.Duree ) }</circle>
<text class='mono' x='${ x }' y='${ y + 4.5 }' font-size='13' font-weight='700' fill='${ theme.TexteDoux }' text-anchor='middle'>${ index + 1 }${ AnimerBascule( 'fill', theme.TexteDoux, '#FFFFFF', arrivee, chronologie.Duree ) }</text>
</g>`;
}

function GenererParcours( theme )
{
	const hauteur = 430;
	const chemin = CheminRoute();
	const chronologie = CalculerChronologie();
	const duree = `${ Arrondir( chronologie.Duree ) }s`;
	const instants = chronologie.Points.map( ( point ) => Arrondir4( point.Temps / chronologie.Duree ) ).join( ';' );
	const progression = chronologie.Points.map( ( point ) => Arrondir4( point.Fraction ) ).join( ';' );
	const trace = chronologie.Points.map( ( point ) => Arrondir4( 1 - point.Fraction ) ).join( ';' );
	const apparition = Arrondir4( AttenteDepartParcours * 0.8 / chronologie.Duree );
	const depart = Arrondir4( chronologie.TempsDepartFin / chronologie.Duree );
	const etapes = EtapesParcours.map( ( etape, index ) => DessinerEtape( theme, etape, index, chronologie ) ).join( '\n' );
	const soleils = SoleilsParcours
		.map( ( soleil, rang ) =>
		{
			const [ x, y ] = PointBezier( RouteParcours[ soleil.Segment ], soleil.Position );
			return DessinerSoleil( theme, x, y, rang );
		} )
		.join( '\n' );
	const contenu = `<defs>
${ FormeCarte( 'forme', hauteur ) }
<pattern id='points' width='22' height='22' patternUnits='userSpaceOnUse'><circle cx='2' cy='2' r='1.1' fill='${ theme.Points }' fill-opacity='.09'/></pattern>
<pattern id='damier' width='8' height='8' patternUnits='userSpaceOnUse'><rect width='8' height='8' fill='#0C0F13'/><rect width='4' height='4' fill='#F2F4F7'/><rect x='4' y='4' width='4' height='4' fill='#F2F4F7'/></pattern>
</defs>
${ Carte( theme, hauteur ) }
<rect x='1' y='1' width='${ Largeur - 2 }' height='${ hauteur - 2 }' rx='16' fill='url(#points)'/>
<path d='${ chemin }' fill='none' stroke='${ theme.Bordure }' stroke-width='30' stroke-linecap='round' stroke-linejoin='round'/>
<path d='${ chemin }' fill='none' stroke='${ theme.SurfaceHaute }' stroke-width='26' stroke-linecap='round' stroke-linejoin='round'/>
<path d='${ chemin }' fill='none' stroke='${ theme.TexteFaible }' stroke-opacity='.55' stroke-width='1.5' stroke-dasharray='7 9'/>
<path d='${ chemin }' pathLength='1' fill='none' stroke='${ theme.Accent }' stroke-width='3.5' stroke-linecap='round' stroke-dasharray='1' stroke-dashoffset='1'><animate attributeName='stroke-dashoffset' values='${ trace }' keyTimes='${ instants }' calcMode='linear' dur='${ duree }' repeatCount='indefinite'/></path>
<path d='M64 237 V263' stroke='${ theme.TexteDoux }' stroke-width='3'/>
<text class='mono' x='40' y='288' font-size='11' font-weight='700' fill='${ theme.TexteFaible }' letter-spacing='1'>DÉPART</text>
<rect x='936' y='237' width='8' height='26' fill='url(#damier)' stroke='${ theme.Bordure }'/>
<text class='mono' x='940' y='288' font-size='11' font-weight='700' fill='${ theme.TexteFaible }' letter-spacing='1' text-anchor='middle'>ARRIVÉE</text>
${ soleils }
${ etapes }
<g opacity='0'>
<animateMotion path='${ chemin }' rotate='auto' calcMode='linear' keyPoints='${ progression }' keyTimes='${ instants }' dur='${ duree }' repeatCount='indefinite'/>
<animate attributeName='opacity' values='0;1;1;0' keyTimes='0;${ apparition };${ depart };1' calcMode='linear' dur='${ duree }' repeatCount='indefinite'/>
${ DessinerVoiture( theme ) }
</g>`;
	const resume = EtapesParcours.map( ( etape ) => `${ etape.Etiquette } : ${ etape.Titre }` ).join( ', ' );
	return Svg( hauteur, `Parcours : ${ resume }, avec des jobs d'été`, '', contenu );
}

function GenererDefilement( theme )
{
	const hauteurPuce = 34;
	const taille = 14;
	const ecart = 12;
	const vitesse = 45;
	const hauteur = 40 + RangsDefilement.length * hauteurPuce + ( RangsDefilement.length - 1 ) * 12;
	let styles = '';
	let rangs = '';
	RangsDefilement.forEach( ( rang, index ) =>
	{
		const technos = Stack
			.filter( ( categorie ) => rang.Categories.includes( categorie.Libelle ) )
			.flatMap( ( categorie ) => categorie.Technos );
		const largeurSerie = technos.reduce( ( total, [ nom ] ) => total + MesurerPuce( nom, taille, hauteurPuce ) + ecart, 0 );
		const repetitions = Math.ceil( Largeur / largeurSerie ) + 1;
		const y = 20 + index * ( hauteurPuce + 12 );
		let puces = '';
		let x = 0;
		for ( let repetition = 0; repetition < repetitions; repetition++ )
		{
			for ( const [ nom, couleur ] of technos )
			{
				puces += DessinerPuce( theme, x, y, nom, couleur, taille, hauteurPuce );
				x += MesurerPuce( nom, taille, hauteurPuce ) + ecart;
			}
		}
		const depart = rang.Sens > 0 ? 0 : -largeurSerie;
		const arrivee = rang.Sens > 0 ? -largeurSerie : 0;
		styles += `@keyframes defile${ index }{from{transform:translateX(${ Arrondir( depart ) }px)}to{transform:translateX(${ Arrondir( arrivee ) }px)}}
.defile${ index }{animation:defile${ index } ${ Arrondir( largeurSerie / vitesse ) }s linear infinite}
`;
		rangs += `<g class='defile${ index }'>${ puces }</g>\n`;
	} );
	const contenu = `<defs>
${ FormeCarte( 'forme', hauteur ) }
<linearGradient id='fondu' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#FFFFFF' stop-opacity='0'/><stop offset='.09' stop-color='#FFFFFF'/><stop offset='.91' stop-color='#FFFFFF'/><stop offset='1' stop-color='#FFFFFF' stop-opacity='0'/></linearGradient>
<mask id='masque'><rect width='${ Largeur }' height='${ hauteur }' fill='url(#fondu)'/></mask>
</defs>
${ Carte( theme, hauteur ) }
<g clip-path='url(#forme)'><g mask='url(#masque)'>
${ rangs }</g></g>`;
	const resume = Stack.flatMap( ( categorie ) => categorie.Technos.map( ( techno ) => techno[ 0 ] ) ).join( ', ' );
	return Svg( hauteur, `Stack : ${ resume }`, styles, contenu );
}

function GenererBouton( theme, bouton )
{
	const hauteur = 44;
	const largeurLibelle = LargeurTexte( bouton.Libelle, 15, true );
	const largeur = Math.ceil( 46 + largeurLibelle + 20 );
	const principal = bouton.Principal === true;
	const contenu = `<rect x='1' y='1' width='${ largeur - 2 }' height='${ hauteur - 2 }' rx='11' fill='${ principal ? theme.Accent : theme.Surface }' stroke='${ principal ? theme.Accent : theme.Bordure }' stroke-width='1.5'/>
<g transform='translate(18 12)' fill='none' stroke='${ principal ? '#FFFFFF' : theme.Accent }' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'>${ Icones[ bouton.Icone ] }</g>
<text class='sans' x='${ Arrondir( 46 + ( largeur - 66 ) / 2 ) }' y='27.5' font-size='15' font-weight='600' fill='${ principal ? '#FFFFFF' : theme.Texte }' text-anchor='middle'>${ Echapper( bouton.Libelle ) }</text>`;
	return Svg( hauteur, bouton.Libelle, '', contenu, largeur );
}

function GenererPied( theme )
{
	const hauteur = 150;
	const contenu = `<path class='tr' pathLength='1' d='M484 34 H140' fill='none' stroke='${ theme.Bordure }' stroke-width='1.5'/>
<path class='tr' pathLength='1' d='M516 34 H860' fill='none' stroke='${ theme.Bordure }' stroke-width='1.5'/>
<g class='ap'><rect x='494' y='28' width='12' height='12' rx='2' fill='${ theme.Accent }' transform='rotate(45 500 34)'/></g>
<g class='ap'${ Delai( 0.3 ) }><text class='sans' x='500' y='90' font-size='28' font-weight='700' fill='${ theme.Texte }' text-anchor='middle'>Merci de votre visite</text></g>
<g class='ap'${ Delai( 0.5 ) }><text class='mono' x='500' y='122' font-size='13' fill='${ theme.TexteDoux }' text-anchor='middle'>Joshua Hermilly <tspan fill='${ theme.Accent }'>${ Echapper( '·' ) }</tspan> Le Havre <tspan fill='${ theme.Accent }'>${ Echapper( '·' ) }</tspan> ${ Echapper( 'À bientôt' ) }</text></g>`;
	return Svg( hauteur, 'Merci de votre visite — Joshua Hermilly, Le Havre', '', contenu );
}

export function Ecrire( nomTheme, nom, contenu )
{
	const dossier = join( DossierAssets, nomTheme );
	mkdirSync( dossier, { recursive: true } );
	writeFileSync( join( dossier, `${ nom }.svg` ), contenu, 'utf8' );
}

const HauteurProjets = Math.max( ...Projets.map( HauteurProjet ) );
const EstPrincipal = process.argv[ 1 ] === fileURLToPath( import.meta.url );

if ( EstPrincipal )
{
	let nombreFichiers = 0;

	for ( const [ nomTheme, theme ] of Object.entries( Themes ) )
	{
		const fichiers =
		[
			[ 'entete', GenererEntete( theme ) ],
			[ 'presentation', GenererPresentation( theme ) ],
			[ 'fiche', GenererFiche( theme ) ],
			[ 'parcours', GenererParcours( theme ) ],
			[ 'stack', GenererStack( theme ) ],
			[ 'defilement', GenererDefilement( theme ) ],
			[ 'pied', GenererPied( theme ) ],
			...Titres.map( ( titre ) => [ `titre-${ titre.Numero }`, GenererTitre( theme, titre.Numero, titre.Texte ) ] ),
			...Projets.map( ( projet, index ) => [ projet.Fichier, GenererProjet( theme, projet, index, HauteurProjets ) ] ),
			...Boutons.map( ( bouton ) => [ bouton.Fichier, GenererBouton( theme, bouton ) ] )
		];
		for ( const [ nom, contenu ] of fichiers )
		{
			Ecrire( nomTheme, nom, contenu );
			nombreFichiers++;
		}
	}

	console.log( `${ nombreFichiers } SVG générés dans ${ DossierAssets }` );
}

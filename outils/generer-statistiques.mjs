import { Themes, Largeur, Svg, Carte, FormeCarte, Feux, Echapper, Arrondir, Delai, LargeurTexte, Ecrire } from './generer-assets.mjs';

const Utilisateur = 'Joshua-Hermilly';
const Mois = [ 'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.' ];

const CouleursLangages =
{
	TypeScript: '#3178C6',
	JavaScript: '#F1E05A',
	Java: '#B07219',
	'C#': '#178600',
	PHP: '#4F5D95',
	HTML: '#E34C26',
	CSS: '#8957E5',
	SCSS: '#C6538C',
	Python: '#3572A5',
	Shell: '#89E051',
	Batchfile: '#C1F12E',
	Twig: '#C1D026',
	Dockerfile: '#384D54',
	'C++': '#F34B7D',
	C: '#6E7681',
	Autres: '#8B949E'
};

const PalettesTuiles =
{
	sombre: [ '#FF3B30', '#3FB950', '#58A6FF', '#D29922', '#A371F7', '#F0883E' ],
	clair: [ '#D7261C', '#1A7F37', '#0969DA', '#9A6700', '#8250DF', '#BC4C00' ]
};

const StylesStatistiques = `
@keyframes revele{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.revele{transform-origin:28px 0;animation:revele 1.3s cubic-bezier(.2,.8,.2,1) .5s both}
`;

const EnTetesApi =
{
	'User-Agent': 'generer-statistiques',
	Accept: 'application/vnd.github+json',
	...( process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${ process.env.GITHUB_TOKEN }` } : {} )
};

async function Demander( url, enTetes )
{
	const tentativesMax = 3;
	for ( let tentative = 1; ; tentative++ )
	{
		const reponse = await fetch( url, { headers: enTetes } );
		if ( reponse.ok )
		{
			return reponse;
		}
		const corps = await reponse.text();
		if ( tentative === tentativesMax || ![ 403, 429, 502, 503 ].includes( reponse.status ) )
		{
			throw new Error( `${ url } : ${ reponse.status } ${ corps.slice( 0, 200 ) }` );
		}
		await new Promise( ( resolve ) => setTimeout( resolve, 3000 * tentative ) );
	}
}

async function LireJson( url )
{
	const reponse = await Demander( url, EnTetesApi );
	return reponse.json();
}

async function LireCalendrier()
{
	const reponse = await Demander( `https://github.com/users/${ Utilisateur }/contributions`, { 'User-Agent': 'generer-statistiques' } );
	const html = await reponse.text();
	const cellules = [ ...html.matchAll( /data-date="([\d-]+)"\s+id="contribution-day-component-(\d+)-(\d+)"/g ) ];
	const nombres = new Map( [ ...html.matchAll( /for="(contribution-day-component-\d+-\d+)"[^>]*>(?:No|(\d+)) contributions? on/g ) ]
		.map( ( correspondance ) => [ correspondance[ 1 ], Number( correspondance[ 2 ] ?? 0 ) ] ) );
	const aujourdhui = new Date().toISOString().slice( 0, 10 );
	const jours = cellules
		.map( ( cellule ) => ( { Date: cellule[ 1 ], Semaine: Number( cellule[ 3 ] ), Nombre: nombres.get( `contribution-day-component-${ cellule[ 2 ] }-${ cellule[ 3 ] }` ) ?? 0 } ) )
		.filter( ( jour ) => jour.Date <= aujourdhui )
		.sort( ( premier, second ) => premier.Date.localeCompare( second.Date ) );
	if ( jours.length === 0 )
	{
		throw new Error( 'Calendrier de contributions introuvable' );
	}
	return jours;
}

function CalculerSeries( jours )
{
	let enCours = 0;
	let record = 0;
	for ( const jour of jours )
	{
		enCours = jour.Nombre > 0 ? enCours + 1 : 0;
		record = Math.max( record, enCours );
	}
	const precedents = [ ...jours ];
	if ( precedents.at( -1 ).Nombre === 0 )
	{
		precedents.pop();
	}
	let courante = 0;
	for ( let index = precedents.length - 1; index >= 0 && precedents[ index ].Nombre > 0; index-- )
	{
		courante++;
	}
	return { Courante: courante, Record: record };
}

function CalculerSemaines( jours )
{
	const semaines = new Map();
	for ( const jour of jours )
	{
		const semaine = semaines.get( jour.Semaine ) ?? { Debut: jour.Date, Total: 0 };
		semaine.Total += jour.Nombre;
		semaines.set( jour.Semaine, semaine );
	}
	return [ ...semaines.entries() ].sort( ( premiere, seconde ) => premiere[ 0 ] - seconde[ 0 ] ).map( ( entree ) => entree[ 1 ] );
}

async function LireLangages( depots )
{
	const totaux = new Map();
	for ( const depot of depots )
	{
		const langages = await LireJson( depot.languages_url );
		for ( const [ nom, octets ] of Object.entries( langages ) )
		{
			totaux.set( nom, ( totaux.get( nom ) ?? 0 ) + octets );
		}
	}
	const somme = [ ...totaux.values() ].reduce( ( total, octets ) => total + octets, 0 );
	const tries = [ ...totaux.entries() ]
		.sort( ( premier, second ) => second[ 1 ] - premier[ 1 ] )
		.map( ( [ nom, octets ] ) => ( { Nom: nom, Part: octets / somme * 100 } ) );
	const principaux = tries.filter( ( langage ) => langage.Part >= 1 ).slice( 0, 7 );
	const autres = 100 - principaux.reduce( ( total, langage ) => total + langage.Part, 0 );
	if ( autres > 0.05 )
	{
		principaux.push( { Nom: 'Autres', Part: autres } );
	}
	return principaux;
}

async function LirePullRequests( debut )
{
	const reponse = await LireJson( `https://api.github.com/search/issues?q=author:${ Utilisateur }+type:pr+created:%3E=${ debut }&per_page=1` );
	return reponse.total_count;
}

async function RecupererDonnees()
{
	const jours = await LireCalendrier();
	const debut = jours[ 0 ].Date;
	const profil = await LireJson( `https://api.github.com/users/${ Utilisateur }` );
	const depots = await LireJson( `https://api.github.com/users/${ Utilisateur }/repos?per_page=100` );
	const originaux = depots.filter( ( depot ) => !depot.fork );
	return {
		Contributions: jours.reduce( ( total, jour ) => total + jour.Nombre, 0 ),
		JoursActifs: jours.filter( ( jour ) => jour.Nombre > 0 ).length,
		PullRequests: await LirePullRequests( debut ),
		Series: CalculerSeries( jours ),
		Semaines: CalculerSemaines( jours ),
		DepotsPublics: profil.public_repos,
		Etoiles: originaux.reduce( ( total, depot ) => total + depot.stargazers_count, 0 ),
		Langages: await LireLangages( originaux ),
		MiseAJour: new Date().toLocaleDateString( 'fr-FR', { day: 'numeric', month: 'short', year: 'numeric' } )
	};
}

function DessinerTuile( theme, couleur, tuile, index )
{
	const largeur = 147.33;
	const x = Arrondir( 28 + index * ( largeur + 12 ) );
	const y = 90;
	const hauteur = 100;
	const milieu = Arrondir( x + largeur / 2 );
	return `<g class='ap'${ Delai( 0.15 + index * 0.08 ) }>
<rect x='${ x }' y='${ y }' width='${ largeur }' height='${ hauteur }' rx='12' fill='${ theme.SurfaceHaute }' stroke='${ theme.Bordure }' stroke-width='1.5'/>
<path d='M${ Arrondir( x + 14 ) } ${ y + 1.5 } H${ Arrondir( x + largeur - 14 ) }' stroke='${ couleur }' stroke-width='3' stroke-linecap='round'/>
<text class='mono' x='${ milieu }' y='${ y + 28 }' font-size='10.5' font-weight='700' fill='${ couleur }' letter-spacing='1.1' text-anchor='middle'>${ Echapper( tuile.Libelle ) }</text>
<text class='sans' x='${ milieu }' y='${ y + 65 }' font-size='36' font-weight='800' fill='${ theme.Texte }' text-anchor='middle'>${ Echapper( tuile.Valeur ) }</text>
<text class='mono' x='${ milieu }' y='${ y + 86 }' font-size='10.5' fill='${ theme.TexteFaible }' text-anchor='middle'>${ Echapper( tuile.Detail ) }</text>
</g>`;
}

function DessinerGraphique( theme, semaines )
{
	const gauche = 62;
	const droite = 972;
	const haut = 246;
	const bas = 356;
	const maximum = Math.max( 1, ...semaines.map( ( semaine ) => semaine.Total ) );
	const pas = ( droite - gauche ) / Math.max( 1, semaines.length - 1 );
	const points = semaines.map( ( semaine, index ) => [ Arrondir( gauche + index * pas ), Arrondir( bas - semaine.Total / maximum * ( bas - haut ) ) ] );
	const ligne = `M${ points.map( ( point ) => point.join( ' ' ) ).join( ' L' ) }`;
	const aire = `${ ligne } L${ droite } ${ bas } L${ gauche } ${ bas } Z`;
	const indexPic = semaines.findIndex( ( semaine ) => semaine.Total === maximum );
	const pic = points[ indexPic ];
	const ancrage = pic[ 0 ] > 520 ? 'end' : 'start';
	const decalage = pic[ 0 ] > 520 ? -14 : 14;
	let reperes = '';
	let dernierX = -100;
	semaines.forEach( ( semaine, index ) =>
	{
		const mois = Number( semaine.Debut.slice( 5, 7 ) ) - 1;
		const precedent = index > 0 ? Number( semaines[ index - 1 ].Debut.slice( 5, 7 ) ) - 1 : -1;
		const x = points[ index ][ 0 ];
		if ( mois !== precedent && x - dernierX >= 40 )
		{
			reperes += `<text class='mono' x='${ x }' y='${ bas + 22 }' font-size='10.5' fill='${ theme.TexteFaible }'>${ Echapper( Mois[ mois ] ) }</text>`;
			dernierX = x;
		}
	} );
	const marqueurPic = maximum > 1
		? `<g class='ap'${ Delai( 1.4 ) }><circle cx='${ pic[ 0 ] }' cy='${ pic[ 1 ] }' r='5.5' fill='${ theme.Surface }' stroke='${ theme.Accent }' stroke-width='2.5'/><text class='mono' x='${ Arrondir( pic[ 0 ] + decalage ) }' y='${ Arrondir( pic[ 1 ] + 4 ) }' font-size='11' font-weight='700' fill='${ theme.Texte }' text-anchor='${ ancrage }'>${ Echapper( `pic : ${ maximum } contributions` ) }</text></g>`
		: '';
	return `<defs><linearGradient id='aire' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${ theme.Accent }' stop-opacity='.32'/><stop offset='1' stop-color='${ theme.Accent }' stop-opacity='0'/></linearGradient></defs>
<g stroke='${ theme.Bordure }' stroke-width='1.2' stroke-dasharray='3 5'><path d='M${ gauche } ${ haut } H${ droite }'/><path d='M${ gauche } ${ Arrondir( ( haut + bas ) / 2 ) } H${ droite }'/></g>
<path d='M${ gauche } ${ bas } H${ droite }' stroke='${ theme.Bordure }' stroke-width='1.5'/>
<text class='mono' x='${ gauche - 10 }' y='${ haut + 4 }' font-size='10.5' fill='${ theme.TexteFaible }' text-anchor='end'>${ maximum }</text>
<text class='mono' x='${ gauche - 10 }' y='${ bas + 4 }' font-size='10.5' fill='${ theme.TexteFaible }' text-anchor='end'>0</text>
<path class='ap'${ Delai( 0.6 ) } d='${ aire }' fill='url(#aire)'/>
<path class='tr' pathLength='1' d='${ ligne }' fill='none' stroke='${ theme.Accent }' stroke-width='2.4' stroke-linejoin='round' stroke-linecap='round'${ Delai( 0.3 ) }/>
${ reperes }
${ marqueurPic }`;
}

function DessinerLangages( theme, langages )
{
	const gauche = 28;
	const largeurTotale = Largeur - 56;
	const yBarre = 434;
	const ecart = 3;
	let x = gauche;
	let segments = '';
	langages.forEach( ( langage ) =>
	{
		const largeur = Math.max( 4, langage.Part / 100 * largeurTotale - ecart );
		segments += `<rect x='${ Arrondir( x ) }' y='${ yBarre }' width='${ Arrondir( largeur ) }' height='20' fill='${ CouleursLangages[ langage.Nom ] ?? '#8B949E' }'/>`;
		x += largeur + ecart;
	} );
	const legende = langages
		.map( ( langage, index ) =>
		{
			const colonne = index % 4;
			const rang = Math.floor( index / 4 );
			const xLegende = gauche + colonne * 236;
			const yLegende = 488 + rang * 26;
			return `<g class='ap'${ Delai( 0.9 + index * 0.06 ) }><circle cx='${ xLegende + 6 }' cy='${ yLegende - 4 }' r='5.5' fill='${ CouleursLangages[ langage.Nom ] ?? '#8B949E' }'/><text class='sans' x='${ xLegende + 20 }' y='${ yLegende }' font-size='13.5' font-weight='600' fill='${ theme.Texte }'>${ Echapper( langage.Nom ) }</text><text class='mono' x='${ Arrondir( xLegende + 20 + 10 + LargeurTexte( langage.Nom, 13.5, true ) ) }' y='${ yLegende }' font-size='12' fill='${ theme.TexteDoux }'>${ Echapper( `${ langage.Part.toFixed( 1 ).replace( '.', ',' ) } %` ) }</text></g>`;
		} )
		.join( '\n' );
	return `<defs><clipPath id='barre'><rect x='${ gauche }' y='${ yBarre }' width='${ largeurTotale }' height='20' rx='10'/></clipPath></defs>
<rect x='${ gauche }' y='${ yBarre }' width='${ largeurTotale }' height='20' rx='10' fill='${ theme.SurfaceHaute }'/>
<g clip-path='url(#barre)'><g class='revele'>${ segments }</g></g>
${ legende }`;
}

function GenererStatistiques( theme, nomTheme, donnees )
{
	const hauteur = 544;
	const palette = PalettesTuiles[ nomTheme ];
	const tuiles =
	[
		{ Libelle: 'CONTRIBUTIONS', Valeur: String( donnees.Contributions ), Detail: 'sur 12 mois' },
		{ Libelle: 'JOURS ACTIFS', Valeur: String( donnees.JoursActifs ), Detail: 'sur 12 mois' },
		{ Libelle: 'PULL REQUESTS', Valeur: String( donnees.PullRequests ), Detail: 'sur 12 mois' },
		{ Libelle: 'SÉRIE ACTUELLE', Valeur: `${ donnees.Series.Courante } j`, Detail: `record : ${ donnees.Series.Record } j` },
		{ Libelle: 'DÉPÔTS PUBLICS', Valeur: String( donnees.DepotsPublics ), Detail: 'sur GitHub' },
		{ Libelle: 'ÉTOILES', Valeur: String( donnees.Etoiles ), Detail: 'reçues' }
	];
	const contenu = `<defs>${ FormeCarte( 'forme', hauteur ) }</defs>
${ Carte( theme, hauteur ) }
<g clip-path='url(#forme)'>
<rect width='${ Largeur }' height='44' fill='${ theme.SurfaceHaute }'/>
<path d='M0 44 H${ Largeur }' stroke='${ theme.Bordure }' stroke-width='1.5'/>
</g>
${ Feux( 28, 22 ) }
<text class='mono' x='500' y='27' font-size='13' fill='${ theme.TexteDoux }' text-anchor='middle'>${ Echapper( 'joshua-hermilly — statistiques.json' ) }</text>
<text class='mono' x='972' y='27' font-size='12' fill='${ theme.TexteFaible }' text-anchor='end'>${ Echapper( `mis à jour le ${ donnees.MiseAJour }` ) }</text>
<text class='mono' x='28' y='74' font-size='11' font-weight='700' fill='${ theme.Accent }' letter-spacing='1.4'>${ Echapper( 'TABLEAU DE BORD · 12 DERNIERS MOIS' ) }</text>
${ tuiles.map( ( tuile, index ) => DessinerTuile( theme, palette[ index ], tuile, index ) ).join( '\n' ) }
<text class='mono' x='28' y='226' font-size='11' font-weight='700' fill='${ theme.Accent }' letter-spacing='1.4'>${ Echapper( 'ACTIVITÉ · CONTRIBUTIONS PAR SEMAINE' ) }</text>
${ DessinerGraphique( theme, donnees.Semaines ) }
<text class='mono' x='28' y='418' font-size='11' font-weight='700' fill='${ theme.Accent }' letter-spacing='1.4'>${ Echapper( 'RÉPARTITION · LANGAGES DES DÉPÔTS PUBLICS' ) }</text>
${ DessinerLangages( theme, donnees.Langages ) }`;
	const resume = `${ donnees.Contributions } contributions sur 12 mois, ${ donnees.JoursActifs } jours actifs, ${ donnees.PullRequests } pull requests, série actuelle ${ donnees.Series.Courante } jours, ${ donnees.DepotsPublics } dépôts publics, ${ donnees.Etoiles } étoiles. Langages : ${ donnees.Langages.map( ( langage ) => `${ langage.Nom } ${ langage.Part.toFixed( 1 ) } %` ).join( ', ' ) }`;
	return Svg( hauteur, `Statistiques GitHub : ${ resume }`, StylesStatistiques, contenu );
}

const donnees = await RecupererDonnees();

for ( const [ nomTheme, theme ] of Object.entries( Themes ) )
{
	Ecrire( nomTheme, 'statistiques', GenererStatistiques( theme, nomTheme, donnees ) );
}

console.log( `Statistiques générées : ${ donnees.Contributions } contributions, ${ donnees.Langages.length } langages` );

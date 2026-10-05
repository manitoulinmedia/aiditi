(() => {
  const node = '<span class="asterisk node-mark" aria-hidden="true"><canvas class="node-field"></canvas></span>';
  const strings = {
    en: {
      title: 'AiDiTi — Art in other dimensions', description: 'AiDiTi — Angela Di Tomaso. Drawing, moving image, projection mapping and live performance.',
      enter: 'Enter ↗', skipIntro: 'Skip intro', skipWork: 'Skip to artwork', navWork: 'Selected work', navPrints: 'Prints', navArtist: 'The artist', navContact: 'Say hello ↗',
      artistLabel: 'ANGELA DI TOMASO / MULTIMEDIA ARTIST', disciplines: 'DRAWING · DIGITAL · LIVE',
      heroTitle: 'Art in other<br><em>dimensions.</em>' + node, workCount: '↓ SELECTED WORK / 38 PIECES',
      sleepingCaption: 'THE SLEEPING BEAUTY / DRAWING ↗', galaxyCaption: 'GALAXY / LIGHT PAINTING ↗', drawingLight: 'Drawing becomes light.', explore: 'Explore the work <span>↘</span>',
      workLabel: '01 / THE WORK', workHeading: 'Selected <i>work.</i>', workIntro: 'Drawings, moving image<br>and live performance.', all: 'Everything <sup>38</sup>', drawings: 'Drawings', movingImage: 'Moving image', liveLight: 'Live & light', mixedMedia: 'Mixed media', more: 'View more work <span>+</span>',
      artistSection: '02 / THE ARTIST',
      bio1: 'Angela Di Tomaso, known as AiDiTi, is an Italian-born multimedia artist whose practice moves between intricate hand-drawn imagery and digital experimentation.',
      bio2: 'She studied at the Academy of Art in Frosinone and the Brera Academy in Milan before establishing herself in London. Sacred geometry, symbols, nature and human experience run through her drawings, animated narratives, projection mappings and immersive installations.',
      bio3: 'Her work has appeared at LPM, Kernel, FILE, BYOB and Signal, with installations and exhibitions across Europe, the United States and South America.',
      statement: 'It grows in the dark,<br>loves the unknown<br>and flies into the <i>light.</i>', backWork: 'BACK TO THE WORK ↑', contactLabel: '03 / MAKE CONTACT', contactHeading: 'Contact<br><i>AiDiTi.</i><span>↗</span>', contactIntro: 'Artwork inquiries, collaborations<br>& commissions.', copyright: '© 2026 ANGELA DI TOMASO · ALL ARTWORK RIGHTS RESERVED', replay: 'Replay entrance ↻', backTop: 'BACK TO TOP ↑', labirintoVersion: 'Labirinto entrance ↗', originalVersion: 'Original entrance ↗',
      mouseCue: 'Move your mouse to paint with light.', watchFilm: 'Watch the film ↗', pauseMotion: 'Pause motion', resumeMotion: 'Resume motion', playBackground: 'Play background film',
      viewWork: 'View', closeArtwork: 'Close artwork', openNavigation: 'Open navigation', closeNavigation: 'Close navigation', mainNavigation: 'Main navigation', filterArtwork: 'Filter artwork', introLabel: 'Interactive artwork introduction', language: 'Language', artworkVideo: 'Artwork video', play: 'Play film ▷', watchOn: 'Watch on', askWork: 'Ask about this work ↗', inquirySubject: 'Artwork inquiry:', defaultDescription: 'An artwork by Angela Di Tomaso / AiDiTi.', drawDescription: 'For inquiries about this work, pricing or custom requests, contact AiDiTi.', portraitAlt: 'Angela Di Tomaso during an artistic performance', sleepingAlt: 'The Sleeping Beauty — intricate surreal drawing by AiDiTi', galaxyAlt: 'Blue light painting in a dark space',
      printLabel: 'PRINTS / ON REQUEST', printHeading: 'Prints.', printIntro: 'Choose a drawing and request a print directly from Angie. She will confirm the available sizes, price and shipping before you pay.', printBrowse: 'Choose a drawing ↗', requestPrint: 'Request a print ↗', printDialog: 'Request a print', printName: 'Your name', printEmail: 'Your email', printSize: 'Preferred size (optional)', printSizeHint: 'For example: A3, or ask for a recommendation', printCountry: 'Delivery country', printQuantity: 'Quantity', printNote: 'This opens an email to Angie. Availability, price and delivery will be confirmed before payment.', printSend: 'Open print request ↗', printSubject: 'Print request:', printGreeting: 'Hello Angie, I would like to order a print of', printRecommend: 'Please recommend a size', printThanks: 'Please confirm available sizes, pricing and shipping. Thank you!', printNameField: 'Name', printEmailField: 'Email', printCountryField: 'Delivery country', printQuantityField: 'Quantity', printSizeField: 'Preferred size', closePrint: 'Close print request'
    },
    it: {
      title: 'AiDiTi — Arte in altre dimensioni', description: 'AiDiTi — Angela Di Tomaso. Disegno, immagini in movimento, videomapping e performance dal vivo.',
      enter: 'Entra ↗', skipIntro: 'Salta l’introduzione', skipWork: 'Vai alle opere', navWork: 'Opere selezionate', navPrints: 'Stampe', navArtist: 'L’artista', navContact: 'Scrivimi ↗',
      artistLabel: 'ANGELA DI TOMASO / ARTISTA MULTIMEDIALE', disciplines: 'DISEGNO · DIGITALE · DAL VIVO',
      heroTitle: 'Arte in altre<br><em>dimensioni.</em>' + node, workCount: '↓ OPERE SELEZIONATE / 38 OPERE',
      sleepingCaption: 'THE SLEEPING BEAUTY / DISEGNO ↗', galaxyCaption: 'GALAXY / LIGHT PAINTING ↗', drawingLight: 'Il disegno diventa luce.', explore: 'Esplora le opere <span>↘</span>',
      workLabel: '01 / LE OPERE', workHeading: 'Opere <i>selezionate.</i>', workIntro: 'Disegni, immagini in movimento<br>e performance dal vivo.', all: 'Tutte <sup>38</sup>', drawings: 'Disegni', movingImage: 'Immagini in movimento', liveLight: 'Performance e luce', mixedMedia: 'Tecnica mista', more: 'Altre opere <span>+</span>',
      artistSection: '02 / L’ARTISTA',
      bio1: 'Angela Di Tomaso, conosciuta come AiDiTi, è un’artista multimediale italiana la cui ricerca spazia da intricate immagini disegnate a mano alla sperimentazione digitale.',
      bio2: 'Ha studiato all’Accademia di Belle Arti di Frosinone e all’Accademia di Brera a Milano, per poi stabilirsi a Londra. Geometria sacra, simboli, natura ed esperienza umana attraversano i suoi disegni, le narrazioni animate, i videomapping e le installazioni immersive.',
      bio3: 'Le sue opere sono state presentate a LPM, Kernel, FILE, BYOB e Signal, con installazioni e mostre in Europa, negli Stati Uniti e in Sud America.',
      statement: 'Cresce nel buio,<br>ama l’ignoto<br>e vola verso la <i>luce.</i>', backWork: 'TORNA ALLE OPERE ↑', contactLabel: '03 / CONTATTI', contactHeading: 'Contatta<br><i>AiDiTi.</i><span>↗</span>', contactIntro: 'Informazioni sulle opere, collaborazioni<br>e commissioni.', copyright: '© 2026 ANGELA DI TOMASO · TUTTI I DIRITTI SULLE OPERE RISERVATI', replay: 'Rivedi l’introduzione ↻', backTop: 'TORNA IN ALTO ↑', labirintoVersion: 'Introduzione Labirinto ↗', originalVersion: 'Introduzione originale ↗',
      mouseCue: 'Muovi il mouse per dipingere con la luce.', watchFilm: 'Guarda il film ↗', pauseMotion: 'Metti in pausa', resumeMotion: 'Riprendi il movimento', playBackground: 'Avvia il video di sfondo',
      viewWork: 'Guarda', closeArtwork: 'Chiudi l’opera', openNavigation: 'Apri il menu', closeNavigation: 'Chiudi il menu', mainNavigation: 'Menu principale', filterArtwork: 'Filtra le opere', introLabel: 'Introduzione artistica interattiva', language: 'Lingua', artworkVideo: 'Video dell’opera', play: 'Guarda il film ▷', watchOn: 'Guarda su', askWork: 'Informazioni su quest’opera ↗', inquirySubject: 'Informazioni sull’opera:', defaultDescription: 'Un’opera di Angela Di Tomaso / AiDiTi.', drawDescription: 'Per informazioni su quest’opera, prezzi o richieste personalizzate, contatta AiDiTi.', portraitAlt: 'Angela Di Tomaso durante una performance artistica', sleepingAlt: 'The Sleeping Beauty — intricato disegno surreale di AiDiTi', galaxyAlt: 'Light painting blu in uno spazio buio',
      printLabel: 'STAMPE / SU RICHIESTA', printHeading: 'Stampe.', printIntro: 'Scegli un disegno e richiedi una stampa direttamente ad Angie. Ti confermerà i formati disponibili, il prezzo e la spedizione prima del pagamento.', printBrowse: 'Scegli un disegno ↗', requestPrint: 'Richiedi una stampa ↗', printDialog: 'Richiedi una stampa', printName: 'Il tuo nome', printEmail: 'La tua email', printSize: 'Formato preferito (facoltativo)', printSizeHint: 'Ad esempio: A3, oppure chiedi un consiglio', printCountry: 'Paese di consegna', printQuantity: 'Quantità', printNote: 'Si aprirà un’email indirizzata ad Angie. Disponibilità, prezzo e consegna saranno confermati prima del pagamento.', printSend: 'Apri la richiesta ↗', printSubject: 'Richiesta di stampa:', printGreeting: 'Ciao Angie, vorrei ordinare una stampa di', printRecommend: 'Ti chiedo un consiglio sul formato', printThanks: 'Puoi confermare i formati disponibili, il prezzo e la spedizione? Grazie!', printNameField: 'Nome', printEmailField: 'Email', printCountryField: 'Paese di consegna', printQuantityField: 'Quantità', printSizeField: 'Formato preferito', closePrint: 'Chiudi la richiesta di stampa'
    },
    fr: {
      title: 'AiDiTi — L’art dans d’autres dimensions', description: 'AiDiTi — Angela Di Tomaso. Dessin, images en mouvement, mapping vidéo et performance en direct.',
      enter: 'Entrer ↗', skipIntro: 'Passer l’introduction', skipWork: 'Aller aux œuvres', navWork: 'Œuvres choisies', navPrints: 'Tirages', navArtist: 'L’artiste', navContact: 'Écrivez-moi ↗',
      artistLabel: 'ANGELA DI TOMASO / ARTISTE MULTIMÉDIA', disciplines: 'DESSIN · NUMÉRIQUE · PERFORMANCE',
      heroTitle: 'L’art dans d’autres<br><em>dimensions.</em>' + node, workCount: '↓ ŒUVRES CHOISIES / 38 ŒUVRES',
      sleepingCaption: 'THE SLEEPING BEAUTY / DESSIN ↗', galaxyCaption: 'GALAXY / LIGHT PAINTING ↗', drawingLight: 'Le dessin devient lumière.', explore: 'Explorer les œuvres <span>↘</span>',
      workLabel: '01 / LES ŒUVRES', workHeading: 'Œuvres <i>choisies.</i>', workIntro: 'Dessins, images en mouvement<br>et performances en direct.', all: 'Tout <sup>38</sup>', drawings: 'Dessins', movingImage: 'Images en mouvement', liveLight: 'Performance et lumière', mixedMedia: 'Techniques mixtes', more: 'Voir d’autres œuvres <span>+</span>',
      artistSection: '02 / L’ARTISTE',
      bio1: 'Angela Di Tomaso, connue sous le nom d’AiDiTi, est une artiste multimédia italienne dont la pratique navigue entre des dessins à la main aux détails complexes et l’expérimentation numérique.',
      bio2: 'Elle a étudié à l’Académie des beaux-arts de Frosinone et à l’Académie de Brera à Milan avant de s’établir à Londres. Géométrie sacrée, symboles, nature et expérience humaine traversent ses dessins, ses récits animés, ses mappings vidéo et ses installations immersives.',
      bio3: 'Ses œuvres ont été présentées à LPM, Kernel, FILE, BYOB et Signal, lors d’installations et d’expositions en Europe, aux États-Unis et en Amérique du Sud.',
      statement: 'Cela grandit dans le noir,<br>aime l’inconnu<br>et s’envole vers la <i>lumière.</i>', backWork: 'RETOUR AUX ŒUVRES ↑', contactLabel: '03 / CONTACT', contactHeading: 'Contactez<br><i>AiDiTi.</i><span>↗</span>', contactIntro: 'Renseignements sur les œuvres, collaborations<br>et commandes.', copyright: '© 2026 ANGELA DI TOMASO · TOUS DROITS SUR LES ŒUVRES RÉSERVÉS', replay: 'Revoir l’introduction ↻', backTop: 'RETOUR EN HAUT ↑', labirintoVersion: 'Introduction Labirinto ↗', originalVersion: 'Introduction originale ↗',
      mouseCue: 'Bougez la souris pour peindre avec la lumière.', watchFilm: 'Voir le film ↗', pauseMotion: 'Mettre en pause', resumeMotion: 'Reprendre le mouvement', playBackground: 'Lancer le film en arrière-plan',
      viewWork: 'Voir', closeArtwork: 'Fermer l’œuvre', openNavigation: 'Ouvrir le menu', closeNavigation: 'Fermer le menu', mainNavigation: 'Navigation principale', filterArtwork: 'Filtrer les œuvres', introLabel: 'Introduction artistique interactive', language: 'Langue', artworkVideo: 'Vidéo de l’œuvre', play: 'Voir le film ▷', watchOn: 'Voir sur', askWork: 'Se renseigner sur cette œuvre ↗', inquirySubject: 'Renseignements sur l’œuvre :', defaultDescription: 'Une œuvre d’Angela Di Tomaso / AiDiTi.', drawDescription: 'Pour connaître le prix de cette œuvre ou faire une demande personnalisée, contactez AiDiTi.', portraitAlt: 'Angela Di Tomaso lors d’une performance artistique', sleepingAlt: 'The Sleeping Beauty — dessin surréaliste détaillé d’AiDiTi', galaxyAlt: 'Light painting bleu dans un espace sombre',
      printLabel: 'TIRAGES / SUR DEMANDE', printHeading: 'Tirages.', printIntro: 'Choisissez un dessin et demandez un tirage directement à Angie. Elle vous confirmera les formats disponibles, le prix et la livraison avant le paiement.', printBrowse: 'Choisir un dessin ↗', requestPrint: 'Demander un tirage ↗', printDialog: 'Demander un tirage', printName: 'Votre nom', printEmail: 'Votre email', printSize: 'Format souhaité (facultatif)', printSizeHint: 'Par exemple : A3, ou demandez conseil', printCountry: 'Pays de livraison', printQuantity: 'Quantité', printNote: 'Cela ouvre un email adressé à Angie. La disponibilité, le prix et la livraison seront confirmés avant le paiement.', printSend: 'Ouvrir la demande ↗', printSubject: 'Demande de tirage :', printGreeting: 'Bonjour Angie, je voudrais commander un tirage de', printRecommend: 'Merci de me conseiller un format', printThanks: 'Pouvez-vous confirmer les formats disponibles, le prix et la livraison ? Merci !', printNameField: 'Nom', printEmailField: 'Email', printCountryField: 'Pays de livraison', printQuantityField: 'Quantité', printSizeField: 'Format souhaité', closePrint: 'Fermer la demande de tirage'
    }
  };
  Object.assign(strings.en, {navEvents:'Events',eventLabel:'EVENTS / ARCHIVE',eventHeading:'Events.',eventIntro:'Selected past performances and installations.',eventUpcoming:'Contact AiDiTi for upcoming appearances ↗',eventBreakfest:'Main-stage video mapping with m0rf.',eventTissot:'Live light painting and video mapping at Museo della Scienza e della Tecnologia Leonardo da Vinci.',eventRepubblica:'Projection mapping with Adela Muntean at Piccolo Teatro Grassi.',eventConcerto:'Concerto Per Labirinto — immersive audiovisual installation at Venice Docks.',eventKernel:'Lack of Communication — interactive installation.'});
  Object.assign(strings.it, {navEvents:'Eventi',eventLabel:'EVENTI / ARCHIVIO',eventHeading:'Eventi.',eventIntro:'Una selezione di performance e installazioni passate.',eventUpcoming:'Contatta AiDiTi per i prossimi appuntamenti ↗',eventBreakfest:'Videomapping del palco principale con m0rf.',eventTissot:'Light painting e videomapping dal vivo al Museo della Scienza e della Tecnologia Leonardo da Vinci.',eventRepubblica:'Videomapping con Adela Muntean al Piccolo Teatro Grassi.',eventConcerto:'Concerto Per Labirinto — installazione audiovisiva immersiva ai Venice Docks.',eventKernel:'Lack of Communication — installazione interattiva.'});
  Object.assign(strings.fr, {navEvents:'Événements',eventLabel:'ÉVÉNEMENTS / ARCHIVES',eventHeading:'Événements.',eventIntro:'Une sélection de performances et d’installations passées.',eventUpcoming:'Contactez AiDiTi pour les prochaines dates ↗',eventBreakfest:'Mapping vidéo de la scène principale avec m0rf.',eventTissot:'Light painting et mapping vidéo en direct au Musée des sciences et des techniques Léonard-de-Vinci.',eventRepubblica:'Mapping vidéo avec Adela Muntean au Piccolo Teatro Grassi.',eventConcerto:'Concerto Per Labirinto — installation audiovisuelle immersive aux Venice Docks.',eventKernel:'Lack of Communication — installation interactive.'});
  const categories = { en: {'Drawing':'Drawing','Mixed Media':'Mixed media','Live':'Live','Mapping':'Projection mapping','Video':'Video','Music Video':'Music video'}, it: {'Drawing':'Disegno','Mixed Media':'Tecnica mista','Live':'Performance','Mapping':'Videomapping','Video':'Video','Music Video':'Videoclip'}, fr: {'Drawing':'Dessin','Mixed Media':'Techniques mixtes','Live':'Performance','Mapping':'Mapping vidéo','Video':'Vidéo','Music Video':'Clip musical'} };
  let language = 'en';
  const requested = new URLSearchParams(location.search).get('lang');
  if (strings[requested]) language = requested;
  else { try { const saved = localStorage.getItem('aiditi-language'); if (strings[saved]) language = saved; } catch {} }
  const iconPaths = {"arrow-up-right": "M5 19 19 5M5 5h14v14", "arrow-down-right": "M5 5l14 14M5 19h14V5", "arrow-up": "m6 10 6-6 6 6M12 4v16", "arrow-down": "m6 14 6 6 6-6M12 4v16", "replay": "M4 10a8 8 0 1 1 1 8M4 4v6h6", "close": "m6 6 12 12M18 6 6 18", "menu": "M4 8h16M4 16h16", "plus": "M12 5v14M5 12h14"};
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${iconPaths[name]}"/></svg>`;
  const symbols = {"\u2197": "arrow-up-right", "\u2198": "arrow-down-right", "\u2191": "arrow-up", "\u2193": "arrow-down", "\u21bb": "replay", "\u2715": "close", "\u2630": "menu"};
  const polish = text => text.replace(/[↗↘↑↓↻✕☰]/g, symbol => icon(symbols[symbol])).replace("<span>+</span>","<span>"+icon("plus")+"</span>");
  const t = key => polish(strings[language][key] ?? strings.en[key] ?? key);
  function apply(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    root.querySelectorAll('[data-i18n-label]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nLabel)); });
    root.querySelectorAll('[data-language]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.language === language)));
    root.querySelectorAll('.languages').forEach(el => el.setAttribute('aria-label', t('language')));
    root.querySelectorAll('.version-link').forEach(el => { const url = new URL(el.getAttribute('href'),location.href); url.searchParams.set('lang',language); el.href = url.pathname + url.search; });
  }
  function setLanguage(next) {
    if (!strings[next]) return;
    language = next;
    try { localStorage.setItem('aiditi-language',language); } catch {}
    const url = new URL(location.href);
    url.searchParams.set('lang',language);
    history.replaceState(null,'',url.pathname + url.search + url.hash);
    document.documentElement.lang = language;
    document.title = t('title');
    document.querySelector('meta[name="description"]').content = t('description');
    apply();
    document.querySelector('nav').setAttribute('aria-label', t('mainNavigation'));
    document.querySelector('.filters').setAttribute('aria-label', t('filterArtwork'));
    document.querySelector('#entrance').setAttribute('aria-label', t('introLabel'));
    document.querySelector('#menu').setAttribute('aria-label', t(document.querySelector('#menu').getAttribute('aria-expanded') === 'true' ? 'closeNavigation' : 'openNavigation'));
    document.querySelector('.portrait img').alt = t('portraitAlt');
    document.querySelector('.hero-art img').alt = t('sleepingAlt');
    document.querySelector('.hero-digital img').alt = t('galaxyAlt');
    document.querySelector('.hero-art').setAttribute('aria-label',`${t('viewWork')} The Sleeping Beauty`);
    document.querySelector('.hero-digital').setAttribute('aria-label',`${t('viewWork')} Galaxy`);
    document.dispatchEvent(new CustomEvent('languagechange'));
  }
  document.addEventListener('click', e => { const button = e.target.closest('[data-language]'); if (button) setLanguage(button.dataset.language); });
  window.AiDiTiI18n = { t, icon, apply, setLanguage, category: c => categories[language][c] || c, get language() { return language; }, description: work => work.category === 'Drawing' ? t('drawDescription') : (window.AiDiTiDescriptions?.[language]?.[work.slug] || work.description || t('defaultDescription')) };
  setLanguage(language);
})();

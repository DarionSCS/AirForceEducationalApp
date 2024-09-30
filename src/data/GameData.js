// hier moet wss nog heel wat toegevoegd worden, maar de basis staat er al

export const gamedata = {
  FR: {
    name: "Force protection",
    shorthand: "FR",
    beschrijving: "",
    briefing: " briefing text",
    img: "https://via.placeholder.com/150",
    imgAlt: "game image",
    instructies: {
      1: "Bescherm het centrale vlak",
      2: "Klik op de vijanden",
      3: "Blijf 30 seconden ongedeerd",
    },
    teams: {
      // Team namen staan nog niet vast (hier komen namen van vliegtuigen)
      1: "Blauw",
      2: "Rood",
    },
    locatie: "Paris | FR",
    duratie: "3 - 6 dagen",
    info: "none",
    rotation: [1, 3, 0], // the spot it rotates to
    coordinates: [1, 1.5, 1], // for markers
  },
  NL: {
    name: "Piloot",
    shorthand: "NL",
    beschrijving: "testings beschrijving",
    briefing: " briefing text",
    img: "https://via.placeholder.com/150",
    imgAlt: "game image",
    instructies: {
      1: "Help waar nodig door de juiste hulp aan te klikken",
      2: "Je hebt maar 1 helicopter, dus speel logisch",
    },
    teams: {
      // Team namen staan nog niet vast (hier komen namen van helicopters)
      1: "Blauw",
      2: "Rood",
    },
    locatie: "Amsterdam | NL",
    duratie: "1 - 2 dagen",
    info: "none",
    rotation: [2, 0, 0],
    coordinates: [1, 1, 1],
  },
  BE: {
    name: "Technicus",
    shorthand: "BE",
    beschrijving: "",
    briefing: " briefing text",
    img: "https://via.placeholder.com/150",
    imgAlt: "game image",
    instructies: {
      1: "Verbind de puzzelstukken",
      2: "De lijnen mogen elkaar niet kruisen",
    },

    // Geen teams in deze game denk ik
    locatie: "Brussels | BE",
    duratie: "2 - 4 dagen",
    info: "none",
    rotation: [3, 0, 0],
    coordinates: [1, 1, 1],
  },
  DE: {
    name: "Defend game",
    shorthand: "DE",
    beschrijving:
      "de rode vijanden vallen je aan, klik op ze om ze te vernietigen",
    briefing: " briefing text",
    img: "https://via.placeholder.com/150",
    imgAlt: "game image",
    instructies: {
      1: "Klik op de vijanden om ze te doden",
      2: "Als ze je raken verlies je ",
      3: "Overleef 60 seconden om te winnen",
    },

    // Geen teams in deze game denk ik
    locatie: "Berlin | DE",
    duratie: "4 - 7 dagen",
    info: "GOOD LUCK!",
    rotation: [4, 0, 0],
    coordinates: [1, 1, 1],
  },

  ML: {
    name: "Luchtverkeersleider",
    shorthand: "ML",
    beschrijving: "",
    briefing: " briefing text",
    img: "https://via.placeholder.com/150",
    imgAlt: "game image",
    instructies: {
      1: "Help waar nodig door de juiste hulp aan te klikken",
      2: "Je hebt maar 1 helicopter, dus speel logisch",
    },
    teams: {
      // Team namen staan nog niet vast (hier komen namen van helicopters)
      1: "Blauw",
      2: "Rood",
    },
    locatie: "Mali | ML",
    duratie: "1 - 2 dagen",
    info: "none",
    rotation: [5, 0, 0],
    coordinates: [1, 1, 1],
  },
};

export default gamedata;

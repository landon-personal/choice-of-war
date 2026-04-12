// Country data for the level select map
// Available countries have stories, coming soon ones are greyed out

const countries = {
  available: [
    {
      id: "cuba",
      name: "CUBA",
      region: "Caribbean",
      x: 23, y: 42,
      conflict: "Cuban Missile Crisis (1962)"
    },
    {
      id: "uk",
      name: "U.K.",
      region: "British Isles",
      x: 48, y: 22,
      conflict: "The London Blitz (1940-1941)"
    },
    {
      id: "china",
      name: "CHINA",
      region: "East Asia",
      x: 77, y: 35,
      conflict: "The Nanjing Massacre (1937)"
    },
    {
      id: "norway",
      name: "NORWAY",
      region: "Nordic Region",
      x: 52, y: 14,
      conflict: "Norwegian Resistance (1940-1945)"
    },
    {
      id: "japan",
      name: "JAPAN",
      region: "East Asia",
      x: 85, y: 33,
      conflict: "Hiroshima (1945)"
    },
    {
      id: "italy",
      name: "ITALY",
      region: "Mediterranean",
      x: 53, y: 30,
      conflict: "Fall of Rome (1943-1944)"
    }
  ],
  comingSoon: [
    { name: "EGYPT", x: 56, y: 38 },
    { name: "USA", x: 18, y: 32 },
    { name: "ARGENTINA", x: 28, y: 72 },
    { name: "SOUTH AFRICA", x: 55, y: 68 },
    { name: "AUSTRALIA", x: 84, y: 68 },
    { name: "INDONESIA", x: 80, y: 55 },
    { name: "INDIA", x: 72, y: 40 },
    { name: "RUSSIA", x: 68, y: 18 },
    { name: "FRANCE", x: 49, y: 28 },
    { name: "SUDAN", x: 57, y: 44 },
    { name: "UKRAINE", x: 58, y: 24 },
    { name: "MEXICO", x: 17, y: 40 },
    { name: "PERU", x: 24, y: 58 },
    { name: "VENEZUELA", x: 26, y: 48 },
    { name: "MONGOLIA", x: 75, y: 24 }
  ]
};

export default countries;

// Random things and movie quotes to be used as Usernames and Thoughts
const names = [
  'Super',
  'Pixel',
  'Cosmic',
  'Aura',
  'Nebula',
  'Wizard',
  'Mystic',
  'Diver',
  'Dune',
  'Quantum',
  'Glitch',
  'Frost',
  'Echo',
  'Drift',
  'Shadow',
  'Venom',
  'Orbit',
  'Nova',
  'Inferno',
  'Ninja',
];

const movieQuotes = [
  'May the Force be with you.',
  'E.T. phone home.',
  'You cant handle the truth!',
  'Hasta la vista, baby.',
  'Heres Johnny!',
  'You sit on a throne of lies.',
  'Its just a flesh wound.',
  'So youre telling me theres a chance ...',
  'I am a cotton-headed ninny-muggins!',
  'Tina, you fat lard! Come get some dinner! Tina, eat. Food. Eat the food!',
  'Keep the change, ya filthy animal.',
  'The dude abides.',
  'No time for love, Doctor Jones!',
  'Bond. James Bond.',
  'Youve got to ask yourself one question: Do I feel lucky? Well, do ya, punk?',
  'Elementary, my dear Watson.',
];

const users = [];
const getNamePart = () => names[Math.floor(Math.random() * names.length)];
const getRandomName = () => `${getNamePart()}${getNamePart()}`;
const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomPost = () => {
  // Select two random quotes from the movieQuotes array
  const quote1 = movieQuotes[genRandomIndex(movieQuotes)];
  const quote2 = movieQuotes[genRandomIndex(movieQuotes)];
  return `${quote1} ${quote2}`;
};


module.exports = {
  getRandomPost,
  genRandomIndex,
  getRandomName,
};


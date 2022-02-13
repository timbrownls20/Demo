const Travel = () => {
  const data = [
    "Easy Breezy",
    "Smooth Going",
    "Feeling Fine",
    "Happy Days",
    "Steady Away",
    "Open Road"
  ];

  const Today = () => {
    const index = Math.floor(Math.random() * data.length);
    return data[index];
  };

  return { Today };
};

module.exports = Travel;

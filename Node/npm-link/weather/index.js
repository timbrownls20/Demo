const Weather = () => {
  const data = [
    "Hot",
    "Hot and sunny",
    "Very hot",
    "Hot hot hot",
    "Sunny",
    "Hot and rainy",
  ];

  const Today = () => {
    const index = Math.floor(Math.random() * data.length);
    return data[index];
  };

  return { Today };
};

module.exports = Weather;

const News = () => {
  const data = [
    "All Good",
    "Everyone's Awesome",
    "No Worries",
    "No Dramas",
    "Too Easy",
  ];

  const Today = () => {
    const index = Math.floor(Math.random() * data.length);
    return data[index];
  };

  return { Today };
};

module.exports = News;

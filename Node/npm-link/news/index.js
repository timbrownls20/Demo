const News = () => {
  const data = ["All Good", "Awesome", "No Worries", "No Dramas"];

  const Today = () => {
    const index = Math.floor(Math.random() * data.length);
    return data[index];
  };

  return { Today };
};

module.exports = News;

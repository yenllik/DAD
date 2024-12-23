export const generateTrainingData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [];

  for (let month = 0; month < 12; month++) {
    for (let day = 0; day < months[month].length + 20; day++) {
      data.push({
        month: month + 1,
        day: day + 1,
        value: Math.floor(Math.random() * 100),
      });
    }
  }

  return data;
};
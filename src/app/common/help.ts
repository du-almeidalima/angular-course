

const log = (word: string, color: string) => {
  const consoleCss = `
  border: 1px solid blue;
  border-radius: 5px;
  padding: 3px;
  color: black;
  background-color: ${color};
  `;
  const parsedWord = '%c' + word;

  console.log(parsedWord, consoleCss);
};

export default log;

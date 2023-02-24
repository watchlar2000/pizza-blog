import seeds from "../../db/seeds";

const { articles } = seeds;
const isError = false;

export const getArticles = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (isError) {
        rej("Error");
      }
      res(articles);
    }, 1000);
  });
};

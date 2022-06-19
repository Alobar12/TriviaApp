import {makeAutoObservable} from 'mobx';
import axios from 'axios';

const URL = 'https://opentdb.com/api.php?amount=10';
const categoryUrl = 'https://opentdb.com/api_category.php';
class MainStore {
  questions = [];
  categories = [];
  constructor() {
    makeAutoObservable(this);
  }
  getGame = async (category, difficulty, type) => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `${URL}&category=${category}&difficulty=${difficulty}&type=${type}`,
        )
        .then(async res => {
          this.questions = await res.data.results;
          this.questions.map(item => {
            const correct = item.correct_answer;
            item.incorrect_answers.splice(Math.random() * 3, 0, correct);
          });
        })
        .catch(e => console.log(e));
      resolve(true);
    });
  };
  getCategories = () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`${categoryUrl}`)
        .then(res => {
          console.log(res.data.trivia_categories);
          this.categories = res.data.trivia_categories;
        })
        .catch(e => console.log(e));
      resolve(true);
    });
  };
}

const store = new MainStore();

export default store;

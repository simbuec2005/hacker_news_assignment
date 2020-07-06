export const GET_NEWS = 'GET_NEWS';
export const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS';

export function getNews() {
  return {
    type: GET_NEWS
  }
}

export function getNewsSuccess(news) {
  return {
    type: GET_NEWS_SUCCESS,
    news,
  }
}

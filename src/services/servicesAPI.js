export const fetchAPI = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((data) => data.json())
  .then((response) => response);

export const putTokenInLocalStorage = () => {
  fetchAPI().then(({ token }) => localStorage.setItem('token', token));
};

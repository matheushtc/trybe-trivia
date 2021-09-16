export const apiTrivia = async (token, numberOfQuestions, category, difficult) => {
  let endpoint = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`;
  if (category !== 'Any Category') endpoint += `&category=${category}`;
  if (difficult !== 'Any Difficulty') endpoint += `&difficulty=${difficult}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.results;
};

export async function fetchCategories() {
  const response = await fetch(
    'https://opentdb.com/api_category.php',
  );
  const data = await response.json();
  return data.trivia_categories;
}

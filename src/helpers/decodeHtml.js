/*
  Fonte:
  https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it

  A função a seguir decifra o HTML encode da API através de 3 passos simples:

  1. Criar um textarea metafórico, sem o append;
  2. Atribuir o valor encodado para o HTML deste;
  3. Retornar o "valor" do textarea, agora decifrado, em string;
*/

const decodeHtml = (encoded) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = encoded;
  return txt.value;
};

export default decodeHtml;

// Crypto JS
import md5 from 'crypto-js/md5';

const getGravatar = (userEmail) => {
  const gravatarHash = md5(userEmail).toString();

  return `https://www.gravatar.com/avatar/${gravatarHash}`;
};

export default getGravatar;

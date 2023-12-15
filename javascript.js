const APIURL = 'https://api.github.com/users/';

document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('search').value.trim();
  if (username !== '') {
    getUserProfile(username);
  }
});

async function getUserProfile(username) {
  try {
    const response = await axios.get(APIURL + username);
    const userData = response.data;

    
    if (userData.login) {
      
      displayUserProfile(userData);
    } else {
      displayUserNotFound();
    }
  } catch (error) {
    
    console.error('Error al obtener el perfil del usuario', error);
    displayUserNotFound();
  }
}

function displayUserProfile(userData) {
  const mainElement = document.getElementById('main');
  mainElement.innerHTML = '';

  const cardElement = document.createElement('div');
  cardElement.classList.add('card');

  const avatarElement = document.createElement('img');
  avatarElement.src = userData.avatar_url;
  avatarElement.alt = `${userData.login}'s avatar`;
  avatarElement.classList.add('avatar');

  const userInfoElement = document.createElement('div');
  userInfoElement.classList.add('user-info');

  const usernameElement = document.createElement('h2');
  usernameElement.textContent = userData.login;

  const bioElement = document.createElement('p');
  bioElement.textContent = userData.bio || 'No bio available';

  const repoListElement = document.createElement('ul');
  repoListElement.classList.add('repo-list');
  const repositories = userData.public_repos;

  const repoListItem = document.createElement('li');
  repoListItem.innerHTML = `<strong>Repositories:</strong> ${repositories}`;

  repoListElement.appendChild(repoListItem);

  userInfoElement.appendChild(usernameElement);
  userInfoElement.appendChild(bioElement);
  userInfoElement.appendChild(repoListElement);

  cardElement.appendChild(avatarElement);
  cardElement.appendChild(userInfoElement);

  mainElement.appendChild(cardElement);
}


const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
    headers: {
      authorization: '275e97d7-7ef3-4926-bcb7-3f2c8fd87314',
      'Content-Type': 'application/json'
    },
  };

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
};

export const createMyCard = (name, link, idCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
      _id: idCard,
    }),
  }).then(handleResponse);
};

export const deleteMyCard = (cardToDelete) => {
    return fetch(
      `${config.baseUrl}/cards/${cardToDelete.ElementId}`,
      {
        method: "DELETE",
        headers: config.headers,
      }
    ).then(handleResponse);
  }


export const updateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(handleResponse);
};

export const putLike = (card) => {
  return fetch(
    `${config.baseUrl}/cards/likes/${card.ElementId}`,
    {
      method: "PUT",
      headers: config.headers,
    }
  ).then(handleResponse);
};

export const deleteLike = (card) => {
  return fetch(
    `${config.baseUrl}/cards/likes/${card.ElementId}`,
    {
      method: "DELETE",
      headers: config.headers,
    }
  ).then(handleResponse);
};

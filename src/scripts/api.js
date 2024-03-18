export const getCards = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-8/cards ", {
    headers: {
      authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getProfile = () => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/users/me`, {
    headers: {
      authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const updateProfile = (name, about) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/users/me`, {
    method: "PATCH",
    headers: {
      authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};

export const createMyCard = (name, link) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/cards`, {
    method: "POST",
    headers: {
      authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};

export const deleteMyCard = (card, myProfileData) => {
  if (card.CreatorID === myProfileData._id) {
    return fetch(
      `https://nomoreparties.co/v1/wff-cohort-8/cards/${card.ElementId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
        },
      }
    );
  }
};

export const updateAvatar = (link) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-8/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const putLike = (card, myProfileData) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-8/cards/likes/${card.ElementId}`,
    {
      method: "PUT",
      headers: {
        authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
      },
    }
  );
};

export const deleteLike = (card, myProfileData) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-8/cards/likes/${card.ElementId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "275e97d7-7ef3-4926-bcb7-3f2c8fd87314",
      },
    }
  );
};



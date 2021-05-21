import request from 'superagent';

export async function signUp(credentials) {
  const response = await request
    .post('/api/auth/signup')
    .ok(res => res.status < 500)
    .send(credentials);
  if (response.status === 400) {
    throw response.body;
  }
  return response.body;
}

export async function signIn(credentials) {
  const response = await request
    .post('/api/auth/signin')
    .ok(res => res.status < 500)
    .send(credentials);
  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function addFavorites(favorites) {
  const response = await request
    .post('/api/favorites')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send(favorites);

  return response.body;
}

export async function getFavorites() {
  const response = await request
    .get('/api/favorites')
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function deleteFavorites(id) {
  const response = await request
    .delete(`/api/favorites/${id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

import { api } from '../Utilities/constants/api';
import { authHeader } from '../Utilities/auth/auth-header';
import { history } from '../Utilities/history';

export function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(api + '/users', requestOptions).then(handleResponse, handleError);
}

export function create(user) {
  const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  };

  return fetch(api + '/users/create', requestOptions).then(handleResponse, handleError);
}

export function update(user) {
  const requestOptions = {
      method: 'PUT',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
  };

  return fetch(api + '/users/' + user.id, requestOptions).then(handleResponse, handleError);
}

export function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(api + '/users/authenticate', requestOptions)
          .then(handleResponse, handleError)
          .then(user => {
            if (user && user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
          });
}

function handleResponse(response) {
  return new Promise((resolve, reject) => {
    if (response.ok) {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        response.json().then(json => resolve(json));
      } else {
        resolve();
      }
    } else {
      if (response.status === 401){
        localStorage.removeItem('user');
        history.push('/login');
      }

      response.text().then(text => reject(text));
    }
  });
}

function handleError(error) {
  return Promise.reject(error && error.message);
}

export const BASE_URL = 'https://api.karina.mesto.students.nomoredomains.club';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  }).then(async res => {
      const jsonData = await res.json()

      if(res.ok){
          return jsonData
      } else {
        return Promise.reject(jsonData.error)
      }
    });
};


export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    }).then(async res => {
      const jsonData = await res.json()

      if(res.ok){
          return jsonData
      } else {
        return Promise.reject(jsonData.error)
      }
    })
  };

  export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if(res.ok){
        return res.json()
      } 
      return Promise.reject(res.json())
    })
  }

  export const logout = () => {
    return fetch(`${BASE_URL}/signout`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).catch(err => console.log(err))
  };
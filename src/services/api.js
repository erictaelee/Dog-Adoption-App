const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(errorText || `Error: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
};

export const loginUser = async (name, email) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
      credentials: 'include'
   });

  return handleResponse(response);
};

export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  
  return handleResponse(response);
};

export const getBreeds = async () => {
    const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
        credentials: 'include',
    })
    return handleResponse(response) 
}

export const searchDogs = async (params) => {
    const queryString = new URLSearchParams();
    
    // Handle special case for arrays
    if (params.breeds) {
      params.breeds.forEach(breed => queryString.append('breeds', breed));
      delete params.breeds;
    }
    
    if (params.zipCodes) {
      params.zipCodes.forEach(zip => queryString.append('zipCodes', zip));
      delete params.zipCodes;
    }
    
    // Add remaining params
    Object.entries(params).forEach(([key, value]) => {
      queryString.append(key, value);
    });
    
    const url = `${API_BASE_URL}/dogs/search?${queryString.toString()}`;
    
    const response = await fetch(url, {
      credentials: 'include'
    });
    
    return handleResponse(response);
};

export const getDogs = async (dogIds) => {
    const response = await fetch(`${API_BASE_URL}/dogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dogIds),
        credentials: 'include'
    });

    return handleResponse(response)
}

export const getMatch = async (favoriteIds) => {
    const response = await fetch(`${API_BASE_URL}/dogs/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favoriteIds),
      credentials: 'include'
    });
    
    return handleResponse(response);
};
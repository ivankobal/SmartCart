import { storageService } from '../services/storageService';

const API_BASE_URL = 'http://localhost:8080/api';

function buildHeaders(customHeaders = {}) {
  const token = storageService.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };
}

async function handleResponseError(response) {
  let errorMessage = `Server error: ${response.status}`;
  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorMessage;
  } catch {
    // Ignoring everynone
  }
  return new Error(errorMessage);
}

export async function apiFetch(endpoint, options = {}) {
  const config = {
    ...options,
    headers: buildHeaders(options.headers),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    throw await handleResponseError(response);
  }

  return response.json();
}

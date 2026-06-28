const BASE_URL = '/api';

export async function fetchCompanies() {
  const response = await fetch(`${BASE_URL}/companies`);
  if (!response.ok) {
    throw new Error('Failed to fetch D2C companies list.');
  }
  return response.json();
}

export async function analyzeDomains(domains) {
  const response = await fetch(`${BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ domains }),
  });
  
  if (!response.ok) {
    throw new Error('Analysis failed on server.');
  }
  return response.json();
}

export async function updateCompany(id, updates) {
  const response = await fetch(`${BASE_URL}/companies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update company: ${id}`);
  }
  return response.json();
}

export async function deleteCompany(id) {
  const response = await fetch(`${BASE_URL}/companies/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to remove company: ${id}`);
  }
  return response.json();
}

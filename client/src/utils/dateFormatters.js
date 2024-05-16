
export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

export function verifyTokenExpiration() {
  // Get the token from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (!token) {
    console.error('Token is missing');
    return false;
  }

  try {
    const [header, payload] = token.split('.').slice(0, 2);
    
    const decodedPayload = JSON.parse(atob(payload.replace(/_/g, '/').replace(/-/g, '+')));

    const expirationTime = decodedPayload.exp * 1000; 

    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      console.error('Token has expired');
      return false;
    }

    console.log('Token is valid');
    return true;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
}
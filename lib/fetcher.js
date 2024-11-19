export async function fetcher(url) {
  console.log('Fetching:', url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const json = await response.json();
    console.log('Data fetched successfully:', json);
    return json;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}
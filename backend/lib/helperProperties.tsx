const BASE_URL = "http://localhost:3000/";

// Get all properties
export const getProperties = async () => {
  const response = await fetch(`${BASE_URL}api/property`);
  const json = await response.json();

  return json;
};

export const getProperty = async (propertyId: any) => {
  const response = await fetch(`${BASE_URL}api/property/${propertyId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

//Adding a new Property
export async function addProperty(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}api/property`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

//Update a new Property
export async function updateProperty(propertyId: any, formData: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(
    `${BASE_URL}api/property/?propertyID=${propertyId}`,
    Options
  );
  const json = await response.json();
  return json;
}

//Delete a new Property
export async function deleteProperty(propertyId: any) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${BASE_URL}api/property/?propertyID=${propertyId}`,
    Options
  );
  const json = await response.json();
  return json;
}

const BASE_URL = "http://localhost:3000";

// Get all properties
export const getOffers = async (brokerId: any) => {
  const response = await fetch(`${BASE_URL}/api/offer/${brokerId}`);
  const json = await response.json();

  return json;
};

export const getOffer = async (offerId: any) => {
  const response = await fetch(`${BASE_URL}/api/offer/${offerId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

//Adding a new Property
export async function addOffer(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}/api/offer`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return "ERROR FOUND";
  }
}

//Update a new Property
export async function updateOffer(offerId: any, formData: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(
    `${BASE_URL}/api/offer/?offerId=${offerId}`,
    Options
  );
  const json = await response.json();
  return json;
}

//Delete a new Property
export async function deleteOffer(offerId: any) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${BASE_URL}/api/offer/?offerId=${offerId}`,
    Options
  );
  const json = await response.json();
  return json;
}

// // Get filtered properties
// export const getPropertiesFiltered = async (filters = {}) => {
//   const response = await fetch(
//     `${BASE_URL}/api/propertyfilter?${new URLSearchParams(filters)}`
//   );
//   const json = await response.json();
//   return json;
// };
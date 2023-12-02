const BASE_URL = "http://localhost:3000";

// creating a new Offer
export async function addOffer(offerData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(offerData),
    };

    const response = await fetch(`${BASE_URL}/api/offer`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return "ERROR FOUND";
  }
}

// Get offers for broker in session
export const getBrokerOffers = async (brokerID: any) => {
  const response = await fetch(`${BASE_URL}/api/brokeroffer/${brokerID}`);
  const json = await response.json();

  return json;
};

// Reject/Delete a offer
export async function deleteOffers(propertyid: any) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${BASE_URL}/api/offersdelete/?propertyId=${propertyid}`,
    Options
  );
  const json = await response.json();
  return json;
}

export async function deleteOffer(offerId: any) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${BASE_URL}/api/offerdelete/?offerId=${offerId}`,
    Options
  );
  const json = await response.json();
  return json;
}
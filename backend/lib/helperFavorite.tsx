const BASE_URL = "http://localhost:3000";

// Add property to favorite list
export async function addPropertyToList(user_id: any, property_id: any) {
    try {
      const data = {
        user_id: user_id,
        property_id: property_id,
      };

      const Options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
  
      const response = await fetch(`${BASE_URL}/api/favoritelist`, Options);
      const json = await response.json();
  
      return json;
    } catch (error) {
      return "ERROR FOUND";
    }
  }


  // Remove a property from favorite list
  export async function removePropertyFromList(user_id: any, property_id: any) {
    try {
      const data = {
        user_id: user_id,
        property_id: property_id,
      };
      
      const Options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

  
      const response = await fetch(`${BASE_URL}/api/removefavoritelist`, Options);
      const json = await response.json();
  
      return json;
    } catch (error) {
      return "ERROR FOUND";
    }
  }

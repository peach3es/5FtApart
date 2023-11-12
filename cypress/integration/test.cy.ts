
// USER CRUD OPERERATION TEST

// describe('API Tests', () => {
//   let originalUserId: string;
//   let updatedUserId: string;
//   let createdUser: any;
//   let userIdToDelete: string;

//   it('POST /api/users should create a new user', () => {
//     const newUser = {
//       name: 'test',
//       email: 'test.test@example.com',
//       avatar: 'avatar-url',
//       password: '1234',
//       date: '2023-11-09',
//       activeListings: 0,
//     };

//     cy.request('POST', `${Cypress.env("baseUrl")}/api/users`, newUser).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body).to.have.property('_id');
//       expect(response.body).to.not.be.null;
//       createdUser = response.body;
//       originalUserId = response.body._id;
//       expect(originalUserId).to.not.be.undefined;
//     });
//   });

//   it('GET /api/users should retrieve the created user by userID', () => {
//     // Ensure userIdToDelete is defined
//     expect(originalUserId).to.not.be.undefined;
  
//     // Send a request to get the list of users
//     cy.request('GET', `${Cypress.env("baseUrl")}/api/users`).then((response) => {
//       expect(response.status).to.eq(200);
  
//       // Verify if the retrieved user is present in the array
//       const userInArray = response.body.find((user: { _id: string; }) => user._id === originalUserId);
//       expect(userInArray).to.exist; // Check if the user is found in the array
  
//       // You can add more specific assertions if needed
//       expect(userInArray).to.deep.equal(createdUser);
//       // Add more properties as needed...
//     });
//   }); 


//   it('PUT /api/users should update the created user', () => {
//     //Ensure userIdToDelete is defined
//     expect(createdUser._id).to.not.be.undefined;

//     // Update user data
//     const updatedUserData = {
//       name: 'Updated name',
//       email: 'updated email@email.com',
//       avatar: 'updated-avatar-url',
//       password: 'updated 456',
//       date: '2023-11-20',
//       activeListings: 1,
//     };

//     // Send a request to update the user
//     cy.request('PUT', `${Cypress.env("baseUrl")}/api/users?userID=${originalUserId}`, updatedUserData).then((response) => {
//       console.log('Update response:', response.body);
//       expect(response.status).to.eq(200);
//       updatedUserId = response.body._id;
//       expect(originalUserId).to.equal(updatedUserId);
//       // Add assertions for the updated user if needed...
//     });

//     cy.request('GET', `${Cypress.env("baseUrl")}/api/users?userID=${originalUserId}`).then((response) => {
//       expect(response.status).to.eq(200);

//       // Verify if the updated user is not the same as the created user
//       expect(response.body).to.not.deep.equal(createdUser);

//     });

//   });

 
//   it('DELETE /api/users should delete the created user', () => {
//     // Ensure userIdToDelete is defined
//     expect(originalUserId).to.equal(updatedUserId);
//     expect(originalUserId).to.not.be.undefined;
//     userIdToDelete = originalUserId;

//     // Log the ID being sent in the request for debugging
//     //console.log('Deleting user with ID:', originalUserId);

//     // Send a request to delete the user
//     cy.request('DELETE', `${Cypress.env("baseUrl")}/api/users?userID=${userIdToDelete}`).then((response) => {
//       console.log('Delete response:', response.body);
//       expect(response.status).to.eq(200);
//       // Add other assertions for user deletion if needed...
      
//     });

//       // Verify that the user is no longer present in the list
//   cy.request('GET', `${Cypress.env("baseUrl")}/api/users`).then((response) => {
//     expect(response.status).to.eq(200);
//     expect(response.body).to.be.an('array');
//     // Verify that the user with userIdToDelete is not present
//     const deletedUser = response.body.find((user: any) => user._id === userIdToDelete);
//     expect(deletedUser).to.be.undefined;
//   });
//   });
// });





// PROPERTY CRUD OPERATION


// describe('API Tests', () => {
//   let originalUserId: string;
//   let updatedUserId: string;
//   let createdUser: any;
//   let userIdToDelete: string;
//   let originalPropertyId: string;
//   let createdProperty: any;

//   it('POST /api/users should create a new user', () => {
//     const newUser = {
//       name: 'test',
//       email: 'test.test@example.com',
//       avatar: 'avatar-url',
//       password: '1234',
//       date: '2023-11-09',
//       activeListings: 0,
//     };

//     cy.request('POST', `${Cypress.env("baseUrl")}/api/users`, newUser).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body).to.have.property('_id');
//       expect(response.body).to.not.be.null;
//       createdUser = response.body;
//       originalUserId = response.body._id;
//       expect(originalUserId).to.not.be.undefined;
//     });
//   });

//   it('GET /api/users should retrieve the created user by userID', () => {
//     // Ensure originalUserId is defined
//     expect(originalUserId).to.not.be.undefined;
  
//     // Send a request to get the list of users
//     cy.request('GET', `${Cypress.env("baseUrl")}/api/users`).then((response) => {
//       expect(response.status).to.eq(200);
  
//       // Verify if the retrieved user is present in the array
//       const userInArray = response.body.find((user: { _id: string; }) => user._id === originalUserId);
//       expect(userInArray).to.exist; // Check if the user is found in the array
  
//       // You can add more specific assertions if needed
//       expect(userInArray).to.deep.equal(createdUser);
//       // Add more properties as needed...
//     });
//   }); 

//   it('POST /api/property should create a new property', () => {
//     const newProperty = {
//       addimg: 'property-image-url',
//       address: 'Test Address',
//       pricetag: 100000,
//       bedrooms: 2,
//       amenities: 'Test Amenities',
//       description: 'Test Description',
//       postalcode: '12345',
//       city: 'Test City',
//       saletype: 'Sale', // or 'Rent' based on your saletype options
//       propertytype: 'Test Property Type',
//       userId: [originalUserId], // Assuming you associate the property with a user
//     };

//     cy.request('POST', `${Cypress.env("baseUrl")}/api/property`, newProperty).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body).to.have.property('_id');
//       expect(response.body).to.not.be.null;
//       createdProperty = response.body;
//       originalPropertyId = response.body._id;
//       expect(originalPropertyId).to.not.be.undefined;
//     });
//   });

//   it('PUT /api/users should update the created user', () => {
//     // Ensure originalUserId is defined
//     expect(originalUserId).to.not.be.undefined;

//     // Update user data
//     const updatedUserData = {
//       name: 'Updated name',
//       email: 'updated.email@example.com',
//       avatar: 'updated-avatar-url',
//       password: 'updated-password',
//       date: '2023-11-20',
//       activeListings: 1,
//     };

//     // Send a request to update the user
//     cy.request('PUT', `${Cypress.env("baseUrl")}/api/users?userID=${originalUserId}`, updatedUserData).then((response) => {
//       expect(response.status).to.eq(200);
//       updatedUserId = response.body._id;
//       expect(originalUserId).to.equal(updatedUserId);
//       // Add assertions for the updated user if needed...
//     });

//     cy.request('GET', `${Cypress.env("baseUrl")}/api/users?userID=${originalUserId}`).then((response) => {
//       expect(response.status).to.eq(200);

//       // Verify if the updated user is not the same as the created user
//       expect(response.body).to.not.deep.equal(createdUser);
//     });
//   });

//   it('GET /api/property should retrieve the created property by propertyID', () => {
//     // Ensure originalPropertyId is defined
//     expect(originalPropertyId).to.not.be.undefined;
  
//     // Send a request to get the list of properties
//     cy.request('GET', `${Cypress.env("baseUrl")}/api/property`).then((response) => {
//       expect(response.status).to.eq(200);
  
//       // Verify if the retrieved property is present in the array
//       const propertyInArray = response.body.find((property: { _id: string; }) => property._id === originalPropertyId);
//       expect(propertyInArray).to.exist; // Check if the property is found in the array
  
//       // You can add more specific assertions if needed
//       expect(propertyInArray).to.deep.equal(createdProperty);
//       // Add more properties as needed...
//     });
//   });

//   it('DELETE /api/users should delete the created user', () => {
//     // Ensure originalUserId is defined
//     expect(originalUserId).to.equal(updatedUserId);
//     expect(originalUserId).to.not.be.undefined;
//     userIdToDelete = originalUserId;

//     // Send a request to delete the user
//     cy.request('DELETE', `${Cypress.env("baseUrl")}/api/users?userID=${userIdToDelete}`).then((response) => {
//       expect(response.status).to.eq(200);
//       // Add other assertions for user deletion if needed...
//     });

//     // Verify that the user is no longer present in the list
//     cy.request('GET', `${Cypress.env("baseUrl")}/api/users`).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body).to.be.an('array');
//       // Verify that the user with userIdToDelete is not present
//       const deletedUser = response.body.find((user: any) => user._id === userIdToDelete);
//       expect(deletedUser).to.be.undefined;
//     });
//   });

//   it('DELETE /api/property should delete the created property', () => {
//     // Ensure originalPropertyId is defined
//     expect(originalPropertyId).to.not.be.undefined;
  
//     // Send a request to delete the property
//     cy.request('DELETE', `${Cypress.env("baseUrl")}/api/property?propertyId=${originalPropertyId}`).then((response) => {
//       expect(response.status).to.eq(200);
//       // Add other assertions for property deletion if needed...
//     });

//     // Verify that the property is no longer present in the list
//     cy.request('GET', `${Cypress.env("baseUrl")}/api/property`).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body).to.be.an('array');
//       // Verify that the property with originalPropertyId is not present
//       const deletedProperty = response.body.find((property: any) => property._id === originalPropertyId);
//       expect(deletedProperty).to.be.undefined;
//     });
//   });
// });











describe('API Tests', () => {
  let originalUserId: string;
  let updatedUserId: string;
  let createdUser: any;
  let userIdToDelete: string;
  let originalPropertyId: string;
  let createdProperty: any;

  it('POST /api/users should create a new user', () => {
    const newUser = {
      name: 'test',
      email: 'test.test@example.com',
      avatar: 'avatar-url',
      password: '1234',
      date: '2023-11-09',
      activeListings: 0,
    };

    cy.request('POST', `${Cypress.env("baseUrl")}/api/users`, newUser).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('_id');
      expect(response.body).to.not.be.null;
      createdUser = response.body;
      originalUserId = response.body._id;
      expect(originalUserId).to.not.be.undefined;
    });
  });

  it('GET /api/users should retrieve the created user by userID', () => {
    // Ensure originalUserId is defined
    expect(originalUserId).to.not.be.undefined;

    // Send a request to get the list of users
    cy.request('GET', `${Cypress.env("baseUrl")}/api/users`).then((response) => {
      expect(response.status).to.eq(200);

      // Verify if the retrieved user is present in the array
      const userInArray = response.body.find((user: { _id: string; }) => user._id === originalUserId);
      expect(userInArray).to.exist; // Check if the user is found in the array

      // You can add more specific assertions if needed
      expect(userInArray).to.deep.equal(createdUser);
    });
  }); 

  it('PUT /api/users should update the created user', () => {
    // Ensure originalUserId is defined
    expect(originalUserId).to.not.be.undefined;

    // Update user data
    const updatedUserData = {
      name: 'Updated name',
      email: 'updated.email@example.com',
      avatar: 'updated-avatar-url',
      password: 'updated-password',
      date: '2023-11-20',
      activeListings: 1,
    };

    // Send a request to update the user
    cy.request('PUT', `${Cypress.env("baseUrl")}/api/users?userID=${originalUserId}`, updatedUserData).then((response) => {
      expect(response.status).to.eq(200);
      updatedUserId = response.body._id;
      expect(originalUserId).to.equal(updatedUserId);
    });

    // Verify if the updated user is not the same as the created user
    cy.request('GET', `${Cypress.env("baseUrl")}/api/users?userID=${originalUserId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.deep.equal(createdUser);
    });
  });

  it('DELETE /api/users should delete the created user', () => {
    // Ensure originalUserId is defined
    expect(originalUserId).to.equal(updatedUserId);
    expect(originalUserId).to.not.be.undefined;
    userIdToDelete = originalUserId;

    // Send a request to delete the user
    cy.request('DELETE', `${Cypress.env("baseUrl")}/api/users?userID=${userIdToDelete}`).then((response) => {
      expect(response.status).to.eq(200);
    });

    // Verify that the user is no longer present in the list
    cy.request('GET', `${Cypress.env("baseUrl")}/api/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      // Verify that the user with userIdToDelete is not present
      const deletedUser = response.body.find((user: any) => user._id === userIdToDelete);
      expect(deletedUser).to.be.undefined;
    });
  });

  it('POST /api/property should create a new property', () => {
    const newProperty = {
      addimg: 'property-image-url',
      address: 'Test Address',
      pricetag: 100,
      bedrooms: 2,
      amenities: 'Test Amenities',
      description: 'Test Description',
      postalcode: '12345',
      city: 'Test City',
      saletype: 'Sale',
      propertytype: 'Test Property Type',
    };

    cy.request('POST', `${Cypress.env("baseUrl")}/api/property`, newProperty).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('_id');
      expect(response.body).to.not.be.null;
      createdProperty = response.body;
      originalPropertyId = response.body._id;
      expect(originalPropertyId).to.not.be.undefined;
    });
  });

  it('GET /api/property should retrieve the created property by propertyID', () => {
    // Ensure originalPropertyId is defined
    expect(originalPropertyId).to.not.be.undefined;
  
    // Send a request to get the list of properties
    cy.request('GET', `${Cypress.env("baseUrl")}/api/property`).then((response) => {
      expect(response.status).to.eq(200);
  
      // Verify if the retrieved property is present in the array
      const propertyInArray = response.body.find((property: { _id: string; }) => property._id === originalPropertyId);
      expect(propertyInArray).to.exist; // Check if the property is found in the array
  
      // You can add more specific assertions if needed
      expect(propertyInArray).to.deep.equal(createdProperty);
    });
  });

  // it('PUT /api/property should update the created property', () => {
  //   // Ensure originalPropertyId is defined
  //   expect(originalPropertyId).to.not.be.undefined;

  //   // Update property data
  //   const updatedPropertyData = {
  //     addimg: 'updated-image-url',
  //     address: 'Updated Address',
  //     pricetag: 9999,
  //     bedrooms: 3,
  //     amenities: 'Updated Amenities',
  //     description: 'Updated Description',
  //     postalcode: '6789',
  //     city: 'Updated City',
  //     saletype: 'Rent',
  //     propertytype: 'Updated Property Type',
  //   };

  //   // Send a request to update the property
  //   cy.request('PUT', `${Cypress.env("baseUrl")}/api/property?propertyId=${originalPropertyId}`, updatedPropertyData).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body._id).to.be.equal(originalPropertyId)
  //   });

  //   // Verify if the updated property is not the same as the created property
  //   cy.request('GET', `${Cypress.env("baseUrl")}/api/property?propertyId=${originalPropertyId}`).then((response) => {
  //     expect(response.status).to.eq(200);
  //     expect(response.body).to.not.deep.equal(createdProperty);
  //     // Add assertion to verify if userId stays the same
  //     //expect(response.body._id).to.equal(originalPropertyId);
  //   });

    
  // });

  it('PUT /api/property should update the created property', () => {
    // Ensure originalPropertyId and originalUserId are defined
    expect(originalPropertyId).to.not.be.undefined;
  
    // Update property data
    const updatedPropertyData = {
      addimg: 'updated-image-url',
      address: 'Updated Address',
      pricetag: 150000,
      bedrooms: 3,
      amenities: 'Updated Amenities',
      description: 'Updated Description',
      postalcode: '54321',
      city: 'Updated City',
      saletype: 'Rent',
      propertytype: 'Updated Property Type',
    };
  
    // Send a request to update the property
    cy.request('PUT', `${Cypress.env("baseUrl")}/api/property?propertyId=${originalPropertyId}`, updatedPropertyData).then((response) => {
      expect(response.status).to.eq(200);
      // Add assertions for the updated property if needed...
      //   expect(response.body).to.have.property('userId');
      expect(response.body._id).to.equal(originalPropertyId);
    });
  
    // Verify if the updated property is not the same as the created property
    cy.request('GET', `${Cypress.env("baseUrl")}/api/property?propertyId=${originalPropertyId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.deep.equal(createdProperty);
    });
  });
  

  it('DELETE /api/property should delete the created property', () => {
    // Ensure originalPropertyId is defined
    expect(originalPropertyId).to.not.be.undefined;
  
    // Send a request to delete the property
    cy.request('DELETE', `${Cypress.env("baseUrl")}/api/property?propertyId=${originalPropertyId}`).then((response) => {
      expect(response.status).to.eq(200);
    });

    // Verify that the property is no longer present in the list
    cy.request('GET', `${Cypress.env("baseUrl")}/api/property`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      // Verify that the property with originalPropertyId is not present
      const deletedProperty = response.body.find((property: any) => property._id === originalPropertyId);
      expect(deletedProperty).to.be.undefined;
    });
  });
});









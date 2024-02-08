import Home from 'app/(client_route)/calculator/page';
import 'cypress-iframe';

// USER CRUD OPERERATION TEST
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
      role: 'broker',
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

  it('GET /api/users should retrieve the created users', () => {
    // Ensure originalUserId is defined
    expect(originalUserId).to.not.be.undefined;

    // Send a request to get the list of users
    cy.request('GET', `${Cypress.env("baseUrl")}/api/users`).then((response) => {
      expect(response.status).to.eq(200);
      // Check that the response body is an array
      expect(response.body).to.be.an('array');
      // Check that each object in the array is defined
      cy.wrap(response.body).each((user) => { expect(user).to.not.be.undefined });

      // Verify if the retrieved user is present in the array
      const userInArray = response.body.find((user: { _id: string; }) => user._id === originalUserId);
      expect(userInArray).to.exist; // Check if the user is found in the array

      // You can add more specific assertions if needed
      expect(userInArray).to.deep.equal(createdUser);
    });
  });

  // Update user data
  const updatedUserData = {
    name: 'Updated name',
    email: 'updated.email@example.com',
    avatar: 'updated-avatar-url',
    password: 'updated-password',
    date: '2023-11-20',
    activeListings: 1,
  };


  it('PUT /api/users should update the created user', () => {
    // Ensure originalUserId is defined
    expect(originalUserId).to.not.be.undefined;


    // Send a request to update the user
    cy.request('PUT', `${Cypress.env("baseUrl")}/api/users/?userID=${originalUserId}`, updatedUserData).then((response) => {
      expect(response.status).to.eq(200);
      updatedUserId = response.body._id;
      expect(originalUserId).to.equal(updatedUserId);
    });

    // Verify if the updated user is not the same as the created user
    cy.request('GET', `${Cypress.env("baseUrl")}/api/users/${originalUserId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.password).to.equal(updatedUserData.password);
    });
  });








  it('GET /api/userfilter should retrieve the specific user based on filters', () => {
    const filters = { term: 'Updated name' }; // Adjust the filters based on your test data

    cy.request('GET', `${Cypress.env("baseUrl")}/api/userfilter`, { qs: filters })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');

        // Example: Check if the array contains a user that matches the filtering criteria
        const matchingUser = response.body.find((updatedUserData: { name: string; }) => updatedUserData.name.toLowerCase().includes(filters.term.toLowerCase()));
        expect(matchingUser).to.exist;

        // Additional assertions based on the expected response structure
        expect(matchingUser.email).to.eq(updatedUserData.email);
        expect(matchingUser.avatar).to.eq(updatedUserData.avatar);
        // Add more assertions as needed
      })
      .its('status')
      .should('not.equal', 500); // Ensure the status is not 500 (Internal Server Error)
  });


  it('GET /api/userfilter should handle invalid filters gracefully', () => {
    const invalidFilters = {
      invalidKey: 'invalidValue', // Add any invalid filter you want to test
    };

    cy.request({
      method: 'GET',
      url: `${Cypress.env("baseUrl")}/api/userfilter`,
      qs: invalidFilters,
    })
      .then((response) => {
        if (response.status === 400) {
          expect(response.body).to.have.property('error').and.to.include('Invalid filter');
          // You can add more specific assertions based on the expected error response structure
        } else {
          expect(response.status).to.eq(200);
          // Optionally, you can assert other properties when the status is 200
        }

      })
      .its('status')
      .should('not.equal', 500); // Ensure the status is not 500 (Internal Server Error)
  });







  it('DELETE /api/users should delete the created user', () => {
    // Ensure originalUserId is defined
    expect(originalUserId).to.equal(updatedUserId);
    expect(originalUserId).to.not.be.undefined;
    userIdToDelete = originalUserId;

    // Send a request to delete the user
    cy.request('DELETE', `${Cypress.env("baseUrl")}/api/users/?userID=${userIdToDelete}`).then((response) => {
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
      saletype: 'for-sale',
      status: "inactive",
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
      expect(response.body).to.be.an('array');

      // Verify if the retrieved property is present in the array
      const propertyInArray = response.body.find((property: { _id: string; }) => property._id === originalPropertyId);
      expect(propertyInArray).to.exist; // Check if the property is found in the array

      // You can add more specific assertions if needed
      expect(propertyInArray).to.deep.equal(createdProperty);
    });
  });

  const updatedPropertyData = {
    addimg: 'updated-image-url',
    address: 'Updated Address',
    pricetag: 150000,
    bedrooms: 3,
    amenities: 'Updated Amenities',
    description: 'Updated Description',
    postalcode: '54321',
    city: 'Updated City',
    saletype: 'for-rent',
    status: "inactive",
    propertytype: 'Updated Property Type',
  };

  it('PUT /api/property should update the created property', () => {
    // Ensure originalPropertyId and originalUserId are defined
    expect(originalPropertyId).to.not.be.undefined;

    // Update property data

    // Send a request to update the property
    cy.request('PUT', `${Cypress.env("baseUrl")}/api/property/?propertyId=${originalPropertyId}`, updatedPropertyData).then((response) => {
      expect(response.status).to.eq(200);
      // Add assertions for the updated property if needed...
      //   expect(response.body).to.have.property('userId');
      expect(response.body._id).to.equal(originalPropertyId);
    });

    // Verify if the updated property is not the same as the created property
    cy.request('GET', `${Cypress.env("baseUrl")}/api/property/${originalPropertyId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.deep.equal(createdProperty);
    });
  });



  it('GET /api/propertyfilter should retrieve the specific property based on filters', () => {
    const filters = {
      term: 'Updated Address',
      saleType: 'for-rent',
      propertytype: 'Updated Property Type',
      pricetag: '150000',
    };


    cy.request('GET', `${Cypress.env("baseUrl")}/api/propertyfilter`, { qs: filters })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');

        // Example: Check if the array contains a property that matches the filtering criteria
        const matchingProperty = response.body.find((updatedPropertyData: {
          propertytype: any; address: string; saletype: string; bedrooms: string; pricetag: number;
        }) =>
          updatedPropertyData.address.toLowerCase().includes(filters.term.toLowerCase()) &&
          updatedPropertyData.saletype === filters.saleType &&
          updatedPropertyData.propertytype === filters.propertytype &&
          updatedPropertyData.pricetag >= 100000 && updatedPropertyData.pricetag <= 200000
        );
        expect(matchingProperty).to.exist;

        // Additional assertions based on the expected response structure
        expect(matchingProperty.addimg).to.eq(updatedPropertyData.addimg);
        // Add more assertions as needed
      })
      .its('status')
      .should('not.equal', 500); // Ensure the status is not 500 (Internal Server Error)

  });


  it('GET /api/propertyfilter should handle invalid filters', () => {
    const invalidFilters = {
      invalidKey: 'invalidValue', // Add any invalid filter you want to test
    };

    cy.request({
      method: 'GET',
      url: `${Cypress.env("baseUrl")}/api/propertyfilter`,
      qs: invalidFilters,
    })
      .then((response) => {
        if (response.status === 400) {
          expect(response.body).to.have.property('error').and.to.include('Invalid filter');
          // You can add more specific assertions based on the expected error response structure
        } else {
          expect(response.status).to.eq(200);
          // Optionally, you can assert other properties when the status is 200
        }

      })
      .its('status')
      .should('not.equal', 500); // Ensure the status is not 500 (Internal Server Error)
  });




  it('DELETE /api/property should delete the created property', () => {
    // Ensure originalPropertyId is defined
    expect(originalPropertyId).to.not.be.undefined;

    // Send a request to delete the property
    cy.request('DELETE', `${Cypress.env("baseUrl")}/api/property/?propertyId=${originalPropertyId}`).then((response) => {
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


  it('should add an offer', () => {
    // Define offer data
    const offerData = {
      license: 123,
      agency: 'Sample Agency',
      offer: 100000,
      deed_of_sale_date_start: '2023-01-01',
      deed_of_sale_date_end: '2023-12-31',
      broker_buyer_name: 'Sample Broker Buyer',
      client_address: 'Sample Client Address',
      client_email: 'sample.client@example.com',
      status: 'Pending',
      property_address: 'Sample Property Address',
      property_id: 'samplePropertyId',
      client_name: 'Sample Client Name',
      broker_owner: 'validBrokerOwnerId', // Replace with the actual ObjectId of the owner
      broker_buyer: 'validBrokerBuyerId', // Replace with the actual ObjectId of the buyer
    };

    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(offerData),
    };
    // Make a request to add an offer
    //   cy.request({
    //     method: 'POST',
    //     url: `${Cypress.env("baseUrl")}/api/offer`, // Ensure the correct endpoint is specified
    //     body: offerData,
    //     headers: { 'Content-Type': 'application/json' },
    //     failOnStatusCode: false, // Allow non-2xx status codes for troubleshooting
    //   }).then((response) => {
    //     // Assertions
    //     console.log('Response Status:', response.status);
    //     console.log('Response Body:', response.body);
    //     expect(response.status).to.eq(200);
    //     expect(response.body).to.have.property('propertyId');
    //     // Add more assertions as needed
    //   });
    // });

    // it('should get broker offers', () => {
    //   cy.request('GET', `${Cypress.env("baseUrl")}/api/brokeroffer/${validBrokerID}`)
    //     .then((response) => {
    //       expect(response.status).to.eq(200);
    //       expect(response.body).to.be.an('array');
    //       // Add more assertions as needed
    //     });
    // });

    it('should delete an offer', () => {
      // Assuming you have the offerId of the offer you want to delete
      const offerId = 'validOfferId'; // Replace with the actual offerId

      cy.request('DELETE', `${Cypress.env("baseUrl")}/api/offerdelete/?offerId=${offerId}`)
        .then((response) => {
          expect(response.status).to.eq(200);

          // Check if response body is null or undefined
          if (response.body === null || response.body === undefined) {
            // This is expected for successful DELETE requests with no response body
            cy.log('DELETE request returned an empty body (expected)');
          } else {
            // Handle the case where the response body is not empty (unexpected)
            throw new Error('DELETE request returned an unexpected response body');
          }
        });
    });


    it('should log in, navigate to the calculator, and calculate monthly payment', () => {
      // Visit the login page (replace with your actual URL)
      cy.visit('http://localhost:3000/login');

      // Log in
      cy.get('.max-w-2xl > .relative > .inline-flex').type('client@gmail.com'); // Replace with actual username
      cy.get(':nth-child(2) > .relative > .inline-flex').type('client123'); // Replace with actual password


      // Click the login button
      cy.get('.gap-2 > .z-0').click();
      cy.wait(3000);

      // Navigate to the calculator page (replace with your actual URL)
      cy.visit('http://localhost:3000/calculator');

      // Input values into the calculator
      const principal = 320000;
      const interestRate = 0.0703;
      const paymentFrequency = 30

      cy.get(':nth-child(1) > .mt-2').clear().type(principal.toString());
      cy.get(':nth-child(2) > .mt-2').clear().type(paymentFrequency.toString());
      cy.get('.justify-center > .gap-2 > :nth-child(3) > .mt-2').clear().type(interestRate.toString());

      // Assertions for the calculator results
      cy.get('.row-span-2 > .mt-2').should('have.value', 2135.42);

      // INVALID INPUT
      const invalidPrincipal = "abcedfef";
      const invalidInterestRate = 0.0703;
      const invalidPaymentFrequency = 30
      cy.get(':nth-child(1) > .mt-2').clear().type(invalidPrincipal.toString());
      cy.get(':nth-child(2) > .mt-2').clear().type(invalidInterestRate.toString());
      cy.get('.justify-center > .gap-2 > :nth-child(3) > .mt-2').clear().type(invalidPaymentFrequency.toString());

      // Assertions for the calculator results
      cy.get('.row-span-2 > .mt-2').should('have.value', "NaN");
    });
  });
});

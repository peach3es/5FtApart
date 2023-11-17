"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";

import {
  getOffers,
  updateOffer,
  deleteOffer,
} from "../../../backend/lib/helperOffers";
import { rgb } from "color";

interface Offer {
  _id: string;
  brokerName: string;
  license: string;
  agency: string;
  clientName: string;
  currentAddress: string;
  email: string;
  offer: string;
  propertyAddress: string;
  deedofSale: string;
  occupancy: string;
  status:string;
}

const statusColorMap: Record<Offer['status'], string> = {
  accepted: "success",
  rejected: "danger",
  pending: "warning",

};

// Assume we have a broker ID to filter offers
const brokerId = "brokerId123"; // This should come from the logged-in user's context or a prop

function Offer() {
   
  // State to store the offers
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffers(brokerId); // Ensure this function is implemented to fetch offers based on the brokerId
        if(data && Array.isArray(data)) { // Check if data is an array
          setOffers(data);
        } else {
          console.error("Invalid data format received:", data);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };
  
    fetchOffers();
  }, []); 
  return (
    <Table>
      <TableHeader>
        <TableColumn>Broker Name</TableColumn>
        <TableColumn>License #</TableColumn>
        <TableColumn>Agency</TableColumn>
        <TableColumn>Client Name</TableColumn>
        <TableColumn>Current Address</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Offer</TableColumn>
        <TableColumn>Property Address</TableColumn>
        <TableColumn>Deed Of Sale</TableColumn>
        <TableColumn>Occupancy</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody>
        {offers.map((offer) => (
          <TableRow key={offer._id}>
            <TableCell>{offer.brokerName}</TableCell>
            <TableCell>{offer.license}</TableCell>
            <TableCell>{offer.agency}</TableCell>
            <TableCell>{offer.clientName}</TableCell>
            <TableCell>{offer.currentAddress}</TableCell>
            <TableCell>{offer.email}</TableCell>
            <TableCell>{offer.offer}</TableCell>
            <TableCell>{offer.propertyAddress}</TableCell>
            <TableCell>{offer.deedofSale}</TableCell>
            <TableCell>{offer.occupancy}</TableCell>
            <TableCell>
              <Chip color="primary">{offer.status}</Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Offer;

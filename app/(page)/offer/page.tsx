"use client";
import styles from "@/styles/page.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  getOffers
} from "../../../backend/lib/helperOffer";
import Status from "../../../components/Result/offerstatus";

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
  status: string;
}

const statusColorMap: Record<Offer["status"], string> = {
  accepted: "success",
  rejected: "danger",
  pending: "warning",
};

// Assume we have a broker ID to filter offers
const brokerId = "brokerId123"; // This should come from the logged-in user's context or a prop

export default function Offer() {
  // State to store the offers
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffers(brokerId); // Ensure this function is implemented to fetch offers based on the brokerId
        if (data && Array.isArray(data)) {
          // Check if data is an array
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
    <div className="mx-5 h-full">
      <div className="font-bold text-3xl my-5 ml-3"> Offers</div>
      <Table
        className={`rounded-xl ${styles.containershadow}`}
        classNames={{ wrapper: "bg-w", th: "bg-b text-w2 text-sm text-center" }}
      >
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
               <Status/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

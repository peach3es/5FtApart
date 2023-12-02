"uses client";
import React from "react";
import FormData from "../../components/Myproperty/AddProperty";
import { useQuery } from "react-query";
import { getProperties } from "../../backend/lib/helperProperties";
import { useEffect } from "react";
import "../../backend/lib/helper";
import { HeartIcon } from "../Navbar/hearticon";
import { BiSolidHomeHeart } from "react-icons/bi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  CircularProgress,
} from "@nextui-org/react";
import { Link } from "@nextui-org/react";

import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { getProperty } from "../../backend/lib/helperProperties";
import { getPriority } from "os";
import { getUser } from "../../backend/lib/helper";
import { addOffer } from "../../backend/lib/helperOffer";
import { addPropertyToList } from "../../backend/lib/helperFavorite";
import { useQueryClient, useMutation } from "react-query";
import AddBrokerForm from "../CRUD - Brokers/addBrokerForm";
import Users from "@/app/model/user";
import { userAgentFromString } from "next/server";

function PropertyInfo({ propertyId }: { propertyId: any }) {
  const { isLoading, isError, data, error } = useQuery(
    ["properties", propertyId],
    () => getProperty(propertyId) // Modify the getProperties function to accept an ID and fetch a single property
  );
  const { isLoading: isBrokerOwnerLoading, error: BrokerOwnerError, data: BrokerOwnerData } = useQuery(
    ['users', data?.userId],
    () => getUser(data?.userId)
  );
  const addMutation = useMutation(addOffer)

  const [clientName, setClientName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [agency, setAgency] = useState("");
  const [brokerBuyerName, setBrokerBuyerName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientEmailAddress, setClientEmailAddress] = useState("");
  const [offer, setOffer] = useState("");
  const [deedOfSaleDateStart, setDeedOfSaleDateStart] = useState("");
  const [deedOfSaleDateEnd, setDeedOfSaleDateStartEnd] = useState("");
  const [brokerBuyerID, setBrokerBuyerID] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userID, setUserID] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isUserInSession, setIsUserInSession] = useState(false);

  useEffect(() => {
    const getProps = async () => {
      const response = await fetch("/api/auth/session");
      const users = await response.json();
      if (users && users.user){
        setBrokerBuyerName(users.user.name)
        setBrokerBuyerID(users.user.id)
        setUserID(users.user.id)
        setUserRole(users.user.role)
        setIsUserInSession(true)
      }
      else {
        setIsUserInSession(false);
      }
    };
    getProps();
  }, []);

  const handleSubmit = async(e: any) => { 
    if (BrokerOwnerData?._id === brokerBuyerID){
      setMessageColor("#FCC603")
      setMessage("You cannot make an offer to your own property"); 
      setTimeout(() => setMessage(""), 4000); 
      return
    }

    if (userRole === 'client' || userRole === 'admin') {
      setMessageColor("#FCC603")
      setMessage("You cannot make an offer as a client/admin"); 
      setTimeout(() => setMessage(""), 4000); 
      return
    }

    
    const model = {
      license: licenseNumber,
      agency: agency, 
      offer: offer, 
      client_name: clientName,
      deed_of_sale_date_start: deedOfSaleDateStart, 
      deed_of_sale_date_end: deedOfSaleDateEnd, 
      broker_buyer_name: brokerBuyerName,
      client_address: clientAddress,   
      client_email: clientEmailAddress, 
      status: "pending", 
      property_address: data?.address,
      property_id: data?._id,
      broker_owner: BrokerOwnerData?._id,
      broker_buyer: brokerBuyerID,
    }

    try {
      await addOffer(model);
      setMessageColor("#4CAF50")
      setMessage("Offer sent successfully!"); 
      setTimeout(() => setMessage(""), 4000); 
    } catch (error) {
      setMessageColor("#FCC603")
      setMessage("Failed to send the offer.");
      setTimeout(() => setMessage(""), 4000); 
    }

  }


  const handleAddFavorite = async(e: any) => {
    if (isUserInSession) {
      try {
        const user = await getUser(userID)

        if (!user.favoritePropertyIds.includes(propertyId) && BrokerOwnerData?._id  !== userID) {
          await addPropertyToList(userID, propertyId);
          setFavoriteMessage("Added to your favorites!")
        }
        else if (BrokerOwnerData?._id  === userID){
          setFavoriteMessage("Cannot add your own property to favorites!")
        }

        else {
          setFavoriteMessage("Already in your favorites!")
        }

        setIsPopoverOpen(true);
        setTimeout(() => setIsPopoverOpen(false), 2500);

      } catch (error) {
        console.log(error)
      }
    }
    else {
      setFavoriteMessage("You must be logged in to add favorites!")
      setIsPopoverOpen(true);
      setTimeout(() => setIsPopoverOpen(false), 2500);
    }
  }


  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: Offer,
    onOpen: onOffer,
    onOpenChange: onOfferChange,
  } = useDisclosure();

  const handleOfferClick = () => {
    if (isUserInSession) {
      onOffer();
    } else {
      setMessageColor("#FCC603")
      setMessage("You must be logged in to make a offer");
      setTimeout(() => setMessage(""), 4000); 
    }
  };

  if (isLoading)
    return (
      <div className="w-full flex text-xl text-center justify-center items-center h-full">
        <CircularProgress label="Loading..." color="primary" />
      </div>
    );
  if (isError) return <div>Error...</div>;





  return (
    <div className="flex flex-row justify-center my-5 w-full gap-10">
       {message && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: messageColor, // Green background for success
            color: 'white',
            textAlign: 'center',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
            animation: 'fadeInOut 3s ease-in-out',
          }}
        >
          {message}
        </div>
      )}
      <div className="w-1/2 ml-20">
        <Image
          src={data.addimg}
          className="card-img-top"
          width="100%"
          height="100%"
          alt="House"
        />
      </div>

      <div className="w-1/2 flex flex-col gap-2">
        <h2 className="text-4xl font-bold ">{data.address}</h2>
        <p className="text-lg">{data.city}</p>
        <p className="text-lg">{data.postalcode}</p>
        <p className="text-lg">{data.saletype}</p>
        <p className="text-lg">{data.pricetag}</p>
        <h3 className="text-2xl font-bold">Want to visit the Estate?</h3>
       
       <div className="mb-3 flex flex-row gap-3">
       <Button className="w-1/3  bg-pr  text-w2 " onPress={onOpen}>
          Request Visit
        </Button>

        <Button className="w-1/3  bg-pr  text-w2 " onPress={handleOfferClick}>
          Submit an Offer
        </Button>

          <Popover placement="right" isOpen={isPopoverOpen}>
            <PopoverTrigger>
            <Button isIconOnly color="danger" aria-label="Like" onPressEnd={handleAddFavorite}>
                <BiSolidHomeHeart />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">
                  {favoriteMessage}
                </div>
              </div>
            </PopoverContent>
          </Popover>

       </div>

    
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                We will need some basic informations
              </ModalHeader>
              <ModalBody>
                <p className="mb-2">
                  Please put in your full name & email address and a broker will
                  contact you
                </p>
                <div className="mb-3 flex flex-row gap-3">
                  <Input type="faded" label="Full Name" />
                  <Input
                    type="email"
                    label="Email"
                    classNames={{ input: "border-none" }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="w-1/3  bg-pr  text-w2 " onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={Offer} onOpenChange={onOfferChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                We will need some basic informations
              </ModalHeader>
              <ModalBody>
                <p className="mb-2">
                  Please put in your full name & email address and a broker will
                  contact you
                </p>

                <div className="mb-3 flex flex-row gap-3">
                  <Input type="faded" label="Broker Buyer Full Name" defaultValue={brokerBuyerName} disabled  readOnly />
                  <Input
                    type="license #"
                    label="license #"
                    classNames={{ input: "border-none" }}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                  />
                  <Input type="faded" label="Agency" onChange={(e) => setAgency(e.target.value)}/>
                </div>

                <div className="mb-3 flex flex-row gap-3">
                  <Input type="faded" label="Client Full Name" onChange={(e) => setClientName(e.target.value)}/>
                  <Input type="faded" label="Client Address" onChange={(e) => setClientAddress(e.target.value)}/>
                  <Input
                    type="email"
                    label="Email"
                    classNames={{ input: "border-none" }}
                    onChange={(e) => setClientEmailAddress(e.target.value)}
                  />
                  <Input type="faded" label="Offer" onChange={(e) => setOffer(e.target.value)} isRequired/>

                </div>

                <div className="mb-3 flex flex-row gap-3">
                  <p>Please put in the Deed of sale and Occupancy of premises date </p>
                </div>

                <div className="mb-3 flex flex-row gap-3">
                  <Input type="date" onChange={(e) => setDeedOfSaleDateStart(e.target.value)}/>
                  <Input type="date"  onChange={(e) => setDeedOfSaleDateStartEnd(e.target.value)}/>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="w-1/3  bg-pr  text-w2 " onPress={onClose}  onPressEnd={handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PropertyInfo;

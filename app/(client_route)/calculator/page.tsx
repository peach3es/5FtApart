"use client";
import pic from "@/public/pictures/calculator/pic1.jpg";
import "@/styles/calculator.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Logo from "../../../public/5ftapartbw.png";

export default function Home() {
  const [principal, setPrincipal] = useState(1000000);
  const [paymentFrequency, setPaymentFrequency] = useState(12);
  const [interestRate, setInterestRate] = useState(0.0703);
  const [monthlyPayment, setMonthlyPayment] = useState(6745.82);

  const inputRefs = {
    Principal: useRef<HTMLInputElement>(null),
    "Payment Frequency": useRef<HTMLInputElement>(null),
    "Interest Rate": useRef<HTMLInputElement>(null),
    Payments: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    calculateMonthlyPayment();
  }, [principal, paymentFrequency, interestRate]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "Principal":
        setPrincipal(parseFloat(value) || 0);
        break;
      case "Payment Frequency":
        setPaymentFrequency(parseInt(value) || 0);
        break;
      case "Interest Rate":
        setInterestRate(parseFloat(value) || 0);
        break;
      default:
    }
  };

  const calculateMonthlyPayment = () => {
    const numerator =
      (interestRate / 12) * (1 + interestRate / 12) ** (paymentFrequency * 12);
    const denominator = (1 + interestRate / 12) ** (paymentFrequency * 12) - 1;

    const payment = principal * (numerator / denominator);

    setMonthlyPayment(payment);

    if (inputRefs.Payments.current) {
      inputRefs.Payments.current.value = payment.toFixed(2);
    }
  };

  return (
    <div className="flex-grow flex relative">
      <div className="rounded-lg p-5 w-full">
        <Image
          src={pic}
          alt="logo image"
          style={{ height: "90vh" }}
          className="relative w-full object-cover rounded-lg"
        />
      </div>
      <div className="flex place-self-center justify-center absolute w-full">
        <div className=" w-1/4 p-3 bg-w rounded-lg my-20">
          <div className="flex flex-col justify-center  items-center gap-2 p-3 mx-auto">
            <Image src={Logo} alt="logo image" width={250} height={325} />
            <h1 className="font-bold text-2xl mt-5">Mortage calculator</h1>
            <form className="flex flex-col gap-2 p-2" action="#">
              {Object.entries(inputRefs).map(([key, ref]) => (
                <div
                  className={`flex flex-col mt-2 text-center bg-transparent ${
                    key === "Payments"
                      ? "row-span-2 col-span-2 text-center mx-auto bg-b"
                      : ""
                  } `}
                  key={key}
                >
                  <div>{key}</div>
                  {key !== "Payments" ? (
                    <input
                      type="text"
                      name={key}
                      defaultValue={
                        key === "Principal"
                          ? principal
                          : key === "Payment Frequency"
                          ? paymentFrequency
                          : key === "Interest Rate"
                          ? interestRate
                          : " "
                      }
                      className="mt-2 appearance-none rounded-md shadow-md px-4 py-3 font-semibold text-center"
                      ref={ref}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <input
                      readOnly={true}
                      className="mt-2 rounded-md bg-transparent px-4 py-3 text-lg font-bold text-center"
                      value={monthlyPayment.toFixed(2)}
                      ref={inputRefs.Payments}
                    />
                  )}
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

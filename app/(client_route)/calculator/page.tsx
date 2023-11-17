"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Logo from "../../../public/5ftapartbw.png";

export default function Home() {
  const [principal, setPrincipal] = useState(1000000);
  const [paymentFrequency, setPaymentFrequency] = useState(12);
  const [interestRate, setInterestRate] = useState(0.0703);
  const [monthlyPayment, setMonthlyPayment] = useState(6745.82);

  const inputRefs = {
    principal: useRef<HTMLInputElement>(null),
    paymentFrequency: useRef<HTMLInputElement>(null),
    interestRate: useRef<HTMLInputElement>(null),
    monthlyPayment: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    calculateMonthlyPayment();
  }, [principal, paymentFrequency, interestRate]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "principal":
        setPrincipal(parseFloat(value) || 0);
        break;
      case "paymentFrequency":
        setPaymentFrequency(parseInt(value) || 0);
        break;
      case "interestRate":
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

    if (inputRefs.monthlyPayment.current) {
      inputRefs.monthlyPayment.current.value = payment.toFixed(2);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3 justify-center bg-w mx-auto w-1/2 rounded-lg mt-4 mb-4">
      <div className="flex flex-col  justify-center  items-center gap-2 p-3 mx-auto">
        <Image src={Logo} alt="logo image" width={250} height={325} />
        <h1 className="font-bold">Mortage calculator</h1>
        <form className="flex flex-col gap-2 p-2" action="#">
          {Object.entries(inputRefs).map(([key, ref]) => (
            <div
              className={`flex flex-col mt-2 text-center${
                key === "monthlyPayment"
                  ? "row-span-2 col-span-2 text-center mx-auto"
                  : ""
              } `}
              key={key}
            >
              <div>{key.replace(/^\w/, (c) => c.toUpperCase())}</div>
              {key !== "monthlyPayment" ? (
                <input
                  type="text"
                  name={key}
                  defaultValue={
                    key === "principal"
                      ? principal
                      : key === "paymentFrequency"
                      ? paymentFrequency
                      : key =="interestRate"
                      ?interestRate
                      :""
                  }
                  className="mt-2 appearance-none rounded-md shadow-md px-4 py-3 font-semibold text-center"
                  ref={ref}
                  onChange={handleInputChange}
                />
              ) : (
                <div
                  className="mt-2 rounded-md bg-transparent px-4 py-3  text-lg font-bold text-center"
                  ref={ref}
                >
                  {monthlyPayment.toFixed(2)}
                </div>
              )}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

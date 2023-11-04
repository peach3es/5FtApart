"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "../../../../styles/login.css";

export default function Home() {
  const [mortgage, setMortgage] = useState(10000000);
  const [amortization, setAmortization] = useState(25);
  const [paymentFrequency, setPaymentFrequency] = useState(12);
  const [interestRate, setInterestRate] = useState(0.0649);
  const [interestTerm, setInterestTerm] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(500);

  const inputRefs = {
    mortgage: useRef(),
    amortization: useRef(),
    paymentFrequency: useRef(),
    interestRate: useRef(),
    interestTerm: useRef(),
    monthlyPayment: useRef(),
  };

 
  useEffect(() => {
    calculateMonthlyPayment();
  }, [mortgage, amortization, paymentFrequency, interestRate, interestTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "mortgage":
        setMortgage(parseFloat(value) || 0);
        break;
      case "amortization":
        setAmortization(parseInt(value) || 0);
        break;
      case "paymentFrequency":
        setPaymentFrequency(parseInt(value) || 0);
        break;
      case "interestRate":
        setInterestRate(parseFloat(value) || 0);
        break;
      case "interestTerm":
        setInterestTerm(parseFloat(value) || 0);
        break;
      default:
        break;
    }
  };

  const calculateMonthlyPayment = () => {
   
    const monthlyInterestRate = interestRate / 12;
    const n = amortization * paymentFrequency;

    const payment =
      mortgage *
      (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -n)));

    setMonthlyPayment(payment);
    inputRefs.monthlyPayment.current.value = payment.toFixed(2);
  };

  return (
    <div className="flex flex-col gap-3 p-5 justify-center">
      <div>
        <h1>5FtApart</h1>
        <h3>Mortage Calculator</h3>
        <form action="#">
          {Object.entries(inputRefs).map(([key, ref]) => (
            <div key={key}>
              <div>
                {key.replace(/^\w/, (c) => c.toUpperCase())}
              </div>
              <input
                type="text"
                name={key}
                defaultValue={
                  key === "Mortage"
                    ? Mortage
                    : key === "Amortization"
                    ? Amortization
                    : key === "Payment_Frequency"
                    ? Payment_Frequency
                    : key === "interestRate"
                    ? interestRate
                    : key === "interestTerm"
                    ? interestTerm
                    : monthlyPayment
                }
                className={styles[key]}
                ref={ref}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

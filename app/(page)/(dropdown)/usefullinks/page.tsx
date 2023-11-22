import "@/styles/usefullinks.css";
export default function usefulLinks() {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-5 ml-8">Useful Links</h1>
      <div className="flex flex-grow link-container rounded-lg m-8 bg-w">
        <div className="flex flex-col justify-center items-center gap-2 p-3 mx-auto">
          <div className="flex flex-col gap-2 p-2">
            <a
              href="https://www.canada.ca/en/financial-consumer-agency/services/mortgages.html"
              target="_blank"
              rel="noreferrer"
              className="text-center"
            >
              Government of Canada - Mortgages
            </a>
            <a href="/calculator" rel="noreferrer" className="text-center">
              5FtApart - Mortgage Payment Calculator
            </a>
            <a
              href="https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html"
              target="_blank"
              rel="noreferrer"
              className="text-center"
            >
              Government of Canada - Down Payment
            </a>
            <a
              href="https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html"
              target="_blank"
              rel="noreferrer"
              className="text-center"
            >
              Government of Canada - Mortgage Insurance
            </a>
            <a
              href="https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html"
              target="_blank"
              rel="noreferrer"
              className="text-center"
            >
              Government of Canada - Mortgage Fraud
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

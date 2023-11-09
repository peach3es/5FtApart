"use client";

import {
  Card,
  CardBody,
  Divider,
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableCell,
  TableRow,
  getKeyValue,
  Button,
} from "@nextui-org/react";
const rows = [
  {
    key: "1",
    name: "Thomas Kamil Brochet",
    role: "Front End Developer",
    id: "40121143",
  },
  {
    key: "2",
    name: "Charles Atanacio",
    role: "Back End Developer",
    id: "40176314",
  },
  {
    key: "3",
    name: "Alexander Smagorinski",
    role: "Full Stack Developer",
    id: "40190986",
  },
  {
    key: "4",
    name: "Zhan Jun Cheung",
    role: "Front End Developer",
    id: "40212301",
  },
  {
    key: "5",
    name: "Peizhe Tian",
    role: "Full Stack Devekloper",
    id: "40191463",
  },
  {
    key: "6",
    name: "Patrick Cimpean",
    role: "Back End Developer",
    id: "40211106",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "id",
    label: "Studend ID",
  },
];
const HomePage = () => {
  return (
    <div className="p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-6 bold text-3xl font-bold">
          Happy Rainbow Unicorn - Real Estate Web Application
        </h1>
        <Divider />
        <h2 className="text-xl font-bold mt-4 mb-2">
          Technologies Used & Approach
        </h2>
        <Card className="mb-6">
          <CardBody>
            <ul className="list-disc pl-5">
              <li>
                Next.js 13: Web development framework used with React that
                provides Server Side Rendering
              </li>
              <li>
                NextUI v2: CSS library built on top of tailwind to add extra
                stylings to website
              </li>
              <li>Tailwind CSS: CSS library that helps styling the website</li>
              <li>Tailwind Variants: CSS library extension for tailwind</li>
              <li>
                ReactJS: Frontend library to facilitate creation of website
              </li>
              <li>ExpressJS: Backend</li>
              <li>
                Mongoose: Backend database used to store different values for
                users, properties, etc.
              </li>
            </ul>
          </CardBody>
        </Card>
        <Divider />
        <h2 className="mt-4 mb-2 text-xl font-bold">Project Description</h2>
        <p className="mb-4 ml-2">
          A real estate web application is a digital platform designed to
          facilitate the buying, selling, and renting, of real estate
          properties. These applications offer a wide range of features and
          functionalities to streamline the entire real estate transaction
          process, making it more convenient and efficient for users.
        </p>
        <Divider />
        <h2 className="mt-4 mb-2 text-xl font-bold">List of Main Users</h2>
        <p className="ml-2">Home Buyer</p>

        <p className="ml-2">Property Renter</p>

        <p className="mb-4 ml-2">Brokers</p>
        <Divider />
        <h2 className="mb-2 mt-4 text-xl font-bold">Team Members and Roles</h2>

        <Table aria-label="Example table with dynamic content" className="mb-4">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Divider />
        <h2 className="my-4 font-bold text-xl">License</h2>
        <p className="ml-2">
          Licensed under the{" "}
          <a
            href="https://github.com/nextui-org/next-app-template/blob/main/LICENSE"
            className="text-pastelblue"
          >
            MIT license
          </a>
          .
        </p>
        <Button color="secondary" className="mt-6">
          <a
            href="https://github.com/peach3es/Happy_Rainbow_Unicorn-soen341F2023"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Repository
          </a>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;

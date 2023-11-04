"use client"

import { Card,CardBody,CardHeader, Table,TableBody,TableColumn,TableHeader,TableCell,TableRow,getKeyValue, Button } from "@nextui-org/react";
const rows = [
  {
    key: "1",
    name: "Thomas Kamil Brochet",
    role: "Front-End",
    id: "40121143",
  },
  {
    key: "2",
    name: "Charles Atanacio",
    role: "BackEnd",
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
    role: "Front End",
    id: "40212301",
  },
  {
    key: "5",
    name: "Peizhe Tian",
    role: "Front End Developer",
    id: "40191463",
  },
  {
    key: "6",
    name: "Patrick",
    role: "BackEnd",
    id: "40212301",
  }


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
        <h1 className="mb-6 font-weight bold">
          Happy Rainbow Unicorn - Real Estate Web Application
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <h2>Technologies Used & Approach</h2>
          </CardHeader>
          <CardBody>
            <ul className="list-disc pl-5">
              <li>Next.js 13: Web development framework used with React that provides Server Side Rendering</li>
              <li>NextUI v2: CSS library built on top of tailwind to add extra stylings to website</li>
              <li>Tailwind CSS: CSS library that helps styling the website</li>
              <li>Tailwind Variants: CSS library extension for tailwind</li>
              <li>ReactJS: Frontend library to facilitate creation of website</li>
              <li>ExpressJS: Backend</li>
              <li>Mongoose: Backend database used to store different values for users, properties, etc.</li>
             
            </ul>
          </CardBody>
        </Card>

      
        <h2 className="mb-4">Project Description</h2>
        <p>
        A real estate web application is a digital platform designed to facilitate the buying, selling, and renting, of real estate properties. These applications offer a wide range of features and functionalities to streamline the entire real estate transaction process, making it more convenient and efficient for users.
        </p>

        <h2 className="my-4">List of Main Users</h2>
        <p>
          HomeBuyers
        </p>

        <p>
          Property Renter
        </p>

        <p>
          Brokers
        </p>

        <h2 className="my-4" font-weight="bold">Team Members and Roles</h2>
        
        <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>

        <Button color="primary"  className="mt-6">
          <a href="https://github.com/arcazeus/Happy_Rainbow_Unicorn-soen341F2023" target="_blank" rel="noopener noreferrer">
            Visit Repository
          </a>
        </Button>

        <h2 className="my-4">License</h2>
        <p>
          Licensed under the <a href="LICENSE">MIT license</a>.
        </p>
      </div>
    </div>
  );
};

export default HomePage;

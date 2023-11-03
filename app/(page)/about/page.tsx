import { Card,CardBody,CardHeader, Table,TableBody,TableColumn,TableHeader,TableCell,TableRow, Button } from "@nextui-org/react";

const HomePage = () => {
  return (
    <div className="p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-6">
          Happy Rainbow Unicorn - Real Estate Web Application
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <h2>Technologies Used & Approach</h2>
          </CardHeader>
          <CardBody>
            <ul className="list-disc pl-5">
              <li>Next.js 13: Web development framework...</li>
              {/* Add all the technologies similarly */}
            </ul>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h2>How to Use</h2>
          </CardHeader>
          <CardBody>
            <ol className="list-decimal pl-5">
              <li>Clone this repo...</li>
              {/* Add other steps similarly */}
            </ol>
          </CardBody>
        </Card>

        <h2 className="mb-4">Project Description</h2>
        <p>
          {/* Add your project description here */}
        </p>

        <h2 className="my-4">List of Main Use Cases</h2>
        <p>
          {/* Describe use cases here */}
        </p>

        <h2 className="my-4">Team Members and Roles</h2>
        
        <Table>
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>ID</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Vacation</TableCell>
        </TableRow>
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

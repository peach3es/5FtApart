import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export default function App() {
  const items = [
    {
      key: "Pending",
      label: "Pending",
    },
    {
      key: "Refused",
      label: "Refused",
    },
    {
      key: "Accepted",
      label: "Accepted",
    },
   
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Open Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item: { key: string; label: any; }) => (
          <DropdownItem
            key={item.key}
            color={item.key === "Refused" ? "danger" : "default" || item.key=="Accepted" ? "success" : "default" || item.key=="Pending" ? "warning" :"default"}
            className={item.key === "Refused" ? "text-danger" : ""}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from "./icons.jsx";
import Image from "next/image";
import LogoDark from "public/5ftapartbw.png";
import {signOut, useSession} from "next-auth/react"
import { useRouter } from "next/navigation"

export default function App() {
  const {data: session} = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: "MyBroker", link: "/mybroker" },
    { label: "About", link: "/about" },
    { label: "Calculator", link: "/calculator" },
    { label: "Profile", link: "/profile" },
    { label: "Log Out", link: "/logout" },
  ];

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="navbar bg-w"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          {/* logo here */}
          <Link className="font-bold text-inherit" href="/">
            <Image src={LogoDark} alt="logo image" width={150} height={150} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          {/* logo here */}
          <Link className="font-bold text-inherit" href="/">
            <Image
              src={LogoDark}
              alt="logo image"
              width={100}
              height={100}
              className="z-20"
            />
          </Link>
        </NavbarBrand>
        {session?.user?.role === "admin" ? (
          <>
          <NavbarItem>
            <Link href="/mybroker" className="text">
              MyBroker
            </Link>
          </NavbarItem>
          </>) : 
          session?.user?.role === "broker" ? 
            (<NavbarItem>
                <Link href="/myproperty" className="text">
                  MyProperty
                </Link>
              </NavbarItem>) : (<></>)
          }

        <NavbarItem>
          <Link href="/brokers" aria-current="page" className="text">
            Brokers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about" aria-current="page" className="text">
            About
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text button"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Tools
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="5FtApart features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="Calculator to estimate your mortgage."
              startContent={icons.scale}
              href="/calculator"
              as={Link}
              className="text"
            >
              Calculator
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="another dropdown menu"
              startContent={icons.activity}
              as={Link}
            >
              Another dropdown
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="Last dropdown menu"
              startContent={icons.flash}
              as={Link}
            >
              Last one
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent justify="end">
        {session? (<>
        <p>Hello, {session.user.name}! ({session.user.role})</p>
          <NavbarItem>
          <Button
            color="default"
            variant="flat"
            className="text-[#fefbff] button bg-pr hover:ring ring-dpr"
            onPress={() => {
              signOut({ redirect: false }).then(() => {
                  router.push("/login"); // Redirect to the login page after signing out
              });
          }}
          >
            Log out
          </Button>
        </NavbarItem>
        </> 
      

        ): (<>

          <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            href="/login"
            variant="flat"
            className="text button hover:ring ring-g bg-w"
          >
            Login
          </Button>
        </NavbarItem>
                <NavbarItem>
                <Button
                  as={Link}
                  color="default"
                  href="/signup"
                  variant="flat"
                  className="text-[#fefbff] button bg-pr hover:ring ring-dpr"
                >
                  Sign Up
                </Button>
              </NavbarItem>
              </>

        )}
       
      </NavbarContent>

      <NavbarMenu className="navbar-menu">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={item.link}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

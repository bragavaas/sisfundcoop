import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
  } from "@nextui-org/navbar";
  import { Link } from "@nextui-org/link";
  import { Input } from "@nextui-org/input";
  import NextLink from "next/link";
  
  import { siteConfig } from "@/config/site";
  import { ThemeSwitch } from "@/components/theme-switch";
  import {
    SearchIcon,
  } from "@/components/icons";
  
  export const Menu = () => {
    const searchInput = (
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Pesquise..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
      />
    );
  
    return (
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <p style={{color: "#579162"}} className="font-bold text-inherit">SISTEMA DE BRINDES FUNDCOOP</p>
            </NextLink>
          </NavbarBrand>
          <NavbarItem className="hidden sm:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

      </NextUINavbar>
    );
  };
  
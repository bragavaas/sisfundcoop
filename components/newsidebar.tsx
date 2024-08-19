import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
  } from "@nextui-org/navbar";
  import {Image} from "@nextui-org/image";
  import { Link } from "@nextui-org/link";
  import { siteConfig } from "@/config/site";
  import { BsFillHouseFill, BsFileTextFill, BsFillGiftFill, BsFillPencilFill   } from "react-icons/bs";

  export const Newsidebar = () => {
  
    return (
      <NextUINavbar maxWidth="xl" position="sticky" className="flex items-start pt-5">
          <NavbarContent className="mx-4 mt-2 flex flex-col gap-5 items-start">
                <NavbarBrand className="gap-3">
                        <Image
                            src="/fundcoop.png"
                            width={150}
                        />
                </NavbarBrand>
                <NavbarItem className="">
                    <Link className="text-xl flex flex-row gap-4 items-center" color="primary" href="/">
                        <BsFillHouseFill/>
                        <span>Dashboard</span>
                    </Link>
                </NavbarItem>
                <NavbarItem className="">
                    <Link className="text-xl flex flex-row gap-4 items-center" color="primary"  href="/registros">
                        <BsFileTextFill/>
                        <span>Registro</span>
                    </Link>
                </NavbarItem>
                <NavbarItem className="">
                    <Link className="text-xl flex flex-row gap-4 items-center" color="primary" href="/campanhas">
                        <BsFillGiftFill/>
                        <span>Campanhas</span>
                    </Link>
                </NavbarItem>
                <NavbarItem className="">
                    <Link className="text-xl flex flex-row gap-4 items-center" color="primary"  href="/configuracoes">
                        <BsFillPencilFill/>
                        <span>Configurações</span>
                    </Link>
                </NavbarItem>
          </NavbarContent>

      </NextUINavbar>
    );
  };
  
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
  import styles from "../styles/sidebar.module.css";
  import { BsFillHouseFill, BsFileTextFill, BsFillGiftFill, BsFillPencilFill   } from "react-icons/bs";

  export const Newsidebar = () => {
  
    return (
      <NextUINavbar maxWidth="xl" position="sticky" className="flex items-start pt-5">
          <NavbarContent className="mx-4 mt-2 flex flex-col gap-2 items-start">
                <NavbarBrand className="gap-3">
                        <Image
                            src="/fundcoop.png"
                            width={150}
                        />
                </NavbarBrand>
                <NavbarItem className={styles.sidebarItem}>
                    <Link color="foreground"  href="/">
                        <BsFillHouseFill className={styles.sidebarIcon}/>
                        <span className={styles.sidebarSpan}>Dashboard</span>
                    </Link>
                </NavbarItem>
                <NavbarItem className={styles.sidebarItem}>
                    <Link color="foreground"  href="/registros">
                        <BsFileTextFill className={styles.sidebarIcon}/>
                        <span className={styles.sidebarSpan}>Registro</span>
                    </Link>
                </NavbarItem>
                <NavbarItem className={styles.sidebarItem}>
                    <Link color="foreground" href="/campanhas">
                        <BsFillGiftFill className={styles.sidebarIcon}/>
                        <span className={styles.sidebarSpan}>Campanhas</span>
                    </Link>
                </NavbarItem>
                <NavbarItem className={styles.sidebarItem}>
                    <Link color="foreground"  href="/configuracoes">
                        <BsFillPencilFill className={styles.sidebarIcon}/>
                        <span className={styles.sidebarSpan}>Configurações</span>
                    </Link>
                </NavbarItem>
          </NavbarContent>

      </NextUINavbar>
    );
  };
  
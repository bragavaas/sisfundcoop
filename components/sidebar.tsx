"use client"
import React from "react";
import {Image} from "@nextui-org/react";
import { BsFillHouseFill, BsFileTextFill, BsFillGiftFill, BsFillPencilFill   } from "react-icons/bs";
import styles from "../styles/sidebar.module.css";

export const Sidebar = () => {
    return(
        <aside className={styles.container}>
            <div className={styles.sidebarImage}>
                <Image
                width={150}
                alt="NextUI hero Image"
                src="/fundcoop.png"
                />
            </div>
            <div>
                <span>Sistema de Brindes</span>
                <div className={styles.menuLinks}>
                    <div className={styles.sidebarItem}>
                        <BsFillHouseFill className={styles.sidebarIcon}/>
                        <span className={styles.sidebarSpan}>Dashboard</span>
                    </div>
                    <div className={styles.sidebarItem}>
                        <BsFileTextFill className={styles.sidebarIcon}/>
                        <span className={styles.sidebarSpan}>Registro</span>
                    </div>
                    <div className={styles.sidebarItem}>
                        <BsFillGiftFill className={styles.sidebarIcon}/>
                        <span className={styles.sidebarSpan}>Campanhas</span>
                    </div>
                    <div className={styles.sidebarItem}>
                        <BsFillPencilFill className={styles.sidebarIcon}/>
                        <span className={styles.sidebarSpan}>Configurações</span>
                    </div>
                </div>
            </div>
            
        </aside>
    )
}



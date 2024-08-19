"use client"
import React from "react";
import {Image} from "@nextui-org/react";
import { BsFillHouseFill, BsFileTextFill, BsFillGiftFill, BsFillPencilFill   } from "react-icons/bs";

export const Sidebar = () => {
    return(
        <aside >
            <div>
                <Image
                width={150}
                alt="Fundcoop"
                src="/fundcoop.png"
                />
            </div>
            <div>
                <span>Sistema de Brindes</span>
                <div className="flex flex-col space-y-5 text-left">
                    <div className="flex flex-row w-full gap-3.5">
                        <BsFillHouseFill/>
                        <span>Dashboard</span>
                    </div>
                    <div className="flex">
                        <BsFileTextFill/>
                        <span>Registro</span>
                    </div>
                    <div className="flex">
                        <BsFillGiftFill/>
                        <span>Campanhas</span>
                    </div>
                    <div className="flex">
                        <BsFillPencilFill/>
                        <span>Configurações</span>
                    </div>
                </div>
            </div>
            
        </aside>
    )
}



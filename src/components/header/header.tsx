import Eu from "@/assets/eu.jpg";
import { SidebarSheet } from "../sidebar/siderbar-sheet";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <Card className="border-0">
      <CardContent className="flex flex-row items-center justify-between p-4 bg-[#181A1B] border-0">
        <Link to="/"> 
          <img src={Eu} height={35} width={35} alt="Logo da foto" className="rounded-full" />
        </Link>

        <SidebarSheet />
      </CardContent>
    </Card>
  );
}
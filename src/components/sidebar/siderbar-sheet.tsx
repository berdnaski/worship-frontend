import { Button } from "@/components/ui/button";
import Eu from "@/assets/eu.jpg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { MenuIcon, LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export function SidebarSheet() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="text-gray-300 hover:text-white">
          <MenuIcon className="text-gray-300 hover:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#131313] text-white shadow-lg rounded-lg">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-bold">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-between gap-3 border-b border-solid border-[#444] py-5">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={Eu} />
            </Avatar>
            <div>
              <p className="font-bold">Erick</p>
              <p className="text-xs text-muted-foreground">email@example.com</p> 
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-5">
          <Button
            className="justify-start gap-2 text-muted-foreground hover:bg-orange-600 transition" 
            variant="ghost"
            onClick={handleLogout}
          >
            <LogOutIcon size={18} className="text-muted-foreground" />
            Logout
          </Button>
        </div>

        <SheetFooter className="border-t border-solid border-[#444] pt-5">
          <SheetClose asChild>
            <Button type="button" className="text-white transition">
              Fechar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

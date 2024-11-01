import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 
import imgCard from "@/assets/img-jv.png"; 

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid min-h-screen md:grid-cols-[70%_30%]">
      <div className="relative hidden md:block">
        <img
          src={imgCard}
          alt="Concert scene"
          className="absolute inset-0 h-full w-full object-cover brightness-75 filter"
        />
      </div>
      <div className="flex items-start justify-center px-4 py-10 md:px-8"> 
        <div className="w-full max-w-md space-y-6 mt-10"> 
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-br from-pink-300 to-violet-400 p-2">
                <img
                  src={imgCard} 
                  alt="UI Unicorn logo"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-2xl font-semibold text-white">IISC Worship</h2>
            </div>
            <p className="text-xl text-white">Que bom ver você aqui!</p>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-400">
                Nome
              </Label>
              <Input
                id="name"
                placeholder="Insira seu nome..."
                type="text"
                className="bg-zinc-800 text-white h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Insira o seu email..."
                type="email"
                className="bg-zinc-800 text-white h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-400">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Insira sua senha..."
                  className="bg-zinc-800 text-white h-11 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              <Link to="/forgot-password" className="block text-sm text-blue-400 text-right mt-2">
                Forgot password?
              </Link>
            </div>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors duration-300 ease-in-out shadow hover:shadow-lg">
              Sign in
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-950 px-2 text-zinc-400">Or continue with</span>
              </div>
            </div>

            <div className="text-center text-sm text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="text-blue-400">
                Sign up now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
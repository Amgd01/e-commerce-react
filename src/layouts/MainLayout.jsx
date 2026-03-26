import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/useThemeStore";
import { Outlet, Link } from "react-router-dom";
import { Sun, Moon, Globe } from "lucide-react";
import { useSelector } from "react-redux";
import { useLanguage } from "@/context/LanguageContext";

export default function MainLayout() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const {language, toggleLanguage} = useLanguage()
  const content = {
    en: { welcome: "Welcome", home: "Home", cart: "Cart" },
    ar: { welcome: "مرحباً", home: "الرئيسية", cart: "السلة" }
  };
  return (
    <div className={
      `flex flex-col min-h-screen transition-colors duration-300
       ${theme === "dark" ? "dark bg-slate-950" : "bg-background"}`}
       dir={language === "ar" ? "rtl" : "ltr"}>
      <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur z-50">
        <div className="container flex h-16 items-center px-4">
          <div className="hidden md:block mr-4 text-sm font-bold text-primary">
            {content[language].welcome}
          </div>
          <div className="mr-4 sm:mr-8 font-bold text-lg sm:text-xl text-foreground whitespace-nowrap">MY-STORE</div>
          <div className="flex gap-3 sm:gap-6 text-xs sm:text-sm font-medium">
            <Link to="/" className="transition-colors text-foreground/80 hover:text-foreground">{content[language].home}</Link>
            <Link to="/cart" className="transition-colors text-foreground/80 hover:text-foreground">{content[language].cart} {totalItems > 0 && `(${totalItems})`}</Link>
            <Link to="/login" className="transition-colors text-foreground/80 hover:text-foreground">Login</Link>
          </div>
          <div className="ml-auto flex items-center">
            <Button variant="outline" size="sm" onClick={toggleLanguage}>
            <Globe className="mr-2 h-4 w-4" />
            {language === "en" ? "العربية" : "English"}
          </Button>
      <Button
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme}
        className="rounded-full w-9 h-9"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Moon className="h-[1.2rem] w-[1.2rem] text-foreground transition-all" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400 transition-all" />
        )}
      </Button>
         </div>
        </div>
        
      </nav>

   
      <main className="flex-1 container pt-24 pb-8 px-4">
        <Outlet />
      </main>


      <footer className="border-t bg-muted/50">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MY-STORE. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm font-medium text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary">Privacy</Link>
              <Link to="/terms" className="hover:text-primary">Terms</Link>
              <Link to="/contact" className="hover:text-primary">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
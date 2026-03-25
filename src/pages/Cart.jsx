import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate()

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">${item.price} x {item.quantity}</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <div className="text-right text-2xl font-bold">Total: ${total}</div>
    </div>
  );
}
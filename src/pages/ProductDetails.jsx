import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Axios request for a single resource
    axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-card border rounded-xl">
       <div className="grid md:grid-cols-2 gap-8">
          <img src={product.images[0]} alt={product.title} className="rounded-lg" />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <p className="text-2xl font-semibold text-primary">${product.price}</p>
            <p className="text-muted-foreground">{product.description}</p>
            <Button variant="outline" onClick={() => navigate("/")}>Back</Button>
          </div>
       </div>
    </div>
  );
}
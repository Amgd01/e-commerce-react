import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios"; 
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FilterX } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryName = searchParams.get("category");
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://api.escuelajs.co/api/v1/products");
        setProducts(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);


  const filteredProducts = categoryName
    ? products.filter((p) => p.category.name.toLowerCase() === categoryName.toLowerCase())
    : products;

  const cleanImage = (imgArray) => {
    const img = imgArray?.[0] || "";
    if (img.startsWith("[") || img.startsWith('"')) {
      return img.replace(/[\[\]"']/g, "");
    }
    return img || "https://placehold.co/400";
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <Loader2 className="animate-spin h-10 w-10 text-primary" />
      <p className="text-muted-foreground animate-pulse">Fetching latest products...</p>
    </div>
  );
  
  if (error) return <div className="text-center py-20 text-destructive font-semibold">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6 text-foreground">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight capitalize">
            {categoryName ? categoryName : "All Products"}
          </h1>
          <p className="text-muted-foreground">
            Currently Browsing: <span className="text-foreground font-medium">{categoryName || "Everything"}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button 
            variant={categoryName === "electronics" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSearchParams({ category: "electronics" })}
          >
            Electronics
          </Button>
          <Button 
            variant={categoryName === "furniture" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSearchParams({ category: "furniture" })}
          >
            Furniture
          </Button>
          <Button 
            variant={categoryName === "shoes" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSearchParams({ category: "shoes" })}
          >
            Shoes
          </Button>
          <Button 
            variant={categoryName === "miscellaneous" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSearchParams({ category: "miscellaneous" })}
          >
            Misc
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSearchParams({})}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            
            <Card key={product.id} className="flex flex-col h-full hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="h-56 overflow-hidden bg-muted">
                <img 
                  src={cleanImage(product.images)} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => { e.target.src = "https://placehold.co/400"; }}
                />
              </div>
              <CardHeader className="p-4">
                <div className="text-xs font-semibold text-primary uppercase mb-1">
                  {product.category.name}
                </div>
                <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                  {product.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-2 flex-grow">
                <p className="text-2xl font-bold">${product.price}</p>
              </CardContent>
              <CardFooter className="p-4 border-t flex flex-col">
                <Button className="w-full shadow-none" onClick={() => 
                  { dispatch(addToCart(product))}}>
                  Add To Cart
                </Button>
                <Link to={`/product/${product.id}`} className="w-full">
                  <Button className="w-full shadow-none">
                  View details
                </Button>
                </Link>
                
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-3 border rounded-xl border-dashed">
          <FilterX className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-muted-foreground">Try selecting a different category.</p>
          <Button variant="link" onClick={() => setSearchParams({})}>Show all products</Button>
        </div>
      )}
    </div>
  );
}
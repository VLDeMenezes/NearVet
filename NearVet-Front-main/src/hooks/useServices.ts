import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import {
  productsService,
  serviceServices,
} from "@/lib/Services/appointService";

export const useServices = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const URL_CATEGORY = process.env.NEXT_PUBLIC_CATEGORY_SERVICE;
  const fetchingCategory = async () => {
    const responseCategory = await fetch(`${API_URL}${URL_CATEGORY}`);
    const categoryJson = await responseCategory.json();

    categoryJson.map((item: any) => {
      if (item.categoryService === "Veterinaria") {
        setCategory(item.id);
      }
    });
  };
  const fetching = async () => {
    const returnServices = await serviceServices(category as string);
    const returnProducts = await productsService();
    setServices(returnServices);
    setProducts(returnProducts);
  };
  useEffect(() => {
    fetchingCategory();
  }, []);
  useEffect(() => {
    if (category === null) return;
    try {
      setLoading(true);
      fetching();
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  return { services, loading, products, error };
};

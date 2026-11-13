import { useEffect, useState } from "react";
import { subscribeToVendors } from "../services/vendors.js";

const vendorOrder = [
  "Saruwar Café",
  "Pakistani Kitchen",
  "Kafe Mahallah Ali",
  "Campus Coffee Corner",
  "Aubasani Bistro",
  "ShaqNomNom",
];

export function useVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToVendors(
      (vendorList) => {
        const sortedVendors = [...vendorList].sort((a, b) => {
          const aPosition = vendorOrder.indexOf(a.name);
          const bPosition = vendorOrder.indexOf(b.name);

          return (
            (aPosition === -1 ? Infinity : aPosition) -
            (bPosition === -1 ? Infinity : bPosition)
          );
        });

        setVendors(sortedVendors);
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Could not load vendors.");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return { vendors, loading, error };
}

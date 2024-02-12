"use client"
import { useEffect, useState } from "react";
const useDrivePulseLoading  = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);
    return {loading}
};

export default useDrivePulseLoading ;
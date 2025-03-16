"use client";

import { useEffect, useState, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({
  children,
  fallback = <div className="p-4 text-gray-400">加载中...</div>,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : fallback;
};

export default ClientOnly;

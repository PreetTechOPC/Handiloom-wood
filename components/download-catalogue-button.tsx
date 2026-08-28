"use client";

import { Button } from "@/components/ui/button";

interface DownloadCatalogueButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

export function DownloadCatalogueButton({ 
  className = "", 
  variant = "outline",
  size = "lg",
  children = "Download Catalogue"
}: DownloadCatalogueButtonProps) {
  const handleDownload = () => {
    const files = [
      "/Big sculptures lated.pdf",
      "/HLW Mixed Marble.pdf",
      "/HLW sculpture latest.pdf",
      "/Travertine Latest.pdf",
    ];

    files.forEach((file) => {
      const link = document.createElement("a");
      link.href = file;
      link.download = file.split("/").pop() || "catalogue.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <Button
      onClick={handleDownload}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
}

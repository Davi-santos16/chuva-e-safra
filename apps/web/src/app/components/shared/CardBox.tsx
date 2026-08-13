"use client";
import { Card } from "@/components/ui/card";

interface MyAppProps {
  children: React.ReactNode;
  className?: string;
}
const CardBox: React.FC<MyAppProps> = ({ children, className }) => {
  return (
    <Card className={`card rounded-lg border border-border shadow-sm ${className ?? ''}`}>
      {children}
    </Card>
  );

};

export default CardBox;

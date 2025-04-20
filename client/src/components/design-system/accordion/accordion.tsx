import React, { useState, createContext, useContext } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Context for managing accordion state
type AccordionContextType = {
  expanded: string[];
  toggle: (id: string) => void;
  allowMultiple: boolean;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

// Main Accordion Component
export interface AccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
  defaultIndex?: string | string[];
  className?: string;
  onChange?: (expandedItems: string[]) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  defaultIndex = [],
  className,
  onChange,
}) => {
  // Convert defaultIndex to array format
  const initialExpanded = Array.isArray(defaultIndex) 
    ? defaultIndex 
    : defaultIndex ? [defaultIndex] : [];

  const [expanded, setExpanded] = useState<string[]>(initialExpanded);

  const toggle = (id: string) => {
    setExpanded(prevExpanded => {
      let newExpanded: string[];
      
      if (prevExpanded.includes(id)) {
        // Remove item
        newExpanded = prevExpanded.filter(itemId => itemId !== id);
      } else {
        // Add item (respecting allowMultiple)
        newExpanded = allowMultiple 
          ? [...prevExpanded, id] 
          : [id];
      }
      
      // Call onChange if provided
      if (onChange) {
        onChange(newExpanded);
      }
      
      return newExpanded;
    });
  };

  return (
    <AccordionContext.Provider value={{ expanded, toggle, allowMultiple }}>
      <div className={cn("divide-y divide-neutral-200 dark:divide-neutral-700", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// Accordion Item Component
export interface AccordionItemProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  id,
  className,
}) => {
  return (
    <div 
      className={cn("accordion-item", className)} 
      data-state="closed"
      data-component="accordion-item"
    >
      {children}
    </div>
  );
};

// Accordion Trigger Component
export interface AccordionTriggerProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  id,
  className,
}) => {
  const { expanded, toggle } = useAccordionContext();
  const isExpanded = expanded.includes(id);

  return (
    <h3>
      <button
        className={cn(
          "flex justify-between items-center w-full px-4 py-4 text-left font-medium",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          className
        )}
        onClick={() => toggle(id)}
        aria-expanded={isExpanded}
        aria-controls={`accordion-panel-${id}`}
        id={`accordion-trigger-${id}`}
      >
        <span>{children}</span>
        <ChevronDown 
          className={cn(
            "h-5 w-5 text-neutral-500 transition-transform duration-200",
            isExpanded && "rotate-180"
          )} 
        />
      </button>
    </h3>
  );
};

// Accordion Content Component
export interface AccordionContentProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  id,
  className,
}) => {
  const { expanded } = useAccordionContext();
  const isExpanded = expanded.includes(id);

  return (
    <div
      id={`accordion-panel-${id}`}
      role="region"
      aria-labelledby={`accordion-trigger-${id}`}
      className={cn(
        "px-4 pb-5 overflow-hidden transition-all",
        isExpanded ? "animate-accordion-down" : "animate-accordion-up h-0",
        className
      )}
      hidden={!isExpanded}
      data-state={isExpanded ? "open" : "closed"}
    >
      {children}
    </div>
  );
};

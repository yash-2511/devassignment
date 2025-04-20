import React, { useState, createContext, useContext, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Context for managing tabs state
type TabsContextType = {
  selectedTab: string;
  setSelectedTab: (id: string) => void;
  registerTabId: (id: string) => void;
  tabIds: string[];
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
};

// Main Tabs Component
export interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
  ariaLabel: string;
}

export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue,
  value,
  onValueChange,
  className,
  orientation = "horizontal",
  ariaLabel,
}) => {
  const [selectedTab, setSelectedTabState] = useState<string>(defaultValue || "");
  const [tabIds, setTabIds] = useState<string[]>([]);

  // Controlled vs uncontrolled handling
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : selectedTab;

  // Register tab IDs for keyboard navigation
  const registerTabId = (id: string) => {
    setTabIds(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
    
    // Set the first tab as default if none is specified
    if (!defaultValue && !value && tabIds.length === 0) {
      setSelectedTabState(id);
    }
  };

  const setSelectedTab = (id: string) => {
    if (!isControlled) {
      setSelectedTabState(id);
    }
    if (onValueChange) {
      onValueChange(id);
    }
  };

  return (
    <TabsContext.Provider value={{ selectedTab: currentValue, setSelectedTab, registerTabId, tabIds }}>
      <div 
        className={cn(
          "data-[orientation=vertical]:flex data-[orientation=vertical]:space-x-4",
          className
        )}
        data-orientation={orientation}
        data-component="tabs"
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Tab List Component
export interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabList: React.FC<TabListProps> = ({
  children,
  className,
}) => {
  const { tabIds, selectedTab, setSelectedTab } = useTabsContext();
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!tabListRef.current) return;
    
    const currentIndex = tabIds.indexOf(selectedTab);
    
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        if (currentIndex < tabIds.length - 1) {
          setSelectedTab(tabIds[currentIndex + 1]);
        } else {
          setSelectedTab(tabIds[0]); // Wrap around to first
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (currentIndex > 0) {
          setSelectedTab(tabIds[currentIndex - 1]);
        } else {
          setSelectedTab(tabIds[tabIds.length - 1]); // Wrap around to last
        }
        break;
      case "Home":
        e.preventDefault();
        setSelectedTab(tabIds[0]);
        break;
      case "End":
        e.preventDefault();
        setSelectedTab(tabIds[tabIds.length - 1]);
        break;
      default:
        break;
    }
  };
  
  return (
    <div
      className={cn(
        "border-b border-neutral-200 dark:border-neutral-700",
        className
      )}
      role="tablist"
      ref={tabListRef}
      onKeyDown={handleKeyDown}
    >
      <div className="flex space-x-8">
        {children}
      </div>
    </div>
  );
};

// Tab Component
export interface TabProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  disabled?: boolean;
}

export const Tab: React.FC<TabProps> = ({
  children,
  value,
  className,
  disabled = false,
}) => {
  const { selectedTab, setSelectedTab, registerTabId } = useTabsContext();
  const isSelected = selectedTab === value;
  const tabRef = useRef<HTMLButtonElement>(null);
  
  // Register this tab's ID
  useEffect(() => {
    registerTabId(value);
  }, [value, registerTabId]);
  
  // Focus the tab when it becomes selected via keyboard navigation
  useEffect(() => {
    if (isSelected && tabRef.current && document.activeElement?.tagName !== "BUTTON") {
      tabRef.current.focus();
    }
  }, [isSelected]);

  return (
    <button
      ref={tabRef}
      role="tab"
      aria-selected={isSelected}
      aria-controls={`tab-panel-${value}`}
      id={`tab-${value}`}
      tabIndex={isSelected ? 0 : -1}
      className={cn(
        "border-b-2 py-4 px-1 text-sm font-medium whitespace-nowrap",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isSelected
          ? "border-primary text-primary"
          : "border-transparent text-neutral-600 hover:text-neutral-700 hover:border-neutral-300",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={() => !disabled && setSelectedTab(value)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Tab Panels Container
export interface TabPanelsProps {
  children: React.ReactNode;
  className?: string;
}

export const TabPanels: React.FC<TabPanelsProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("py-6", className)}>
      {children}
    </div>
  );
};

// Tab Panel Component
export interface TabPanelProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  className,
}) => {
  const { selectedTab } = useTabsContext();
  const isSelected = selectedTab === value;

  return (
    <div
      role="tabpanel"
      id={`tab-panel-${value}`}
      aria-labelledby={`tab-${value}`}
      hidden={!isSelected}
      tabIndex={0}
      className={cn(
        "focus:outline-none",
        className
      )}
    >
      {isSelected && children}
    </div>
  );
};

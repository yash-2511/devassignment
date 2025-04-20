import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SidebarItemBase {
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SidebarItemWithHref extends SidebarItemBase {
  href: string;
  onClick?: never;
  isActive?: boolean;
  items?: never;
}

export interface SidebarItemWithOnClick extends SidebarItemBase {
  href?: never;
  onClick: () => void;
  isActive?: boolean;
  items?: never;
}

export interface SidebarItemWithChildren extends SidebarItemBase {
  href?: never;
  onClick?: never;
  isActive?: boolean;
  items: (SidebarItemWithHref | SidebarItemWithOnClick)[];
}

export type SidebarItem = SidebarItemWithHref | SidebarItemWithOnClick | SidebarItemWithChildren;

export interface SidebarNavigationProps {
  items: SidebarItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  items,
  title = "Components",
  subtitle = "Browse the complete library",
  className,
  collapsible = false,
  defaultCollapsed = false,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (label: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const toggleSidebar = () => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <aside
      className={cn(
        "bg-background border-r border-neutral-200 dark:border-neutral-700 overflow-y-auto transition-all",
        collapsed ? "w-16" : "w-64",
        className
      )}
      data-component="sidebar-navigation"
      data-collapsed={collapsed}
    >
      <div className="h-full flex flex-col py-6">
        {collapsible && (
          <button 
            onClick={toggleSidebar}
            className="absolute top-4 right-2 p-1 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg 
              className={cn("h-5 w-5 transition-transform", collapsed ? "rotate-180" : "")}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        
        {!collapsed && (
          <div className="px-4 mb-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{title}</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{subtitle}</p>
          </div>
        )}

        <nav className="flex-1 space-y-1 px-2" aria-label="Sidebar">
          {items.map((item, index) => {
            // Item with children (expandable section)
            if ('items' in item && item.items) {
              const isExpanded = expandedSections[item.label] || false;
              
              return (
                <div className="space-y-1" key={index} data-expanded={isExpanded}>
                  <button
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      collapsed ? "justify-center" : "",
                      item.isActive
                        ? "text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60",
                      item.disabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => !item.disabled && toggleSection(item.label)}
                    aria-expanded={isExpanded}
                    disabled={item.disabled}
                  >
                    <span className={cn("flex items-center", collapsed && "justify-center")}>
                      {item.icon && (
                        <span className={cn("mr-2", collapsed && "mr-0")}>{item.icon}</span>
                      )}
                      {!collapsed && <span>{item.label}</span>}
                    </span>
                    {!collapsed && (
                      <ChevronDown 
                        className={cn(
                          "h-5 w-5 transition-transform", 
                          isExpanded ? "rotate-180" : ""
                        )} 
                      />
                    )}
                  </button>
                  
                  {!collapsed && isExpanded && (
                    <div className="pl-3 space-y-1">
                      {item.items.map((subItem, subIndex) => (
                        <SidebarLink 
                          key={subIndex}
                          item={subItem}
                          collapsed={collapsed}
                          className="pl-8" // Indent sub-items
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            // Regular item
            return (
              <SidebarLink 
                key={index}
                item={item}
                collapsed={collapsed}
              />
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

// Helper component for sidebar links
type SidebarLinkProps = {
  item: SidebarItemWithHref | SidebarItemWithOnClick;
  collapsed: boolean;
  className?: string;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ item, collapsed, className }) => {
  // Handle onClick or href
  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }
    
    if ('onClick' in item && item.onClick) {
      e.preventDefault();
      item.onClick();
    }
  };
  
  // Determine if it should have href
  const isLink = 'href' in item && item.href;
  
  // Common props for both button and anchor
  const commonProps = {
    className: cn(
      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
      collapsed ? "justify-center" : "",
      item.isActive
        ? "text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20"
        : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 hover:text-neutral-900 dark:hover:text-neutral-100",
      item.disabled && "opacity-50 cursor-not-allowed",
      className
    ),
    'aria-current': item.isActive ? 'page' : undefined,
    onClick: handleClick,
    disabled: item.disabled,
  };
  
  const contentElements = (
    <>
      {item.icon && (
        <span className={cn("mr-2", collapsed && "mr-0")}>{item.icon}</span>
      )}
      {!collapsed && <span>{item.label}</span>}
    </>
  );
  
  return isLink ? (
    <a 
      href={item.href} 
      {...commonProps} 
      data-active={item.isActive || undefined}
    >
      {contentElements}
    </a>
  ) : (
    <button 
      type="button" 
      {...commonProps}
      data-active={item.isActive || undefined}
    >
      {contentElements}
    </button>
  );
};

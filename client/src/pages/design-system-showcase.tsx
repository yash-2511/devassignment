import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ColorPaletteItem, ColorScales, ThemeToggle, useTheme } from "@/components/design-system/color-system/color-palette";
import { colorPalette } from "@/components/design-system/color-system/color-tokens";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/design-system/accordion/accordion";
import { Badge } from "@/components/design-system/badge/badge";
import { 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel 
} from "@/components/design-system/tabs/tabs";
import { 
  TopNavigation 
} from "@/components/design-system/top-navigation/top-navigation";
import { 
  SidebarNavigation 
} from "@/components/design-system/sidebar-navigation/sidebar-navigation";
import { 
  Home, 
  Package, 
  LineChart, 
  Settings, 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Info 
} from "lucide-react";

// FAQs data for accordion
const faqs = [
  {
    id: "1",
    question: "What is a design system?",
    answer: "A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications. It contains visual elements, code components, and documentation."
  },
  {
    id: "2",
    question: "Why use TypeScript for components?",
    answer: "TypeScript enhances component development by providing type safety, better documentation through interfaces, and improved developer experience with autocompletion and error checking."
  },
  {
    id: "3",
    question: "How to ensure accessibility in components?",
    answer: "Ensure proper semantic HTML, ARIA roles, keyboard navigation, sufficient color contrast ratios, and focus management. Regular testing with assistive technologies and following WCAG guidelines is essential."
  }
];

// Navigation items for the sidebar
const sidebarItems = [
  {
    label: "Foundation",
    icon: <Package className="h-5 w-5" />,
    items: [
      { label: "Colors", href: "#colors", isActive: true },
      { label: "Typography", href: "#typography" },
      { label: "Layout", href: "#layout" },
      { label: "Icons", href: "#icons" }
    ]
  },
  {
    label: "Data Display",
    icon: <LineChart className="h-5 w-5" />,
    items: [
      { label: "Accordion", href: "#accordion" },
      { label: "Badges & Tags", href: "#badges" },
      { label: "Tooltip", href: "#tooltip" },
      { label: "Progress", href: "#progress" }
    ]
  },
  {
    label: "Navigation",
    icon: <Settings className="h-5 w-5" />,
    items: [
      { label: "Top Navigation", href: "#navbar" },
      { label: "Sidebar", href: "#sidebar" },
      { label: "Tabs", href: "#tabs" },
      { label: "Breadcrumbs", href: "#breadcrumbs" }
    ]
  }
];

// Navigation items for the top navigation
const navItems = [
  { label: "Home", href: "#", isActive: true },
  { label: "Components", href: "#" },
  { label: "Guidelines", href: "#" },
  { label: "Resources", href: "#" },
];

const InfoBanner: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-info-50 dark:bg-info-900/20 border-l-4 border-info-500 dark:border-info-600 p-4 mb-8 rounded-r-lg">
    <div className="flex">
      <div className="flex-shrink-0">
        <Info className="h-5 w-5 text-info-500 dark:text-info-400" aria-hidden="true" />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-info-800 dark:text-info-300">{title}</h3>
        <div className="mt-2 text-sm text-info-700 dark:text-info-400">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const DosDonts: React.FC = () => (
  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
    <div className="card rounded-lg p-6 border border-success-200 dark:border-success-800 border-l-4">
      <h3 className="text-lg font-medium text-success-700 dark:text-success-400 mb-3">Do's</h3>
      <ul className="space-y-2">
        <li className="flex items-start">
          <CheckCircle2 className="h-5 w-5 text-success-500 mr-2 mt-0.5" />
          <span>Use meaningful tab labels that clearly describe the content</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-5 w-5 text-success-500 mr-2 mt-0.5" />
          <span>Maintain consistent styling for the active vs. inactive tabs</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-5 w-5 text-success-500 mr-2 mt-0.5" />
          <span>Include visual indicators (like underlines) for the selected tab</span>
        </li>
      </ul>
    </div>
    
    <div className="card rounded-lg p-6 border border-error-200 dark:border-error-800 border-l-4">
      <h3 className="text-lg font-medium text-error-700 dark:text-error-400 mb-3">Don'ts</h3>
      <ul className="space-y-2">
        <li className="flex items-start">
          <AlertCircle className="h-5 w-5 text-error-500 mr-2 mt-0.5" />
          <span>Use tabs for sequential process steps (use a stepper instead)</span>
        </li>
        <li className="flex items-start">
          <AlertCircle className="h-5 w-5 text-error-500 mr-2 mt-0.5" />
          <span>Create more than 6-7 tabs in a single component</span>
        </li>
        <li className="flex items-start">
          <AlertCircle className="h-5 w-5 text-error-500 mr-2 mt-0.5" />
          <span>Use vague or similar labels for different tabs</span>
        </li>
      </ul>
    </div>
  </div>
);

const PropertyTable: React.FC<{ properties: Array<{ prop: string; type: string; defaultValue: string; description: string }> }> = ({ properties }) => (
  <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-700 rounded-lg">
    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
      <thead className="bg-neutral-50 dark:bg-neutral-800">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Prop</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Type</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Default</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Description</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
        {properties.map((prop, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-100">{prop.prop}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400 font-mono">{prop.type}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400 font-mono">{prop.defaultValue}</td>
            <td className="px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400">{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DesignSystemShowcase: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [tags, setTags] = useState(['React', 'TypeScript', 'TailwindCSS']);
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div id="app" className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <TopNavigation 
        title="Enterprise DS" 
        items={navItems}
        actions={<ThemeToggle />}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="hidden md:block">
          <SidebarNavigation 
            title="Components" 
            subtitle="Browse the complete library"
            items={sidebarItems} 
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="#" className="inline-flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-neutral-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <a href="#" className="ml-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary md:ml-2">Components</a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-neutral-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-neutral-500 dark:text-neutral-400 md:ml-2">Color System</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Color System Section */}
          <div id="colors" className="mb-12">
            <h1 className="text-3xl font-bold mb-6">Color System</h1>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8 max-w-3xl">
              Our token-based color system is designed for B2B enterprise applications with accessibility in mind. 
              All colors meet WCAG 2.1 standards and support both light and dark themes.
            </p>

            {/* Color System Tabs */}
            <Tabs defaultValue="primary" ariaLabel="Color System Tabs" className="mb-8">
              <TabList>
                <Tab value="primary">Primary Colors</Tab>
                <Tab value="semantic">Semantic Colors</Tab>
                <Tab value="neutral">Neutral Colors</Tab>
              </TabList>

              <TabPanels>
                {/* Primary Colors Tab Panel */}
                <TabPanel value="primary">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    {/* Primary Color */}
                    <ColorPaletteItem
                      variant="Primary Brand Color"
                      label="Primary"
                      color={colorPalette.primary[600]}
                      colorValue="hsl(221, 83%, 53%)"
                      scales={
                        <ColorScales
                          variant="primary"
                          scales={[
                            { scale: "50", color: colorPalette.primary[50] },
                            { scale: "200", color: colorPalette.primary[200] },
                            { scale: "400", color: colorPalette.primary[400] },
                            { scale: "600", color: colorPalette.primary[600] },
                            { scale: "800", color: colorPalette.primary[800] },
                          ]}
                        />
                      }
                    />

                    {/* Secondary Color */}
                    <ColorPaletteItem
                      variant="Secondary Brand Color"
                      label="Secondary"
                      color={colorPalette.secondary[600]}
                      colorValue="hsl(255, 70%, 58%)"
                      scales={
                        <ColorScales
                          variant="secondary"
                          scales={[
                            { scale: "50", color: colorPalette.secondary[50] },
                            { scale: "200", color: colorPalette.secondary[200] },
                            { scale: "400", color: colorPalette.secondary[400] },
                            { scale: "600", color: colorPalette.secondary[600] },
                            { scale: "800", color: colorPalette.secondary[800] },
                          ]}
                        />
                      }
                    />

                    {/* Tertiary Color */}
                    <ColorPaletteItem
                      variant="Tertiary Brand Color"
                      label="Tertiary"
                      color={colorPalette.tertiary[600]}
                      colorValue="hsl(333, 71%, 51%)"
                      scales={
                        <ColorScales
                          variant="tertiary"
                          scales={[
                            { scale: "50", color: colorPalette.tertiary[50] },
                            { scale: "200", color: colorPalette.tertiary[200] },
                            { scale: "400", color: colorPalette.tertiary[400] },
                            { scale: "600", color: colorPalette.tertiary[600] },
                            { scale: "800", color: colorPalette.tertiary[800] },
                          ]}
                        />
                      }
                    />
                  </div>
                </TabPanel>

                {/* Semantic Colors Tab Panel */}
                <TabPanel value="semantic">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                    {/* Success Color */}
                    <ColorPaletteItem
                      variant="Positive Status"
                      label="Success"
                      color={colorPalette.success[500]}
                      colorValue="hsl(160, 84%, 39%)"
                      scales={
                        <ColorScales
                          variant="success"
                          scales={[
                            { scale: "50", color: colorPalette.success[50] },
                            { scale: "500", color: colorPalette.success[500] },
                            { scale: "700", color: colorPalette.success[700] },
                          ]}
                        />
                      }
                    />

                    {/* Error Color */}
                    <ColorPaletteItem
                      variant="Negative Status"
                      label="Error"
                      color={colorPalette.error[500]}
                      colorValue="hsl(0, 84%, 60%)"
                      scales={
                        <ColorScales
                          variant="error"
                          scales={[
                            { scale: "50", color: colorPalette.error[50] },
                            { scale: "500", color: colorPalette.error[500] },
                            { scale: "700", color: colorPalette.error[700] },
                          ]}
                        />
                      }
                    />

                    {/* Warning Color */}
                    <ColorPaletteItem
                      variant="Caution Status"
                      label="Warning"
                      color={colorPalette.warning[500]}
                      colorValue="hsl(36, 100%, 50%)"
                      scales={
                        <ColorScales
                          variant="warning"
                          scales={[
                            { scale: "50", color: colorPalette.warning[50] },
                            { scale: "500", color: colorPalette.warning[500] },
                            { scale: "700", color: colorPalette.warning[700] },
                          ]}
                        />
                      }
                    />

                    {/* Info Color */}
                    <ColorPaletteItem
                      variant="Information Status"
                      label="Info"
                      color={colorPalette.info[500]}
                      colorValue="hsl(217, 91%, 60%)"
                      scales={
                        <ColorScales
                          variant="info"
                          scales={[
                            { scale: "50", color: colorPalette.info[50] },
                            { scale: "500", color: colorPalette.info[500] },
                            { scale: "700", color: colorPalette.info[700] },
                          ]}
                        />
                      }
                    />
                  </div>
                </TabPanel>

                {/* Neutral Colors Tab Panel */}
                <TabPanel value="neutral">
                  <div className="grid grid-cols-1 gap-6 pt-6">
                    {/* Neutral Colors */}
                    <ColorPaletteItem
                      variant="UI Elements"
                      label="Neutral"
                      color={colorPalette.neutral[500]}
                      colorValue="hsl(220, 9%, 46%)"
                      scales={
                        <div className="grid grid-cols-5 md:grid-cols-10 gap-1">
                          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((scale) => (
                            <div
                              key={`neutral-${scale}`}
                              style={{ backgroundColor: colorPalette.neutral[scale as keyof typeof colorPalette.neutral] }}
                              className={`h-8 rounded text-xs flex items-center justify-center ${
                                scale > 400 ? "text-white" : "text-neutral-800"
                              }`}
                            >
                              {scale}
                            </div>
                          ))}
                        </div>
                      }
                    />
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>

            {/* Accessibility Info */}
            <InfoBanner title="Accessibility Note">
              <p>
                All colors in our system have been tested to meet WCAG 2.1 AA standards for contrast ratio (4.5:1 for normal text, 3:1 for large text). 
                When using these colors, ensure proper contrast between text and background.
              </p>
            </InfoBanner>
          </div>

          {/* Accordion Component Section */}
          <div id="accordion" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Accordion Component</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8 max-w-3xl">
              Accordions allow users to expand and collapse sections of content, making interfaces more compact and scannable. 
              Our implementation supports keyboard navigation and ARIA for accessibility.
            </p>
            
            {/* Accordion Demo */}
            <div className="max-w-3xl border border-neutral-200 dark:border-neutral-700 rounded-lg divide-y divide-neutral-200 dark:divide-neutral-700">
              <Accordion defaultIndex={["1"]}>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} id={faq.id}>
                    <AccordionTrigger id={faq.id}>{faq.question}</AccordionTrigger>
                    <AccordionContent id={faq.id}>
                      <p className="text-neutral-600 dark:text-neutral-300">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Component Documentation */}
            <div className="mt-8 border-t border-neutral-200 dark:border-neutral-700 pt-8">
              <h3 className="text-xl font-medium mb-4">Component Properties</h3>
              
              <PropertyTable 
                properties={[
                  {
                    prop: "items",
                    type: "AccordionItem[]",
                    defaultValue: "[]",
                    description: "Array of accordion items to render"
                  },
                  {
                    prop: "allowMultiple",
                    type: "boolean",
                    defaultValue: "false",
                    description: "Allow multiple panels to be expanded at once"
                  },
                  {
                    prop: "defaultIndex",
                    type: "string | string[]",
                    defaultValue: "[]",
                    description: "Default expanded panel index(es)"
                  },
                  {
                    prop: "onChange",
                    type: "(index: string[]) => void",
                    defaultValue: "undefined",
                    description: "Callback when an accordion item is toggled"
                  }
                ]}
              />
            </div>
          </div>

          {/* Badge Component Section */}
          <div id="badges" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Badges & Tags Component</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8 max-w-3xl">
              Badges and tags are small visual indicators used to highlight information, status, or counts. 
              They work well for categorization, filtering, or indicating status.
            </p>

            {/* Badge Variants */}
            <div className="space-y-8 max-w-3xl">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Badge Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Badge label="Default" variant="default" />
                  <Badge label="Success" variant="success" />
                  <Badge label="Warning" variant="warning" />
                  <Badge label="Error" variant="error" />
                  <Badge label="Neutral" variant="neutral" />
                </div>
              </Card>

              {/* Badge Sizes */}
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Badge Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Badge label="Small" size="sm" />
                  <Badge label="Medium" size="md" />
                  <Badge label="Large" size="lg" />
                </div>
              </Card>

              {/* Badge with Icon */}
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Badge with Icon</h3>
                <div className="flex flex-wrap gap-4">
                  <Badge label="Active" withIcon />
                  <Badge 
                    label="Completed" 
                    variant="success" 
                    withIcon 
                    icon={<CheckCircle2 className="h-3 w-3 mr-0.5" />} 
                  />
                  <Badge 
                    label="Attention" 
                    variant="warning" 
                    withIcon 
                    icon={<AlertTriangle className="h-3 w-3 mr-0.5" />} 
                  />
                </div>
              </Card>

              {/* Removable Tags */}
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Removable Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      label={tag}
                      variant={tag === 'React' ? 'default' : tag === 'TypeScript' ? 'secondary' : 'neutral'}
                      size="md"
                      removable
                      onRemove={() => removeTag(tag)}
                    />
                  ))}
                  {tags.length === 0 && (
                    <span className="text-sm text-neutral-500">All tags removed! Refresh to reset.</span>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Tabs Component Section */}
          <div id="tabs" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Tabs Component</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8 max-w-3xl">
              Tabs organize content into separate views where only one view is visible at a time. 
              Our implementation includes keyboard navigation and follows ARIA patterns.
            </p>
            
            {/* Tabs Demo */}
            <div className="max-w-3xl">
              <Tabs defaultValue="usage" ariaLabel="Tabs Example">
                <TabList>
                  <Tab value="usage">Usage</Tab>
                  <Tab value="accessibility">Accessibility</Tab>
                  <Tab value="implementation">Implementation</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel value="usage">
                    <Card className="p-6">
                      <h3 className="text-lg font-medium mb-3">When to use Tabs</h3>
                      <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-2">
                        <li>Use tabs to divide content into logical sections that users may want to navigate between.</li>
                        <li>Ideal for when you need to display multiple sections of related content within the same context.</li>
                        <li>Best for moderate amounts of content that can be clearly divided into categories.</li>
                      </ul>
                      
                      <h3 className="text-lg font-medium mt-6 mb-3">Best Practices</h3>
                      <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-2">
                        <li>Keep tab labels short and descriptive.</li>
                        <li>Use consistent tab styling throughout your application.</li>
                        <li>Avoid deeply nested tabs or too many tabs in a single component.</li>
                      </ul>
                    </Card>
                  </TabPanel>
                  <TabPanel value="accessibility">
                    <Card className="p-6">
                      <h3 className="text-lg font-medium mb-3">Accessibility Considerations</h3>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                        The tabs component is built following the WAI-ARIA Tabs Pattern to ensure proper accessibility:
                      </p>
                      
                      <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-2">
                        <li>All tabs are properly associated with their panels using aria-controls and aria-labelledby</li>
                        <li>Keyboard navigation is fully supported (← → ↓ ↑ Home End)</li>
                        <li>Active tab is indicated with aria-selected="true"</li>
                        <li>Content follows focus management best practices</li>
                      </ul>
                    </Card>
                  </TabPanel>
                  <TabPanel value="implementation">
                    <Card className="p-6">
                      <h3 className="text-lg font-medium mb-3">React Implementation</h3>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                        Our Tab component is implemented with TypeScript and React:
                      </p>
                      
                      <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md overflow-x-auto text-sm font-mono mb-4">
{`interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  ariaLabel: string;
}

export const Tabs: React.FC<TabsProps>`}
                      </pre>
                    </Card>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>

            {/* Usage Guidelines */}
            <DosDonts />
          </div>

          <Separator className="my-12" />

          {/* Bottom Section / Footer */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-4">Enterprise Design System</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              Built with React, TypeScript, TailwindCSS and a focus on accessibility, our design system provides a comprehensive set of UI components for enterprise applications.
            </p>
            <div className="flex justify-center mt-6 gap-2">
              <Badge label="React" variant="default" />
              <Badge label="TypeScript" variant="secondary" />
              <Badge label="TailwindCSS" variant="neutral" />
              <Badge label="Accessibility" variant="success" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DesignSystemShowcase;

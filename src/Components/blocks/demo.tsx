import { HeroSection } from "@/Components/blocks/hero-section";
import { Icons } from "@/Components/ui/icons";

export function HeroSectionDemo() {
  return (
    <HeroSection
      badge={{
        text: "Introducing our new components",
        action: {
          text: "Learn more",
          href: "/services",
        },
      }}
      title="Build faster with beautiful components"
      description="Premium UI components built with React and Tailwind CSS. Save time and ship your next project faster with our ready-to-use components."
      actions={[
        {
          text: "Get Started",
          href: "/contact-us",
          variant: "default",
        },
        {
          text: "GitHub",
          href: "https://github.com/tarun5488",
          variant: "glow",
          icon: <Icons.gitHub className="h-5 w-5" />,
        },
      ]}
      image={{
        light:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1248&q=80",
        dark:
          "https://images.unsplash.com/photo-1551281044-8b5bd1f2f9b5?auto=format&fit=crop&w=1248&q=80",
        alt: "UI Components Preview",
      }}
    />
  );
}

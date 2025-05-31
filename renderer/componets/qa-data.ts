// qa-data.ts
export interface QAItem {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

export const qaData: QAItem[] = [
  {
    id: "1",
    question: "What are your business hours?",
    answer:
      "We are open 24/7 with our AI chat support. Our human support team is available Monday to Friday, 9 AM to 6 PM EST.",
    keywords: [
      "hours",
      "time",
      "open",
      "available",
      "schedule",
      "business hours",
    ],
  },
  {
    id: "2",
    question: "What's your pricing?",
    answer:
      "We offer flexible pricing plans starting at $29/month for small businesses, $99/month for growing companies, and custom enterprise solutions. All plans include a 14-day free trial with no credit card required.",
    keywords: [
      "pricing",
      "price",
      "cost",
      "plans",
      "subscription",
      "fee",
      "money",
      "payment",
    ],
  },
  {
    id: "3",
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply sign up for your free 14-day trial, customize your chatbot settings, add it to your website with our simple embed code, and you're ready to go. Our setup wizard will guide you through the process.",
    keywords: [
      "start",
      "begin",
      "setup",
      "getting started",
      "how to",
      "install",
      "implementation",
    ],
  },
  {
    id: "4",
    question: "Do you offer integrations?",
    answer:
      "Yes! We integrate with popular platforms including Shopify, WordPress, Slack, Salesforce, HubSpot, Zapier, and many more. Our API also allows for custom integrations.",
    keywords: [
      "integrations",
      "integrate",
      "connect",
      "api",
      "platforms",
      "shopify",
      "wordpress",
      "slack",
      "salesforce",
    ],
  },
  {
    id: "5",
    question: "Is there a free trial?",
    answer:
      "Absolutely! We offer a 14-day free trial with full access to all features. No credit card required to get started. You can cancel anytime during the trial period.",
    keywords: ["free trial", "trial", "free", "demo", "test", "try"],
  },
  {
    id: "6",
    question: "How does the AI work?",
    answer:
      "Our AI uses advanced natural language processing to understand customer queries and provide accurate responses. It learns from your content and improves over time, ensuring consistent and helpful customer interactions.",
    keywords: [
      "ai",
      "artificial intelligence",
      "how it works",
      "technology",
      "machine learning",
      "nlp",
    ],
  },
  {
    id: "7",
    question: "Can I customize the chatbot?",
    answer:
      "Yes! You can fully customize the chatbot's appearance, colors, messages, and behavior to match your brand. Upload your logo, change colors, and create custom conversation flows.",
    keywords: [
      "customize",
      "customization",
      "branding",
      "design",
      "appearance",
      "colors",
      "logo",
    ],
  },
  {
    id: "8",
    question: "What kind of support do you provide?",
    answer:
      "We provide 24/7 email support, live chat during business hours, comprehensive documentation, video tutorials, and dedicated account managers for enterprise customers.",
    keywords: [
      "support",
      "safe",
      "help",
      "customer service",
      "assistance",
      "contact",
      "help center",
    ],
  },
  {
    id: "9",
    question: "Is my data secure?",
    answer:
      "Security is our top priority. We use enterprise-grade encryption, comply with GDPR and SOC 2 standards, and regularly conduct security audits. Your data is stored securely and never shared with third parties.",
    keywords: [
      "security",
      "secure",
      "data protection",
      "privacy",
      "gdpr",
      "encryption",
      "safe",
    ],
  },
  {
    id: "10",
    question: "Can I use it on multiple websites?",
    answer:
      "Yes! Depending on your plan, you can deploy the chatbot on multiple websites and domains. Our Business and Enterprise plans support unlimited websites.",
    keywords: [
      "multiple websites",
      "domains",
      "sites",
      "multi-site",
      "multiple domains",
    ],
  },
];

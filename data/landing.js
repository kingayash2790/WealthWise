import {
    BarChart3,
    Receipt,
    PieChart,
    CreditCard,
    Globe,
    Zap,
    ShieldCheck,
    Users,
    Smartphone,
  } from "lucide-react";
  
  // 📊 Stats Data - Highlights the platform's success
  export const statsData = [
    { value: "50K+", label: "Active Users" },
    { value: "$2B+", label: "Transactions Tracked" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "User Rating" },
  ];
  
  // 🚀 Features Data - Showcases platform capabilities
  export const featuresData = [
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Advanced Analytics",
      description: "Get AI-powered insights into your spending patterns.",
    },
    {
      icon: <Receipt className="h-8 w-8 text-blue-600" />,
      title: "Smart Receipt Scanner",
      description: "Extract data automatically from receipts using AI.",
    },
    {
      icon: <PieChart className="h-8 w-8 text-blue-600" />,
      title: "Budget Planning",
      description: "Manage budgets with AI-driven recommendations.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      title: "Multi-Account Support",
      description: "Track multiple bank accounts and credit cards in one place.",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Multi-Currency",
      description: "Supports multiple currencies with real-time conversion.",
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Automated Insights",
      description: "Get AI-driven financial recommendations instantly.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
      title: "Bank-Grade Security",
      description: "Secure your financial data with 256-bit encryption.",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Shared Accounts",
      description: "Easily manage finances with family or business partners.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-600" />,
      title: "Mobile Access",
      description: "Manage finances anytime, anywhere from your phone.",
    },
  ];
  
  // 📖 How It Works - User onboarding steps
  export const howItWorksData = [
    {
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      title: "1. Create Your Account",
      description: "Sign up in minutes with our simple registration process.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "2. Track Your Spending",
      description: "Automatically categorize and track transactions in real-time.",
    },
    {
      icon: <PieChart className="h-8 w-8 text-blue-600" />,
      title: "3. Get Insights",
      description: "Receive AI-powered insights and recommendations.",
    },
  ];
  
  // 🌟 Testimonials - Social proof from real users
  export const testimonialsData = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "https://randomuser.me/api/portraits/women/75.jpg",
      quote:
        "WealthWise has transformed how I manage my business finances. The AI insights helped me find cost-saving opportunities I never noticed before.",
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      quote:
        "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual expense tracking.",
    },
    {
      name: "Emily Rodriguez",
      role: "Financial Advisor",
      image: "https://randomuser.me/api/portraits/women/74.jpg",
      quote:
        "I recommend WealthWise to all my clients. The multi-currency support and analytics are perfect for international investors.",
    },
  ];
  
  // 💰 Pricing Plans - Added new section for different user needs
  export const pricingPlansData = [
    {
      name: "Basic",
      price: "$0/month",
      features: ["Expense Tracking", "Budget Planning", "AI Insights (Limited)"],
    },
    {
      name: "Pro",
      price: "$9.99/month",
      features: [
        "All Basic Features",
        "Advanced Analytics",
        "Receipt Scanner",
        "Multi-Account Support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom Pricing",
      features: [
        "All Pro Features",
        "Dedicated Support",
        "API Access",
        "Custom Integrations",
      ],
    },
  ];
  
  // ❓ Frequently Asked Questions (FAQ) - Common user concerns
  export const faqData = [
    {
      question: "Is my financial data secure?",
      answer:
        "Yes, WealthWise uses bank-grade encryption and does not store sensitive information.",
    },
    {
      question: "Can I connect multiple bank accounts?",
      answer:
        "Yes, our platform supports multi-account tracking with seamless integration.",
    },
    {
      question: "Does WealthWise work globally?",
      answer:
        "Yes, we support multiple currencies and financial institutions worldwide.",
    },
  ];
  
  // 🔥 Call to Action - Encouraging user signup
  export const callToActionData = {
    title: "Take Control of Your Finances Today!",
    description:
      "Join thousands of users managing their money smarter with WealthWise.",
    buttonLabel: "Get Started for Free",
  };
  
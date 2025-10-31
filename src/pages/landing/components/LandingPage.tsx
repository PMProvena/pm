import { Star, Target, Trophy, Users } from "lucide-react";
import img1 from "@/assets/img-1.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";

interface LandingPageProps {
  onAuthClick: (type: "login" | "signup") => void;
}

export function LandingPage({ onAuthClick }: LandingPageProps) {
  const features = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Real-World Projects",
      description:
        "Work on guided projects across various industries with structured milestones",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Cross-Functional Teams",
      description:
        "Collaborate with UI/UX designers, developers, and other specialists",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Expert Mentorship",
      description:
        "Get feedback from experienced PMs throughout your project journey",
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Portfolio & Certification",
      description:
        "Build case studies and earn certificates to showcase to recruiters",
    },
  ];

  const industries = [
    "E-commerce",
    "FinTech",
    "HealthTech",
    "EdTech",
    "SaaS",
    "Mobile Apps",
  ];

  // const testimonials = [
  //   {
  //     name: "Sarah Chen",
  //     role: "Product Manager at TechCorp",
  //     content:
  //       "PM Experience gave me the real-world experience I needed to land my first PM role. The mentorship was invaluable!",
  //     rating: 5,
  //   },
  //   {
  //     name: "Marcus Rodriguez",
  //     role: "Associate PM at StartupXYZ",
  //     content:
  //       "The project structure and team collaboration aspect perfectly mimicked what I experience in my current role.",
  //     rating: 5,
  //   },
  //   {
  //     name: "Emily Johnson",
  //     role: "Junior PM at BigTech",
  //     content:
  //       "Building a portfolio with real case studies made all the difference in my interviews.",
  //     rating: 5,
  //   },
  // ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center space-x-2"> */}
            <div className="flex items-center space-x-2">
              <Link to={"/"}>
                {" "}
                <img
                  src="/pngs/logotwo.png"
                  alt="logo"
                  className="w-40 object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => onAuthClick("login")}
                className="cursor-pointer"
              >
                Login
              </Button>
              <Button
                onClick={() => onAuthClick("signup")}
                className="cursor-pointer"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            Bridge the Experience Gap
          </Badge>
          <h1 className="text-4xl md:text-6xl mb-6 max-w-4xl mx-auto text-primary">
            Land Your Dream PM Job with Real-World Experience
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join cross-functional teams, work on industry projects, get expert
            mentorship, and build a portfolio that gets you hired.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => onAuthClick("signup")}
              className="cursor-pointer"
            >
              Start Your PM Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer"
              onClick={() => onAuthClick("signup")}
            >
              Kickstart your PM career today.
            </Button>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1739285452621-59d92842fcc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzU3Njg1MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Professional team collaboration"
              className="rounded-lg shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides structured learning experiences that mirror
              real PM roles
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">
              Work Across Multiple Industries
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from a variety of industry-specific projects to build
              diverse experience
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {industries.map((industry, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm"
              >
                {industry}
              </Badge>
            ))}
          </div>
          <div className="relative max-w-3xl mx-auto">
            <ImageWithFallback
              src={img1}
              alt="Product management dashboard"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple 4-step process to gain real Provena
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose Project",
                description:
                  "Select an industry and project that matches your interests",
              },
              {
                step: "2",
                title: "Build Team",
                description:
                  "Form a cross-functional team with designers and developers",
              },
              {
                step: "3",
                title: "Execute & Learn",
                description:
                  "Work through weekly milestones with mentor guidance",
              },
              {
                step: "4",
                title: "Portfolio & Cert",
                description:
                  "Generate case studies and earn completion certificates",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg">
                  {item.step}
                </div>
                <h3 className="text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how Provena helped land dream PM roles
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-base">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <CardTitle className="text-sm">
                      {testimonial.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Ready to excel as a PM?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of aspiring PMs who have successfully transitioned
            into product management roles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="cursor-pointer"
              onClick={() => onAuthClick("signup")}
            >
              Get Started Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onAuthClick("signup")}
              className="cursor-pointer bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Kickstart your PM career today.
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <Link to={"/"}>
                  {" "}
                  <img
                    src="/pngs/logotwo.png"
                    alt="logo"
                    className="w-40 object-contain"
                  />
                </Link>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Provena. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

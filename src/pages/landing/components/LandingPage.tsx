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
import { motion } from "framer-motion";
import { features, industries } from "@/lib/contants";

interface LandingPageProps {
  onAuthClick: (type: "login" | "signup") => void;
  waitlist?: boolean;
}

export function LandingPage({ onAuthClick, waitlist }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="border-b fixed top-0 left-0 w-full z-50 bg-background"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
              {!waitlist && (
                <>
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
                </>
              )}

              {waitlist && (
                <Button
                  className="cursor-pointer"
                  onClick={() =>
                    window.open("https://forms.gle/ovbb596Wzu9Mkgrt9", "_blank")
                  }
                >
                  Join Waitlist
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 px-4 mt-10 lg:mt-20">
        <div className="container mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { y: -20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
              }}
            >
              <Badge className="mb-4" variant="secondary">
                Bridge the Experience Gap
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl mb-6 max-w-4xl mx-auto text-primary"
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
              }}
            >
              Land Your Dream PM Job with Real-World Experience
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.8, delay: 0.2 },
                },
              }}
            >
              Join cross-functional teams, work on industry projects, get expert
              mentorship, and build a portfolio that gets you hired.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.8, delay: 0.4 },
                },
              }}
            >
              {waitlist ? (
                <Button
                  size="lg"
                  onClick={() =>
                    window.open("https://forms.gle/ovbb596Wzu9Mkgrt9", "_blank")
                  }
                  className="cursor-pointer w-fit self-center"
                >
                  Join Waitlist
                </Button>
              ) : (
                <>
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
                </>
              )}
            </motion.div>

            <motion.div
              className="relative max-w-4xl mx-auto"
              variants={{
                hidden: { scale: 0.95, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.8, delay: 0.6 },
                },
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1739285452621-59d92842fcc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzU3Njg1MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional team collaboration"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides structured learning experiences that mirror
              real PM roles
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } }, // stagger card animations
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <Card className="text-center">
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-4">
              Work Across Multiple Industries
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from a variety of industry-specific projects to build
              diverse experience
            </p>
          </motion.div>

          {/* Industry Badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  {industry}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <ImageWithFallback
              src={img1}
              alt="Product management dashboard"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} // triggers when 30% visible
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple 4-step process to gain real Provena
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // important
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
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
              <motion.div
                key={index}
                className="text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg">
                  {item.step}
                </div>
                <h3 className="text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-4">
              Ready to excel as a PM?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of aspiring PMs who have successfully transitioned
              into product management roles
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2, // buttons appear one after another
                },
              },
            }}
          >
            {waitlist ? (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() =>
                    window.open("https://forms.gle/ovbb596Wzu9Mkgrt9", "_blank")
                  }
                >
                  Join Waitlist
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => onAuthClick("signup")}
                  >
                    Get Started Now
                  </Button>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => onAuthClick("signup")}
                    className="cursor-pointer bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Kickstart your PM career today.
                  </Button>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}

      <motion.footer
        className="py-6 lg:py-10 px-4 border-t"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col gap-2 lg:flex-row  justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <Link to={"/"}>
                  <img
                    src="/pngs/logotwo.png"
                    alt="logo"
                    className="w-40 object-contain"
                  />
                </Link>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Provena. All rights reserved.
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

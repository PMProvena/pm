import { Calendar, CheckCircle, CreditCard, Lock, User } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

// interface PaymentFlowProps {
//   project: any;
//   onPaymentSuccess: () => void;
//   onBack: () => void;
// }
//

const project = {
  id: "proj-001",
  title: "AI-Powered E-Commerce Recommender",
  industry: "Technology / E-Commerce",
  duration: "6 weeks",
  difficulty: "Intermediate",
  price: 299,
  description:
    "Build a recommendation system that suggests products to users using collaborative filtering and machine learning models.",
  image:
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&w=800&q=80",
};

export function PaymentFlow() {
  // export function PaymentFlow({ project, onPaymentSuccess, onBack }: PaymentFlowProps) {

  const [step, setStep] = useState<
    "details" | "payment" | "processing" | "success"
  >("details");
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setStep("processing");

    // Simulate payment processing
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        // onPaymentSuccess();
      }, 2000);
    }, 3000);
  };

  if (step === "processing") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-lg mb-2">Processing Payment</h3>
            <p className="text-muted-foreground text-sm">
              Please wait while we process your payment...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="bg-green-100 rounded-full p-3 w-fit mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Welcome to {project.title}. Redirecting to your dashboard...
            </p>
            <div className="animate-pulse text-sm text-muted-foreground">
              Setting up your project workspace...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            // onClick={onBack}
            className="mb-6"
          >
            ← Back to Project Details
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>
                    Complete your payment to start the project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {step === "details" && (
                    <>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              className="pl-10"
                              value={paymentData.cardNumber}
                              onChange={(e) =>
                                handleInputChange("cardNumber", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                className="pl-10"
                                value={paymentData.expiryDate}
                                onChange={(e) =>
                                  handleInputChange(
                                    "expiryDate",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={paymentData.cvv}
                              onChange={(e) =>
                                handleInputChange("cvv", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="cardName"
                              placeholder="John Doe"
                              className="pl-10"
                              value={paymentData.cardName}
                              onChange={(e) =>
                                handleInputChange("cardName", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="text-sm">Billing Address</h4>

                        <div>
                          <Label htmlFor="billingAddress">Address</Label>
                          <Input
                            id="billingAddress"
                            placeholder="123 Main Street"
                            value={paymentData.billingAddress}
                            onChange={(e) =>
                              handleInputChange(
                                "billingAddress",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              placeholder="San Francisco"
                              value={paymentData.city}
                              onChange={(e) =>
                                handleInputChange("city", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input
                              id="zipCode"
                              placeholder="94105"
                              value={paymentData.zipCode}
                              onChange={(e) =>
                                handleInputChange("zipCode", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 p-4 bg-muted/30 rounded-lg">
                        <Lock className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-muted-foreground">
                          Your payment information is secure and encrypted
                        </span>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handlePayment}
                      >
                        Complete Payment
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm">{project.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {project.industry}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{project.duration}</Badge>
                      <Badge variant="outline">{project.difficulty}</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Project Fee</span>
                      <span>${project.price}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Processing Fee</span>
                      <span>$9</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span className="text-lg">${project.price + 9}</span>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-3 rounded-lg">
                    <h5 className="text-sm mb-2">What's Included:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• {project.duration} guided project</li>
                      <li>• Expert mentor support</li>
                      <li>• Cross-functional team access</li>
                      <li>• Weekly milestone feedback</li>
                      <li>• Portfolio case study</li>
                      <li>• Completion certificate</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-sm">
                    Money-Back Guarantee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Not satisfied within the first week? Get a full refund, no
                    questions asked.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

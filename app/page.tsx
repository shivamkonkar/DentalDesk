"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


import {
  Users,
  MessageSquare,
  Check,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [waitlistState, setWaitlistState] = useState({
    email: "",
    isSubmitted: false,
    isLoading: false,
  });

  const handleWaitlistSubmit = async (e: React.FormEvent, email: string) => {
    e.preventDefault();
    if (!email) return;

    setWaitlistState({ ...waitlistState, isLoading: true });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setWaitlistState({
      email: email,
      isSubmitted: true,
      isLoading: false,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">DentalDesk</div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Features
                </a>
                {/* <a
                  href="#pricing"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Pricing
                </a> */}
                <a
                  href="#faq"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  FAQ
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                >
                  Pricing
                </a>
                <a
                  href="#faq"
                  className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                >
                  FAQ
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="hero">
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                The Simplest Way to
                <br />
                Manage Your Clinic
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                An all-in-one CRM designed for solo practitioners and small
                dental clinics. Save time on admin and focus on your patients.
              </p>

              {/* Email Signup */}
              {!waitlistState.isSubmitted ? (
                <form
                  onSubmit={(e) => handleWaitlistSubmit(e, waitlistState.email)}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-12"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 h-12 text-base"
                    value={waitlistState.email}
                    onChange={(e) =>
                      setWaitlistState({
                        ...waitlistState,
                        email: e.target.value,
                      })
                    }
                    required
                    disabled={waitlistState.isLoading}
                  />
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base font-medium whitespace-nowrap"
                    disabled={waitlistState.isLoading}
                  >
                    {waitlistState.isLoading
                      ? "Joining..."
                      : "Join the Waitlist"}
                  </Button>
                </form>
              ) : (
                <div className="max-w-md mx-auto mb-12">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      You&apos;re on the list!
                    </h3>
                    <p className="text-green-700 mb-4">
                      Thanks for joining! We&apos;ve sent a confirmation to{" "}
                      <strong>{waitlistState.email}</strong>
                    </p>
                    <div className="space-y-3 text-sm text-green-600">
                      <div className="flex items-center justify-center">
                        <Check className="w-4 h-4 mr-2" />
                        <span>Early access when we launch</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Check className="w-4 h-4 mr-2" />
                        <span>Exclusive setup assistance</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Check className="w-4 h-4 mr-2" />
                        <span>Special launch pricing</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dashboard Mockup */}
              <div className="relative max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-blue-600 h-12 flex items-center px-6">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      </div>
                      <div className="ml-4 text-white font-medium">
                        DentalDesk Dashboard
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-100 rounded w-full"></div>
                          <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-4 bg-blue-100 rounded w-2/3"></div>
                          <div className="h-3 bg-gray-100 rounded w-full"></div>
                          <div className="h-3 bg-gray-100 rounded w-4/5"></div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-100 rounded w-full"></div>
                          <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="features">
        <section id="features" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                A Smarter Practice is Just a Click Away
              </h2>
            </div>

            <div className="space-y-20">
              {/* Feature 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Effortless Appointment Scheduling
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Manage your day with our clear calendar. View your schedule
                    by day, week, or month. Reschedule appointments with a
                    simple drag-and-drop.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-center text-sm font-medium text-gray-500 py-2"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="bg-blue-100 text-blue-800 p-2 rounded text-sm">
                        9:00 AM - Patient A
                      </div>
                      <div className="bg-green-100 text-green-800 p-2 rounded text-sm">
                        11:00 AM - Patient B
                      </div>
                      <div className="bg-yellow-100 text-yellow-800 p-2 rounded text-sm">
                        2:00 PM - Patient C
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    All Patient Info in One Place
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Access complete patient profiles instantly. Keep track of
                    contact details, medical history, clinical notes, and
                    appointment logs securely.
                  </p>
                </div>
                <div className="lg:order-1 bg-gray-50 rounded-lg p-8">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          John Doe
                        </div>
                        <div className="text-sm text-gray-500">
                          Patient ID: #12345
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Visit:</span>
                        <span className="text-gray-900">Dec 15, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Appointment:</span>
                        <span className="text-gray-900">Jan 20, 2025</span>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <div className="text-sm text-gray-600">
                          Recent Notes:
                        </div>
                        <div className="text-sm text-gray-900 mt-1">
                          Routine cleaning completed...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Automated WhatsApp Reminders
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Reduce no-shows and keep patients informed. Automatically
                    send booking confirmations and appointment reminders via
                    WhatsApp.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-sm mx-auto">
                    <div className="flex items-center mb-4">
                      <MessageSquare className="w-6 h-6 text-green-600 mr-2" />
                      <span className="font-semibold text-gray-900">
                        WhatsApp
                      </span>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3 mb-3">
                      <div className="text-sm text-gray-900">
                        Hi John! This is a reminder for your dental appointment
                        tomorrow at 2:00 PM with Dr. Smith at DentalDesk Clinic.
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      Delivered ✓✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <div className="pricing">
        <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="border-2 border-blue-600 shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Early Adopter Plan</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">Free</div>
                <p className="text-gray-600 mb-6">during our initial launch</p>
                <p className="text-gray-600 mb-8">Perfect for solo practitioners and new clinics getting started.</p>

                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Unlimited Patients</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Unlimited Appointments</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">WhatsApp Reminders</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Secure Data Storage</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">24/7 Support</span>
                  </li>
                </ul>

                <Button 
                  onClick={(e) => handleWaitlistSubmit(e, waitlistState.email)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium"
                  disabled={waitlistState.isSubmitted}
                >
                  {waitlistState.isSubmitted ? "✓ Already Joined" : "Join the Waitlist"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </div> */}
      <div className="testimonials">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                See What Dentists Are Saying
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="">
                <CardContent className="p-8">
                  <div className="text-lg text-gray-700 mb-6 italic">
                    &quot;Finally, a CRM that understands the needs of small dental
                    practices. The interface is clean and intuitive - exactly
                    what we needed to streamline our operations.&quot;
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold">RV</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Dr. R. Verma
                      </div>
                      <div className="text-gray-600">
                        Asha Dental Care, Pune
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardContent className="p-8">
                  <div className="text-lg text-gray-700 mb-6 italic">
                    &quot;The WhatsApp integration has reduced our no-shows by 60%.
                    Patients love getting reminders on their preferred platform,
                    and we love the efficiency.&quot;
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold">AS</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Dr. A. Sharma
                      </div>
                      <div className="text-gray-600">
                        SmileCare Clinic, Delhi
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <div className="faq">
        <section id="faq" className="py-20 ">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Questions, Answered
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
                  Is my patient data secure?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Absolutely. We use bank-level encryption and comply with all
                  healthcare data protection standards. Your patient data is
                  stored securely and never shared with third parties.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
                  When will the CRM be available?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  We&apos;re launching in early 2025. Join our waitlist to be among
                  the first to get access and enjoy our special early adopter
                  pricing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
                  Can I import my existing patient data?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Yes! We support importing data from most common formats
                  including CSV, Excel, and popular dental software. Our team
                  will help you migrate your data seamlessly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                
              >
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:no-underline">
                  Is there a setup fee?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  No setup fees, no hidden costs. Our early adopters get free
                  access during the initial launch period, and we&apos;ll provide
                  full onboarding support to get you started.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
      <div className="footer">
        <section className="py-20 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Simplify Your Clinic?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of dental professionals who are already on the waitlist.
          </p>

          {!waitlistState.isSubmitted ? (
            <form 
              onSubmit={(e) => handleWaitlistSubmit(e, waitlistState.email)}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
            >
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 h-12 text-base bg-white"
                value={waitlistState.email}
                onChange={(e) => setWaitlistState({ ...waitlistState, email: e.target.value })}
                required
                disabled={waitlistState.isLoading}
              />
              <Button 
              variant={"outline"}
                type="submit"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 h-12 text-base font-medium whitespace-nowrap"
                disabled={waitlistState.isLoading}
              >
                {waitlistState.isLoading ? "Joining..." : "Join the Waitlist"}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-3 mb-4">
                <Check className="w-5 h-5 text-white mr-2" />
              </div>
              <p className="text-blue-700">
                We&apos;ll notify you as soon as DentalDesk is ready for early access.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">DentalDesk</div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DentalDesk. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

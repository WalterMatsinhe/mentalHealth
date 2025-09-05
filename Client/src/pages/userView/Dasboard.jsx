import React, { useState } from "react";
import NavBarView from "@/components/NavBarView";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/FooterLogged";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ChevronLeftIcon, ChevronRightIcon, Phone, Mail, MapPin, Clock, Heart, Brain, Users ,Shield} from "lucide-react";
const bannerOne = "/hero.png";
const bannerTwo = "/bannerTwo.png";
const bannerThree = "/bannerThree.png";

function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerOne, bannerTwo, bannerThree];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const services = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Individual Therapy",
      description: "One-on-one counseling sessions with licensed therapists specializing in anxiety, depression, trauma, and personal growth.",
      features: ["50-minute sessions", "Weekly or bi-weekly", "Multiple therapy approaches"]
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Group Therapy",
      description: "Supportive group sessions focusing on shared experiences and peer support in a safe, confidential environment.",
      features: ["Small groups (6-8 people)", "Topic-focused sessions", "Peer support network"]
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Crisis Support",
      description: "24/7 emergency mental health support for individuals experiencing acute psychological distress or crisis situations.",
      features: ["24/7 availability", "Immediate response", "Safety planning"]
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Wellness Programs",
      description: "Preventive mental health programs including stress management, mindfulness training, and resilience building.",
      features: ["Workshops & seminars", "Mindfulness training", "Stress management tools"]
    }
  ];

  const resources = [
    { title: "Self-Assessment Tools", description: "Quick screening tools for anxiety, depression, and stress levels" },
    { title: "Mental Health Library", description: "Educational articles, videos, and guides on various mental health topics" },
    { title: "Mindfulness & Meditation", description: "Guided meditation sessions and mindfulness exercises" },
    { title: "Support Groups", description: "Find local and online support groups for specific conditions" },
    { title: "Emergency Resources", description: "Crisis hotlines and immediate help resources" },
    { title: "Family & Friends Guide", description: "Resources for supporting loved ones with mental health challenges" }
  ];

  const quickLinks = [
    { title: "Book Appointment", href: "#book", icon: <Phone className="w-4 h-4" /> },
    { title: "Crisis Hotline", href: "#crisis", icon: <Phone className="w-4 h-4" /> },
    { title: "Find Therapist", href: "#find", icon: <MapPin className="w-4 h-4" /> },
    { title: "Insurance Info", href: "#insurance", icon: <Shield className="w-4 h-4" /> }
  ];

  return (
    <>
    <NavBarView/>
    <ThemeToggle/>
    <div className="flex flex-col min-h-screen ">
      {/* Banner slider */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={`slide-${index}`}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
          >
            <div className="relative w-full h-full">
              <img
                src={slide}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover mt-20 mb-4"
              />
              <BorderBeam
            duration={5}
            size={5800}
            className="absolute left-0 top-0 h-full w-[5px] from-transparent via-primary to-primary z-10"
            borderWidth={1}
            orientation="vertical"
          />
            </div>
          </div>
        ))}

        {/* Navigation buttons */}
        <button
          type="button"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-primary hover:scale-105 bg-card border rounded-full p-2 z-50"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          type="button" 
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-primary hover:scale-105 bg-card border rounded-full p-2 z-50"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      
      </div>

      {/* Sidebar and Main Content flush left */}
      <div className="flex flex-row flex-1 w-full">
        {/* Sidebar flush left */}
        <aside className="relative w-80 min-h-full space-y-6 bg-card shadow-lg p-5 rounded-none overflow-hidden">
          <BorderBeam
            duration={5}
            size={2800}
            className="absolute left-0 top-0 h-full w-[5px] from-transparent via-primary to-primary z-10"
            borderWidth={2}
            orientation="vertical"
          />
          {/* Quick Links */}
          <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center p-4 w-full  hover:bg-primary/10 rounded-lg transition-colors border border-card hover:border-primary"
              >
                {link.icon}
                <span className=" text-foreground hover:text-primary">{link.title}</span>
              </a>
            ))}
        
          </div>


          {/* Mental Health Tips */}
          <div className="bg-card rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Daily Wellness Tips</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium text-foreground">Practice Mindfulness</h4>
                <p className="text-sm text-foreground/70">Take 5 minutes today to focus on your breathing and be present.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-foreground">Stay Connected</h4>
                <p className="text-sm text-foreground/70">Reach out to a friend or family member you haven't spoken to recently.</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium text-foreground">Move Your Body</h4>
                <p className="text-sm text-foreground/70">Even a 10-minute walk can boost your mood and energy levels.</p>
              </div>
            </div>
          </div>


          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-primary to-primary-foreground rounded-lg shadow-md p-6 text-primary-foreground">
            <h3 className="text-xl font-semibold mb-3">Stay Informed</h3>
            <p className="text-sm mb-4">Get mental health tips and updates delivered to your inbox.</p>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded border-0 text-foreground mb-3"
            />
            <button className="w-full bg-card text-primary py-2 rounded font-semibold hover:bg-background transition-colors">
              Subscribe
            </button>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 px-8 max-w-7xl mx-auto">
          {/* Services Section */}
          <section id="services" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Mental Health Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className=" rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    {service.icon}
                    <h3 className="text-xl font-semibold text-foreground ml-3">{service.title}</h3>
                  </div>
                  <p className="text-foreground/70 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-foreground/80">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 bg-primary hover:bg-primary-foreground text-primary-foreground px-4 py-2 rounded transition-colors">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Resources Section */}
          <section id="resources" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Mental Health Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map((resource, index) => (
                <div key={index} className="bg-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border-l-4 border-primary">
                  <h4 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h4>
                  <p className="text-foreground/70 text-sm mb-3">{resource.description}</p>
                  <a href="#" className="text-primary hover:text-primary text-sm font-medium">
                    Access Resource →
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="bg-card rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-3" />
                    <span className="text-foreground">(555) 123-MIND</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3" />
                    <span className="text-foreground">support@mindcare.com</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-3" />
                    <span className="text-foreground">123 Wellness St, Health City, HC 12345</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-foreground">Mon-Fri: 8AM-8PM, Sat-Sun: 10AM-6PM</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Emergency Support</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-primary font-semibold mb-2">Crisis Hotline: 988</p>
                  <p className="text-primary/80 text-sm">24/7 immediate mental health crisis support</p>
                </div>
                <div className="mt-4 bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-primary font-semibold mb-2">Text Support: Text HOME to 741741</p>
                  <p className="text-primary/80 text-sm">Crisis Text Line for immediate text-based support</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>  
    </div>
    <Footer/>
    </>
  );
}

export default Dashboard;
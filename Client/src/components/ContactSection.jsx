import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useToast } from "@/hooks/use-toast";
import { BorderBeam } from "./magicui/border-beam";
import { WordRotate } from "@/components/magicui/word-rotate";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "3254b0de-7d62-4d0d-b1d8-7f64fa6063e4"); // 🔐 Replace with your actual Web3Forms access key

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        toast({
          title: "Message Sent!",
          description:
            "Thank you for your message. I will get back to you soon.",
        });
        e.target.reset();
      } else {
        toast({
          title: "Submission Failed",
          description: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Network error or invalid request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-primary-font">
        Get in<span className="text-primary">Touch</span>
      </h2>
      <p className="text-center text-primary-font mb-12 max-w-2xl mx-auto">
       Looking for guidance or resources? Our team is here to support you. Contact us today—we’re ready to help.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <h3 className="text-2xl text-primary font-semibold mb-6">
            Contact Information
          </h3>
          <div className="space-y-6 justify-center">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary-font" />
              </div>
              <div>
                <h4 className="font-medium text-primary-font">Email</h4>
                <a
                  href="mailto:Walter2000matsinhe@gmail.com"
                  className="text-primary-font hover:text-primary transition-colors"
                >
                  Walter2000matsinhe@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Phone className="h-6 w-6 text-primary-font" />
              </div>
              <div>
                <h4 className="font-medium text-primary-font">Phone</h4>
                <a
                  href="tel:0704991866"
                  className="text-primary-font hover:text-primary transition-colors"
                >
                  (+254) 704991866
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <span className="text-primary-font hover:text-primary transition-colors">
                  Nairobi, Rongai
                </span>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <WordRotate words={['Connect', 'With', 'Us']} speed={1} className = 'text-3xl font-semibold text-primary mb-4'/>
            <div className="flex space-x-4 justify-center">
              <a href="#" target="_blank">
                <Linkedin />
              </a>
              <a href="https://www.instagram.com/w.x.l.t.x.r/" target="_blank">
                <Instagram />
              </a>
              <a href="#" target="_blank">
                <Facebook />
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="relative bg-card p-3 rounded-lg shadow-xs overflow-hidden">
          <h3 className="text-xl font-semibold mb-6 text-primary-font">Send a Message</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-left text-primary-font"
              >
                Name :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-md border border-input text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Pedro Machado..."
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-left text-primary-font"
              >
                Email :
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-md border border-input text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="pedro@gmail.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-left text-primary-font"
              >
                Message :
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="w-full px-4 py-3 rounded-md border border-input text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Hello, I'd like to talk about..."
              />
              <button
                disabled={isSubmitting}
                type="submit"
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-1 mt-2",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}{" "}
                <Send size={16} />
              </button>
            </div>
          </form>
          <BorderBeam
            duration={5}
            size={800}
            className="from-transparent via-primary to-primary"
            borderWidth={2}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

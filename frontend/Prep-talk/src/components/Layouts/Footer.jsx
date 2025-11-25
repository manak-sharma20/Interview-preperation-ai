import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-3xl font-bold text-white tracking-tight">
              PrepTalk<span className="text-primary">AI</span>
            </h3>

            <p className="text-gray-400 leading-relaxed max-w-md">
              Master your interview skills with AI-powered preparation tools.
              Practice smarter, learn faster, and succeed in your career journey.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "API", "Roadmap"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {["Help Center", "Contact Us", "Privacy Policy", "Terms"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} PrepTalkAI. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

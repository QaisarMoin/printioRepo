import React, { useState } from 'react';

const faqData = [
  {
    question: "What services does PrintHub offer?",
    answer: "PrintHub offers a wide range of printing services including business cards, brochures, flyers, banners, stickers, and custom corporate gifts. We specialize in both small and large volume high-quality prints."
  },
  {
    question: "Does PrintHub provide same-day delivery?",
    answer: "Yes, for many of our standard products like business cards and flyers, we offer same-day delivery in select cities and express shipping options across India."
  },
  {
    question: "Can I order small quantities or single-piece prints?",
    answer: "Absolutely! We cater to both individual needs for single prints and large corporate orders with thousands of units."
  },
  {
    question: "How can I design my product on PrintHub?",
    answer: "You can use our online design tool to create from scratch, upload your own print-ready files, or choose from our extensive library of professional templates."
  },
  {
    question: "What types of document printing services are available?",
    answer: "We offer professional document printing, binding, lamination, and scanning services for reports, presentations, and technical drawings."
  },
  {
    question: "Can I order custom printed products online from PrintHub?",
    answer: "Yes, our entire catalog is available online for easy customization, instant quoting, and home delivery."
  },
  {
    question: "What are the most popular products on PrintHub?",
    answer: "Our top sellers include business cards, personalized mugs, custom t-shirts, and company stationery."
  },
  {
    question: "Does PrintHub offer printing solutions for businesses?",
    answer: "We have dedicated enterprise solutions including customized portals, bulk pricing, and specialized logistics for corporate clients."
  },
  {
    question: "Does PrintHub deliver across India?",
    answer: "Yes, we ship to over 10,000+ pin codes across India using reliable courier partners."
  },
  {
    question: "Why should I choose PrintHub for online printing?",
    answer: "PrintHub combines 15+ years of experience with state-of-the-art technology, transparent pricing, and a commitment to professional quality."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-stitch-neutral mb-12 tracking-tight text-center md:text-left">
          Frequently Asked Questions (FAQs)
        </h2>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:border-stitch-primary/20"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group"
              >
                <span className="font-bold text-stitch-neutral pr-8 leading-tight">
                  {item.question}
                </span>
                <span className={`flex-shrink-0 text-xl transition-transform duration-300 ${activeIndex === index ? 'rotate-45 text-stitch-primary' : 'text-gray-400 group-hover:text-stitch-primary'}`}>
                  +
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="p-6 pt-0 text-sm text-gray-500 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

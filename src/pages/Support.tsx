import React, { useState } from 'react';
import { 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiChevronDown,
  FiSmartphone,
  FiCreditCard
} from 'react-icons/fi';
import { 
  BsBook, 
  BsQuestionCircle, 
  BsShieldCheck,
  BsFileText 
} from 'react-icons/bs';

interface FAQItem {
  question: string;
  answer: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const SupportPage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'recharge-issue',
    message: ''
  });

  const faqData: FAQItem[] = [
    {
      question: 'How long does a recharge take to process?',
      answer: 'Most recharges are processed instantly within seconds. In rare cases, it may take up to 5-10 minutes during peak hours or maintenance periods. If your recharge hasn\'t been processed after 30 minutes, please contact our support team.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit and debit cards (Visa, Mastercard, Verve), bank transfers, mobile money, and digital wallet payments. All transactions are secured with industry-standard encryption.'
    },
    {
      question: 'What should I do if my recharge failed?',
      answer: 'If your recharge failed, first check if the amount was deducted from your account. If yes, the credit will typically be reversed within 24-48 hours. If not reversed automatically, contact our support team with your transaction reference number.'
    },
    {
      question: 'Can I get a refund for a failed transaction?',
      answer: 'Yes, if a transaction failed and the amount was debited from your account, we will process a full refund within 5-7 business days. Please provide your transaction ID when contacting support.'
    },
    {
      question: 'How do I check my transaction history?',
      answer: 'Log into your Datafy Technologies account and navigate to the "Transactions" section in your dashboard. You can view all your past recharges, download receipts, and track pending transactions.'
    },
    {
      question: 'What networks do you support?',
      answer: 'We support all major mobile networks including MTN, Airtel, Glo, and 9mobile. You can recharge any number on these networks through our platform.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    alert('Thank you for contacting us! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'recharge-issue',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-linear-to-br from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-extrabold mb-4 tracking-tight">
            How can we help you?
          </h2>
          <p className="text-xl text-green-50 max-w-2xl mx-auto">
            Find answers to common questions or reach out to our support team
          </p>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-lg mb-4">
              <FiSmartphone className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Recharge Issues</h3>
            <p className="text-gray-600">
              Experiencing problems with your mobile recharge? We're here to help resolve it quickly.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-lg mb-4">
              <FiCreditCard className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Problems</h3>
            <p className="text-gray-600">
              Having trouble with payments or transactions? Check our payment troubleshooting guide.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-lg mb-4">
              <FiClock className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Time</h3>
            <p className="text-gray-600">
              Most recharges are instant. Learn about processing times and what to expect.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  <FiChevronDown 
                    className={`text-green-600 text-xl shrink-0 transition-transform ${
                      activeAccordion === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    activeAccordion === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-green-50 rounded-2xl p-8 md:p-10">
            <h2 className="text-3xl font-bold text-green-900 mb-6">
              Get in Touch
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mr-4 shrink-0">
                  <FiPhone className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Phone Support</h4>
                  <p className="text-green-700">+234 800 123 4567</p>
                  <p className="text-sm text-green-600 mt-1">Mon-Fri: 8AM - 8PM, Sat-Sun: 9AM - 5PM</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mr-4 shrink-0">
                  <FiMail className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Email Support</h4>
                  <p className="text-green-700">support@datafy.ng</p>
                  <p className="text-sm text-green-600 mt-1">We typically respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mr-4 shrink-0">
                  <FiClock className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Business Hours</h4>
                  <p className="text-green-700">Monday - Friday: 8:00 AM - 8:00 PM</p>
                  <p className="text-green-700">Saturday - Sunday: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="+234 800 000 0000"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="recharge-issue">Recharge Issue</option>
                  <option value="payment-problem">Payment Problem</option>
                  <option value="account-help">Account Help</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                  placeholder="Please describe your issue..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Help Resources Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Help Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="#guide"
              className="group p-6 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 group-hover:bg-green-600 transition-colors">
                <BsBook className="text-2xl text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">User Guide</h4>
              <p className="text-sm text-gray-600">
                Step-by-step tutorials on how to use our platform
              </p>
            </a>

            <a
              href="#faq"
              className="group p-6 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 group-hover:bg-green-600 transition-colors">
                <BsQuestionCircle className="text-2xl text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">FAQ Center</h4>
              <p className="text-sm text-gray-600">
                Quick answers to frequently asked questions
              </p>
            </a>

            <a
              href="#security"
              className="group p-6 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 group-hover:bg-green-600 transition-colors">
                <BsShieldCheck className="text-2xl text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Security Info</h4>
              <p className="text-sm text-gray-600">
                Learn how we protect your data and transactions
              </p>
            </a>

            <a
              href="#terms"
              className="group p-6 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 group-hover:bg-green-600 transition-colors">
                <BsFileText className="text-2xl text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Terms & Policies</h4>
              <p className="text-sm text-gray-600">
                Review our terms of service and privacy policy
              </p>
            </a>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default SupportPage;
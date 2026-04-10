// app/components/ContactInfo.tsx
"use client";

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface ContactDetail {
  icon: string;
  title: string;
  content: string;
  link?: string;
  isLink: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function ContactInfo() {
  const socialLinks: SocialLink[] = [
    { name: "GitHub", icon: "🐙", url: "https://github.com/MurtazaAfzali13/" },
    { name: "LinkedIn", icon: "💼", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "Dribbble", icon: "🏀", url: "#" }
  ];

  const contactDetails: ContactDetail[] = [
    {
      icon: "📧",
      title: "Email",
      content: "murtazaafzali13@gmail.com",
      link: "mailto:murtazaafzali13@gmail.com",
      isLink: true
    },
    {
      icon: "📱",
      title: "Phone",
      content: "+93 783 000 247",
      link: "tel:+93783000247",
      isLink: true
    },
    {
      icon: "📍",
      title: "Location",
      content: "Herat, Afghanistan",
      isLink: false
    },
    {
      icon: "💼",
      title: "Availability",
      content: "Available for freelance projects",
      isLink: false
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What's your typical project timeline?",
      answer: "Project timelines vary based on complexity. Simple websites take 1-2 weeks, while complex applications can take 2-3 months. I'll provide a detailed timeline after discussing your requirements."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely! I work with clients worldwide. I'm comfortable with different time zones and can accommodate various communication preferences."
    },
    {
      question: "What's included in your services?",
      answer: "I provide full-stack development, UI/UX design, testing, deployment, and ongoing support. Each project includes source code, documentation, and training if needed."
    },
    {
      question: "How do you handle project revisions?",
      answer: "I include reasonable revisions in my quotes. I believe in iterative development and regular feedback to ensure the final product meets your expectations."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Contact Details */}
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Contact Information</h2>
        <div className="space-y-6">
          {contactDetails.map((detail, index) => (
            <div key={index} className="flex items-start group hover:bg-white/5 p-4 rounded-xl transition-all duration-300">
              <div className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">{detail.icon}</div>
              <div>
                <h3 className="text-white font-semibold mb-1">{detail.title}</h3>
                {detail.isLink ? (
                  <a
                    href={detail.link}
                    className="text-yellow-300 hover:text-yellow-200 transition-colors"
                  >
                    {detail.content}
                  </a>
                ) : (
                  <p className="text-white/80">{detail.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Follow Me</h2>
        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              className="flex items-center justify-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group hover-lift border border-white/10"
            >
              <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
                {social.icon}
              </span>
              <span className="text-white group-hover:text-yellow-300 transition-colors font-medium">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Response Time */}
      <div className="bg-gradient-to-r from-green-500/30 to-blue-600/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-4">Quick Response</h3>
        <p className="text-white/80 leading-relaxed">
          I typically respond to all inquiries within 24 hours. For urgent projects,
          feel free to mention it in your message and I will prioritize your request.
        </p>
      </div>
    </div>
  );
}
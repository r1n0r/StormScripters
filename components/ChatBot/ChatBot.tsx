'use client';

import { useState, useRef, useEffect } from "react";
import SectionTitle from "@/components/Common/SectionTitle";
import ScrollUp from "@/components/Common/ScrollUp";

interface Message {
  sender: string;
  text: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const getApplicationResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('how to apply') || lowerQuery.includes('application process')) {
      return `Here's a step-by-step guide to applying to universities:

1. Research and Choose Universities:
   - Identify universities that offer your desired program
   - Check admission requirements and deadlines
   - Consider location, cost, and program reputation

2. Prepare Required Documents:
   - Academic transcripts
   - Standardized test scores (if required)
   - Letters of recommendation
   - Statement of purpose or personal essay
   - Resume/CV
   - Proof of language proficiency (if applicable)

3. Application Process:
   - Create an account on the university's application portal
   - Fill out the application form
   - Upload required documents
   - Pay application fees
   - Submit your application before the deadline

4. After Submission:
   - Track your application status
   - Respond to any additional requests
   - Prepare for interviews if required
   - Apply for scholarships and financial aid

5. After Acceptance:
   - Accept the offer
   - Pay deposit (if required)
   - Apply for student visa (if international)
   - Arrange accommodation
   - Register for orientation

Would you like more specific information about any of these steps?`;
    }

    // Check for thank you messages
    if (lowerQuery.includes('thank') || lowerQuery.includes('thanks')) {
      return "No problem, it's my pleasure! Feel free to ask if you need any other information about universities or the application process.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { sender: "You", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    // Check for application-related queries first
    const applicationResponse = getApplicationResponse(userMessage);
    if (applicationResponse) {
      setMessages(prev => [...prev, { 
        sender: "University Assistant", 
        text: applicationResponse
      }]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: {
              text: `You are a helpful university assistant. You can provide information about any university worldwide, including programs, locations, admission requirements, and student life. ${userMessage}`
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const botResponse = data.generated_text || "I understand your question. Let me help you with that.";
      
      setMessages(prev => [...prev, { 
        sender: "University Assistant", 
        text: botResponse
      }]);
    } catch (error) {
      console.error('Chat API Error:', error);
      // Fallback responses for common questions
      const fallbackResponses = [
        "I can help you find information about universities worldwide. Could you specify which university or region you're interested in?",
        "For finding universities in Africa, I recommend checking the African University Rankings or contacting the Ministry of Education in your country of interest.",
        "When looking for a mathematics program, consider factors like program accreditation, faculty expertise, and research opportunities. Would you like specific recommendations?",
        "Many universities offer online programs that might be accessible from your location. Would you like information about online mathematics programs?",
        "I can help you compare different universities and their programs. What specific aspects are you interested in learning about?",
        "For international students, it's important to check visa requirements, language proficiency requirements, and available scholarships. Would you like more information about any of these aspects?",
        "When choosing a university, consider factors like program reputation, location, cost, and available resources. What's most important to you?",
        "I can help you find universities that specialize in mathematics or have strong STEM programs. Would you like some recommendations?",
        "Many universities offer preparatory programs for international students. Would you like information about these programs?",
        "I can help you understand the application process for different universities. What specific information do you need?"
      ];
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      setMessages(prev => [...prev, { 
        sender: "University Assistant", 
        text: randomResponse
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScrollUp />
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container">
          <SectionTitle
            title="Global University Assistant"
            paragraph="Get information about universities worldwide, including programs, locations, and admission requirements"
            center
          />

          <div className="wow fadeInUp" data-wow-delay=".1s">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-dark rounded-lg shadow-lg p-6">
                <div 
                  ref={chatBoxRef}
                  className="h-[500px] overflow-y-auto mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      Ask me about any university worldwide. I can help you find information about programs, locations, admission requirements, and more. Try asking "How do I apply to university?" for a detailed guide.
                    </div>
                  ) : (
                    messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`mb-4 ${
                          msg.sender === "You" ? "text-right" : "text-left"
                        }`}
                      >
                        <div
                          className={`inline-block p-3 rounded-lg ${
                            msg.sender === "You"
                              ? "bg-primary text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          <div className="text-sm font-semibold mb-1">{msg.sender}</div>
                          <div className="whitespace-pre-line">{msg.text}</div>
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="text-left mb-4">
                      <div className="inline-block p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                        <div className="text-sm font-semibold mb-1">University Assistant</div>
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                    placeholder="Ask about any university, program, or location..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all duration-300"
                  >
                    Send
                  </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>Powered by HuggingFace AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatBot; 
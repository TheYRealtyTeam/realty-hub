import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, MessageCircle, Loader, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your Y Realty Team assistant. I can help answer questions about property management, real estate investment, and our services. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    
    // Validate message length
    if (userMessage.length > 4000) {
      toast({
        title: "Message too long",
        description: "Please keep your message under 4000 characters.",
        variant: "destructive"
      });
      return;
    }

    setInputMessage('');
    setIsLoading(true);

    // Add user message to chat
    const newUserMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      console.log('Sending message to AI chat function:', userMessage);
      
      // Prepare conversation history for API (limit to recent messages to prevent token issues)
      const conversationHistory = messages.slice(-8).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: userMessage,
          conversationHistory: conversationHistory
        }
      });

      console.log('AI chat response received:', { data, error });

      // Handle Supabase function errors
      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Function call failed: ${error.message || 'Unknown error'}`);
      }

      // Handle application-level errors from the edge function
      if (data?.error) {
        console.error('AI chat function returned error:', data.error);
        throw new Error(data.error);
      }

      // Validate response
      if (!data || !data.response) {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response from AI service');
      }

      // Add AI response to chat
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

      console.log('AI message added to chat successfully');

    } catch (error) {
      console.error('Error in sendMessage:', error);
      
      // Determine appropriate error message
      let errorMessage = "I'm having trouble responding right now. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('authentication')) {
          errorMessage = "AI service authentication issue. Please contact support.";
        } else if (error.message.includes('busy') || error.message.includes('429')) {
          errorMessage = "AI service is busy. Please wait a moment and try again.";
        } else if (error.message.includes('too long')) {
          errorMessage = "Your message is too long. Please try a shorter message.";
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = "Network connection issue. Please check your internet and try again.";
        }
      }
      
      toast({
        title: "Chat Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      // Remove the user message if there was an error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-yrealty-navy hover:bg-yrealty-navy/90 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Open AI Chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Chat Header */}
      <div className="bg-yrealty-navy text-white p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yrealty-accent rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold">Y Realty Assistant</h3>
            <p className="text-xs opacity-90">Ask me anything about property management</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 p-1 rounded transition-colors"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 bg-yrealty-blue rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-yrealty-navy" />
              </div>
            )}
            
            <div
              className={`max-w-[280px] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-yrealty-navy text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 bg-yrealty-accent rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-yrealty-blue rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-yrealty-navy" />
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin text-yrealty-navy" />
                <span className="text-sm text-gray-600">Typing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Contact Button */}
      <div className="px-4 pb-2">
        <Button
          onClick={() => {
            setIsOpen(false);
            navigate('/contact');
          }}
          variant="outline"
          className="w-full border-yrealty-navy text-yrealty-navy hover:bg-yrealty-navy hover:text-white"
        >
          <Phone className="h-4 w-4 mr-2" />
          Contact Us Directly
        </Button>
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about property management..."
            disabled={isLoading}
            className="flex-1"
            maxLength={4000}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-yrealty-navy hover:bg-yrealty-navy/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            Powered by AI • For specific quotes, please contact us directly
          </p>
          <p className="text-xs text-gray-400">
            {inputMessage.length}/4000
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;

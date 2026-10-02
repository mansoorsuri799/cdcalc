'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CtaButton from '@/components/CtaButton';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // In a real application, this would send the data to your server
    console.log(data);
    setFormSubmitted(true);
    reset();
    
    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="bg-secondary rounded-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Send Us a Message</h2>
      
      {formSubmitted ? (
        <div className="bg-green-900/50 border border-green-700 text-green-100 rounded-lg p-4 mb-6 text-center">
          <p>Thank you for your message. We'll get back to you soon!</p>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            className={`w-full px-4 py-2 bg-[#071824] border ${
              errors.name ? 'border-red-500' : 'border-gray-700'
            } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent`}
            placeholder="John Doe"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={`w-full px-4 py-2 bg-[#071824] border ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent`}
            placeholder="john@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            className={`w-full px-4 py-2 bg-[#071824] border ${
              errors.subject ? 'border-red-500' : 'border-gray-700'
            } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent`}
            placeholder="How can we help?"
            {...register('subject', { required: 'Subject is required' })}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className={`w-full px-4 py-2 bg-[#071824] border ${
              errors.message ? 'border-red-500' : 'border-gray-700'
            } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent`}
            placeholder="Your message here..."
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters',
              },
            })}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>
        
        <div className="flex justify-center">
          <CtaButton as="button" type="submit" icon="arrow">
            Send Message
          </CtaButton>
        </div>
      </form>
    </div>
  );
} 
import React, { useState, useCallback, useRef } from 'react';
import { motion, Variants } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [retryCount, setRetryCount] = useState(0);
  const submitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzsfDLWM_DsD7ncpu89mauyRtpBKyEHUgE_aeURwos1lFDNF8Hi5bGC0ZxGc6Wo-zAF/exec';
  const MAX_RETRY_ATTEMPTS = 3;
  const SUBMIT_TIMEOUT = 10000; // 10 seconds

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    return newErrors;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }));
    }

    // Clear success/error status when user modifies form
    if (submitStatus === 'success' || submitStatus === 'error') {
      setSubmitStatus('idle');
      setRetryCount(0);
    }
  }, [errors, submitStatus]);

  const submitToGoogleSheets = async (data: FormData, attempt: number = 1): Promise<void> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT);

    try {
      await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: data.name.trim(),
          email: data.email.trim(),
          subject: data.subject.trim(),
          message: data.message.trim(),
          timestamp: new Date().toISOString(),
          attempt: attempt.toString()
        })
      });

      clearTimeout(timeoutId);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Focus on first error field
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.getElementById(firstErrorField);
      element?.focus();
      return;
    }

    setSubmitStatus('submitting');
    setErrors({});

    // Clear any existing timeout
    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }

    try {
      await submitToGoogleSheets(formData, retryCount + 1);
      setSubmitStatus('success');
      setRetryCount(0);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Auto-hide success message after 5 seconds
      submitTimeoutRef.current = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Submission error:', error);
      
      if (retryCount < MAX_RETRY_ATTEMPTS) {
        setRetryCount(prev => prev + 1);
        // Auto-retry after 2 seconds
        submitTimeoutRef.current = setTimeout(() => {
          handleSubmit(e);
        }, 2000);
      } else {
        setSubmitStatus('error');
        setRetryCount(0);
      }
    }
  };

  const handleRetry = () => {
    setSubmitStatus('idle');
    setRetryCount(0);
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const statusVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  const isSubmitting = submitStatus === 'submitting';

  return (
    <motion.section 
      className="py-16 px-8 md:px-16 lg:px-24 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-lg mx-auto text-center">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-4 text-white"
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
              }
            }
          }}
        >
          Get in Touch 
        </motion.h2>
        
        <motion.p 
          className="text-sm md:text-base mb-8 text-gray-300"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.1
              }
            }
          }}
        >
          Connect with us to explore our wide range of quality medicines and healthcare solutions.
        </motion.p>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div 
            className="bg-green-600 text-white p-4 rounded-lg mb-6 shadow-lg"
            variants={statusVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Thank you for your message! We will get back to you soon.</span>
            </div>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div 
            className="bg-red-600 text-white p-4 rounded-lg mb-6 shadow-lg"
            variants={statusVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>There was a problem submitting your form.</span>
            </div>
            <button
              onClick={handleRetry}
              className="text-sm underline hover:no-underline transition-all duration-200"
            >
              Try again
            </button>
          </motion.div>
        )}

        <motion.form 
          className="space-y-6 text-left" 
          onSubmit={handleSubmit}
          variants={containerVariants}
          noValidate
        >
          {/* Name Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-800/50 backdrop-blur-sm border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 hover:border-gray-500'
              }`}
              required
              disabled={isSubmitting}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <motion.p 
                id="name-error"
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.name}
              </motion.p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-800/50 backdrop-blur-sm border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 hover:border-gray-500'
              }`}
              required
              disabled={isSubmitting}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <motion.p 
                id="email-error"
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          {/* Subject Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              placeholder="What would you like to discuss?"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full p-3 bg-gray-800/50 backdrop-blur-sm border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 hover:border-gray-500'
              }`}
              required
              disabled={isSubmitting}
              aria-invalid={errors.subject ? 'true' : 'false'}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            />
            {errors.subject && (
              <motion.p 
                id="subject-error"
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.subject}
              </motion.p>
            )}
          </motion.div>

          {/* Message Field */}
          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message *
            </label>
            <div className="relative">
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us about your project, questions, or how we can help..."
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-3 bg-gray-800/50 backdrop-blur-sm border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[100px] max-h-[300px] ${
                  errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 hover:border-gray-500'
                }`}
                required
                disabled={isSubmitting}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error message-count' : 'message-count'}
              />
              <div 
                id="message-count"
                className={`absolute bottom-2 right-2 text-xs transition-colors duration-200 ${
                  formData.message.length > 800 ? 'text-yellow-400' : 
                  formData.message.length > 950 ? 'text-red-400' : 'text-gray-400'
                }`}
              >
                {formData.message.length}/1000
              </div>
            </div>
            {errors.message && (
              <motion.p 
                id="message-error"
                className="text-red-400 text-sm mt-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.message}
              </motion.p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="text-center pt-4">
            <motion.button
              type="submit"
              className={`relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform ${
                isSubmitting 
                  ? 'opacity-75 cursor-not-allowed scale-95' 
                  : 'hover:scale-105 hover:shadow-xl active:scale-95'
              }`}
              disabled={isSubmitting}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: isSubmitting ? 0.95 : 1.05 }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Submitting{retryCount > 0 && ` (Attempt ${retryCount + 1})`}...</span>
                </div>
              ) : (
                'Submit Your Inquiry'
              )}
            </motion.button>
            
            {retryCount > 0 && submitStatus === 'submitting' && (
              <motion.p 
                className="text-yellow-400 text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Retrying connection... ({retryCount}/{MAX_RETRY_ATTEMPTS})
              </motion.p>
            )}
          </motion.div>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default ContactForm;
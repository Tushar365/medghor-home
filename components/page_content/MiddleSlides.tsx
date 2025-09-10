'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const SlideUpVariants = {
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  type: "spring" as const, 
                  stiffness: 70,
                  duration: 0.7 
                }
              }
            }

const MiddleSlides = () => {
  return (
    <>
      {/* Medical Products Section */}
      <motion.section 
        className="py-16 px-8 md:px-16 lg:px-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              staggerChildren: 0.2 
            } 
          }
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <motion.div 
            className="md:w-1/2"
            variants={SlideUpVariants}
          >
            <div className="bg-gray-900 p-4 rounded-lg">
              <motion.div
                variants={SlideUpVariants}
              >
                <Image 
                  src="/ABCD.gif" 
                  alt="Aerial view of port" 
                  width={600}
                  height={400}
                  className="w-full rounded"
                />
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            variants={SlideUpVariants}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              variants={SlideUpVariants}
            >
              Wide range of Quality Medical Products
            </motion.h2>
            <motion.p 
              className="text-sm md:text-base mb-6"
              variants={SlideUpVariants}
            >
              We offer a comprehensive selection of medicines and medical supplies,
              ensuring quality healthcare products for all your needs.
            </motion.p>
            <motion.ul className="space-y-3">
              {[
                "Extensive Product Range: Access thousands of high-quality medical supplies and pharmaceuticals",
                "Quality Assurance: All products meet international healthcare standards and regulations",
                "Reliable Availability: Consistent stock management ensuring products when you need them"
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  variants={SlideUpVariants}
                >
                  <div className="text-blue-400 mr-2">•</div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Self Pickup & Delivery Section */}
      <motion.section 
        className="py-16 px-8 md:px-16 lg:px-24 bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              staggerChildren: 0.2 
            } 
          }
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <motion.div 
            className="md:w-1/2"
            variants={SlideUpVariants}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              variants={SlideUpVariants}
            >
              Self Pickup & Delivery Options
            </motion.h2>
            <motion.p 
              className="text-sm md:text-base mb-6"
              variants={SlideUpVariants}
            >
              We offer convenient self-pickup and delivery options,
              ensuring that you can get the healthcare products you need when you need them.
            </motion.p>
            <motion.ul className="space-y-3">
              {[
                "Fast & Reliable Delivery: Professional delivery service across the region",
                "Flexible Options: Choose between home delivery or convenient self-pickup",
                "Customer-Centric: Committed to ensuring your medical supplies reach you safely and on time"
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  variants={SlideUpVariants}
                >
                  <div className="text-blue-400 mr-2">•</div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            variants={SlideUpVariants}
          >
            <div className="bg-gray-800 p-4 rounded-lg">
              <motion.div
                variants={SlideUpVariants}
              >
                <Image 
                  src="/ABC.gif" 
                  alt="Self Pickup & Delivery" 
                  width={600}
                  height={400}
                  className="w-full rounded"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="py-16 px-8 md:px-16 lg:px-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              staggerChildren: 0.2 
            } 
          }
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <motion.div 
            className="md:w-1/2"
            variants={SlideUpVariants}
          >
            <div className="bg-gray-900 p-4 rounded-lg">
              <motion.div
                variants={SlideUpVariants}
              >
                <Image 
                  src="/ABCDE.png" 
                  alt="Space debris visualization" 
                  width={600}
                  height={400}
                  className="w-full rounded"
                />
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            variants={SlideUpVariants}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              variants={SlideUpVariants}
            >
              B2B and B2C Medical Supply Solutions
            </motion.h2>
            <motion.p 
              className="text-sm md:text-base mb-6"
              variants={SlideUpVariants}
            >
                We offer medical supply solutions for businesses and individuals,
                with bulk ordering options and personalized service.
            </motion.p>
            <motion.ul className="space-y-3">
              {[
                "Bulk Ordering: Special pricing and dedicated support for business customers",
                "Individual Solutions: Personalized service for individual healthcare needs",
                "Flexible Payment: Multiple payment options and credit terms for business clients"
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  variants={SlideUpVariants}
                >
                  <div className="text-blue-400 mr-2">•</div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default MiddleSlides;
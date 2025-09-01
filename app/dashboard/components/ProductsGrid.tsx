// app/dashboard/components/ProductsGrid.tsx
import React from 'react';
import CurrentProductsList from './CurrentProductsList';
import UpcomingProductsList from './UpcomingProductsList';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const now: Date = new Date();
const indianTime: Date = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));

const day: string = String(indianTime.getDate()).padStart(2, '0');
const month: string = String(indianTime.getMonth() + 1).padStart(2, '0');
const year: number = indianTime.getFullYear();
const hours: number = indianTime.getHours();
const minutes: string = String(indianTime.getMinutes()).padStart(2, '0');
const ampm: string = hours >= 12 ? 'PM' : 'AM';
const hours12: string = String(hours % 12 || 12).padStart(2, '0');


interface Product {
  _id: string;
  name: string;
  _creationTime: number;
}

interface UpcomingProduct {
  _id: string;
  name: string;
  expectedDate: number;
}

interface ProductsGridProps {
  products: Product[];
  upcomingProducts: UpcomingProduct[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  upcomingProducts
}) => {
  const generatePdf = () => {
    const doc = new jsPDF();

    // Add current products
    doc.text('Current Products', 14, 20);
    autoTable(doc, {
      startY: 25,
      head: [['No.', 'Product Name', 'Stocked Date']],
      body: products.map((product, index) => [
        (index + 1).toString(),
        product.name.toUpperCase(),
        new Date(product._creationTime).toLocaleDateString('en-US')
      ]),
      theme: 'striped',
      headStyles: { fillColor: [34, 139, 34] }, // Green color
    });

    // Add upcoming products
    doc.addPage();
    doc.text('Upcoming Products', 14, 20);
    autoTable(doc, {
      startY: 25,
      head: [['No.', 'Product Name', 'Expected Date']],
      body: upcomingProducts.map((product, index) => [
        (index + 1).toString(),
        product.name.toUpperCase(),
        new Date(product.expectedDate).toLocaleDateString('en-US')
      ]),
      theme: 'striped',
      headStyles: { fillColor: [255, 165, 0] }, // Orange color
    });

    doc.save(`medghor_product_summary(${day}-${month}-${year},${hours12},${minutes}(${ampm})).pdf`);
    console.log(`medghor_product_summary(${day}-${month}-${year},${hours12},${minutes}(${ampm})).pdf`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
      <div className="lg:col-span-2 mb-4">
        <button
          onClick={generatePdf}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Products PDF
        </button>
      </div>
      <CurrentProductsList products={products} />
      <UpcomingProductsList upcomingProducts={upcomingProducts} />
    </div>
  );
};

export default ProductsGrid;
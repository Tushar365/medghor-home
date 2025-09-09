// app/dashboard/components/ProductsGrid.tsx
import React from 'react';
import CurrentProductsList from './CurrentProductsList';
import UpcomingProductsList from './UpcomingProductsList';
import CurrentGenericProductsList from './CurrentGenericProductsList';
import UpcomingGenericProductsList from './UpcomingGenericProductsList';

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
interface genericProduct {
  _id: string;
  name: string;
  _creationTime: number;
}
 
interface upcomingProduct {
  _id: string;
  name: string;
  expectedDate: number;
}

interface upcomingGenericProduct {
  _id: string;
  name: string;
  expectedDate: number;
}

interface ProductsGridProps {
  products: Product[];
  upcomingProducts: upcomingProduct[];
  genericProducts: genericProduct[];
  upcomingGenericProducts: upcomingGenericProduct[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  upcomingProducts,
  genericProducts,
  upcomingGenericProducts
}) => {
  const generatePdf = () => {
    const doc = new jsPDF();

    const addHeader = () => {
      doc.setFontSize(16);
      doc.text('MEDGHOR DISTRIBUTIONS', doc.internal.pageSize.width / 2, 10, { align: 'center' });
      doc.setFontSize(12);
      doc.text('CHANCHAL, MALDA', doc.internal.pageSize.width / 2, 15, { align: 'center' });
      doc.text(`Date: ${day}-${month}-${year}, Time: ${hours12}:${minutes} ${ampm}`, doc.internal.pageSize.width / 2, 20, { align: 'center' });
    };

    addHeader();

    // Add current products
    doc.text('Available Office Products', 14, 30);
    autoTable(doc, {
      startY: 35,
      head: [['No.', 'Product Name', 'Stocked Date']],
      body: products.map((product, index) => [
        (index + 1).toString(),
        product.name.toUpperCase(),
        new Date(product._creationTime).toLocaleDateString('en-US')
      ]),
      theme: 'striped',
      headStyles: { fillColor: [34, 139, 34] }, // Green color
    });
    // Add generic products
    doc.addPage();
    addHeader();
    doc.text('Available Generic Products', 14, 30);
    autoTable(doc, {
      startY: 35,
      head: [['No.', 'Product Name', 'Stocked Date']],
      body: genericProducts.map((genericProduct, index) => [
        (index + 1).toString(),
        genericProduct.name.toUpperCase(),
        new Date(genericProduct._creationTime).toLocaleDateString('en-US')
      ]),
      theme: 'striped',
      headStyles: { fillColor: [255, 192, 203] }, // Pink color
    });

    // Add upcoming products
    doc.addPage();
    addHeader();
    doc.text('Upcoming Office Products', 14, 30);
    autoTable(doc, {
      startY: 35,
      head: [['No.', 'Product Name', 'Expected Date']],
      body: upcomingProducts.map((upcomingProduct, index) => [
        (index + 1).toString(),
        upcomingProduct.name.toUpperCase(),
        new Date(upcomingProduct.expectedDate).toLocaleDateString('en-US')
      ]),
      theme: 'striped',
      headStyles: { fillColor: [255, 165, 0] }, // Orange color
    });
    // Add upcoming generic products
    doc.addPage();
    addHeader();
    doc.text('Upcoming Generic Products', 14, 30);
    autoTable(doc, {
      startY: 35,
      head: [['No.', 'Product Name', 'Expected Date']],
      body: upcomingGenericProducts.map((upcomingGenericProduct, index) => [
        (index + 1).toString(),
        upcomingGenericProduct.name.toUpperCase(),
        new Date(upcomingGenericProduct.expectedDate).toLocaleDateString('en-US')
      ]),
      theme: 'striped',
      headStyles: { fillColor: [128, 0, 128] }, // Purple color
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
      <CurrentGenericProductsList genericproducts={genericProducts} />
      <UpcomingProductsList upcomingProducts={upcomingProducts} />
      <UpcomingGenericProductsList upcomingGenericProducts={upcomingGenericProducts} />
      
    </div>
  );
};

export default ProductsGrid;
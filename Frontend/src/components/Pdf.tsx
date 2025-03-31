import React from "react";
import jsPDF from "jspdf";
import { Plus } from "lucide-react";

interface Message {
    role: string;
    content: string;
    timestamp: string;
}

interface PDFGeneratorProps {
    messages: Message[];
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ messages }) => {
    const generatePDF = () => {
        if (!Array.isArray(messages) || messages.length === 0) {
            console.error("Invalid messages array");
            return;
        }

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const maxWidth = pageWidth - margin * 2;
        const lineHeight = 10;
        let yPosition = 40; 

        doc.setFont("Algebrain", "bold");
        doc.setFontSize(24);
        doc.setTextColor(0, 139, 139);
        doc.text("M-Ezz AI", pageWidth / 2, pageHeight / 2, { align: "center"});
        doc.addPage();

        messages.forEach((message) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`${message.role.toUpperCase()}:`, margin, yPosition);
            yPosition += lineHeight;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            const wrappedText = doc.splitTextToSize(message.content, maxWidth);
            doc.text(wrappedText, margin, yPosition);

            yPosition += wrappedText.length * lineHeight + 5;

            if (yPosition > pageHeight - margin) {
                doc.addPage();
                yPosition = margin;
            }
        });

        doc.save("messages.pdf");
    };

    return (
        <button className='flex items-center gap-1 rounded cursor-pointer' onClick={generatePDF}>
            <Plus size={20} />Export PDF
        </button>
    );
};

export default PDFGenerator;

const generatePDF = () => {
    const content = document.getElementById("result-content");
    if (content) {
      // Create a new jsPDF instance
      const pdf = new jsPDF();
      
      // Temporarily hide the buttons to ensure they're not included in the PDF
      const buttons = document.querySelectorAll('.modal-container button');
      buttons.forEach((button) => (button as HTMLElement).style.display = 'none');
  
      // Add the result content to the PDF
      pdf.html(content, {
        callback: () => {
          // Show the buttons back after PDF is generated
          buttons.forEach((button) => (button as HTMLElement).style.display = 'inline-block');
          // Save the PDF with a given name
          pdf.save("result.pdf");
        },
        margin: [10, 10],
        autoSize: true,
      });
    }
  };
  
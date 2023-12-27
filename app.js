import * as pdfjsLib from 'pdfjs-dist';

async function getPdfText(url) {
    const pdf = await pdfjsLib.getDocument(url).promise;
    let pages = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const text = content.items.map(item => item.str).join('\n');
        pages.push({ pageNumber: pageNum, text: text });
    }

    return pages;
}

getPdfText('DO11365_27_12_2023.pdf').then(pages => {
    pages.forEach(page => {
        console.log(`Page ${page.pageNumber}:`);
        console.log(page.text);
        console.log('\n\n');
    });
});

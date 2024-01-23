import PDFDocument from 'pdfkit'

import { NFEProvider, NFEProviderProps } from '@app/providers/nfe-provider'

export class PDFKitNfeProvider implements NFEProvider {
  async generateNFE({
    customerName,
    product,
    total,
  }: NFEProviderProps): Promise<Buffer> {
    return new Promise((resolve) => {
      const doc = new PDFDocument()

      doc.fontSize(20).text('Nota Fiscal', { align: 'center' })

      doc.fontSize(12).text(`Cliente: ${customerName}`)
      doc.moveDown()

      doc.fontSize(12).text('Itens:')
      doc.moveDown()

      doc.fontSize(10).text(`- ${product.name}: ${product.price}`)
      doc.moveDown()

      doc.fontSize(10).text(`${product.quantity} Unidades`)
      doc.moveDown()

      doc.fontSize(12).text(`Total: R$${total.toFixed(2)}`, { align: 'right' })

      const chunks: Buffer[] = []

      doc.on('data', (chunk) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))

      doc.end()
    })
  }
}

import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import PdfPrinter from 'pdfmake';
import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

// Sample account statement data
const accountStatementData = [
  { date: '2023-01-01', description: 'Deposit', amount: 1000 },
  { date: '2023-02-01', description: 'Withdrawal', amount: -500 },
  // Add more transactions as needed
];

// Define the document definition
const complexDocumentDefinition: TDocumentDefinitions = {
  pageSize: 'A4',
  pageMargins: [40, 60, 40, 60],
  header: {
    text: 'Account Statement',
    fontSize: 18,
    bold: true,
    margin: [40, 20, 40, 10],
    alignment: 'center',
  },
  footer: function (currentPage, pageCount) {
    return {
      text: `Page ${currentPage.toString()} of ${pageCount.toString()}`,
      alignment: 'center',
      fontSize: 10,
      margin: [0, 10, 0, 0],
    };
  },
  content: [
    {
      text: 'ACCOUNT HOLDER DETAILS',
      style: 'header',
    },
    {
      text: [
        {
          text: 'Account holder name: ',
          bold: true,
        },
        {
          text: 'Mohammed Paqer',
        },
      ],
    },
    {
      text: [
        {
          text: 'Registered Mobile number: ',
          bold: true,
        },
        {
          text: '07828477048',
        },
      ],
    },
    {
      text: [
        {
          text: 'Residential address: ',
          bold: true,
        },
        {
          text: 'Al-saydia',
        },
      ],
    },
    {
      text: 'ACCOUNT DETAILS',
      style: 'header',
    },
    {
      text: [
        {
          text: 'Account type: ',
          bold: true,
        },
        {
          text: 'Saving',
        },
      ],
    },
    {
      text: [
        {
          text: 'Account balance: ',
          bold: true,
        },
        {
          text: '3000',
        },
      ],
    },
    {
      text: 'ACCOUNT STATEMENT',
      style: 'header',
    },
    {
      table: {
        headerRows: 1,
        widths: ['auto', '*', 'auto'],
        body: [
          [
            { text: 'Date', bold: true },
            { text: 'Description', bold: true },
            { text: 'Amount', bold: true },
          ],
          ...accountStatementData.map((transaction) => [
            transaction.date,
            transaction.description,
            transaction.amount,
          ]),
        ],
      },
    },
    '\n\n',
    {
      text: 'Summary:',
      style: 'summary',
    },
    {
      ul: [
        'Total Deposits: $1000',
        'Total Withdrawals: $500',
        'Net Balance: $500',
      ],
    },
  ],
  styles: {
    summary: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 0],
    },
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 10, 0, 0],
    },
  },
};

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(createAccountDto: CreateAccountDto) {
    const { userId, ...body } = createAccountDto;
    return this.prisma.account.create({
      data: {
        ...body,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll() {
    const data = await this.prisma.account.findMany({});

    const count = await this.prisma.account.count({});

    return { count, data };
  }

  async findMyAccounts(userId: string) {
    const where: Prisma.AccountFindManyArgs['where'] = {
      userId,
    };

    const data = await this.prisma.account.findMany({
      where,
    });

    const count = await this.prisma.account.count({
      where,
    });

    return { count, data };
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  async generateAccountStatement(id: number) {
    return new Promise<Buffer>((res, rej) => {
      const fonts = {
        Roboto: {
          normal: 'fonts/Roboto-Regular.ttf',
          bold: 'fonts/Roboto-Medium.ttf',
          italics: 'fonts/Roboto-Italic.ttf',
          bolditalics: 'fonts/Roboto-MediumItalic.ttf',
        },
      };
      const printer = new PdfPrinter(fonts);

      // Generate the PDF
      const doc = printer.createPdfKitDocument(complexDocumentDefinition);
      // pdfDoc.pipe(fs.createWriteStream('uploads/basics.pdf'));
      // pdfDoc.end();

      const chunks = [];
      let result: Buffer;

      doc.on('data', function (chunk) {
        chunks.push(chunk);
      });

      doc.on('end', function () {
        result = Buffer.concat(chunks);
        res(result);
      });

      doc.end();
    });
  }
}

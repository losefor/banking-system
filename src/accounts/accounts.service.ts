import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

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

  async findAll(args: Prisma.AccountFindManyArgs = {}) {
    const data = await this.prisma.account.findMany(args);

    const count = await this.prisma.account.count({ where: args.where });

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

  findOne(id: string) {
    return this.prisma.account.findUnique({
      where: { id },
    });
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  remove(id: string) {
    return this.prisma.account.delete({
      where: { id },
    });
  }

  async generateAccountStatement(id: string) {
    const account = await this.prisma.account.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    const transactions = await this.prisma.confirmedTransaction.findMany({
      where: {
        OR: [{ fromAccountId: id }, { toAccountId: id }],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalDeposits = transactions
      .filter((x) => x.type === 'DEPOSIT')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalWithdrawal = transactions
      .filter((x) => x.type === 'WITHDRAWAL')
      .reduce((acc, curr) => acc + curr.amount, 0);

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
                text: account.user.fullName,
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
                text: account.user.username,
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
                text: account.user.address,
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
                text: account.accountType,
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
                text: account.balance,
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
                ...transactions.map((transaction) => [
                  transaction.createdAt.toDateString(),
                  transaction.type,
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
              `Total Deposits: ${totalDeposits}`,
              `Total Withdrawals: ${totalWithdrawal}`,
              `Net Balance: ${totalDeposits - totalWithdrawal}`,
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

      // Generate the PDF
      const doc = printer.createPdfKitDocument(complexDocumentDefinition);

      // Convert stream into Buffer
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

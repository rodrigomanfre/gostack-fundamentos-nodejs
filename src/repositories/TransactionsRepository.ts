import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  private getSum(type: string): number {
    return this.transactions
      .filter(transaction => transaction.type === type)
      .reduce((acumulador, transaction) => acumulador + transaction.value, 0);
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance | null {
    if (this.transactions.length === 0) {
      return null;
    }

    const totalInCome = this.getSum('income');
    const totalOutCome = this.getSum('outcome');

    const balance: Balance = {
      income: totalInCome,
      outcome: totalOutCome,
      total: totalInCome - totalOutCome,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

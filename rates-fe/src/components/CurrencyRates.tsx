import { CurrencyRate } from '../models/currencyRate';
import CurrencyConverter from './CurrencyConverter';
import { Table } from 'antd';

interface CurrencyConverterProps {
  currencyRates: CurrencyRate[];
}

const columns = [
  {
    title: 'Currency',
    dataIndex: 'currency',
    key: 'currency',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
    render: (rate: number) => rate.toFixed(3),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date: string) => {
      const formattedDate = new Date(date);
      const day = formattedDate.getDate().toString().padStart(2, '0');
      const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = formattedDate.getFullYear();
      return `${day}.${month}.${year}`;
    },
  },
];

function CurrencyRates({ currencyRates }: CurrencyConverterProps) {
  return (
    <>
      <CurrencyConverter currencyRates={currencyRates} />
      <Table dataSource={currencyRates} columns={columns} rowKey="currency" />
    </>
  );
}

export default CurrencyRates;

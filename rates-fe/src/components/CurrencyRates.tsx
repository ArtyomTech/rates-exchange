import { CurrencyRate } from '../models/currencyRate';
import CurrencyConverter from './CurrencyConverter';
import { format } from 'date-fns';
import { Table } from 'antd';

interface CurrencyConverterProps {
  currencyRates: CurrencyRate[];
}

const columns = [
  {
    title: 'Currency',
    dataIndex: 'currency',
    key: 'currency',
    width: '20%',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
    render: (rate: number) => rate.toFixed(3),
    width: '40%',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: '40%',
    render: (date: string) => format(new Date(date), 'dd.MM.yyyy'),
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

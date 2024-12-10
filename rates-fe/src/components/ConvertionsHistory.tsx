import { Table } from 'antd';

interface ConversionHistoryRecord {
  key: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
}

const data: ConversionHistoryRecord[] = [
  {
    key: '1',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    amount: 40,
    result: 85,
  },
  {
    key: '2',
    fromCurrency: 'EUR',
    toCurrency: 'GBP',
    amount: 20,
    result: 72,
  },
];

const columns = [
  {
    title: 'From Currency',
    dataIndex: 'fromCurrency',
    key: 'fromCurrency',
  },
  {
    title: 'To Currency',
    dataIndex: 'toCurrency',
    key: 'toCurrency',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: number) => `${amount.toFixed(3)}`,
  },
  {
    title: 'Result',
    dataIndex: 'result',
    key: 'result',
    render: (result: number) => result.toFixed(3),
  },
];

function ConvertionsHistory() {
  return <Table columns={columns} dataSource={data} rowKey="key" />;
}

export default ConvertionsHistory;

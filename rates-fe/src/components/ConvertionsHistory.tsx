import axiosInstance from '../axios/axiosInstance';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Table } from 'antd';

interface ConversionHistoryRecord {
  key: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  createdAt: string;
  fromExchangeRateLink: string;
  toExchangeRateLink: string;
}

const columns = [
  {
    title: 'From Currency',
    dataIndex: 'fromCurrency',
    width: '10%',
    render: (currency: string, record: ConversionHistoryRecord) => (
      <a
        href={record.fromExchangeRateLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {currency}
      </a>
    ),
    sorter: (a: ConversionHistoryRecord, b: ConversionHistoryRecord) =>
      a.fromCurrency.localeCompare(b.fromCurrency),
  },
  {
    title: 'To Currency',
    dataIndex: 'toCurrency',
    width: '10%',
    render: (currency: string, record: ConversionHistoryRecord) => (
      <a
        href={record.toExchangeRateLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {currency}
      </a>
    ),
    sorter: (a: ConversionHistoryRecord, b: ConversionHistoryRecord) =>
      a.toCurrency.localeCompare(b.toCurrency),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: '20%',
    render: (amount: number) => {
      const formattedAmount = new Intl.NumberFormat('en-GB', {
        maximumFractionDigits: 3,
      }).format(amount);
      return formattedAmount;
    },
  },
  {
    title: 'Result',
    dataIndex: 'result',
    width: '20%',
    render: (result: number) => {
      const formattedResult = new Intl.NumberFormat('en-GB', {
        maximumFractionDigits: 3,
      }).format(result);
      return formattedResult;
    },
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    width: '40%',
    render: (createdAt: string) => {
      const date = new Date(createdAt);
      return format(date, 'dd.MM.yyyy HH:mm');
    },
    sorter: (a: ConversionHistoryRecord, b: ConversionHistoryRecord) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
];

function ConversionsHistory() {
  const [data, setData] = useState<ConversionHistoryRecord[]>([]);

  useEffect(() => {
    const fetchConversionHistory = async () => {
      try {
        const response = await axiosInstance.get<ConversionHistoryRecord[]>(
          'currency-rates/conversions',
        );
        const formattedData = response.data.map((item) => ({
          ...item,
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching conversion history:', error);
      }
    };

    fetchConversionHistory();
  }, []);

  return <Table columns={columns} dataSource={data} rowKey="key" />;
}

export default ConversionsHistory;

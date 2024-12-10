import { CurrencyRate } from '../models/currencyRate';
import CurrencyConverter from './CurrencyConverter';
import { Button, message, Spin, Table } from 'antd';
import axiosInstance from '../axios/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

function Home() {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const response =
          await axiosInstance.get<CurrencyRate[]>('currency-rates');
        setCurrencyRates(response.data);
        setLoading(false);
      } catch (error) {
        message.error('Failed to fetch currency rates');
        setLoading(false);
      }
    };

    fetchCurrencyRates();
  }, []);

  const signOut = () => {
    logout();
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Button onClick={signOut} style={{ marginBottom: '20px' }}>
            Sign Out
          </Button>
          <CurrencyConverter currencyRates={currencyRates} />
          <Table
            dataSource={currencyRates}
            columns={columns}
            rowKey="currency"
          />
        </>
      )}
    </div>
  );
}

export default Home;

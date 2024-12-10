import ConvertionsHistory from '../components/ConvertionsHistory';
import { Button, Card, Menu, message, Row, Spin } from 'antd';
import CurrencyRates from '../components/CurrencyRates';
import { CurrencyRate } from '../models/currencyRate';
import axiosInstance from '../axios/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import Container from '../components/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
  const { username } = useUser();
  const { setUsername } = useUser();
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<string>('currencyRates');

  const handleMenuClick = (e: any) => {
    setSelectedMenu(e.key);
  };

  const menuItems = [
    { key: 'currencyRates', label: 'Currency Rates' },
    { key: 'conversionHistory', label: 'Conversion History' },
  ];

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

  useEffect(() => {}, [username]);

  const signOut = () => {
    logout();
    setUsername(null);
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Container>
          <Card bordered>
            <Row justify="end" style={{ marginBottom: '20px' }}>
              <Button onClick={signOut}>Sign Out</Button>
            </Row>
            {username && <h2>Welcome, {username}!</h2>}
            <div style={{ width: '100%' }}>
              <Menu
                onClick={handleMenuClick}
                selectedKeys={[selectedMenu]}
                mode="horizontal"
                items={menuItems}
                style={{ marginBottom: '20px' }}
              />

              {selectedMenu === 'currencyRates' && (
                <CurrencyRates currencyRates={currencyRates} />
              )}

              {selectedMenu === 'conversionHistory' && <ConvertionsHistory />}
            </div>
          </Card>
        </Container>
      )}
    </>
  );
}

export default Home;

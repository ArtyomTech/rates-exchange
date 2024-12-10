import { Select, Input, Button, message, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { CurrencyRate } from '../models/currencyRate';
import { useState } from 'react';

interface CurrencyConverterProps {
  currencyRates: CurrencyRate[];
}

function CurrencyConverter({ currencyRates }: CurrencyConverterProps) {
  const [amount, setAmount] = useState<number | string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<number | string>('');
  const [finalToCurrency, setFinalToCurrency] = useState<string>('');

  const handleConversion = () => {
    if (amount && fromCurrency && toCurrency) {
      const fromRate = currencyRates.find(
        (rate) => rate.currency === fromCurrency,
      )?.rate;
      const toRate = currencyRates.find(
        (rate) => rate.currency === toCurrency,
      )?.rate;

      if (fromRate && toRate) {
        const result = (Number(amount) * toRate) / fromRate;
        setConvertedAmount(result.toFixed(3));
        setFinalToCurrency(toCurrency);
      } else {
        message.error('Invalid currency selected');
      }
    } else {
      message.error('Please provide valid input for conversion');
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography.Text strong>Convert From:</Typography.Text>
      <Select
        placeholder="From Currency"
        style={{ width: 120, margin: '10px' }}
        value={fromCurrency}
        onChange={setFromCurrency}
      >
        {currencyRates.map((rate) => (
          <Select.Option key={rate.currency} value={rate.currency}>
            {rate.currency}
          </Select.Option>
        ))}
      </Select>

      <Input
        style={{ width: 120, marginRight: '10px' }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        type="number"
      />

      <ArrowRightOutlined style={{ margin: '0 10px' }} />

      <Typography.Text strong>Convert To:</Typography.Text>
      <Select
        placeholder="To Currency"
        style={{ width: 120, margin: '10px' }}
        value={toCurrency}
        onChange={setToCurrency}
      >
        {currencyRates.map((rate) => (
          <Select.Option key={rate.currency} value={rate.currency}>
            {rate.currency}
          </Select.Option>
        ))}
      </Select>

      <Button
        onClick={handleConversion}
        type="primary"
        style={{ marginLeft: '10px' }}
      >
        Convert
      </Button>

      {convertedAmount && finalToCurrency && (
        <div style={{ marginTop: '10px' }}>
          <strong>Converted Amount:</strong> {convertedAmount} {finalToCurrency}
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;

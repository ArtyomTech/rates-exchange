import { Select, Input, Button, message, Form, Col, Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { CurrencyRate } from '../models/currencyRate';
import axiosInstance from '../axios/axiosInstance';
import { useState } from 'react';

interface CurrencyConverterProps {
  currencyRates: CurrencyRate[];
}

interface Conversion {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
}

function CurrencyConverter({ currencyRates }: CurrencyConverterProps) {
  const [form] = Form.useForm();
  const [convertedAmount, setConvertedAmount] = useState<number | string>('');
  const [finalToCurrency, setFinalToCurrency] = useState<string>('');
  const maxAmount = 1_000_000;
  const formattedAmount = new Intl.NumberFormat('en-GB').format(maxAmount);

  const handleConversion = () => {
    const { amount, fromCurrency, toCurrency } = form.getFieldsValue();

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

        sendConversion({
          fromCurrency,
          toCurrency,
          amount,
          result: parseFloat(result.toFixed(3)),
        });
      } else {
        message.error('Invalid currency selected');
      }
    } else {
      message.error('Please provide valid input for conversion');
    }
  };

  const sendConversion = async ({
    fromCurrency,
    toCurrency,
    amount,
    result,
  }: Conversion): Promise<void> => {
    try {
      await axiosInstance.post('currency-rates/conversion', {
        fromCurrency,
        toCurrency,
        amount,
        result,
      });
      console.log('Conversion data sent successfully');
    } catch (error) {
      console.error('Error sending data to backend:', error);
      message.error('Failed to send conversion data');
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handleConversion}
        style={{ marginBottom: '20px' }}
        layout="inline"
      >
        <Col>
          <Form.Item
            name="fromCurrency"
            rules={[{ required: true, message: 'Please select a currency' }]}
            style={{ width: '150px' }}
          >
            <Select placeholder="From Currency">
              {currencyRates.map((rate) => (
                <Select.Option key={rate.currency} value={rate.currency}>
                  {rate.currency}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            name="amount"
            rules={[
              { required: true, message: 'Amount is required' },
              {
                validator: (_, value) => {
                  if (value > maxAmount) {
                    return Promise.reject(
                      new Error(
                        `Amount cannot exceed ${new Intl.NumberFormat('en-GB').format(maxAmount)}`,
                      ),
                    );
                  }
                  if (value && Number(value) > 0) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('Amount is invalid'));
                },
              },
            ]}
            style={{ width: '150px' }}
          >
            <Input
              placeholder="Amount"
              type="text"
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                let inputValue = input.value;
                const regex = /^\d{1,7}(\.\d{0,3})?$/;
                if (regex.test(inputValue)) {
                  if (Number(inputValue) > maxAmount) {
                    message.error(`Amount cannot exceed ${formattedAmount}`);
                    inputValue = maxAmount.toString();
                  }

                  input.value = inputValue;
                } else {
                  inputValue = inputValue.slice(0, -1);
                  input.value = inputValue;
                }
              }}
            />
          </Form.Item>
        </Col>

        <Col style={{ paddingRight: '16px', paddingTop: '4px' }}>
          <ArrowRightOutlined />
        </Col>

        <Col>
          <Form.Item
            name="toCurrency"
            rules={[{ required: true, message: 'Please select a currency' }]}
            style={{ width: '150px' }}
          >
            <Select placeholder="To Currency">
              {currencyRates.map((rate) => (
                <Select.Option key={rate.currency} value={rate.currency}>
                  {rate.currency}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col>
          <Form.Item style={{ marginLeft: '8px' }}>
            <Button type="primary" htmlType="submit">
              Convert
            </Button>
          </Form.Item>
        </Col>
      </Form>

      {convertedAmount && finalToCurrency && (
        <Card
          style={{
            margin: '20px 0',
            backgroundColor: '#f6ffed',
            borderColor: '#b7eb8f',
          }}
        >
          <strong>Converted Amount:</strong> {convertedAmount} {finalToCurrency}
        </Card>
      )}
    </>
  );
}

export default CurrencyConverter;

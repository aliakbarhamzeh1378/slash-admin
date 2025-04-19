import { Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type React from 'react';

const { Title } = Typography;

interface BillingHistoryItem {
  key: string;
  date: string;
  amount: number;
  plan: string;
  status: string;
}

const BillingHistory: React.FC = () => {
  const columns: ColumnsType<BillingHistoryItem> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const data: BillingHistoryItem[] = [
    {
      key: '1',
      date: '2024-04-01',
      amount: 29.99,
      plan: 'Pro Plan',
      status: 'Paid',
    },
    {
      key: '2',
      date: '2024-03-01',
      amount: 29.99,
      plan: 'Pro Plan',
      status: 'Paid',
    },
  ];

  return (
    <Card>
      <Title level={2}>Billing History</Title>
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default BillingHistory; 
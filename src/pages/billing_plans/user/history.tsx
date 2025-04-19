import { Card, Table, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

import { getBillingHistory } from '@/services/billing';
import type { BillingHistory } from '@/services/billing';

const { Title } = Typography;

const BillingHistoryPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<BillingHistory[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getBillingHistory();
        setHistory(data);
      } catch (error) {
        message.error('Failed to fetch billing history');
        console.error('Error fetching billing history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const columns: ColumnsType<BillingHistory> = [
    {
      title: 'Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
      render: (date: string) => new Date(date).toLocaleDateString(),
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
      render: (plan) => plan.name,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <Card>
      <Title level={2}>Billing History</Title>
      <Table
        columns={columns}
        dataSource={history}
        rowKey="id"
        loading={loading}
      />
    </Card>
  );
};

export default BillingHistoryPage; 
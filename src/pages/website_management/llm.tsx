import { CodeOutlined, HistoryOutlined, PlayCircleOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Col, Collapse, Form, Input, InputNumber, Row, Select, Space, Switch, Table, Tabs, Tag, Typography } from 'antd';
import type React from 'react';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Panel } = Collapse;

interface PromptConfig {
  system: string;
  human: string;
}

interface ProductSearchPrompt {
  refinement_prompt: {
    system: string;
  };
  extract_search_params_prompts: {
    system: string;
  };
}

interface PromptConfigs {
  classification_prompt: PromptConfig;
  base_response_prompt: PromptConfig;
  compare_product_guidelines: PromptConfig;
  product_deep_dive_prompt: PromptConfig;
  product_search_prompt: ProductSearchPrompt;
}

const LLMManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [promptForm] = Form.useForm();

  const modelHistory = [
    { key: '1', model: 'GPT-4', prompt: 'Customer support response', tokens: 150, status: 'success', time: '2 mins ago' },
    { key: '2', model: 'GPT-3.5', prompt: 'Product description', tokens: 89, status: 'success', time: '5 mins ago' },
    { key: '3', model: 'Claude', prompt: 'Technical documentation', tokens: 234, status: 'error', time: '10 mins ago' },
  ];

  const columns = [
    { title: 'Model', dataIndex: 'model', key: 'model' },
    { title: 'Prompt', dataIndex: 'prompt', key: 'prompt' },
    { title: 'Tokens', dataIndex: 'tokens', key: 'tokens' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'success' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    { title: 'Time', dataIndex: 'time', key: 'time' },
  ];

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  const promptConfigs: PromptConfigs = {
    classification_prompt: {
      system: 'You are a helpful e-commerce assistant. Classify the subject of the message into one of the following categories:\n\n' +
        '**Question about store**: Questions about store policies, locations, hours, shipping, returns, or any store-related inquiry not about specific products.\n\n' +
        '**Product Deep Dive**: Questions about a specific product\'s details, features, specifications, functionalities, brand, sizes, colors, materials, or any attribute of a single product.\n\n' +
        '**Compare Products**: Requests to compare two or more specific products, their features, prices, or any attributes.\n\n' +
        '**Product Search**: General product search queries, like "i\'m looking for nike sneaker", "can you show me the jacket" and etc\n\n' +
        '**Product Discovery**: Browsing or exploration queries ("What\'s new?", "Show me popular items", "What\'s trending?").\n\n' +
        '**Normal Conversation**: Greetings, general chat, thank you messages, or any conversation not fitting the above categories.',
      human: 'Classify the subject of this message: {message}\n\n' +
        'Previous conversation:\n' +
        '{memory}\n\n' +
        'Product context:\n' +
        '{product_context}'
    },
    base_response_prompt: {
      system: 'You are a helpful e-commerce assistant specialized in {specialization}.\n\n' +
        'Conversation history: {summary}\n\n' +
        'Guidelines:\n' +
        '- Provide concise, accurate responses focused on the user\'s query\n' +
        '- Use a friendly, helpful tone\n' +
        '- Include relevant product details when discussing specific items\n' +
        '- Offer suggestions based on the user\'s interests shown in conversation history\n' +
        '- If uncertain about specific product details, clarify what information you can provide',
      human: 'Generate a response addressing this message: {message}'
    },
    compare_product_guidelines: {
      system: 'You are a product comparison specialist. When comparing products:\n\n' +
        '**Data Retrieval Rules:**\n' +
        '1. For comparing with previously viewed products, use get_previous_user_visited_product to retrieve previous product data\n' +
        '2. For comparing items from previous searches, access them from Search results handles\n' +
        '3. Always create a JSON with product handles: {"handles": ["product-handle-1", "product-handle-2"]}\n' +
        '4. Verify data availability before comparing; inform the user if products can\'t be fetched\n' +
        '5. Fetch complete product data for all products mentioned in the message\n' +
        '6. Use Current context to access current product handles\n' +
        '7. For products not in Current context, use search_products tool\n' +
        '8. Utilize user history for better understanding of preferences and context',
      human: 'Compare these products: {message}'
    },
    product_deep_dive_prompt: {
      system: 'You are a knowledgeable product specialist providing detailed information about specific products.\n\n' +
        'When responding to product inquiries:\n\n' +
        '- Analyze both the current query and conversation history to provide context-aware responses\n' +
        '- For ambiguous references like "What about this?" or "Is it available?", refer to the most recent product/topic\n' +
        '- Match your response to the specific aspect the user is asking about:\n' +
        '  * For price queries → Provide clear pricing information with variants if applicable\n' +
        '  * For availability → Share stock status, shipping times\n' +
        '  * For features → Highlight key product features relevant to the user\'s interests\n' +
        '  * For specifications → Provide technical details in an easily scannable format\n\n' +
        '- Format information clearly with appropriate spacing and organization\n' +
        '- Use emojis sparingly to enhance readability\n' +
        '- Keep responses concise but complete\n' +
        '- Focus on answering the specific question rather than providing generic product descriptions\n' +
        '- When appropriate, suggest complementary products based on the user\'s interests',
      human: 'Conversation History:\n' +
        '{history}\n\n' +
        'Current Product Details:\n' +
        '{product_details}\n\n' +
        'User Query: {message_content}'
    },
    product_search_prompt: {
      refinement_prompt: {
        system: 'You are a Kith shopping assistant specializing in fashion and accessories. Your goal is to help users find exactly what they\'re looking for efficiently.\n\n' +
          'When a user\'s search returns many results or is ambiguous:\n\n' +
          '1. Acknowledge their search query\n' +
          '2. Briefly mention the number of results if relevant\n' +
          '3. Ask 2-3 specific, targeted questions to narrow their search\n\n' +
          'Focus your questions on:\n' +
          '- Style specifics (casual, formal, athletic, streetwear)\n' +
          '- Essential features or attributes\n' +
          '- Size, color, or material preferences\n' +
          '- Price range if not specified\n' +
          '- Intended use (occasion, season, activity)\n' +
          '- Brand preferences if relevant\n\n' +
          'Keep your tone conversational but direct. Skip greetings and get straight to helping refine their search.'
      },
      extract_search_params_prompts: {
        system: 'You are a product search parameter extractor. Extract structured data from the user\'s natural language query and conversation history and refine the query.If user ask products based current or previus visited product , dont fill query and live it empty and fill other field based current or previus visited product\n' +
          'Given the user input, identify the following parameters if present:\n' +
          '- query: The refined search query based original user query and history and create very simple query contain title and brand only\n' +
          '- size: The product size (e.g., \'small\', \'XL\', \'10\', etc.)\n' +
          '- color: The product color\n' +
          '- style: The product style (e.g., \'casual\', \'formal\', etc.)\n' +
          '- material: The product material (e.g., \'cotton\', \'leather\', etc.)\n' +
          '- tags: Tags related to the product (e.g., \'women\', \'sports\', etc.) as a list\n' +
          '- published_after: Date filter for products published after (in ISO format)\n' +
          '- updated_after: Date filter for products updated after (in ISO format)\n' +
          '- features: Special product features as a list\n' +
          '- min_price, max_price, exact_price: Price range or exact price \n' +
          '- only_available: Boolean indicating whether to show only available products (default: false)\n\n' +
          '** dont let query be empty **\n' +
          '**important, if you cant fill any item or event you guess that was under 80% correct, leave them None **'
      }
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>LLM Management</Title>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Model Configuration" key="1">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Model Configuration">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{
                    model: 'gpt-4',
                    temperature: 0.7,
                    maxTokens: 1000,
                    enableStreaming: true,
                  }}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Model"
                        name="model"
                        rules={[{ required: true, message: 'Please select a model!' }]}
                      >
                        <Select>
                          <Option value="gpt-4">GPT-4</Option>
                          <Option value="gpt-3.5">GPT-3.5</Option>
                          <Option value="claude">Claude</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Temperature"
                        name="temperature"
                        rules={[{ required: true, message: 'Please input temperature!' }]}
                      >
                        <InputNumber min={0} max={1} step={0.1} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Max Tokens"
                        name="maxTokens"
                        rules={[{ required: true, message: 'Please input max tokens!' }]}
                      >
                        <InputNumber min={1} max={4000} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item label="Enable Streaming" name="enableStreaming" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SettingOutlined />}>
                      Save Configuration
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="Quick Stats">
                <p>Total API Calls: 1,234</p>
                <p>Average Response Time: 1.2s</p>
                <p>Success Rate: 99.8%</p>
                <p>Total Tokens Used: 45,678</p>
              </Card>
            </Col>
          </Row>

          <Card title="Test Model" style={{ marginTop: '16px' }}>
            <Form layout="vertical">
              <Form.Item label="Prompt">
                <TextArea rows={4} placeholder="Enter your prompt here..." />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon={<PlayCircleOutlined />}>
                  Run Test
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab="Prompt Configuration" key="2">
          <Card>
            <Collapse defaultActiveKey={['1']}>
              <Panel header="Classification Prompt" key="1">
                <Form layout="vertical">
                  <Form.Item label="System Prompt">
                    <TextArea
                      rows={8}
                      value={promptConfigs.classification_prompt.system}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Form.Item>
                  <Form.Item label="Human Prompt">
                    <TextArea
                      rows={4}
                      value={promptConfigs.classification_prompt.human}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Form.Item>
                  <Button type="primary" icon={<SaveOutlined />}>
                    Save Classification Prompt
                  </Button>
                </Form>
              </Panel>

              <Panel header="Base Response Prompt" key="2">
                <Form layout="vertical">
                  <Form.Item label="System Prompt">
                    <TextArea
                      rows={8}
                      value={promptConfigs.base_response_prompt.system}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Form.Item>
                  <Form.Item label="Human Prompt">
                    <TextArea
                      rows={4}
                      value={promptConfigs.base_response_prompt.human}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Form.Item>
                  <Button type="primary" icon={<SaveOutlined />}>
                    Save Base Response Prompt
                  </Button>
                </Form>
              </Panel>

              <Panel header="Compare Products Guidelines" key="3">
                <Form layout="vertical">
                  <Form.Item label="System Prompt">
                    <TextArea
                      rows={12}
                      value={promptConfigs.compare_product_guidelines.system}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Form.Item>
                  <Form.Item label="Human Prompt">
                    <TextArea
                      rows={4}
                      value={promptConfigs.compare_product_guidelines.human}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Form.Item>
                  <Button type="primary" icon={<SaveOutlined />}>
                    Save Compare Products Guidelines
                  </Button>
                </Form>
              </Panel>

              <Panel header="Product Deep Dive Prompt" key="4">
                <Form layout="vertical">
                  <Form.Item label="System Prompt">
                    <TextArea
                      rows={12}
                      value={promptConfigs.product_deep_dive_prompt.system}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Form.Item>
                  <Form.Item label="Human Prompt">
                    <TextArea
                      rows={4}
                      value={promptConfigs.product_deep_dive_prompt.human}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Form.Item>
                  <Button type="primary" icon={<SaveOutlined />}>
                    Save Product Deep Dive Prompt
                  </Button>
                </Form>
              </Panel>

              <Panel header="Product Search Prompt" key="5">
                <Form layout="vertical">
                  <Form.Item label="Refinement Prompt">
                    <TextArea
                      rows={12}
                      value={promptConfigs.product_search_prompt.refinement_prompt.system}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Form.Item>
                  <Form.Item label="Extract Search Params Prompt">
                    <TextArea
                      rows={12}
                      value={promptConfigs.product_search_prompt.extract_search_params_prompts.system}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </Form.Item>
                  <Button type="primary" icon={<SaveOutlined />}>
                    Save Product Search Prompts
                  </Button>
                </Form>
              </Panel>
            </Collapse>
          </Card>
        </TabPane>

        <TabPane tab="Usage History" key="3">
          <Card
            title={
              <Space>
                <HistoryOutlined />
                Recent Model Usage
              </Space>
            }
          >
            <Table
              dataSource={modelHistory}
              columns={columns}
              pagination={false}
              size="middle"
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default LLMManagement; 
import { Iconify } from "@/components/icon";
import { Button, Card, Col, Descriptions, Divider, Form, Input, Row, Tag, Typography, message } from "antd";
import type React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// Define types for our data
interface Comment {
	id: number;
	author: string;
	date: string;
	content: string;
}

interface Ticket {
	id: number;
	title: string;
	status: string;
	priority: string;
	category: string;
	created: string;
	updated: string;
	description: string;
	assignedTo: string;
	attachments: string[];
	comments: Comment[];
}

// Mock data for ticket details - in a real app, this would come from an API
const getTicketDetails = (id: string): Ticket => {
	// This is just mock data - in a real app, you would fetch this from an API
	return {
		id: Number.parseInt(id),
		title: "Account Access Issue",
		status: "Open",
		priority: "High",
		category: "Technical Issue",
		created: "2024-03-20",
		updated: "2024-03-21",
		description:
			'I am unable to access my account after changing my password. I receive an error message saying "Invalid credentials" even though I am sure the password is correct.',
		assignedTo: "Support Team",
		attachments: ["screenshot.png", "error-log.txt"],
		comments: [
			{
				id: 1,
				author: "John Doe",
				date: "2024-03-20 10:30 AM",
				content: "Thank you for reporting this issue. We are looking into it.",
			},
			{
				id: 2,
				author: "Jane Smith",
				date: "2024-03-21 02:15 PM",
				content:
					"We have identified the issue and are working on a fix. This should be resolved within the next 24 hours.",
			},
		],
	};
};

const TicketView: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [showReplyForm, setShowReplyForm] = useState(false);
	const [ticket, setTicket] = useState<Ticket | null>(null);

	if (!id) {
		return <div>Ticket ID not found</div>;
	}

	// Initialize ticket data
	if (!ticket) {
		setTicket(getTicketDetails(id));
	}

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "open":
				return "blue";
			case "in progress":
				return "orange";
			case "resolved":
				return "green";
			case "closed":
				return "gray";
			default:
				return "default";
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority.toLowerCase()) {
			case "low":
				return "green";
			case "medium":
				return "orange";
			case "high":
				return "red";
			case "urgent":
				return "purple";
			default:
				return "default";
		}
	};

	const handleReply = () => {
		setShowReplyForm(true);
	};

	const handleSubmitReply = (values: { reply: string }) => {
		if (!ticket) return;

		// In a real app, this would send the reply to the server
		const newComment: Comment = {
			id: ticket.comments.length + 1,
			author: "Current User", // In a real app, this would be the logged-in user
			date: new Date().toLocaleString(),
			content: values.reply,
		};

		// Update the ticket with the new comment
		const updatedTicket: Ticket = {
			...ticket,
			comments: [...ticket.comments, newComment],
			updated: new Date().toISOString().split("T")[0],
		};

		setTicket(updatedTicket);
		form.resetFields();
		setShowReplyForm(false);
		message.success("Reply submitted successfully");
	};

	const handleCloseTicket = () => {
		if (!ticket) return;

		// In a real app, this would send a request to close the ticket
		const updatedTicket: Ticket = {
			...ticket,
			status: "Closed",
			updated: new Date().toISOString().split("T")[0],
		};

		setTicket(updatedTicket);
		message.success("Ticket closed successfully");
	};

	if (!ticket) {
		return <div>Loading...</div>;
	}

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<Title level={2}>Ticket #{ticket.id}</Title>
				<Button icon={<Iconify icon="mdi:arrow-left" />} onClick={() => navigate("/support")}>
					Back to Support
				</Button>
			</div>

			<Row gutter={[16, 16]}>
				<Col xs={24} lg={16}>
					<Card>
						<div className="flex justify-between items-start mb-4">
							<Title level={3}>{ticket.title}</Title>
							<div className="flex gap-2">
								<Tag color={getStatusColor(ticket.status)}>{ticket.status}</Tag>
								<Tag color={getPriorityColor(ticket.priority)}>{ticket.priority}</Tag>
							</div>
						</div>

						<Paragraph className="mb-6">{ticket.description}</Paragraph>

						<Divider />

						<Title level={4}>Comments</Title>
						<div className="space-y-4">
							{ticket.comments.map((comment: Comment) => (
								<Card key={comment.id} size="small">
									<div className="flex justify-between mb-2">
										<Text strong>{comment.author}</Text>
										<Text type="secondary">{comment.date}</Text>
									</div>
									<Paragraph>{comment.content}</Paragraph>
								</Card>
							))}
						</div>

						{showReplyForm ? (
							<div className="mt-6">
								<Form form={form} onFinish={handleSubmitReply}>
									<Form.Item name="reply" rules={[{ required: true, message: "Please enter your reply" }]}>
										<TextArea rows={4} placeholder="Type your reply here..." />
									</Form.Item>
									<Form.Item>
										<Button type="primary" htmlType="submit">
											Submit Reply
										</Button>
										<Button className="ml-2" onClick={() => setShowReplyForm(false)}>
											Cancel
										</Button>
									</Form.Item>
								</Form>
							</div>
						) : (
							<div className="mt-6">
								<Button type="primary" icon={<Iconify icon="mdi:reply" />} onClick={handleReply}>
									Reply to Ticket
								</Button>
							</div>
						)}
					</Card>
				</Col>

				<Col xs={24} lg={8}>
					<Card title="Ticket Information">
						<Descriptions column={1}>
							<Descriptions.Item label="Category">{ticket.category}</Descriptions.Item>
							<Descriptions.Item label="Created">{ticket.created}</Descriptions.Item>
							<Descriptions.Item label="Last Updated">{ticket.updated}</Descriptions.Item>
							<Descriptions.Item label="Assigned To">{ticket.assignedTo}</Descriptions.Item>
						</Descriptions>

						{ticket.attachments && ticket.attachments.length > 0 && (
							<>
								<Divider />
								<Title level={5}>Attachments</Title>
								<div className="space-y-2">
									{ticket.attachments.map((attachment: string) => (
										<div key={`attachment-${attachment}`} className="flex items-center gap-2">
											<Iconify icon="mdi:paperclip" />
											<Text>{attachment}</Text>
										</div>
									))}
								</div>
							</>
						)}

						<Divider />

						<div className="flex flex-col gap-2">
							{!showReplyForm && (
								<Button type="primary" icon={<Iconify icon="mdi:reply" />} onClick={handleReply}>
									Reply to Ticket
								</Button>
							)}
							<Button
								icon={<Iconify icon="mdi:close" />}
								onClick={handleCloseTicket}
								disabled={ticket.status === "Closed"}
							>
								Close Ticket
							</Button>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default TicketView;

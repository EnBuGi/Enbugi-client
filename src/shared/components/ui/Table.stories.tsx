import type { Meta, StoryObj } from '@storybook/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from './Table';
import { Text } from './Text';
import { Button } from './Button';

const meta = {
    title: 'UI/Table',
    component: Table,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export const Default: Story = {
    render: () => (
        <div className="w-[800px] border border-border p-4 rounded-md">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{invoice.invoice}</TableCell>
                            <TableCell>{invoice.paymentStatus}</TableCell>
                            <TableCell>{invoice.paymentMethod}</TableCell>
                            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    ),
};

export const WithActions: Story = {
    render: () => (
        <div className="w-[800px] border border-border p-4 rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>System</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="font-bold text-white">Core_API_v1</span>
                                <span className="text-xs text-muted">Last updated 2 hours ago</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Text variant="small" className="text-green-500">Active</Text>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Manage</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <div className="flex flex-col">
                                <span className="font-bold text-white">Auth_Module</span>
                                <span className="text-xs text-muted">Outdated version</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Text variant="small" className="text-yellow-500">Warning</Text>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="secondary" size="sm">Update</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    ),
};

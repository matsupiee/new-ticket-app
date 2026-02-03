'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Badge } from '@/shared/components/ui/badge';
import { CreateBankAccountDialog } from './_components/create-bank-account-dialog';

// ダミーデータ
const bankAccounts = [
  {
    id: '1',
    bankName: 'みずほ銀行',
    branchName: '渋谷支店',
    accountType: '普通',
    accountNumber: '1234567',
    accountHolder: 'カブシキガイシャ サンプル',
    isDefault: true,
  },
  {
    id: '2',
    bankName: '三菱UFJ銀行',
    branchName: '新宿支店',
    accountType: '当座',
    accountNumber: '9876543',
    accountHolder: 'カブシキガイシャ サンプル',
    isDefault: false,
  },
  {
    id: '3',
    bankName: '三井住友銀行',
    branchName: '東京支店',
    accountType: '普通',
    accountNumber: '5555555',
    accountHolder: 'カブシキガイシャ サンプル',
    isDefault: false,
  },
];

export default function BankAccountPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="flex-1 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">銀行口座の登録</h1>
            <p className="text-sm text-gray-500 mt-1">
              精算に使用する銀行口座を管理できます
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="size-4 mr-2" />
            新規登録
          </Button>
        </div>

        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>銀行名</TableHead>
                <TableHead>支店名</TableHead>
                <TableHead>口座種別</TableHead>
                <TableHead>口座番号</TableHead>
                <TableHead>口座名義</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">
                    {account.bankName}
                  </TableCell>
                  <TableCell>{account.branchName}</TableCell>
                  <TableCell>{account.accountType}</TableCell>
                  <TableCell>{account.accountNumber}</TableCell>
                  <TableCell>{account.accountHolder}</TableCell>
                  <TableCell>
                    {account.isDefault ? (
                      <Badge className="bg-primary text-primary-foreground">
                        メイン
                      </Badge>
                    ) : (
                      <Badge variant="outline">サブ</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={account.isDefault}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {bankAccounts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>登録されている銀行口座がありません</p>
            <Button
              className="mt-4"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="size-4 mr-2" />
              最初の口座を登録
            </Button>
          </div>
        )}
      </div>

      <CreateBankAccountDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}

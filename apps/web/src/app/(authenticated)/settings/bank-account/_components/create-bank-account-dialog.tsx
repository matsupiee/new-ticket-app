'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Checkbox } from '@/shared/components/ui/checkbox';

interface CreateBankAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateBankAccountDialog({
  open,
  onOpenChange,
}: CreateBankAccountDialogProps) {
  const [formData, setFormData] = useState({
    bankName: '',
    branchName: '',
    accountType: 'ORDINARY', // ORDINARY or CHECKING
    accountNumber: '',
    accountHolder: '',
    isDefault: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to create bank account
    console.log('Creating bank account:', formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      bankName: '',
      branchName: '',
      accountType: 'ORDINARY',
      accountNumber: '',
      accountHolder: '',
      isDefault: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>銀行口座の新規登録</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">
                銀行名 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="bankName"
                placeholder="例: みずほ銀行"
                value={formData.bankName}
                onChange={(e) =>
                  setFormData({ ...formData, bankName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branchName">
                支店名 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="branchName"
                placeholder="例: 渋谷支店"
                value={formData.branchName}
                onChange={(e) =>
                  setFormData({ ...formData, branchName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountType">
                口座種別 <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.accountType}
                onValueChange={(value) =>
                  setFormData({ ...formData, accountType: value })
                }
              >
                <SelectTrigger id="accountType">
                  <SelectValue placeholder="口座種別を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ORDINARY">普通</SelectItem>
                  <SelectItem value="CHECKING">当座</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">
                口座番号 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="accountNumber"
                placeholder="7桁の数字"
                value={formData.accountNumber}
                onChange={(e) =>
                  setFormData({ ...formData, accountNumber: e.target.value })
                }
                pattern="[0-9]{7}"
                maxLength={7}
                required
              />
              <p className="text-xs text-gray-500">
                ※ 7桁の数字で入力してください
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountHolder">
                口座名義（カタカナ） <span className="text-red-500">*</span>
              </Label>
              <Input
                id="accountHolder"
                placeholder="例: カブシキガイシャ サンプル"
                value={formData.accountHolder}
                onChange={(e) =>
                  setFormData({ ...formData, accountHolder: e.target.value })
                }
                pattern="[ァ-ヶー\s]+"
                required
              />
              <p className="text-xs text-gray-500">
                ※ 全角カタカナとスペースのみで入力してください
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDefault"
                checked={formData.isDefault}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isDefault: checked as boolean })
                }
              />
              <Label
                htmlFor="isDefault"
                className="text-sm font-normal cursor-pointer"
              >
                メイン口座として設定する
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              キャンセル
            </Button>
            <Button type="submit">登録する</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

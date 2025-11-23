// src/components/admin/course-creation/Components/TagsInput.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface TagsInputProps {
  tags?: string[];
  currentTag: string;
  onTagChange: (value: string) => void;
  onTagAdd: () => void;
  onTagRemove: (tag: string) => void;
  onTagKeyPress: (e: React.KeyboardEvent) => void;
}

export const TagsInput = ({
  tags,
  currentTag,
  onTagChange,
  onTagAdd,
  onTagRemove,
  onTagKeyPress,
}: TagsInputProps) => {
  return (
    <div>
      <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Tags
      </Label>
      <div className="flex items-center gap-2 mb-2">
        <Input
          value={currentTag}
          onChange={(e) => onTagChange(e.target.value)}
          placeholder="Digite uma tag e pressione Enter"
          className="dark:bg-slate-800 dark:border-slate-700 dark:text-white flex-1"
          onKeyPress={onTagKeyPress}
        />
        <Button
          type="button"
          onClick={onTagAdd}
          variant="outline"
          className="dark:border-slate-700 dark:text-slate-300 bg-transparent"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
            {tag}
            <button
              type="button"
              onClick={() => onTagRemove(tag)}
              className="ml-2 hover:text-red-400"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
import { Trash2 } from "lucide-react";
import type iconsMock from "@/_mock/iconsMock.json";
import DynamicIcon from "@/components/shared/dynamic-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { keyRandomizer } from "@/lib/utils";

interface TechStackCardDisplayProps {
  icons: typeof iconsMock;
  onDelete?: (iconName: string) => void;
}

export const TechStackCardDisplay = ({
  icons,
  onDelete,
}: TechStackCardDisplayProps) => {
  if (!icons || icons.length === 0) return null;

  return (
    <div className="xl:col-span-2">
      <Card>
        <CardContent className="flex flex-wrap items-start gap-4">
          {icons.map((icon) => (
            <div
              key={`${icon.name}-${keyRandomizer(icon.name)}`}
              className="group relative"
            >
              <DynamicIcon
                name={icon.iconTag}
                // provider={icon.provider}
                size={icon.size}
                // name={icon.name}
              />

              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete?.(icon.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

import { Check } from "lucide-react";

type FeatureItemProps = {
    title: string;
};

export default function FeatureItem({ title }: FeatureItemProps) {
    return (
        <div className="flex items-center gap-5">
            <Check className="stroke-[#741C21] text-sm dark:stroke-[#FF85A2]" />
            <span className="text-zinc-800 dark:text-zinc-50">{title}</span>
        </div>
    );
}

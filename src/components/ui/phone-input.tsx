"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@lib/utils/cn.util";
import { INPUT_STYLE } from "@lib/constants/style.constant";

type PhoneInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref"> &
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
        onChange?: (value: RPNInput.Value) => void;
    };

const PhoneInput = React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, ...props }, ref) => {
        return (
            <div className={cn(INPUT_STYLE, className)}>
                <RPNInput.default
                    ref={ref}
                    className="flex w-full"
                    flagComponent={FlagComponent}
                    countrySelectComponent={CountrySelect}
                    inputComponent={InputComponent}
                    smartCaret={false}
                    value={value || undefined}
                    onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
                    {...props}
                />
            </div>
        );
    }
);
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => (
    <Input
        ref={ref}
        placeholder="Phone number"
        className={cn("rounded-none border-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent", className)}
        {...props}
    />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    options: CountryEntry[];
    onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) => {
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);
    const [searchValue, setSearchValue] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Popover
            open={isOpen}
            modal
            onOpenChange={(open) => {
                setIsOpen(open);
                if (open) setSearchValue("");
            }}
        >
            <PopoverTrigger asChild className="">
                <Button
                    type="button"
                    variant="ghost"
                    className="flex items-center gap-2 rounded-none border-0 px-3 py-2 text-sm font-normal hover:bg-transparent focus:z-10"
                    disabled={disabled}
                >
                    <div className="flex items-center gap-2 hover:bg-transparent">
                        <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full hover:bg-transparent">
                            <FlagComponent country={selectedCountry} countryName={selectedCountry} />
                        </div>
                        <span className="text-sm font-medium hover:bg-transparent">{selectedCountry}</span>
                        <span className="text-sm text-muted-foreground hover:bg-transparent">
                            (+{RPNInput.getCountryCallingCode(selectedCountry)})
                        </span>
                        <ChevronsUpDown className={cn("size-4 opacity-50", disabled ? "hidden" : "opacity-100")} />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] bg-zinc-50 dark:bg-zinc-800">
                <Command>
                    <CommandInput
                        value={searchValue}
                        onValueChange={(value) => {
                            setSearchValue(value);
                            setTimeout(() => {
                                if (scrollAreaRef.current) {
                                    const viewportElement = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
                                    if (viewportElement) viewportElement.scrollTop = 0;
                                }
                            }, 0);
                        }}
                        placeholder="Search country..."
                    />
                    <CommandList className="">
                        <ScrollArea ref={scrollAreaRef} className="h-72">
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                                {countryList.map(({ value, label }) =>
                                    value ? (
                                        <CountrySelectOption
                                            key={value}
                                            country={value}
                                            countryName={label}
                                            selectedCountry={selectedCountry}
                                            onChange={onChange}
                                            onSelectComplete={() => setIsOpen(false)}
                                        />
                                    ) : null
                                )}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
    selectedCountry: RPNInput.Country;
    onChange: (country: RPNInput.Country) => void;
    onSelectComplete: () => void;
}

const CountrySelectOption = ({ country, countryName, selectedCountry, onChange, onSelectComplete }: CountrySelectOptionProps) => {
    const handleSelect = () => {
        onChange(country);
        onSelectComplete();
    };

    return (
        <CommandItem className="cursor-pointer gap-2" onSelect={handleSelect}>
            <FlagComponent country={country} countryName={countryName} />
            <span className="flex-1 text-sm">{countryName}</span>
            <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
            <CheckIcon className={`ml-auto size-4 ${country === selectedCountry ? "opacity-100" : "opacity-0"}`} />
        </CommandItem>
    );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];
    return (
        <span className="flex h-6 w-6 overflow-hidden rounded-full [&_svg:not([class*='size-'])]:size-full">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};

export { PhoneInput };

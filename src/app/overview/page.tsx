import { Input } from "@components/ui/input";
import { Container } from "@components/features/application/container";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@components/ui/input-otp";
import { PasswordInput } from "@components/shared/password-input";

export default function HomePage() {
    return (
        <Container>
            <p>hello world</p>
            <Input />
            <br />
            <Input type="number" />
            <br />
            <PasswordInput disabled />
            <br />
            {/* <InputOTP disabled maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP> */}
        </Container>
    );
}

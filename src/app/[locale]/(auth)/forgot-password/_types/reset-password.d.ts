export type ResetPasswordRequest = {
    email: string;
    newPassword: string;
};

export type ResetPasswordResponse = {
    token: string;
};

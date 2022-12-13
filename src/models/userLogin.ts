export interface userLogin {
    account: {
        username: string;
        code: string;
    },
    error: string | null | undefined;
}
import { createContext, ReactNode, useState } from "react";

export type AccountProps = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
    birth?: string;
    gender?: string;
    phoneNumber?: string;
    cep?: string;
    houseNumber?: string;
    address?: string;
    district?: string;
    state?: string;
    country?: string;
    invitationCode?: string;
    phoneShare?: boolean;
}

type AccountFormContextDataProps = {
    accountFormData: AccountProps;
    updateFormData: (value: AccountProps) => void;
}

type AccountFormContextProviderProps = {
    children: ReactNode;
}

const AccountFormContext = createContext<AccountFormContextDataProps>({} as AccountFormContextDataProps);

function AccountProvider({ children }: AccountFormContextProviderProps) {
    const [accountFormData, setAccountFormData] = useState<AccountProps>({} as AccountProps);

    function updateFormData(data: AccountProps) {
        setAccountFormData((prevState) => ({...prevState, ...data}))
    }

    return (
        <AccountFormContext.Provider value={{
            accountFormData,
            updateFormData
        }}>
            {children}
        </AccountFormContext.Provider>
    );
}

export { AccountProvider, AccountFormContext }
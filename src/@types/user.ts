interface Roles {
    name: string;
    roleId: number;
}

interface UserData {
    firstName: string;
    lastName: string;
    phone: string;
    phoneShare: boolean;
    street: string;
    houseNumber: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    cep: string;
    gender: string;
    birthDate: string;
    roles: Roles[];
    events: Set<Event>;
}

export { Roles, UserData };

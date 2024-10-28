interface BorrowedItem {
    id_inventory: number;
    quantity: number;
}

interface Borrow {
    applicant: string;
    num_account: number;
    id_career: number;
    semester: string;
    teacher: string;
    practice_name: string;
    email: string;
    borrowedItems: BorrowedItem[];
    id_users: number;
}

export { Borrow, BorrowedItem };
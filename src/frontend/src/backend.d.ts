import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PaymentTerms {
    afterCompletion: bigint;
    advance: bigint;
}
export interface Pricing {
    hostingSetup: bigint;
    googleProfile: bigint;
    basicWebsite: bigint;
    logoDesign: bigint;
    googleConsole: bigint;
    domainSetup: bigint;
    standardWebsite: bigint;
    maintenance: bigint;
    landingPage: bigint;
}
export interface ContactSubmission {
    name: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface WorkProcessStep {
    title: string;
    description: string;
    stepNumber: bigint;
}
export interface Service {
    name: string;
    description: string;
    price: bigint;
}
export interface Inquiry {
    service: string;
    name: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearAllInquiries(): Promise<void>;
    clearAllSubmissions(): Promise<void>;
    deleteContactSubmission(callerPrincipal: Principal, timestamp: bigint): Promise<boolean>;
    deleteServiceInquiry(callerPrincipal: Principal, timestamp: bigint): Promise<boolean>;
    getAllContactSubmissions(): Promise<Array<[Principal, Array<ContactSubmission>]>>;
    getAllServiceInquiries(): Promise<Array<[Principal, Array<Inquiry>]>>;
    getCallerUserRole(): Promise<UserRole>;
    getContactSubmissions(callerPrincipal: Principal): Promise<Array<ContactSubmission>>;
    getContactSubmissionsCount(): Promise<bigint>;
    getPaymentTerms(): Promise<PaymentTerms>;
    getPricing(): Promise<Pricing>;
    getServiceInquiries(callerPrincipal: Principal): Promise<Array<Inquiry>>;
    getServiceInquiriesCount(): Promise<bigint>;
    getServices(): Promise<Array<Service>>;
    getWorkProcessSteps(): Promise<Array<WorkProcessStep>>;
    isCallerAdmin(): Promise<boolean>;
    saveContactSubmission(name: string, message: string, phone: string, timestamp: bigint): Promise<void>;
    saveServiceInquiry(name: string, message: string, phone: string, service: string, timestamp: bigint): Promise<void>;
    testMessage(): Promise<string>;
}

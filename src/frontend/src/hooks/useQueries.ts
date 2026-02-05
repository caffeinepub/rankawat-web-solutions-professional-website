import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@dfinity/principal';
import type { Service, Pricing, PaymentTerms, WorkProcessStep, ContactSubmission, Inquiry } from '../backend';

export function useGetServices() {
  const { actor, isFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPricing() {
  const { actor, isFetching } = useActor();

  return useQuery<Pricing | null>({
    queryKey: ['pricing'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPricing();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPaymentTerms() {
  const { actor, isFetching } = useActor();

  return useQuery<PaymentTerms | null>({
    queryKey: ['paymentTerms'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPaymentTerms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetWorkProcessSteps() {
  const { actor, isFetching } = useActor();

  return useQuery<WorkProcessStep[]>({
    queryKey: ['workProcessSteps'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWorkProcessSteps();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveContactSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      message,
      phone,
    }: {
      name: string;
      message: string;
      phone: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      const timestamp = BigInt(Date.now());
      await actor.saveContactSubmission(name, message, phone, timestamp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['allSubmissions'] });
      queryClient.invalidateQueries({ queryKey: ['submissionsCount'] });
    },
  });
}

export function useSaveServiceInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      message,
      phone,
      service,
    }: {
      name: string;
      message: string;
      phone: string;
      service: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      const timestamp = BigInt(Date.now());
      await actor.saveServiceInquiry(name, message, phone, service, timestamp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['allInquiries'] });
      queryClient.invalidateQueries({ queryKey: ['inquiriesCount'] });
    },
  });
}

// Admin queries
export function useGetAllContactSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[Principal, ContactSubmission[]]>>({
    queryKey: ['allSubmissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllServiceInquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[Principal, Inquiry[]]>>({
    queryKey: ['allInquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServiceInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContactSubmissionsCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['submissionsCount'],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getContactSubmissionsCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetServiceInquiriesCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['inquiriesCount'],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getServiceInquiriesCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteContactSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ principal, timestamp }: { principal: string; timestamp: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      const principalObj = Principal.fromText(principal);
      return actor.deleteContactSubmission(principalObj, timestamp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allSubmissions'] });
      queryClient.invalidateQueries({ queryKey: ['submissionsCount'] });
    },
  });
}

export function useDeleteServiceInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ principal, timestamp }: { principal: string; timestamp: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      const principalObj = Principal.fromText(principal);
      return actor.deleteServiceInquiry(principalObj, timestamp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allInquiries'] });
      queryClient.invalidateQueries({ queryKey: ['inquiriesCount'] });
    },
  });
}

export function useClearAllSubmissions() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.clearAllSubmissions();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allSubmissions'] });
      queryClient.invalidateQueries({ queryKey: ['submissionsCount'] });
    },
  });
}

export function useClearAllInquiries() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.clearAllInquiries();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allInquiries'] });
      queryClient.invalidateQueries({ queryKey: ['inquiriesCount'] });
    },
  });
}

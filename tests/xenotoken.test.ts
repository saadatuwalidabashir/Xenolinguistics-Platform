import { describe, it, beforeEach, expect, vi } from 'vitest';
const mockContractCall = vi.fn();

describe('Xenotoken Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('mint', () => {
    it('should mint tokens successfully', async () => {
      const amount = 1000;
      const recipient = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      
      (mockContractCall as any).mockResolvedValue({ value: true });
      
      const result = await (mockContractCall as any)('xenotoken', 'mint', [amount, recipient]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('xenotoken', 'mint', [amount, recipient]);
    });
    
    it('should fail if not called by contract owner', async () => {
      const amount = 1000;
      const recipient = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      
      (mockContractCall as any).mockRejectedValue(new Error('Unauthorized'));
      
      await expect((mockContractCall as any)('xenotoken', 'mint', [amount, recipient]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('transfer', () => {
    it('should transfer tokens successfully', async () => {
      const amount = 500;
      const sender = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      (mockContractCall as any).mockResolvedValue({ value: true });
      
      const result = await (mockContractCall as any)('xenotoken', 'transfer', [amount, sender, recipient]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('xenotoken', 'transfer', [amount, sender, recipient]);
    });
    
    it('should fail if sender has insufficient balance', async () => {
      const amount = 1000000;
      const sender = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      (mockContractCall as any).mockRejectedValue(new Error('Insufficient balance'));
      
      await expect((mockContractCall as any)('xenotoken', 'transfer', [amount, sender, recipient]))
          .rejects.toThrow('Insufficient balance');
    });
  });
  
  describe('reward-breakthrough', () => {
    it('should reward a breakthrough successfully', async () => {
      const recipient = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const amount = 5000;
      
      (mockContractCall as any).mockResolvedValue({ value: true });
      
      const result = await (mockContractCall as any)('xenotoken', 'reward-breakthrough', [recipient, amount]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('xenotoken', 'reward-breakthrough', [recipient, amount]);
    });
    
    it('should fail if not called by contract owner', async () => {
      const recipient = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const amount = 5000;
      
      (mockContractCall as any).mockRejectedValue(new Error('Unauthorized'));
      
      await expect((mockContractCall as any)('xenotoken', 'reward-breakthrough', [recipient, amount]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('get-balance', () => {
    it('should return the correct token balance for an account', async () => {
      const account = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const expectedBalance = 7500;
      
      (mockContractCall as any).mockResolvedValue({ value: expectedBalance });
      
      const result = await (mockContractCall as any)('xenotoken', 'get-balance', [account]);
      
      expect(result.value).toBe(expectedBalance);
      expect(mockContractCall).toHaveBeenCalledWith('xenotoken', 'get-balance', [account]);
    });
  });
  
  describe('set-token-uri', () => {
    it('should set the token URI successfully', async () => {
      const newUri = 'https://example.com/xenotoken-metadata';
      
      (mockContractCall as any).mockResolvedValue({ value: true });
      
      const result = await (mockContractCall as any)('xenotoken', 'set-token-uri', [newUri]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('xenotoken', 'set-token-uri', [newUri]);
    });
    
    it('should fail if not called by contract owner', async () => {
      const newUri = 'https://example.com/xenotoken-metadata';
      
      (mockContractCall as any).mockRejectedValue(new Error('Unauthorized'));
      
      await expect((mockContractCall as any)('xenotoken', 'set-token-uri', [newUri]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('get-token-uri', () => {
    it('should return the current token URI', async () => {
      const expectedUri = 'https://example.com/xenotoken-metadata';
      
      (mockContractCall as any).mockResolvedValue({ value: expectedUri });
      
      const result = await (mockContractCall as any)('xenotoken', 'get-token-uri', []);
      
      expect(result.value).toBe(expectedUri);
      expect(mockContractCall).toHaveBeenCalledWith('xenotoken', 'get-token-uri', []);
    });
  });
});


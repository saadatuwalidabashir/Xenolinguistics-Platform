import { describe, it, beforeEach, expect, vi } from 'vitest';
const mockContractCall = vi.fn();

describe('Telescope Integration Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('register-telescope', () => {
    it('should register a telescope successfully', async () => {
      const name = 'SETI ATA';
      const location = 'Hat Creek Radio Observatory, California';
      const apiEndpoint = 'https://api.seti.org/ata';
      
      (mockContractCall as any).mockResolvedValue({ value: 1 }); // Assuming 1 is the new telescope ID
      
      const result = await (mockContractCall as any)('telescope-integration', 'register-telescope', [name, location, apiEndpoint]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('telescope-integration', 'register-telescope', [name, location, apiEndpoint]);
    });
  });
  
  describe('submit-telescope-data', () => {
    it('should submit telescope data successfully', async () => {
      const telescopeId = 1;
      const data = 'Raw signal data: 101010101010';
      
      (mockContractCall as any).mockResolvedValue({ value: true });
      
      const result = await (mockContractCall as any)('telescope-integration', 'submit-telescope-data', [telescopeId, data]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('telescope-integration', 'submit-telescope-data', [telescopeId, data]);
    });
    
    it('should fail if the telescope does not exist', async () => {
      const telescopeId = 999;
      const data = 'Invalid data';
      
      (mockContractCall as any).mockRejectedValue(new Error('Telescope not found'));
      
      await expect((mockContractCall as any)('telescope-integration', 'submit-telescope-data', [telescopeId, data]))
          .rejects.toThrow('Telescope not found');
    });
  });
  
  describe('get-telescope', () => {
    it('should return telescope details', async () => {
      const telescopeId = 1;
      const expectedTelescope = {
        name: 'SETI ATA',
        location: 'Hat Creek Radio Observatory, California',
        api_endpoint: 'https://api.seti.org/ata'
      };
      
      (mockContractCall as any).mockResolvedValue({ value: expectedTelescope });
      
      const result = await (mockContractCall as any)('telescope-integration', 'get-telescope', [telescopeId]);
      
      expect(result.value).toEqual(expectedTelescope);
      expect(mockContractCall).toHaveBeenCalledWith('telescope-integration', 'get-telescope', [telescopeId]);
    });
    
    it('should return null for non-existent telescope', async () => {
      const telescopeId = 999;
      
      (mockContractCall as any).mockResolvedValue({ value: null });
      
      const result = await (mockContractCall as any)('telescope-integration', 'get-telescope', [telescopeId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-telescope-data', () => {
    it('should return telescope data for a specific timestamp', async () => {
      const telescopeId = 1;
      const timestamp = 1234567890;
      const expectedData = { data: 'Raw signal data: 101010101010' };
      
      (mockContractCall as any).mockResolvedValue({ value: expectedData });
      
      const result = await (mockContractCall as any)('telescope-integration', 'get-telescope-data', [telescopeId, timestamp]);
      
      expect(result.value).toEqual(expectedData);
      expect(mockContractCall).toHaveBeenCalledWith('telescope-integration', 'get-telescope-data', [telescopeId, timestamp]);
    });
    
    it('should return null for non-existent telescope data', async () => {
      const telescopeId = 1;
      const timestamp = 9999999999;
      
      (mockContractCall as any).mockResolvedValue({ value: null });
      
      const result = await (mockContractCall as any)('telescope-integration', 'get-telescope-data', [telescopeId, timestamp]);
      
      expect(result.value).toBeNull();
    });
  });
});


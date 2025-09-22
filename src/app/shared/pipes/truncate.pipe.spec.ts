import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate long text', () => {
    const longText = 'This is a very long text that should be truncated';
    const result = pipe.transform(longText, 20);
    expect(result).toBe('This is a very long t...');
  });

  it('should not truncate short text', () => {
    const shortText = 'Short text';
    const result = pipe.transform(shortText, 20);
    expect(result).toBe('Short text');
  });

  it('should handle empty string', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

  it('should handle null/undefined', () => {
    const result1 = pipe.transform(null as unknown as string);
    const result2 = pipe.transform(undefined as unknown as string);
    expect(result1).toBe('');
    expect(result2).toBe('');
  });

  it('should use custom trail', () => {
    const longText = 'This is a very long text';
    const result = pipe.transform(longText, 10, '---');
    expect(result).toBe('This is a---');
  });
});

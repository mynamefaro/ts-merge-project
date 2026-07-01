import { describe, it, expect } from '@jest/globals';
import { merge } from '../src/merge';

describe('merge function - 3 sorted arrays', () => {

    // --- GROUP 1: Happy Paths & Basic Sorting (6 Cases) ---

    it('1. should merge three normal sorted arrays', () => {
        expect(merge([1, 3, 5], [6, 4, 2], [7, 8, 9])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('2. should handle duplicate values across arrays', () => {
        expect(merge([1, 2, 2], [5, 2, 1], [2, 3, 4])).toEqual([1, 1, 2, 2, 2, 2, 3, 4, 5]);
    });

    it('3. should work when arrays have different lengths', () => {
        expect(merge([1], [10, 5], [2, 3, 4, 6])).toEqual([1, 2, 3, 4, 5, 6, 10]);
    });

    it('4. should handle negative numbers correctly', () => {
        expect(merge([-5, -3, -1], [-2, -4, -6], [-10, 0, 5])).toEqual([-10, -6, -5, -4, -3, -2, -1, 0, 5]);
    });

    it('5. should handle single-element arrays', () => {
        expect(merge([5], [10], [1])).toEqual([1, 5, 10]);
    });

    it('6. should work when all arrays contain identical elements', () => {
        expect(merge([2, 2], [2, 2], [2])).toEqual([2, 2, 2, 2, 2]);
    });


    // --- GROUP 2: Empty Arrays (4 Cases) ---

    it('7. should return an empty array when all inputs are empty', () => {
        expect(merge([], [], [])).toEqual([]);
    });

    it('8. should work when collection_1 is empty', () => {
        expect(merge([], [5, 3, 1], [2, 4])).toEqual([1, 2, 3, 4, 5]);
    });

    it('9. should work when collection_2 is empty', () => {
        expect(merge([1, 3], [], [2, 4])).toEqual([1, 2, 3, 4]);
    });

    it('10. should work when collection_3 is empty', () => {
        expect(merge([1, 4], [5, 2], [])).toEqual([1, 2, 4, 5]);
    });

    // --- GROUP 3: Infinity Cases (5 Cases) ---

    it('11. should handle Infinity at the end of collection_1 and collection_3', () => {
        expect(merge([1, 3, Infinity], [10, 5, 2], [4, Infinity])).toEqual([1, 2, 3, 4, 5, 10, Infinity, Infinity]);
    });

    it('12. should handle Infinity at the beginning of collection_2 (since it is max to min)', () => {
        expect(merge([1, 2], [Infinity, 5, 3], [4])).toEqual([1, 2, 3, 4, 5, Infinity]);
    });

    it('13. should handle -Infinity correctly', () => {
        expect(merge([-Infinity, 1, 5], [10, 2, -Infinity], [-Infinity, 3])).toEqual([-Infinity, -Infinity, -Infinity, 1, 2, 3, 5, 10]);
    });

    it('14. should handle arrays made entirely of Infinity', () => {
        expect(merge([Infinity], [Infinity], [Infinity])).toEqual([Infinity, Infinity, Infinity]);
    });

    it('15. should handle a mix of Infinity and -Infinity', () => {
        expect(merge([-Infinity, Infinity], [Infinity, -Infinity], [-Infinity, Infinity]))
            .toEqual([-Infinity, -Infinity, -Infinity, Infinity, Infinity, Infinity]);
    });


    // --- GROUP 4: Undefined / Edge Cases (5 Cases) ---

    it('16. should throw error when undefined values inside collection_1', () => {
        const c1 = [1, undefined, 5] as any;
        expect(() => {
            merge(c1, [4, 2], [3]);
        }).toThrow("Found undefined value in collection_1");
    });

    it('17. should throw error when undefined values inside collection_2', () => {
        const c2 = [10, undefined, 2] as any;
        expect(() => {
            merge([1, 5], c2, [3]);
        }).toThrow("Found undefined value in collection_2");
    });

    it('18. should throw error when undefined values inside collection_3', () => {
        const c3 = [2, undefined, Infinity] as any;
        expect(() => {
            merge([1], [5], c3);
        }).toThrow("Found undefined value in collection_3");
    });

    it('19. should handle completely undefined arguments gracefully if passed (Runtime Crash Check)', () => {
        expect(() => {
            merge(undefined as any, [] as any, [] as any);
        }).toThrow();
    });

    it('20. should throw error when dealing with sparse arrays (contains empty slots / undefined)', () => {
        const sparse1: number[] = [];
        sparse1[0] = 1;
        sparse1[2] = 5;
        
        expect(() => {
            merge(sparse1, [4, 2], [3]);
        }).toThrow("Found undefined value in collection_1"); 
    });
});
/**
 * Merges three sorted arrays into a single ascending sorted array.
 * @param collection_1 Sorted from min to max
 * @param collection_2 Sorted from max to min
 * @param collection_3 Sorted from min to max
 */
export function merge(
    collection_1: number[],
    collection_2: number[],
    collection_3: number[]
): number[] {
    const result: number[] = [];
    
    let i = 0;                       // Pointer สำหรับ collection_1 (0 -> length)
    let j = collection_2.length - 1; // Pointer สำหรับ collection_2 (length-1 -> 0)
    let k = 0;                       // Pointer สำหรับ collection_3 (0 -> length)

    while (i < collection_1.length || j >= 0 || k < collection_3.length) {
        
        // 1. พิจารณา collection_1[i], collection_2[j], collection_3[k]
        const item1 = i < collection_1.length ? collection_1[i] : Infinity;
        const item2 = j >= 0 ? collection_2[j] : Infinity;
        const item3 = k < collection_3.length ? collection_3[k] : Infinity;

        // 2. ตรวจสอบว่าถ้าไม่ใช่อาร์เรย์หลุดขอบ (ไม่ใช่ Infinity) แต่ค่าดันเป็น undefined ให้ throw error
        if (item1 === undefined) throw new Error("Found undefined value in collection_1");
        if (item2 === undefined) throw new Error("Found undefined value in collection_2");
        if (item3 === undefined) throw new Error("Found undefined value in collection_3");

        // TypeScript will be number only not undefined
        const val1: number = item1;
        const val2: number = item2;
        const val3: number = item3;

        // 3. เปรียบเทียบและขยับ Pointer
        if (val1 <= val2 && val1 <= val3 && i < collection_1.length) {
            result.push(val1);
            i++;
        } else if (val2 <= val1 && val2 <= val3 && j >= 0) {
            result.push(val2);
            j--; 
        } else if (k < collection_3.length) {
            result.push(val3);
            k++;
        }
    }

    return result;
}
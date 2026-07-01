# 3-Sorted Array Merge Function

This project implements and tests a robust `merge` utility function. It is designed to combine three pre-sorted arrays (`collection_1`, `collection_2`, `collection_3`) into a single cohesive array sorted in **ascending order** with maximum performance.

## 📋 Function Specification

The function accepts three parameters, each with distinct sorting directions:
* `collection_1`: An array of numbers sorted from **min to max (Ascending)**.
* `collection_2`: An array of numbers sorted from **max to min (Descending)**.
* `collection_3`: An array of numbers sorted from **min to max (Ascending)**.

## 🛠️ Algorithmic Logic
To achieve an optimal Time Complexity of O(N) without relying on costly JavaScript native .sort() reapplications, this function implements a Three-Pointer Technique:
Pointer Initialization: Three independent pointers trace the elements. While collection_1 and collection_3 pointers move forwards (0→length), the collection_2 pointer steps backwards (length−1→0) to naturally adapt to its descending order.
Boundary Resilience: During the comparison cycle, if any array runs out of bounds, its value is dynamically treated as Infinity. This seamlessly allows the remaining valid array elements to win the minimum value comparison.
Data Integrity: The function actively monitors values at each pointer step. If an unexpected undefined is encountered (e.g., inside sparse arrays), it immediately throws an explicit error to prevent compromised or corrupted data outcomes.

## 🧪 Unit Testing
The utility is strictly covered by 20 comprehensive test cases built with Jest to guarantee absolute runtime safety and edge-case correctness. The suite is categorized into 4 core testing dimensions:
### 1. Happy Paths & Basic Sorting (6 Cases)
Case 1: Merging three standard properly-sorted arrays.
Case 2: Handling matching duplicate values scattered across different arrays.
Case 3: Seamlessly merging arrays of entirely uneven lengths.
Case 4: Correctly evaluating and sorting negative numbers.
Case 5: Managing arrays that contain only a single element.
Case 6: Merging scenarios where all arrays share identical numbers.
### 2. Empty Arrays Handling (4 Cases)
Case 7: Returns an empty array when all inputs are completely empty [], [], [].
Case 8 - 10: Safely executing when one of the three collections is empty.
### 3. Infinity & Special Cases (5 Cases)
Case 11 - 12: Managing mathematically valid Infinity boundaries placed at the edges of the arrays.
Case 13: Handling -Infinity priorities accurately.
Case 14 - 15: Resolving arrays consisting exclusively of mixed Infinity and -Infinity thresholds.
### 4. Undefined & Edge Cases (5 Cases)
Case 16 - 18: Intentionally throwing standard descriptive errors if undefined values hide within any collection.
Case 19: Guarding against completely missing arguments at runtime (Runtime Crash Check).
Case 20: Successfully blocking Sparse Arrays (arrays with unassigned empty structural slots).
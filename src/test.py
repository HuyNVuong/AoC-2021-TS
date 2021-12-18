# Do not edit the class below except for the buildHeap,
# siftDown, siftUp, peek, remove, and insert methods.
# Feel free to add new properties and methods to the class.
class MinHeap:
    def __init__(self, array):
        # Do not edit the line below.
        self.heap = self.buildHeap(array)
        print(array)
        print(self.heap)

    def buildHeap(self, array):
        # Write your code here.
        self.heap = array
        first_parent_index = (len(array) - 2) // 2
        for i in reversed(range(first_parent_index + 1)):
            self.siftDown(i)
        return self.heap

    def siftDown(self, current_index):
        while (left_index := current_index * 2 + 1) < len(self.heap):
            right_index = current_index * 2 + 2 if left_index + 1 < len(self.heap) else -1
            swap_index = (right_index 
                if right_index != -1 and self.heap[right_index] < self.heap[left_index]
                else left_index
            )
            if self.heap[swap_index] < self.heap[current_index]:
                self.swap(current_index, swap_index)
                current_index = swap_index
            else:
                return

    def siftUp(self):
        current_index = len(self.heap) - 1
        while (
            (parent_index := (current_index - 1) // 2) > 0 
            and self.heap[current_index] < self.heap[parent_index]
        ):
            self.swap(current_index, parent_index)
            current_index = parent_index

    def peek(self):
        return self.heap[0]

    def remove(self):
        self.swap(0, -1)
        item_to_remove = self.heap[-1]
        self.heap = self.heap[:-1]
        self.siftDown(0)
        return item_to_remove

    def insert(self, value):
        self.heap += [value]
        self.siftUp()
        
    def swap(self, i, j):
        tmp = self.heap[i]
        self.heap[i] = self.heap[j]
        self.heap[j] = tmp

import { QuestionType, SectionType, TestType } from "@/types/Package";
import { surrealConnection, surrealDatabase } from "@/utils/surreal/surreal";
import { RecordId } from "surrealdb.js";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface TestStoreType {
  selectedSection: number;
  selectedQuestion: number;
  testData?: TestType;

  updateSectionSelection: (newSelection: number) => void;
  updateQuestionSelection: (newSelection: number) => void;
  getTestData: (test_id: RecordId) => Promise<void>;
}

const initialState = {
  selectedSection: 0,
  selectedQuestion: 0,
  testData: undefined,
};

export const useTestStore = create<TestStoreType>()(
  immer((set) => ({
    ...initialState,

    // Update Selection Section.
    updateSectionSelection: (newSelection: number) =>
      set((state) => {
        state.selectedSection = newSelection;
        state.selectedQuestion = 0;
      }),

    // Update Question Section.
    updateQuestionSelection: (newSelection: number) =>
      set({ selectedQuestion: newSelection }),

    // Get total test data
    getTestData: async (test_id: RecordId) => {
      await surrealConnection;
      const testData = await surrealDatabase.query<TestType[][]>(
        `SELECT *,(SELECT *,(select * from ->contains->questions) as questions from ->contains->sections) as sections from tests:${test_id};`
      );
      console.log({ testData });
      set({ testData: testData[0][0] });
    },
  }))
);

//   updateTestData: (newTestData: number) => set({ testData: newTestData }),

//   sections: [],

//   sectionQuestions: [],
//   updateSectionSelection: (newSelection: number) =>
//     set({ selectedSection: newSelection, selectedQuestion: 0 }),

//   updateQuestionSelection: (newSelection: number) =>
//     set({ selectedQuestion: newSelection }),

//   updateQuestions: (newQuestions: QuestionType) =>
//     set((state: any) => ({
//       sectionQuestions: [...state.sectionQuestions, newQuestions],
//     })),

import { Duration, RecordId } from "surrealdb.js";

export type PackageType = {
  package_cost: number;
  package_name: string;
  package_subtitle: string;
  package_description: string;
  is_published: boolean;
  id: RecordId;
};

export type TestType = {
  package_id: RecordId;
  section_switching: boolean;
  test_title: string;
  id: RecordId;
  duration: Duration;
  sections: SectionType[];
};

export type SectionType = {
  id: RecordId;
  test_id: RecordId;
  section_title: string;
  duration: Duration;
  max_score: number;
  question_switching: boolean;
  questions?: QuestionType[];
};

export type QuestionType = {
  id: RecordId;
  question_title: string;
  question_type: string;
  question_img: string;
  marks: number;
  correct_answer: number | string;
  explaination: string;
  options: OptionType[];
};

export type OptionType = {
  option_id: number;
  option_text: string;
};

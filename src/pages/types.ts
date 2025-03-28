import {Moment} from "moment/moment";

export type Application = {
    _id: string,
    title: string,
    published_date: Moment;
}

export type Skill = {
    name: string,
    skill_code: string,
    skill_type_code: string,
    published_date: Moment,
}

export type SkillSectionInput = {
    label: string,
    skillCode: string
}

export type SkillCardsProps = {
    skillCode: string
}

export interface KeyDownEvent extends EventTarget {
    value: string
}

export type SubmitToAiInput = {
    input: KeyDownEvent
}
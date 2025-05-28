import { ViewConfig } from './view-config';

export const skills: ViewConfig = {
  columns: {
    name: "Skill",
    effect: "Effects",
    details: "Details"
  },
  itemTypes: ["Active", "Passive", "Damage", "Recovery", "Support", "Debuff"],
  tableName: "skills"
}

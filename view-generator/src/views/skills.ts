import { ViewConfig } from './view-config';

export const skills: ViewConfig = {
  columns: {
    name: "Skill",
    effect: "Effects",
    level_effect: "Details"
  },
  itemTypes: ["Active", "Passive", "Damage", "Recovery", "Support", "Debuff"],
  tableName: "skills"
}

# Table Reader Examples

## First Example

{{ pd_read_csv('data/skills.csv').query('name == "Agent of Heresy"').fillna('') | convert_to_md_table }}

## Second Example

{{ pd_read_csv('data/skills.csv').query('name == "Agent of Heresy"')['effect'].iloc[0] }} {{ pd_read_csv('data/skills.csv').query('name == "Agent of Heresy"')['details'].fillna('').iloc[0] }}

## Third Example

{{ get_skill_description('Agent of Heresy') }}